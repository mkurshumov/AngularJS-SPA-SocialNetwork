'use strict';

app.controller('homeController',
    function ($scope, $location, notifyService, userService, authService, postService, pageSize) {
        var startPostId;
        $scope.posts = [];

        $scope.getDataAboutMe = function () {
            if (authService.isLoggedIn()) {
                userService.getDataAboutMe(
                    function success(data) {
                        $scope.ownData = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to get own data', err);
                    }
                )
            }
        };

        $scope.editProfile = function () {
            if (authService.isLoggedIn()) {
                userService.editProfile($scope.ownData,
                    function success() {
                        notifyService.showInfo('Successfully edited profile');
                    },
                    function error(err) {
                        notifyService.showError('Failed to edit profile', err);
                    }
                )
            }
        };

        $scope.changePassword = function () {
            if (authService.isLoggedIn()) {
                userService.changePassword($scope.passwordUpdate,
                    function success() {
                        notifyService.showInfo('Successfully changed password');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to change password', err);
                    }
                )
            }
        };

        $scope.loadNewsFeed = function () {
            if (authService.isLoggedIn()) {
                postService.getNewsFeedPages(pageSize, startPostId,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load News Feed', err);
                    }
                )
            }
        };

        $scope.getOwnFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriends(
                    function success(data) {
                        $scope.ownFriends = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends list', err);
                    }
                )
            }
        };

        $scope.getOwnFriendsPreview = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriendsPreview(
                    function success(data) {
                        data.userFriendsUrl = '#/friends/';
                        $scope.friendsPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends preview', err);
                    }
                )
            }
        };

        $scope.uploadProfileImage = function(event){
            var file = event.target.files[0],
                reader;

            if(!file.type.match(/image\/.*/)){
                $('.profile-picture-preview').attr('src', '');
                $scope.ownData.profileImageData = undefined;
                notifyService.showError("Invalid file format.");
            } else if(file.size > 131072) {
                $('.profile-picture-preview').attr('src', '');
                $scope.me.profileImageData = undefined;
                notifyService.showError("File size limit exceeded.");
            } else {
                reader = new FileReader();
                reader.onload = function() {
                    $('.profile-picture-preview').attr('src', reader.result);
                    $('#profile-image').attr('data-picture-data', reader.result);
                    $scope.me.profileImageData = reader.result;
                };
                reader.readAsDataURL(file);
            }
        };

        $scope.uploadCoverImage = function(event){
            var file = event.target.files[0],
                reader;

            if (!file.type.match(/image\/.*/)){
                $('.cover-picture-preview').attr('src', '');
                $scope.ownData.coverImageData = undefined;
                notifyService.showError("Invalid file format.");
            } else if (file.size > 131072) {
                $('.cover-picture-preview').attr('src', '');
                $scope.ownData.coverImageData = undefined;
                notifyService.showError("File size limit exceeded.");
            } else {
                reader = new FileReader();
                reader.onload = function() {
                    $('.cover-picture-preview').attr('src', reader.result);
                    $('#cover-image').attr('data-picture-data', reader.result);
                    $scope.ownData.coverImageData = reader.result;
                };
                reader.readAsDataURL(file);
            }
        };

        $scope.uploadClick = function () {
            angular.element('#profile-image').trigger('click');
        };

        $scope.sendFriendRequest = function (previewData) {
            if (authService.isLoggedIn()) {
                userService.sendFriendRequest(previewData.username,
                    function success() {
                        notifyService.showInfo('Friend request successfully sent to ' + previewData.username);
                        previewData.status = 'pending';
                    },
                    function error(err) {
                        notifyService.showError('Failed to sent friend request', err);
                    }
                )
            }
        };

        //$scope.getFriendRequests = function () {
        //
        //}
    }
);
'use strict';

app.controller('profileController',
    function ($scope, $location, $timeout, notifyService, userService, authService, postsService, PAGE_SIZE) {
        var startPostId;
        $scope.posts = [];
        $scope.scrollPause = false;

        $scope.loadDataAboutMe = function () {
            if (authService.isLoggedIn()) {
                userService.getDataAboutMe(
                    function success(data) {
                        $scope.userData = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to get own data', err);
                    }
                )
            }
        };

        $scope.editProfile = function (userData) {
            if (authService.isLoggedIn()) {
                userService.editProfile(userData,
                    function success() {
                        notifyService.showInfo('Profile successfully edited');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to edit profile', err);
                    }
                )
            }
        };

        $scope.changePassword = function (userData) {
            if (authService.isLoggedIn()) {
                userService.changePassword(userData,
                    function success() {
                        notifyService.showInfo('Password successfully changed');
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
                if ($scope.scrollPause) {
                    return;
                }
                $scope.scrollPause = true;
                postsService.getNewsFeed(PAGE_SIZE, startPostId,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                        $scope.scrollPause = false;
                        $scope.isNewsFeed = true;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load News Feed', err);
                    }
                )
            }
        };

        $scope.loadOwnFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriends(
                    function success(data) {
                        $scope.friendsList = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends list', err);
                    }
                )
            }
        };

        $scope.loadOwnFriendsPreview = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriendsPreview(
                    function success(data) {
                        data.userFriendsUrl = '#/user/' + $scope.username + '/friends/';
                        $scope.friendsListPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends preview', err);
                    }
                )
            }
        };

        $scope.profilePicture = function (fileInputField) {

            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.userData.profileImageData = reader.result;
                    $("#uploadProfileImg").attr('src', reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.coverPicture = function (fileInputField) {
            delete $scope.ownData.coverImageData;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.userData.coverImageData = reader.result;
                    $("#uploadCoverImg").attr('src', reader.result)
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
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
    }
);
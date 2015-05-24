'use strict';

app.controller('profileController',
    function ($scope, $location, $timeout, notifyService, userService, authService, searchService) {

        $scope.getDataAboutMe = function () {
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

        $scope.editProfile = function () {
            if (authService.isLoggedIn()) {
                userService.editProfile($scope.userData,
                    function success() {
                        notifyService.showInfo('Profile successfully edited');
                    },
                    function error(err) {
                        notifyService.showError('Failed to edit profile', err);
                    }
                )
            }
        };

        $scope.changePassword = function () {
            if (authService.isLoggedIn()) {
                userService.changePassword($scope.userData,
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

        $scope.search = function () {
            if (authService.isLoggedIn() && $scope.searchTerm.trim() !== '') {
                searchService.searchUser($scope.searchTerm,
                    function success(data) {
                        $scope.searchResults = data;
                    },
                    function error(err) {

                    }
                )
            } else {
                $scope.searchResults = undefined;
            }
        };

        $scope.clearSearchResults = function () {
            $timeout(function () {
                $scope.searchResults = undefined;
                $scope.searchTerm = '';
            }, 600);
        };

        $scope.loadOwnFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getOwnFriends(
                    function success(data) {
                        $scope.friends = data;
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
                        data.friendsUrl = '#/user/' + $scope.username + '/friends/';
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

        $scope.uploadProfileImageClick = function () {
            angular.element('#profile-image').trigger('click');
        };

        $scope.uploadCoverImageClick = function () {
            angular.element('#cover-image').trigger('click');
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

        $scope.loadFriendRequests = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendRequests(
                    function success(data) {

                    },
                    function error(err) {
                        notifyService.showError('Failed to load friend requests', err)
                    }
                )
            }
        };

    }
);
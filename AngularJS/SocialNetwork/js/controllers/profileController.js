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

        $scope.search = function (searchTerm) {
            if (authService.isLoggedIn()) {
                searchService.searchUser(searchTerm,
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

        $scope.showHideResults = function () {
            $timeout(function () {
                $scope.showSearchResults = !$scope.showSearchResults;
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

        $scope.clickUpload = function(element){
            angular.element(element).trigger('click');
        };

    }
);
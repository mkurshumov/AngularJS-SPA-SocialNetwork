'use strict';

app.controller('userController',
    function ($scope, $location, $routeParams, $timeout, userService, authService, notifyService, pageSize) {
        var startPostId;
        $scope.posts = [];

        $scope.login = function () {
            if (!authService.isLoggedIn()) {
                authService.login($scope.loginData,
                    function success() {
                        notifyService.showInfo('Login successful');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to login', err);
                    }
                )
            }
        };

        $scope.register = function () {
            if (!authService.isLoggedIn()) {
                authService.register($scope.registerData,
                    function success() {
                        notifyService.showInfo('Register successful');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to register', err);
                    }
                )
            }
        };

        $scope.logout = function () {
            if (authService.isLoggedIn()) {
                authService.logout(
                    function success() {
                        notifyService.showInfo('Logout successful');
                        $location.path('/');
                    },
                    function error(err) {
                        notifyService.showError('Failed to logout', err);
                    }
                )
            }
        };

        $scope.loadUserWall = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendWallByPages($routeParams['username'], startPostId, pageSize,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friend\'s wall', err);
                    }
                )
            }
        };

        $scope.searchUsersByName = function () {
            if (authService.isLoggedIn() && $scope.searchTerm.trim() !== "") {
                userService.searchUsersByName($scope.searchTerm,
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
            }, 200);
        };

        $scope.getUserPreviewData = function (username) {
            $scope.previewData = {};
            if (authService.isLoggedIn()) {
                userService.getUserPreviewData(username,
                    function success(data) {
                        $scope.previewData = {
                            image: data.profileImageData ? data.profileImageData : $scope.defaultProfileImage,
                            name: data.name,
                            username: data.username,
                            status: false
                        };

                        if (authService.getCurrentUser() !== data.username) {
                            if (data.isFriend) {
                                $scope.previewData.status = 'friend';
                            } else if (data.hasPendingRequest) {
                                $scope.previewData.status = 'pending';
                            } else {
                                $scope.previewData.status = 'invite';
                            }
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to show user preview', err);
                    }
                )
            }
        };

        $scope.getFriendsDetailedFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsDetailedFriends($routeParams['username'],
                    function success(data) {
                        data.userFriendsUrl = '#/friends/';
                        $scope.friendsList = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends\' friends list', err);
                    }
                )
            }
        };

        $scope.getFriendsPreviewFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsPreviewFriends($routeParams['username'],
                    function success(data) {
                        data.userFriendsUrl = '#/friends/';
                        $scope.friendsListPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load friends\' friends preview', err);
                    }
                )
            }
        };

        $scope.getUserFullData = function () {
            if (authService.isLoggedIn) {
                userService.getUserFullData($routeParams['username'],
                    function success(data) {
                        $scope.userFullData = data;
                        if (authService.getCurrentUser() !== data.username) {
                            if (data.isFriend) {
                                $scope.userFullData.status = 'friend';
                            } else if (data.hasPendingRequest) {
                                $scope.userFullData.status = 'pending';
                            } else {
                                $scope.userFullData.status = 'invite';
                            }
                        }

                        if ($scope.userFullData.isFriend && $location.path() === '/user/' + $routeParams['username'] + '/wall/') {
                            $scope.getFriendsPreviewFriends();
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user', err);
                    }
                )
            }
        }
    }
);
'use strict';

app.controller('userController',
    function ($scope, $location, $routeParams, $timeout, userService, authService, searchService, notifyService, PAGE_SIZE) {
        var startPostId;
        $scope.posts = [];
        $scope.scrollPause = false;

        $scope.login = function (loginData) {
            if (!authService.isLoggedIn()) {
                authService.loginRequest(loginData,
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

        $scope.register = function (registerData) {
            if (!authService.isLoggedIn()) {
                authService.registerRequest(registerData,
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
                authService.logoutRequest(
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
                if ($scope.scrollPause) {
                    return;
                }
                $scope.scrollPause = true;
                userService.getUserWall($routeParams['username'], PAGE_SIZE, startPostId,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                        $scope.scrollPause = false;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s wall', err);
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

        $scope.getWallOwner = function () {
            if (authService.isLoggedIn()) {
                userService.getUserFullData($routeParams['username'],
                    function success(data) {
                        $scope.wallOwner = data;
                        if (authService.getCurrentUser() !== $scope.wallOwner.username) {
                            if (data.isFriend) {
                                $scope.wallOwner.status = 'friend';
                            } else if (data.hasPendingRequest) {
                                $scope.wallOwner.status = 'pending';
                            } else {
                                $scope.wallOwner.status = 'invite';
                            }
                        }

                        if ($scope.wallOwner.isFriend && $location.path() === '/user/' + $routeParams['username'] + '/wall/') {
                            $scope.loadUserFriendsPreview();
                        }

                        if (!$scope.wallOwner.isFriend && $routeParams['username'] !== $scope.username && $location.path() === '/user/' + $routeParams['username'] + '/friends/') {
                            $location.path('/');
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user data', err)
                    }
                );
            }
        };

        $scope.loadUserPreview = function (username) {
            $scope.previewData = {};
            if (authService.isLoggedIn()) {
                userService.getUserPreviewData(username,
                    function success(data) {
                        $scope.previewData = {
                            image: data.profileImageData ? data.profileImageData : 'resources/defaultProfileImage.png',
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

        $scope.loadUserFriends = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsDetailedFriends($routeParams['username'],
                    function success(data) {
                        $scope.friends = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s friends list', err);
                    }
                )
            }
        };

        $scope.loadUserFriendsPreview = function () {
            if (authService.isLoggedIn()) {
                userService.getFriendsPreviewFriends($routeParams['username'],
                    function success(data) {
                        data.friendsUrl = '#/user/' + $routeParams['username'] + '/friends/';
                        $scope.friendsPreview = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s friends preview', err);
                    }
                )
            }
        };
    }
);
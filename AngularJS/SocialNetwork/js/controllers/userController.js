'use strict';

app.controller('userController',
    function ($scope, $location, $routeParams, $timeout, userService, authService, notifyService, PAGE_SIZE) {
        var startPostId;
        $scope.posts = [];

        $scope.login = function (loginData) {
            if (!authService.isLoggedIn()) {
                authService.login(loginData,
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
                authService.register(registerData,
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

        $scope.loadUserData = function () {
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
                            $scope.loadUserFriendsPreview();
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user', err);
                    }
                )
            }
        };

        $scope.loadUserDataPreview = function (username) {
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

        $scope.loadUserWall = function () {
            if (authService.isLoggedIn()) {
                userService.getUserWall($routeParams['username'], startPostId, PAGE_SIZE,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                    },
                    function error(err) {
                        notifyService.showError('Failed to load user\'s wall', err);
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
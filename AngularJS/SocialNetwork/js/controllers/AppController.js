'use strict';

app.controller('appController',
    function ($scope, $location, $routeParams, userService, authService, notifyService, defaultProfileImage, defaultCoverImage) {

        $scope.isLogged = function () {
            return authService.isLoggedIn();
        };

        $scope.username = authService.getCurrentUser();
        $scope.defaultProfileImage = defaultProfileImage;
        $scope.defaultCoverImage = defaultCoverImage;
        $scope.showFriendRequest = false;
        $scope.isOwnNewsFeed = $location.path() === '/';
        $scope.isOwnWall = authService.getCurrentUser() === $routeParams['username'];

        function getFriendRequests() {
            if (authService.isLoggedIn()) {
                userService.getFriendRequests(
                    function success(data) {
                        $scope.pendingRequests = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to show friends requests', err);
                    }
                )
            }
        }

        $scope.approveFriendRequest = function (request) {
            if (authService.isLoggedIn()) {
                userService.approveFriendRequest(request.id,
                    function success() {
                        var index = $scope.pendingRequests.indexOf(request);
                        $scope.pendingRequests.splice(index, 1);
                        notifyService.showInfo('Friend request approved');
                    },
                    function error(err) {
                        notifyService.showError('Failed to approve friend request', err);
                    }
                )
            }
        };

        $scope.rejectFriendRequest = function (request) {
            if (authService.isLoggedIn()) {
                userService.approveFriendRequest(request.id,
                    function success() {
                        var index = $scope.pendingRequests.indexOf(request);
                        $scope.pendingRequests.splice(index, 1);
                        notifyService.showInfo('Friend request rejected');
                    },
                    function error(err) {
                        notifyService.showError('Failed to reject friend request', err);
                    }
                )
            }
        };

        getFriendRequests();
    }
);
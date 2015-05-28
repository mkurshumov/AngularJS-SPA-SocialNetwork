'use strict';

app.controller('appController',
    function ($scope, $location, $interval, $routeParams, userService, authService, notifyService) {

        $scope.isLoggedIn = function () {
            return authService.isLoggedIn();
        };

        $scope.username = authService.getCurrentUser();
        $scope.showFriendRequest = false;
        $scope.isOwnNewsFeed = $location.path() === '/';
        $scope.isOwnWall = authService.getCurrentUser() === $routeParams['username'];

        function getFriendRequests() {
            if (authService.isLoggedIn()) {
                userService.getFriendRequests(
                    function success(data) {
                        $scope.friendRequests = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to show friends requests', err);
                    }
                )
            }
        }

        $scope.approveFriend = function (request) {
            if (authService.isLoggedIn()) {
                userService.approveFriendRequest(request.id,
                    function success() {
                        var index = $scope.friendRequests.indexOf(request);
                        $scope.friendRequests.splice(index, 1);
                        notifyService.showInfo('Friend request successfully approved');
                    },
                    function error(err) {
                        notifyService.showError('Failed to approve friend request', err);
                    }
                )
            }
        };

        $scope.rejectFriend = function (request) {
            if (authService.isLoggedIn()) {
                userService.rejectFriendRequest(request.id,
                    function success() {
                        var index = $scope.friendRequests.indexOf(request);
                        $scope.friendRequests.splice(index, 1);
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
'use strict';

app.controller('PostsController',
    function ($scope, $rootScope, $location, postService, notifyService) {
        $scope.getNewsFeedPages = function () {
            postService.getNewsFeedPages(
                function success(data) {
                    $scope.newsFeed = data;
                },
                function error(err) {
                    notifyService.showError('Error loading news feed', err);
                }
            );
        };

        $scope.deletePost = function (id) {
            postService.deletePostById(id,
                function success() {
                    notifyService.showInfo('Successfully deleted post!');
                    $location.path('/user/home');
                },
                function error(err) {
                    notifyService.showError('Failed to delete post!', err);
                }
            )
        };

        $scope.editPost = function (id) {
            postService.editPost(id,
                function success() {
                    notifyService.showInfo('Successfully edited post!');
                    $location.path('/user/home');
                },
                function error(err) {
                    notifyService.showError('Failed to edit post!', err);
                }
            )
        }

    }
);
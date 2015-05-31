'use strict';

app.controller('postsController',
    function ($scope, $routeParams, $location, userService, authService, postsService, notifyService) {

        $scope.addPost = function () {
            $scope.postData.username = $routeParams['username'];
            if (authService.isLoggedIn()) {
                postsService.addPostRequest($scope.postData,
                    function (data) {
                        $scope.postData.postContent = "";
                        $scope.posts.unshift(data);
                        notifyService.showInfo('Post successfully added');
                    },
                    function error(err) {
                        $scope.postData.postContent = "";
                        notifyService.showError('Failed to add post', err);
                    }
                )
            }
        };

        $scope.editPost = function (post) {
            if (authService.isLoggedIn()) {
                postsService.editPostRequest(post.id, post.newPostContent,
                    function success() {
                        post.postContent = post.newPostContent;
                        notifyService.showInfo('Post successfully edited');
                    },
                    function error(err) {
                        notifyService.showError('Failed to edit post!', err);
                    }
                )
            }
        };

        $scope.deletePost = function (post) {
            if (authService.isLoggedIn()) {
                postsService.deletePostRequest(post.id,
                    function success() {
                        var index = $scope.posts.indexOf(post);
                        $scope.posts.splice(index, 1);
                        notifyService.showInfo('Post successfully removed');
                    },
                    function error(err) {
                        notifyService.showError('Failed to remove post!', err);
                    }
                )
            }
        };

        $scope.likePost = function (post) {
            if (authService.isLoggedIn()) {
                postsService.likePostRequest(post.id,
                    function success() {
                        post.liked = true;
                        post.likesCount++;
                        notifyService.showInfo('Post successfully liked');
                    },
                    function error(err) {
                        notifyService.showError('Failed to like post', err);
                    }
                )
            }
        };

        $scope.unlikePost = function (post) {
            if (authService.isLoggedIn()) {
                postsService.unlikePostRequest(post.id,
                    function success() {
                        post.liked = false;
                        post.likesCount--;
                        notifyService.showInfo('Post successfully disliked');
                    },
                    function error(err) {
                        notifyService.showError('Failed to dislike post', err);
                    }
                )
            }
        };
    }
);

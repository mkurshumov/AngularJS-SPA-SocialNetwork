'use strict';

app.controller('postsController',
    function ($scope, $routeParams, $location, userService, authService, postsService, notifyService, PAGE_SIZE) {

        var startPostId = '';
        $scope.posts = [];

        $scope.loadNewsFeed = function () {
            if (authService.isLoggedIn()) {
                postsService.getNewsFeed(PAGE_SIZE, startPostId,
                    function success(data) {
                        $scope.posts = $scope.posts.concat(data);
                        if ($scope.posts.length > 0) {
                            startPostId = $scope.posts[$scope.posts.length - 1].id;
                        }
                        $scope.isNewsFeed = true;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load News Feed', err);
                    }
                )
            }
        };

        $scope.addPost = function () {
            $scope.postData.username = $routeParams['username'];
            if (authService.isLoggedIn()) {
                postsService.addNewPost($scope.postData,
                    function (data) {
                        $scope.postData.postContent = '';
                        $scope.posts.unshift(data);
                        notifyService.showInfo('Post successfully added');
                    },
                    function error(err) {
                        notifyService.showError('Failed to add post', err);
                    }
                )
            }
        };

        $scope.editPost = function (post) {
            if (authService.isLoggedIn()) {
                postsService.editPost(post.id, post.newPostContent,
                    function success() {
                        post.postContent = post.newPostContent;
                        notifyService.showInfo('Post successfully removed');
                    },
                    function error(err) {
                        notifyService.showError('Failed to remove post!', err);
                    }
                )
            }
        };

        $scope.deletePost = function (post) {
            if (authService.isLoggedIn()) {
                postsService.deletePostById(post.id,
                    function success() {
                        var index =  $scope.posts.indexOf(post);
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
                postsService.likePost(post.id,
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
                postsService.unlikePost(post.id,
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
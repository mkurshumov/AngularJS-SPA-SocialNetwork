'use strict';

app.controller('postController',
    function ($scope, $routeParams, $location, userService, authService, postService, notifyService) {

        $scope.addPost = function () {
            $scope.postData.username = $routeParams['username'];
            if (authService.isLoggedIn()) {
                postService.addNewPost($scope.postData,
                    function (data) {
                        $scope.postData.postContent = "";
                        $scope.posts.unshift(data);
                        notifyService.showInfo('Post successfully added');
                    },
                    function error(err) {
                        notifyService.showError('Failed to add post', err);
                    }
                )
            }
        };

        $scope.likePost = function (post) {
            if (authService.isLoggedIn()) {
                postService.likePost(post.id,
                    function success() {
                        notifyService.showInfo('Post successfully liked');
                        post.liked = true;
                        post.likesCount++;
                    },
                    function error(err) {
                        notifyService.showError('Failed to like post', err);
                    }
                )
            }
        };

        $scope.unlikePost = function (post) {
            if (authService.isLoggedIn()) {
                postService.unlikePost(post.id,
                    function success() {
                        notifyService.showInfo('Post successfully disliked');
                        post.liked = false;
                        post.likesCount--;
                    },
                    function error(err) {
                        notifyService.showError('Failed to dislike post', err);
                    }
                )
            }
        };

        //$scope.deletePost = function (id) {
        //    postService.deletePostById(id,
        //        function success() {
        //            notifyService.showInfo('Successfully deleted post!');
        //            $location.path('/user/home');
        //        },
        //        function error(err) {
        //            notifyService.showError('Failed to delete post!', err);
        //        }
        //    )
        //};
        //
        //$scope.editPost = function (id) {
        //    postService.editPost(id,
        //        function success() {
        //            notifyService.showInfo('Successfully edited post!');
        //            $location.path('/user/home');
        //        },
        //        function error(err) {
        //            notifyService.showError('Failed to edit post!', err);
        //        }
        //    )
        //}

    }
);
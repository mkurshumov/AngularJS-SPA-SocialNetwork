'use strict';

app.controller('commentController',
    function ($scope, authService, postService, notifyService) {

        $scope.addCommentToPost = function (post) {
            if (authService.isLoggedIn()) {
                postService.addCommentToPost(post.id, $scope.commentData,
                    function success(data) {
                        $scope.commentData.commentContent = '';
                        post.comments.unshift(data);
                        post.totalCommentsCount++;
                        notifyService.showInfo('Comment successfully added');
                    },
                    function error(err) {
                        notifyService.showError('Failed to add comment', err);
                    }
                )
            }
        };

        $scope.getPostComments = function (post) {
            if (authService.isLoggedIn()) {
                postService.getPostComments(post.id,
                    function success(data) {
                        post.comments = data;
                    },
                    function error(err) {
                        notifyService.showError('Failed to load post comments', err);
                    }
                )
            }
        };

        $scope.likeComment = function (post, comment) {
            if (authService.isLoggedIn()) {
                postService.likeComment(post.id, comment.id,
                    function success() {
                        notifyService.showInfo('Comment successfully liked');
                        comment.liked = true;
                        comment.likesCount++;
                    },
                    function error(err) {
                        notifyService.showError('Failed to like comment', err);
                    }
                )
            }
        };

        $scope.unlikeComment = function (post, comment) {
            if (authService.isLoggedIn()) {
                postService.unlikeComment(post.id, comment.id,
                    function success() {
                        notifyService.showInfo('Comment successfully disliked');
                        comment.liked = false;
                        comment.likesCount--;
                    },
                    function error(err) {
                        notifyService.showError('Failed to dislike comment', err);
                    }
                )
            }
        };
    }
);
'use strict';

app.factory('commentService',
    function ($http, BASE_URL, authService) {
        return {
            getPostComments: function (postId, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'posts/' + postId + '/comments',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            addCommentToPost: function (postId, data, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'posts/' + postId + '/comments',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            editPostComment: function (postId, commentId, commentContent, success, error) {
                var commentData = {'commentContent': commentContent}
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'posts/' + postId + '/comments/' + commentId,
                    headers: authService.getAuthHeaders(),
                    data: commentData
                };
                $http(request).success(success).error(error);
            },

            deletePostComment: function (postId, commentId, success, error) {
                var request = {
                    method: 'DELETE',
                    url: BASE_URL + 'posts/' + postId + '/comments/' + commentId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            likePostComment: function (postId, commentId, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            unlikePostComment: function (postId, commentId, success, error) {
                var request = {
                    method: 'DELETE',
                    url: BASE_URL + 'posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
        },

            getCommentDetailedLikes: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getCommentPreviewLikes: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'posts/' + postId + '/comments/' + commentId + '/likes/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            }

        }
    }
);
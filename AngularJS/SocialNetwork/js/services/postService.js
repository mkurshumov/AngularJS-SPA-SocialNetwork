'use strict';

app.factory('postService',
    function ($http, baseServiceUrl, authService) {
        return {
            getNewsFeedPages: function (startPostId, pageSize, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/me/feed?StartPostId=' + startPostId + '&PageSize=' + pageSize,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostById: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/Posts/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostDetailedLikes: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/Posts/' + id + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostPreviewLikes: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/Posts/' + id + '/likes/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostComments: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/posts/' + id + '/comments',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getCommentDetailedLikes: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getCommentPreviewLikes: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId + '/likes/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            likePost: function (id, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/Posts/' + id + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            addCommentToPost: function (id, data, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/posts/' + id + '/comments',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            likeComment: function (postId, commentId, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            addNewPost: function (postData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/posts',
                    headers: authService.getAuthHeaders(),
                    data: postData
                };
                $http(request).success(success).error(error);
            },

            editPost: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/Posts/' + postId,
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            editPostComment: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId,
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            deletePostById: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/Posts/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            unlikePost: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/Posts/' + id + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            deletePostComment: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            unlikeComment: function (postId, commentId, data, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/posts/' + postId + '/comments/' + commentId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            }
        }
    }
);

'use strict';

app.factory('postsService',
    function ($http, BASE_URL, authService) {
        return {
            getNewsFeed: function (pageSize, startPostId, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'me/feed?StartPostId=' + startPostId + '&PageSize=' + pageSize,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            likePost: function (postId, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'Posts/' + postId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            unlikePost: function (postId, success, error) {
                var request = {
                    method: 'DELETE',
                    url: BASE_URL + 'Posts/' + postId + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            addPost: function (postData, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'users/posts',
                    headers: authService.getAuthHeaders(),
                    data: postData
                };
                $http(request).success(success).error(error);
            },

            editPost: function (postId, data, success, error) {
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'Posts/' + postId,
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            deletePost: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: BASE_URL + 'Posts/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostById: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Posts/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostDetailedLikes: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Posts/' + id + '/likes',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getPostPreviewLikes: function (id, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Posts/' + id + '/likes/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            }
        }
    }
);
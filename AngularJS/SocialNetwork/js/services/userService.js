'use strict';

app.factory('userService',
    function ($http, BASE_URL, authService) {
        return {
            getDataAboutMe: function (success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'me',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            editProfile: function(data, success, error) {
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'me',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            changePassword: function(data, success, error) {
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'me/changepassword',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            getUserFullData: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/' + user,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getUserPreviewData: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/' + user + '/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendsDetailedFriends: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/' + user + '/friends',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendsPreviewFriends: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/' + user + '/friends/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getUserWall: function (user, pageSize, startPostId, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/' + user + '/wall?StartPostId=' + (startPostId ? "=" + startPostId : "") + '&PageSize=' + pageSize,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getOwnFriends: function (success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'me/friends',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getOwnFriendsPreview: function (success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'me/friends/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendRequests: function (success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'me/requests',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            sendFriendRequest: function (user, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'me/requests/' + user,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            approveFriendRequest: function (requestId, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'me/requests/' + requestId + '?status=approve',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            rejectFriendRequest: function (requestId, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'me/requests/' + requestId + '?status=rejected',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            }
        }
    }
);

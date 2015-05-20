'use strict';

app.factory('userService',
    function ($http, baseServiceUrl, authService) {
        return {
            searchUsersByName: function (tag, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/search?searchTerm=' + tag,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getUserFullData: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getUserPreviewData: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user + '/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendsDetailedFriends: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user + '/friends',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendsPreviewFriends: function (user, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user + '/preview',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendWallByPages: function (user, params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/users/' + user + '/wall',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).success(success).error(error);
            },

            getDataAboutMe: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/me',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getOwnFriends: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/me/friends',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            getFriendRequests: function (success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/me/requests',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            sendFriendRequest: function (user, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + user,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            approveFriendRequest: function (requestId, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + requestId + '?status=approve',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            rejectFriendRequest: function (requestId, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/me/requests/' + requestId + '?status=rejected',
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            editProfile: function(data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            },

            changePassword: function(data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/me/changepassword',
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            }
        }
    }
);

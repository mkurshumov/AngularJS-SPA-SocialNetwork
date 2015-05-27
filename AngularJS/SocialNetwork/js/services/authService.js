'use strict';

app.factory('authService',
    function ($http, BASE_URL) {
        return {
            loginRequest: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'users/login',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['accessToken'] = JSON.stringify(data.access_token);
                    sessionStorage['accessToken'] = JSON.parse(sessionStorage['accessToken']);
                    sessionStorage['currentUser'] = JSON.stringify(data.userName);
                    sessionStorage['currentUser'] = JSON.parse(sessionStorage['currentUser']);
                    success(data);
                }).error(error);
            },

            registerRequest: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'users/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['accessToken'] = JSON.stringify(data.access_token);
                    sessionStorage['accessToken'] = JSON.parse(sessionStorage['accessToken']);
                    sessionStorage['currentUser'] = JSON.stringify(data.userName);
                    sessionStorage['currentUser'] = JSON.parse(sessionStorage['currentUser']);
                    success(data);
                }).error(error)
            },

            logoutRequest: function(success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'users/logout',
                    headers: this.getAuthHeaders()
                };
                $http(request).success(function() {
                    delete sessionStorage['currentUser'];
                    delete sessionStorage['accessToken'];
                }).error(error);
            },

            getCurrentUser : function() {
                var currentUser = sessionStorage['currentUser'];
                if (currentUser) {
                    return sessionStorage['currentUser'];
                }
            },

            getAccessToken : function() {
                var accessToken = sessionStorage['accessToken'];
                if (accessToken) {
                    return sessionStorage['accessToken'];
                }
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser'] !== undefined;
            },

            getAuthHeaders : function() {
                var headers = {};
                var accessToken = this.getAccessToken();
                if(accessToken) {
                    headers['Authorization'] = 'Bearer ' + accessToken;
                }
                return headers;
            }
        }
    }
);

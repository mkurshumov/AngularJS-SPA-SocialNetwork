'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/login',
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

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/register',
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

            logout: function(success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/logout',
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
                return this.getCurrentUser() != undefined;
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

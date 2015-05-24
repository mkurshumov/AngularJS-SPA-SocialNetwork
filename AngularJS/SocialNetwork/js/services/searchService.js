'use strict';

app.factory('searchService',
    function ($http, BASE_URL, authService) {
        return {
            searchUser: function (searchTerm, success, error) {
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'users/search?searchTerm=' + searchTerm,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            }
        }
    }
);
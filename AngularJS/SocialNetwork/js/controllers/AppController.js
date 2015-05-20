'use strict';

// The AppController holds the presentation logic for the entire app (common for all screens)
app.controller('AppController',
    function ($http, $scope, $location, authService) {
        // Put the authService in the $scope to make it accessible from all screens
        $scope.authService = authService;
        $scope.location = $location;
        //$scope.userService = userService;
        //$scope.userSearch = function () {
        //    userService.searchUsersByName();
        //}

    }
);
'use strict';

app.controller('LoginController',
function ($scope, $rootScope, $location, authService) {
    $scope.login = function (userData) {
        authService.login(userData,
        function success() {
            //notify success
            //check if admin
        },
        function error(err) {
            //notify error
        })
    };
});
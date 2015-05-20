'use strict';

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.login = function (userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo('Login Successful');
                    $location.path('/user/home');
                },
                function error(err) {
                    notifyService.showError('Login Failed', err);
                }
            )
        };
    }
);
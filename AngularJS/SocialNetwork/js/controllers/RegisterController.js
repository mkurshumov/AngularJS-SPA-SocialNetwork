'use strict';

app.controller('RegisterController',
    function ($scope, $location, authService, notifyService) {
        $scope.register = function (userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo('Registered Successfully');
                    $location.path('/user/home');
                },
                function error(err) {
                    notifyService.showError('Register Failed', err);
                }
            )
        };
    }
);
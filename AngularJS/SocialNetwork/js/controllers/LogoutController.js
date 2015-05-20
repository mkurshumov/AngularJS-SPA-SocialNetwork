'use strict';

app.controller('LogoutController',
    function ($scope, $location, authService, notifyService) {
        $scope.logout = function (userData) {
            authService.logout(userData,
                function success() {
                    notifyService.showInfo('Logout Successful');
                    $location.path('/');
                },
                function error(err) {
                    notifyService.showError('Logout Failed', err);
                }
            )
        };
    }
);
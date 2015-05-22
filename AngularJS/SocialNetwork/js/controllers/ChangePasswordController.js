'use strict';

app.controller('ChangePasswordController',
    function ($scope, $location, userService, notifyService) {
        $scope.changePassword = function(data) {
            userService.changePassword(data,
                function success() {
                    notifyService.showInfo("Successfully changed password!");
                    $location.path('/user/changepassword/');
                },
                function error(err) {
                    notifyService.showError("Error while changing password", err);
                }
            )
        };
    }
);
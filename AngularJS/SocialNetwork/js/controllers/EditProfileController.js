'use strict';

app.controller('EditProfileController',
    function ($scope, $location, userService, notifyService) {
        $scope.getDataAboutMe = function() {
            userService.getDataAboutMe(
                function success(data) {
                    $scope.userData = data;
                },
                function error(err) {
                    notifyService.showError("An error occurred while downloading user data", err);
                }
            )
        };

        $scope.editProfile = function(data) {
            userService.editProfile(data,
                function success() {
                    notifyService.showInfo("Successfully edited user!");
                    $location.path('/user/profile/');
                },
                function error(err) {
                    notifyService.showError("Error while editing user", err);
                })
        };

        $scope.profileImageSelected = function(fileInputField) {
            delete $scope.userData.profileImageData;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.userData.profileImageData = reader.result;
                    $(".profile-image-box").html("<img src='" + reader.result + "'>");
                };
                $scope.userData.changeProfileImage = false;
                reader.readAsDataURL(file);
            } else {
                $(".profile-image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.coverImageSelected = function(fileInputField) {
            delete $scope.userData.coverImageData;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.userData.coverImageData = reader.result;
                    $(".cover-image-box").html("<img src='" + reader.result + "'>");
                };
                $scope.userData.changeCoverImage = false;
                reader.readAsDataURL(file);
            } else {
                $(".cover-image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.changeProfileImage = function() {
            $scope.userData.changeProfileImage = true;
        };

        $scope.changeCoverImage = function() {
            $scope.userData.changeCoverImage = true;
        };

        $scope.deleteProfileImage = function() {
            $scope.userData.changeProfileImage = true;
            delete $scope.userData.profileImageData;
        };

        $scope.deleteCoverImage = function() {
            $scope.userData.changeCoverImage = true;
            delete $scope.userData.coverImageData;
        };

        $scope.getDataAboutMe();
    }
);

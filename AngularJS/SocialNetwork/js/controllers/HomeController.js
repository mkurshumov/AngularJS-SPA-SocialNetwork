'use strict';

app.controller('HomeController',
    function ($scope, notifyService, pageSize, postService) {
        //$scope.newsFeedParams = {
        //    'postId' : 1,
        //    'pageSize' : pageSize
        //};

        $scope.reloadNewsFeed = function () {
            postService.getNewsFeedPages(
                function success(data) {
                    $scope.newsFeed = data;
                },
                function error(err) {
                    notifyService.showError('Error loading news feed', err);
                }
            );
        };

        $scope.reloadNewsFeed();
    }
);

//GET api/Ads?CategoryId={CategoryId}&TownId={TownId}&StartPage={StartPage}&PageSize={PageSize}
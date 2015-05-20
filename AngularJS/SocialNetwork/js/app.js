'use strict';

var app = angular.module('app', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net');
app.constant('pagesize', 5);


app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/login-register.html'
    });

    $routeProvider.when('/user/home', {
        templateUrl: 'templates/home.html'
        //controller: 'HomeController'
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/user/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads/', {
        templateUrl: 'templates/user/my-ads.html',
        controller: 'UserGetMyAdsController'
    });

    $routeProvider.when('/user/ads/edit', {
        templateUrl: 'templates/user/edit-my-ad.html',
        controller: 'EditAdController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'templates/user/edit-profile.html',
        controller: 'EditProfileController'
    });

    $routeProvider.when('/admin/home', {
        templateUrl: 'templates/admin/admin-ads.html',
        controller: 'AdminAdController'
    });

    $routeProvider.when('/admin/ads/edit', {
        templateUrl: 'templates/admin/admin-edit-ad.html',
        controller: 'AdminEditAdController'
    });

    $routeProvider.when('/admin/users/list', {
        templateUrl: 'templates/admin/admin-list-users.html',
        controller: 'AdminListUsersController'
    });

    $routeProvider.when('/admin/users/edit/', {
        templateUrl: 'templates/admin/admin-edit-profile.html',
        controller: 'AdminEditProfileController'
    });

    $routeProvider.when('/admin/categories/list/', {
        templateUrl: 'templates/admin/admin-list-categories.html',
        controller: 'AdminListCategoriesController'
    });

    $routeProvider.when('/admin/towns/list/', {
        templateUrl: 'templates/admin/admin-list-towns.html',
        controller: 'AdminListTownsController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});
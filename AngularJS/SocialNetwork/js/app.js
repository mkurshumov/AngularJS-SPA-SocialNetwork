'use strict';

var app = angular
    .module('app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .constant({
        'BASE_URL': 'http://softuni-social-network.azurewebsites.net/api/',
        'PAGE_SIZE': 5,
        'DEFAULT_PROFILE_IMAGE': 'data:image/png;base64',
        'DEFAULT_COVER_IMAGE': 'data:image/png;base64'
    })
    .config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'appController'
        })
        .when('/login/', {
            templateUrl: 'templates/login.html',
            controller: 'userController'
        })
        .when('/register/', {
            templateUrl: 'templates/register.html',
            controller: 'userController'
        })
        .when('/user/:username/wall', {
            templateUrl: 'templates/wall.html',
            controller: 'appController'
        })
        .when('/settings/edit/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'profileController'
        })
        .when('/settings/edit/password', {
            templateUrl: 'templates/change-password.html',
            controller: 'profileController'
        })
        .when('/friends/', {
            templateUrl: 'templates/friends.html',
            controller: 'appController'
        })
        .when('/friends/requests', {
            templateUrl: 'templates/friends-requests.html',
            controller: 'appController'
        })
        .otherwise({redirectTo: '/'})
    }
);
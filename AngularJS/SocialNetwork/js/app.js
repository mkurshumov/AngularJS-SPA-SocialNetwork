'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'infinite-scroll']);

app.constant({
    'BASE_URL': 'http://softuni-social-network.azurewebsites.net/api/',
    'PAGE_SIZE': 5,
    'DEFAULT_PROFILE_IMAGE': 'data:image/png;base64',
    'DEFAULT_COVER_IMAGE': 'data:image/png;base64'
});

app.config(function ($routeProvider) {

    $routeProvider
        .when('/login/', {
            templateUrl: 'templates/login.html',
            controller: 'appController'
        })
        .when('/register/', {
            templateUrl: 'templates/register.html',
            controller: 'appController'
        })
        .when('/user/:username/wall', {
            templateUrl: 'templates/wall.html',
            controller: 'appController'
        })
        .when('/settings/edit/info', {
            templateUrl: 'templates/profile.html',
            controller: 'appController'
        })
        .when('/settings/edit/password', {
            templateUrl: 'templates/password.html',
            controller: 'appController'
        })
        .when('/friends/', {
            templateUrl: 'templates/friends.html',
            controller: 'appController'
        })
        .when('/friends/requests', {
            templateUrl: 'templates/friends-requests.html',
            controller: 'appController'
        })
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'appController'
        })
        .otherwise({redirectTo: '/'})
});
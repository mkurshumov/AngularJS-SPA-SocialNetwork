'use strict';

var app = angular
    .module('app', ['ngRoute'])
    .constant({
        'BASE_URL': 'http://softuni-social-network.azurewebsites.net/api/',
        'PAGE_SIZE': 4
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
            templateUrl: 'templates/wall.html'
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
            controller: 'profileController'
        })
        .when('/friends/requests', {
            templateUrl: 'templates/friends-requests.html',
            controller: 'appController'
        })
        .otherwise({redirectTo: '/'})
    }
);
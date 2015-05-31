'use strict';

var app = angular
    .module('app', ['ngRoute', 'infinite-scroll'])
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
            controller: 'appController'
        })
        .when('/register/', {
            templateUrl: 'templates/register.html',
            controller: 'appController'
        })
        .when('/settings/edit/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'appController'
        })
        .when('/settings/edit/password', {
            templateUrl: 'templates/change-password.html',
            controller: 'appController'
        })
        .when('/user/:username/wall', {
            templateUrl: 'templates/wall.html',
            controller: 'appController'
        })
        .when('/user/:username/friends/', {
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
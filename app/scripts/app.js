'use strict';

/**
 * @ngdoc overview
 * @name hideApp
 * @description
 * # hideApp
 *
 * Main module of the application.
 */
angular
  .module('hideApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]
)
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
  });

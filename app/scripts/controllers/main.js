'use strict';

/**
 * @ngdoc function
 * @name hideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hideApp
 */
angular.module('hideApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

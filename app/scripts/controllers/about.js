'use strict';

/**
 * @ngdoc function
 * @name hideApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hideApp
 */
angular.module('hideApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

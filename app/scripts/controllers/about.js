'use strict';

/**
 * @ngdoc function
 * @name hideApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hideApp
 */
angular.module('hideApp')
  .controller('AboutCtrl', function ($scope,membersServ) {
  	var promise = membersServ.getMembers();
  	promise.then(function(data) {
    	$scope.members = data.data;
  	})

 });

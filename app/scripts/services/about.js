angular.module('hideApp').service('membersServ', function($http,$q) {
  var deferred = $q.defer();

  $http.get('scripts/json/about.json').then(function(data){
     deferred.resolve(data);
  });

  this.getMembers = function (){
      return deferred.promise;
  }
});
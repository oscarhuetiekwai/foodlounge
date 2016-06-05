angular.module('app.services', [])
.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

})
.factory('Markers', function($http) {

  var markers = [];

  return {
    getMarkers: function(){

      return $http.post("http://api.gaekjuhub.com/stores").then(function(response){
          markers = response;
          return markers;
      });

    }
  }
})

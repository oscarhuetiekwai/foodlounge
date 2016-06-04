angular.module('app.controllers', [])

.controller('mapCtrl', function($scope, $state, $cordovaGeolocation) {
  /* user map start */
  var options = {timeout: 10000, enableHighAccuracy: true};

 $cordovaGeolocation.getCurrentPosition(options).then(function(position){

   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

   var mapOptions = {
     center: latLng,
     zoom: 15,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   $scope.map = new google.maps.Map(document.getElementById("fl_map"), mapOptions);
   google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

});

 }, function(error){
   console.log("Could not get location");
 });

  /* user map end */

})

.controller('favouriteCtrl', function($scope) {

})

.controller('orderHistoryCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('signupCtrl', function($scope) {

})

.controller('profileSettingCtrl', function($scope) {

})

.controller('foodStallCtrl', function($scope) {

})

.controller('orderNowCtrl', function($scope) {

})

.controller('loungeCtrl', function($scope) {

})

.controller('checkOutCtrl', function($scope) {

})

.controller('receiptCtrl', function($scope) {

})

.controller('orderListCtrl', function($scope) {

})

.controller('foodStallReviewsCtrl', function($scope) {

})

.controller('loungeCommentCtrl', function($scope) {

})

.controller('bookingCtrl', function($scope) {

})

.controller('storeCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

 $cordovaGeolocation.getCurrentPosition(options).then(function(position){

   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

   var mapOptions = {
     center: latLng,
     zoom: 15,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   $scope.map = new google.maps.Map(document.getElementById("storemap"), mapOptions);
   google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

});

 }, function(error){
   console.log("Could not get location");
 });

})

.controller('menu2Ctrl', function($scope) {

})

.controller('scheduleCtrl', function($scope) {

})

.controller('reviewsCtrl', function($scope) {

})

.controller('addMenuItemCtrl', function($scope,$cordovaCamera) {
/*add menu item start */
document.addEventListener("deviceready", function () {

      $scope.takePicture = function() {
          var options = {
              quality : 75,
              destinationType : Camera.DestinationType.DATA_URL,
              sourceType : Camera.PictureSourceType.CAMERA,
              allowEdit : true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 300,
              targetHeight: 300,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
          }, function(err) {
              // An error occured. Show a message to the user
          });
      }
}, false);
/*add menu item end */

})

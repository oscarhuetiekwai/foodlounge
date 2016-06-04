angular.module('app.controllers', [])

.controller('mapCtrl', function($scope,$http, $state, $cordovaGeolocation,$cordovaLaunchNavigator,$timeout) {
  /*shake start */
  // Device Ready

document.addEventListener("deviceready", function() {
        var onShake = function() {
          $http({method : 'POST',	url : 'http://api.gaekjuhub.com/menus/shakeit',withCredentials: true,headers: {'Content-Type': 'application/json; charset=utf-8'}})
          .then(function successCallback(response) {
          $scope.shakedata = response.data.data;
          console.log('shake data: ',  $scope.shakedata);
          },
          function errorCallback(response) {
          });

        };




    // Start watching for shake gestures and call "onShake"
    // with a shake sensitivity of 40 (optional, default 30)
    shake.startWatch(onShake, 30);
});
  /*shake end */

  /*user navigation to shop start*/
  $scope.launchNavigator = function() {
    console.log('launch navigation');
    var destination = [3.141760, 101.711077];
	var start = "petaling jaya";
    $cordovaLaunchNavigator.navigate(destination, start).then(function() {

    }, function (err) {
      console.error(err);
      console.log('error!!');
    });
  };
  /*user navigation to shop end*/
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

.controller('orderListCtrl', function($scope,$cordovaBarcodeScanner) {

  document.addEventListener("deviceready", function () {
    /*table scan qrcode start*/

$scope.scanTable = function() {
  console.log('qrcode scanning.....');
    $cordovaBarcodeScanner
      .scan()
      .then(function(barcodeData) {
        console.log('tableNo:',barcodeData);
        // Success! Barcode data is here
      }, function(error) {
        // An error occurred
      });

}
  }, false);

  /*table scan qrcode end*/

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

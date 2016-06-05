angular.module('app.controllers', [])

.controller('tabsController', function($scope) {
	$scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));
	if($scope.login_session_data.user_level_id == 0) {
	  $scope.showSeller = true;
			  $scope.showBuyer = false;
	} else {
	  $scope.showBuyer = true;
		  $scope.showSeller = false;
	}

})
.controller('mapCtrl', function($scope,$http, $state,$cordovaGeolocation,$cordovaLaunchNavigator,$timeout, $ionicModal,Markers) {
  	$scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));
		console.log('login data: ',$scope.login_session_data);
		//user_level_id = 0
	//load stores
	console.log(Markers.getMarkers());
  /*shake start */
  // Device Ready

document.addEventListener("deviceready", function() {
        var onShake = function() {
          $http({method : 'POST',	url : 'http://api.gaekjuhub.com/menus/shakeit',withCredentials: true,headers: {'Content-Type': 'application/json; charset=utf-8'}})
          .then(function successCallback(response) {
          $scope.shakedata = response.data.data;
          console.log('shake data: ',  $scope.shakedata);
					$scope.modal.show();
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

	 var image = {
    url: 'images/shop.png',
     size: new google.maps.Size(30, 30),
     origin: new google.maps.Point(0, 0),
     anchor: new google.maps.Point(30, 30)
};


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
	/*===============================================*/
	$http.post("http://api.gaekjuhub.com/stores").then(function(response){
		$scope.stores = response.data.data;
		var maxStore = response.data.data.length;
		   var latLng2 = new google.maps.LatLng(3.1217780, 101.595104);
		   var latLng3 = new google.maps.LatLng(3.142579, 101.710465);
		   var latLng4 = new google.maps.LatLng(3.142643, 101.710777);
		   var latLng5 = new google.maps.LatLng(3.142569, 101.710227);
		var marker2 = new google.maps.Marker({
				map: $scope.map,
				icon: image,
				animation: google.maps.Animation.DROP,
				position: latLng2
		});
		var marker3 = new google.maps.Marker({
				map: $scope.map,
				icon: image,
				animation: google.maps.Animation.DROP,
				position: latLng3
		});

		var marker4 = new google.maps.Marker({
				map: $scope.map,
				icon: image,
				animation: google.maps.Animation.DROP,
				position: latLng4
		});

		var marker5 = new google.maps.Marker({
				map: $scope.map,
				icon: image,
				animation: google.maps.Animation.DROP,
				position: latLng5
		});


		google.maps.event.addListener(marker, 'click', function () {
				infoWindow.open($scope.map, marker);
		});

	});
	/*===============================================*/

  var infoWindow = new google.maps.InfoWindow({
      content: "You are here.. hungry.."
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

});


 }, function(error){
   console.log("Could not get location");
 });

  /* user map end */

  // oscar-for modal after shaking //
  $ionicModal.fromTemplateUrl('templates/shakeresult.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

})

.controller('favouriteCtrl', function($scope) {

})


.controller('orderHistoryCtrl', function($scope,$http) {

$http({
 method : 'POST',url : 'http://api.gaekjuhub.com/stores',
  withCredentials: true,
  headers: {'Content-Type': 'application/json; charset=utf-8'}
}).then(function successCallback(response) {
 $scope.stores =response.data.data;
 console.log('stores : ',response.data.data);
},
function errorCallback(response) {

});
})


.controller('loginCtrl', function($scope,$http,$state) {

$scope.data = {};

$scope.login = function() {

$http({method : 'POST',url : 'http://api.gaekjuhub.com/users/login',data : {'email' : $scope.data.email,'password' : $scope.data.password},
headers: {'Content-Type': 'application/json; charset=utf-8'}
}).then(function successCallback(response) {
//console.log(response.data.data);
if(response.data.code == 0){
localStorage.setItem('userdata', JSON.stringify(response.data.data));
$state.go('tabsController.map');
}else{
$scope.msg = response.data.data.msg;
$state.go('login');
}

//$state.go('tabsController.map');
//console.log(response.data.code);
//console.log('success');
});
}

})

.controller('signupCtrl', function($scope) {

})

.controller('profileSettingCtrl', function($scope) {

})

.controller('foodStallCtrl', function($scope,$http,$stateParams) {
	$scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

	$http({
		method : 'POST',url : 'http://api.gaekjuhub.com/stores/info/'+$stateParams.id,
		 withCredentials: true,
		 headers: {'Content-Type': 'application/json; charset=utf-8'}
	}).then(function successCallback(response) {
		$scope.stores =response.data.data;
		console.log('stores : ',response.data.data);
	},
	function errorCallback(response) {

	});
})

.controller('orderNowCtrl', function($scope,$http,$stateParams,$state,$location) {
    $scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

    $http({
      method : 'POST',url : 'http://api.gaekjuhub.com/menus/store/'+$stateParams.id,
       withCredentials: true,
       headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(function successCallback(response) {
      $scope.menus =response.data.data;
      //console.log($scope.menus);
    },
    function errorCallback(response) {

    });

    $scope.data = {};

    $scope.addQuantity = function( menu ) {
      //console.log('addquanityt menu: ', menu);

      if ( !( "quantity" in menu ) )
        menu.quantity = 1;
      else
        menu.quantity++;
    };

    $scope.subQuantity = function( menu ) {
      menu.quantity--;
    }

  //  $scope.items = [{data.menu_quantity:"",data.menu_id:""}];



    $scope.ordernow = function() {
      var booking = {
        total: 0.00,
        user_id: $scope.login_session_data.id,
        table_loc: "",
        items: []
      };

      for(var i = 0;i<=$scope.menus.length;i++){
          var menu = $scope.menus[i];
          //console.log('menu: ', menu );
          if( (typeof(menu) !== "undefined") &&
            ( "quantity" in menu ) &&
            (menu.quantity > 0)) {
            booking.items.push({
              menu_id: menu.id,
              price: menu.price,
              quantity: menu.quantity,
              amount: menu.price * menu.quantity,
              status: 0
            });

            booking.total += menu.price * menu.quantity;
          }
      }

      $http({
              method : 'POST',
              url : 'http://api.gaekjuhub.com/bookings/save',
              data : booking,
              withCredentials: true,
               headers: {'Content-Type': 'application/json; charset=utf-8'}
            }).then(function successCallback(response) {
                //console.log(response.data.data.id);
                //  $state.go('tabsController.checkOut/'+response.data.data.id);
                $location.path('/tab/checkout/'+response.data.data.id);
            });

    }
})
.controller('loungeCtrl', function($scope, $ionicModal,$http,$cordovaCamera) {
	$scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

  $http({
    method : 'POST',url : 'http://api.gaekjuhub.com/socials/all/',
     withCredentials: true,
     headers: {'Content-Type': 'application/json; charset=utf-8'}
  }).then(function successCallback(response) {
    $scope.allsocials =response.data.data;
   // console.log('all_socials : ',response);
  },
  function errorCallback(response) {

  });


  $ionicModal.fromTemplateUrl('templates/addpost.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

    $scope.takePhoto = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

          $cordovaCamera.getPicture(options).then(function (imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
          }, function (err) {
              // An error occured. Show a message to the user
          });
      }

      $scope.choosePhoto = function () {
        var options = {
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
      };

          $cordovaCamera.getPicture(options).then(function (imageData) {
              $scope.imgURI = "data:image/jpeg;base64," + imageData;
          }, function (err) {
              // An error occured. Show a message to the user
          });
      }

  $scope.data={}
  $scope.addpost = function() {
    $http({
      method : 'POST',
      url : 'http://api.gaekjuhub.com/socials/save',
      data : {
        "image":$scope.data.image,
        "comment":$scope.data.comments,
        "like_count":0,
        "user_id":$scope.login_session_data.id
      },
      withCredentials: true,
       headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(function successCallback(response) {
      //console.log(response);
      //$state.go('tab/foodstallreviews/'+$stateParams.id);



       $scope.modal.hide();
    });
  };
})

.controller('checkOutCtrl', function($scope,$http,$stateParams) {
    $scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

    $scope.booking_id = $stateParams.id;

    $http({
      method : 'POST',url : 'http://api.gaekjuhub.com/booking_items/booking/'+$stateParams.id,
       withCredentials: true,
       headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(function successCallback(response) {
      $scope.bookingitems =response.data.data;

      $scope.grand_total = 0;
      var total = 0;
      for(var i=0;i<=$scope.bookingitems.length;i++){
       var element = $scope.bookingitems[i];
        if( (typeof(element) !== "undefined") &&( "quantity" in element ) ) {
         //console.log(element );
          total = element.quantity * element.price;

         // console.log(total);
          $scope.grand_total += total;
        }
      }



    },
    function errorCallback(response) {

    });


})

.controller('receiptCtrl', function($scope,$http,$stateParams,$cordovaBarcodeScanner) {
   $scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

    $http({
      method : 'POST',url : 'http://api.gaekjuhub.com/booking_items/booking/'+$stateParams.id,
       withCredentials: true,
       headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(function successCallback(response) {
      $scope.bookingitems =response.data.data;

      $scope.grand_total = 0;
      var total = 0;
      for(var i=0;i<=$scope.bookingitems.length;i++){
       var element = $scope.bookingitems[i];
        if( (typeof(element) !== "undefined") &&( "quantity" in element ) ) {
         //console.log(element );
          total = element.quantity * element.price;

         // console.log(total);
          $scope.grand_total += total;
        }
      }
    },
    function errorCallback(response) {

    });



    document.addEventListener("deviceready", function () {
      /*table scan qrcode start*/

      $scope.scanTable = function() {
        console.log('qrcode scanning.....');
          $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
              console.log('tableNo:',barcodeData);
							$scope.table_no = barcodeData.text;
							/* =========== save qrcode details ======== */
							$http({
								method : 'POST',url : 'http://api.gaekjuhub.com/bookings/save',
								data:{ "id": $stateParams.id,"table_loc": 	$scope.table_no, "userid": $scope.login_session_data.id,"total": $scope.grand_total},
								 withCredentials: true,
								 headers: {'Content-Type': 'application/json; charset=utf-8'}
							}).then(function successCallback(response) {
								$scope.storesreviews =response.data.data;
								console.log('scan saved');
							},
							function errorCallback(response) {
										console.log('scan error');

							});
							/* =========== save qrcode details =*/
              // Success! Barcode data is here
            }, function(error) {
              // An error occurred
            });

      }
        }, false);
})

.controller('orderListCtrl', function($scope,$cordovaBarcodeScanner,$http,$stateParams,$ionicModal) {

   $scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));
//console.log($scope.login_session_data.id);
    $http({
      method : 'POST',url : 'http://api.gaekjuhub.com/bookings/user/'+$scope.login_session_data.id,
       withCredentials: true,
       headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(function successCallback(response) {
      $scope.bookingitems = response.data.data;

      $scope.grand_total = 0;
      var total = 0;
      for(var i=0;i<=$scope.bookingitems.length;i++){
       var element = $scope.bookingitems[i];
        if( (typeof(element) !== "undefined") &&( "quantity" in element ) ) {
         //console.log(element );
          total = element.quantity * element.price;

         // console.log(total);
          $scope.grand_total += total;
        }
      }
    },
    function errorCallback(response) {

    });



    document.addEventListener("deviceready", function () {
      /*table scan qrcode start*/

      $scope.scanTable = function() {
        console.log('qrcode scanning.....');
          $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
              console.log('tableNo:',barcodeData);
							$scope.table_no = barcodeData.text;
							/* =========== save qrcode details ======== */
							$http({
								method : 'POST',url : 'http://api.gaekjuhub.com/bookings/save',
								data:{ "id": $stateParams.id,"table_loc": 	$scope.table_no, "userid": $scope.login_session_data.id,"total": $scope.grand_total},
								 withCredentials: true,
								 headers: {'Content-Type': 'application/json; charset=utf-8'}
							}).then(function successCallback(response) {
								$scope.storesreviews =response.data.data;
								console.log('scan saved');
							},
							function errorCallback(response) {
										console.log('scan error');

							});
							/* =========== save qrcode details =*/
              // Success! Barcode data is here
            }, function(error) {
              // An error occurred
            });

      }
        }, false);


  document.addEventListener("deviceready", function () {
    /*table scan qrcode start*/

    $scope.scanTable = function() {
      console.log('qrcode scanning.....');
        $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            console.log('tableNo:',barcodeData);
						$scope.table_no = barcodeData.text;
						/* =========== save qrcode details ======== */
						$http({
							method : 'POST',url : 'http://api.gaekjuhub.com/bookings/save',
							data:{ "id": $stateParams.id,"table_loc": 	$scope.table_no, "userid": $scope.login_session_data.id,"total": $scope.grand_total},
							 withCredentials: true,
							 headers: {'Content-Type': 'application/json; charset=utf-8'}
						}).then(function successCallback(response) {
							$scope.storesreviews =response.data.data;
							console.log('scan saved');
						},
						function errorCallback(response) {
									console.log('scan error');

						});
					  /* =========== save qrcode details =*/
            // Success! Barcode data is here
          }, function(error) {
            // An error occurred
          });

    }
      }, false);

  /*table scan qrcode end*/




	   $scope.booking_id = $stateParams.id;

	  // for add review modal //
	  $ionicModal.fromTemplateUrl('templates/itemdetails.html', {
	    scope: $scope
	  }).then(function(modal) {


	  });


	$ionicModal.fromTemplateUrl('templates/itemdetails.html', function($ionicModal) {
	    $scope.modal = $ionicModal;
	}, {
	    // Use our scope for the scope of the modal to keep it simple
	    scope: $scope,
	    // The animation we want to use for the modal entrance
	    animation: 'slide-in-up'
	});

	$scope.openModal = function(id) {
	    $scope.selectedId = id;

	   $http({
	      method : 'POST',url : 'http://api.gaekjuhub.com/booking_items/booking/'+$scope.selectedId,
	       withCredentials: true,
	       headers: {'Content-Type': 'application/json; charset=utf-8'}
	    }).then(function successCallback(response) {
	      $scope.menuitems =response.data.data;

	      $scope.grand_total = 0;
	      var total = 0;
	      for(var i=0;i<=$scope.menuitems.length;i++){
	       var element = $scope.menuitems[i];
	        if( (typeof(element) !== "undefined") &&( "quantity" in element ) ) {
	         //console.log(element );
	          total = element.quantity * element.price;

	         // console.log(total);
	          $scope.grand_total += total;
	        }
	      }


	      $scope.modal.show();
	    },
	    function errorCallback(response) {

	    });


	}

})

.controller('foodStallReviewsCtrl', function($scope,$http,$stateParams,$ionicModal,$state) {
	$scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

	$http({
		method : 'POST',url : 'http://api.gaekjuhub.com/store_reviews/store/'+$stateParams.id,
		 withCredentials: true,
		 headers: {'Content-Type': 'application/json; charset=utf-8'}
	}).then(function successCallback(response) {
		$scope.storesreviews =response.data.data;
	},
	function errorCallback(response) {

	});


	// for add review modal //
	$ionicModal.fromTemplateUrl('templates/addreview.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.data={}

	$scope.postreview = function() {



		$http({
			method : 'POST',
			url : 'http://api.gaekjuhub.com/store_reviews/save',
			data : {
				"review":$scope.data.review,
				"user_id":$scope.login_session_data.id,
				"store_id":$stateParams.id,
				"rating":4
			},
			withCredentials: true,
			 headers: {'Content-Type': 'application/json; charset=utf-8'}
		}).then(function successCallback(response) {
			//console.log(response);
			//$state.go('tab/foodstallreviews/'+$stateParams.id);

			$http({
				method : 'POST',url : 'http://api.gaekjuhub.com/store_reviews/store/'+$stateParams.id,
				 withCredentials: true,
				 headers: {'Content-Type': 'application/json; charset=utf-8'}
			}).then(function successCallback(response) {
				$scope.storesreviews =response.data.data;
			},
			function errorCallback(response) {

			});

			 $scope.modal.hide();
		});
	}
})

.controller('loungeCommentCtrl', function($scope,$http,$stateParams,$ionicModal,$state) {
  $scope.login_session_data = JSON.parse(localStorage.getItem('userdata'));

  $http({
    method : 'POST',url : 'http://api.gaekjuhub.com/social_comments/social/'+$stateParams.id,
     withCredentials: true,
     headers: {'Content-Type': 'application/json; charset=utf-8'}
  }).then(function successCallback(response) {
    $scope.loungecomments =response.data.data;
  },
  function errorCallback(response) {

  });


  // for add review modal //
  $ionicModal.fromTemplateUrl('templates/addcomment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.data={}

  $scope.postcomment = function() {



    $http({
      method : 'POST',
      url : 'http://api.gaekjuhub.com/social_comments/save',
      data : {
        "comment":$scope.data.comment,
        "user_id":$scope.login_session_data.id,
        "social_id":$stateParams.id,
        "liked":0
      },
      withCredentials: true,
       headers: {'Content-Type': 'application/json; charset=utf-8'}
    }).then(function successCallback(response) {
      //console.log(response);
      //$state.go('tab/foodstallreviews/'+$stateParams.id);

       $http({
          method : 'POST',url : 'http://api.gaekjuhub.com/social_comments/social/'+$stateParams.id,
           withCredentials: true,
           headers: {'Content-Type': 'application/json; charset=utf-8'}
        }).then(function successCallback(response) {
          $scope.loungecomments =response.data.data;
        },
        function errorCallback(response) {

        });

       $scope.modal.hide();
    });
  }
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

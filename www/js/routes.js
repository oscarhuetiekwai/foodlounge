angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.map', {
    url: '/map',
    views: {
      'tab1': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('favourite', {
    url: '/favourite',
    templateUrl: 'templates/favourite.html',
    controller: 'favouriteCtrl'
  })

  .state('tabsController.orderHistory', {
    url: '/orderhistory',
    views: {
      'tab3': {
        templateUrl: 'templates/orderHistory.html',
        controller: 'orderHistoryCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tab',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/dashboard',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('profileSetting', {
    url: '/profilesetting',
    templateUrl: 'templates/profileSetting.html',
    controller: 'profileSettingCtrl'
  })

  .state('tabsController.foodStall', {
    url: '/fooddetails',
    views: {
      'tab1': {
        templateUrl: 'templates/foodStall.html',
        controller: 'foodStallCtrl'
      }
    }
  })

  .state('tabsController.orderNow', {
    url: '/ordernow',
    views: {
      'tab1': {
        templateUrl: 'templates/orderNow.html',
        controller: 'orderNowCtrl'
      }
    }
  })

  .state('tabsController.lounge', {
    url: '/lounge',
    views: {
      'tab4': {
        templateUrl: 'templates/lounge.html',
        controller: 'loungeCtrl'
      }
    }
  })

  .state('tabsController.checkOut', {
    url: '/checkout',
    views: {
      'tab1': {
        templateUrl: 'templates/checkOut.html',
        controller: 'checkOutCtrl'
      }
    }
  })

  .state('tabsController.receipt', {
    url: '/receipt',
    views: {
      'tab1': {
        templateUrl: 'templates/receipt.html',
        controller: 'receiptCtrl'
      }
    }
  })

  .state('tabsController.orderList', {
    url: '/orderlist',
    views: {
      'tab3': {
        templateUrl: 'templates/orderList.html',
        controller: 'orderListCtrl'
      }
    }
  })

  .state('tabsController.foodStallReviews', {
    url: '/foodstallreviews',
    views: {
      'tab1': {
        templateUrl: 'templates/foodStallReviews.html',
        controller: 'foodStallReviewsCtrl'
      }
    }
  })

  .state('tabsController.loungeComment', {
    url: '/loungecomment',
    views: {
      'tab4': {
        templateUrl: 'templates/loungeComment.html',
        controller: 'loungeCommentCtrl'
      }
    }
  })

  .state('booking', {
    url: '/booking',
    templateUrl: 'templates/booking.html',
    controller: 'bookingCtrl'
  })

  .state('tabsController.store', {
    url: '/page18',
    views: {
      'tab5': {
        templateUrl: 'templates/store.html',
        controller: 'storeCtrl'
      }
    }
  })

  .state('tabsController.menu2', {
    url: '/page19',
    views: {
      'tab6': {
        templateUrl: 'templates/menu2.html',
        controller: 'menu2Ctrl'
      }
    }
  })

  .state('tabsController.schedule', {
    url: '/page20',
    views: {
      'tab7': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('reviews', {
    url: '/page21',
    templateUrl: 'templates/reviews.html',
    controller: 'reviewsCtrl'
  })

  .state('tabsController.addMenuItem', {
    url: '/page22',
    views: {
      'tab6': {
        templateUrl: 'templates/addMenuItem.html',
        controller: 'addMenuItemCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/dashboard')

  

});
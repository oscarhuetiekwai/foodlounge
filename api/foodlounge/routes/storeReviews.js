module.exports = function( app_params ) {
  var storeReviewsService = require('../services/storeReviewsService.js')( app_params );

  app_params.app

    .post('/store_reviews/store/:store_id', function( req, res ) {
      console.log('/store_reviews req.body: ', req.body );
      console.log('/store_reviews store_id: ', req.params.store_id );
      var reply = { code: 1, data: {msg: 'Error'} };

      storeReviewsService.getStoreReviews( req.params.store_id , function( err, data ){
        if ( err ) {
          reply.code = 1;
          reply.data = err;
        } else {
          reply.code = 0;
          reply.data = data;
        }

        res.send( reply );
      });
    })
    .post('/store_reviews/save', function( req, res ) {
      console.log('/store_reviews/save req.body: ', req.body );
      console.log('/store_reviews/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var store_review = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        user_id: req.session.user.id,
        store_id: ( 'store_id' in req.body ) ? req.body.store_id : '',
        review: ( 'review' in req.body ) ? req.body.review : '',
        rating: ( 'rating' in req.body ) ? req.body.rating : ''
      };

      storeReviewsService.save( store_review, function( err, data ) {
        console.log('/store_reviews/save error: ', err );
        console.log('/store_reviews/save data: ', data );
        if ( err ) {
          console.log('/store_reviews/save error: ', err );
          reply.code = 1;
          reply.data = err;
        } else {
          store_review.id = data.insertId;
          reply.code = 0;
          reply.data = store_review;

          console.log('/store_reviews/save store info ', store_review );
        }

        res.send( reply );
      });
    });

};

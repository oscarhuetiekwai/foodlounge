module.exports = function( app_params ) {
  var storesService = require('../services/storesService.js')( app_params );

  app_params.app
    .post('/stores/user/:user_id', function(req, res ) {
      console.log('/stores/user user_id ', req.params.user_id );

      storesService.getStoreByUser( req.params.user_id, function( err, data ) {
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
    .post('/stores', function( req, res ) {
      console.log('/stores req.body: ', req.body );
      console.log('/stores user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };

      storesService.getStores( {}, function( err, data ){
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
    .post('/stores/search', function( req, res ) {
      console.log('/stores req.body: ', req.body );
      console.log('/stores user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };

      if ( !( 'user' in req.session ) ) {
        res.send( { code: 2, data: 'Please log in'});
        return;
      }

      storesService.getStoreByUser( req.session.user.id, function( err, data ){
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
    .post('/stores/save', function( req, res ) {
      console.log('/stores/save req.body: ', req.body );
      console.log('/stores/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var store = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        name: ( 'name' in req.body ) ? req.body.name : '',
        address: ( 'address' in req.body ) ? req.body.address : '',
        phone: ( 'phone' in req.body ) ? req.body.phone : '',
        open: ( 'open' in req.body ) ? req.body.open : '',
        avg_rating: ( 'avg_rating' in req.body ) ? req.body.avg_rating : '',
        longitude: ( 'longitude' in req.body ) ? req.body.longitude : 0.00,
        latitude: ( 'latitude' in req.body ) ? req.body.latitude : 0.00,
        user_id: req.session.user.id
      };

      if ( store.id === 0 ) {
        storesService.save( store, function( err, data ) {
          console.log('/stores/save error: ', err );
          console.log('/stores/save data: ', data );
          if ( err ) {
            console.log('/stores/save error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            store.id = data.insertId;
            reply.code = 0;
            reply.data = store;

            console.log('/stores/save store info ', store );
          }

          res.send( reply );
        });
      } else {
        storesService.update( store, function( err, data ) {
          console.log('/stores/update error: ', err );
          console.log('/stores/update data: ', data );

          if ( err ) {
            console.log('/stores/update error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            reply.code = 0;
            reply.data = store;

            console.log('/stores/update store info ', store );
          }

          res.send( reply );
        });
      }
    });

};

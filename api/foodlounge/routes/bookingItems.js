module.exports = function( app_params ) {
  var bookingItemsService = require('../services/bookingItemsService.js')( app_params );

  app_params.app
    .post('/booking_items/booking/:booking_id', function(req, res ) {
      var reply = { code: 1, data: {msg: 'Error'} };
      console.log('/booking_items/booking/ booking_id ', req.params.booking_id );

      bookingItemsService.getBookingItemsByBooking( req.params.booking_id, function( err, data ) {
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
    .post('/booking_items/store/:store_id', function(req, res ) {
      var reply = { code: 1, data: {msg: 'Error'} };
      console.log('/booking_items/store/ store_id ', req.params.store_id );

      bookingItemsService.getBookingItemsByStore( req.params.store_id, function( err, data ) {
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
    .post('/booking_items/save', function( req, res ) {
      console.log('/booking_items/save req.body: ', req.body );
      console.log('/booking_items/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var booking_item = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        booking_id: ('booking_id' in req.body ) ? req.body.booking_id : 0,
        menu_id: ( 'menu_id' in req.body ) ? req.body.menu_id : 0,
        price: ( 'price' in req.body ) ? req.body.price : 0.00,
        quantity: ( 'quantity' in req.body ) ? req.body.quantity : 0,
        amount: ( 'amount' in req.body ) ? req.body.amount : 0.00,
        status: ( 'status' in req.body ) ? req.body.status : 0
      };

      if ( booking_item.id === 0 ) {
        bookingItemsService.save( booking_item, function( err, data ) {
          console.log('/booking_items/save error: ', err );
          console.log('/booking_items/save data: ', data );
          if ( err ) {
            console.log('/booking_items/save error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            booking_item.id = data.insertId;
            reply.code = 0;
            reply.data = booking_item;

            console.log('/booking_items/save booking_item info ', booking_item );
          }

          res.send( reply );
        });
      } else {
        bookingItemsService.update( booking_item, function( err, data ) {
          console.log('/booking_items/update error: ', err );
          console.log('/booking_items/update data: ', data );

          if ( err ) {
            console.log('/booking_items/update error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            reply.code = 0;
            reply.data = booking_item;

            console.log('/booking_items/update store info ', booking_item );
          }

          res.send( reply );
        });
      }
    });

};

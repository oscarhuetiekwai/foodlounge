module.exports = function( app_params ) {
  var bookingsService = require('../services/bookingsService.js')( app_params );
  var bookingItemsService = require('../services/bookingItemsService.js')( app_params );

  app_params.app
    .post('/bookings/user/:user_id', function(req, res ) {
      var reply = { code: 1, data: {msg: 'Error'} };
      console.log('/bookings/user/ user_id ', req.params.user_id );

      bookingsService.getBookingsByUser( req.params.user_id, function( err, data ) {
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
    .post('/bookings/save', function( req, res ) {
      console.log('/bookings/save req.body: ', req.body );
      console.log('/bookings/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var booking = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        total: ( 'total' in req.body ) ? req.body.total : 0.00,
        table_loc: ('table_loc' in req.body ) ? req.body.table_loc : '',
        user_id: ('user_id' in req.body ) ? req.body.user_id : req.session.user.id,
        items: ('items' in req.body ) ? req.body.items: []
      };

      if ( booking.id === 0 ) {
        bookingsService.save( booking, function( err, data ) {
          console.log('/bookings/save error: ', err );
          console.log('/bookings/save data: ', data );
          if ( err ) {
            console.log('/bookings/save error: ', err );
            reply.code = 1;
            reply.data = err;

            res.send( reply );
          } else {
            booking.id = data.insertId;
            reply.code = 0;
            reply.data = booking;

            if ( booking.items.length > 0 ) {
              for(var idx = 0; idx < booking.items.length; idx++ ) {
                var booking_item = booking.items[ idx ];
                booking_item.booking_id = booking.id;
              }
            }

            bookingItemsService.saveByBatch( booking.items, function( err, data ) {
              console.log( '/bookings/save item batch err ', err );
              console.log( '/bookings/save item batch data ', data );

              
              bookingItemsService.getBookingItemsByBooking( booking.id, function( err, data ) {
                reply.data.items = data;

                res.send( reply );

              });
            });

            console.log('/bookings/save booking info ', booking );
          }


        });
      } else {
        bookingsService.update( booking, function( err, data ) {
          console.log('/bookings/update error: ', err );
          console.log('/bookings/update data: ', data );

          if ( err ) {
            console.log('/bookings/update error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            reply.code = 0;
            reply.data = booking;

            console.log('/bookings/update store info ', booking );
          }

          res.send( reply );
        });
      }
    });

};

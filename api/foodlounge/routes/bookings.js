module.exports = function( app_params ) {
  var bookingsService = require('../services/bookingsService.js')( app_params );

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
        user_id: req.session.user.id
      };

      if ( booking.id === 0 ) {
        bookingsService.save( booking, function( err, data ) {
          console.log('/bookings/save error: ', err );
          console.log('/bookings/save data: ', data );
          if ( err ) {
            console.log('/bookings/save error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            booking.id = data.insertId;
            reply.code = 0;
            reply.data = booking;

            console.log('/bookings/save booking info ', booking );
          }

          res.send( reply );
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

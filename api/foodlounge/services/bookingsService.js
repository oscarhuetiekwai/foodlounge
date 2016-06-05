var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getBookingsByUser: function( user_id, callback) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('bookingsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM bookings WHERE user_id=" + mysql.escape( user_id ) +
            " AND deleted_at IS NULL;";

          console.log('bookingsService.js query : ', query );

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getBookingsByUser */
    info: function( booking_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('bookingsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM bookings WHERE id=" + mysql.escape( booking_id ) + " and deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* info */
    save: function( booking, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('bookingsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO bookings( user_id, table_loc, total ) values (" + mysql.escape( booking.user_id) +
            ", " + mysql.escape( booking.table_loc ) + ", " + mysql.escape( booking.total )+ ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( booking, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('bookingsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE bookings SET user_id=" + mysql.escape( booking.user_id ) +
            ", total=" + mysql.escape( booking.total ) + ", updated_at=CURRENT_TIMESTAMP " +
            ", table_loc=" + mysql.escape( booking.table_loc ) + " WHERE id=" + mysql.escape( booking.id );

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

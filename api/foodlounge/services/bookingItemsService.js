var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getBookingItemsByStore: function( store_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('bookingItemsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM booking_items bi INNER JOIN menus m ON m.id=bi.menu_id WHERE m.store_id=" + mysql.escape( store_id ) +
            " AND deleted_at IS NULL;";

          console.log('bookingItemsService.js query : ', query );

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getBookingItemsByStore */
    getBookingItemsByBooking: function( booking_id, callback) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('bookingItemsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM booking_items WHERE booking_id=" + mysql.escape( booking_id ) +
            " AND deleted_at IS NULL;";

          console.log('bookingItemsService.js query : ', query );

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getBookingsByUser */
    save: function( booking_item, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('bookingItemsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO booking_items(booking_id, menu_id, price, quantity, amount, status) VALUES (" +
            mysql.escape( booking_item.booking_id ) + ", " + mysql.escape( booking_item.menu_id ) + ", " +
            mysql.escape( booking_item.price ) + ", " + mysql.escape( booking_item.quantity ) + ", " +
            mysql.escape( booking_item.amount ) + ", " + mysql.escape( booking_item.status ) + ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( booking_item, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('bookingItemsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE booking_items SET booking_id=" + mysql.escape( booking_item.booking_id ) +
            ", menu_id=" + mysql.escape( booking_item.menu_id ) + ", price=" + mysql.escape( booking_item.price ) +
            ", quantity=" + mysql.escape( booking_item.quantity ) + ", amount=" + mysql.escape( booking_item.amount ) +
            ", status=" + mysql.escape( booking_item.status ) + ", updated_at=CURRENT_TIMESTAMP WHERE id=" +
            mysql.escape( booking_item.id );

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

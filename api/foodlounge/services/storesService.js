var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getStores: function( search_params, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('storesService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM stores WHERE deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getStores */
    getStoreByUser: function( user_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('storesService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM stores WHERE user_id=" + mysql.escape( user_id ) + " and deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getStoreByUser */
    info: function( store_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('storesService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM stores WHERE id=" + mysql.escape( store_id ) + " and deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* info */
    save: function( store, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('storesService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO stores(name, address, phone, open, avg_rating, user_id, longitude, latitude) VALUES (" +
            mysql.escape( store.name ) + ", " + mysql.escape( store.address ) + ", " + mysql.escape( store.phone ) +
            ", " + mysql.escape( store.open ) + ", " + mysql.escape( store.avg_rating ) + ", " +
            mysql.escape( store.user_id ) + ", " + mysql.escape( store.longitude ) + ", " +
            mysql.escape( store.latitude ) +  ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( store, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('storesService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE stores SET name=" + mysql.escape( store.name ) + ", address=" + mysql.escape( store.address ) +
            ", phone=" + mysql.escape( store.phone ) + ", open=" + mysql.escape( store.open ) + ", avg_rating=" +
            mysql.escape( store.avg_rating ) + ", user_id=" + mysql.escape( store.user_id ) + ", longitude=" +
            mysql.escape( store.longitude ) + ", latitude=" + mysql.escape( store.latitude ) +
            ", updated_at=CURRENT_TIMESTAMP WHERE id=" + mysql.escape( store.id );

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

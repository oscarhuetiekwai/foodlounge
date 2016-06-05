var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getStoreMenus: function( store_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('menusService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM menus WHERE store_id=" + mysql.escape( store_id ) +
            " AND deleted_at IS NULL;";

          console.log('menusService.js query : ', query );

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    },
    /* getStores */
    getAllMenus: function( callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('menusService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM menus WHERE deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getStoreByUser */
    info: function( menu_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('menusService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM menus WHERE id=" + mysql.escape( menu_id ) + " and deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* info */
    save: function( menu, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('menusService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO menus(name, description, category_id, available, price, time_start, " +
            "time_end, avg_rating, store_id) VALUES (" + mysql.escape( menu.name ) + ", " +
            mysql.escape( menu.description ) + ", " + mysql.escape( menu.category_id ) + ", " +
            mysql.escape( menu.available ) + ", " + mysql.escape( menu.price ) + ", " +
            mysql.escape( menu.time_start ) + ", " + mysql.escape( menu.time_end ) + ", " +
            mysql.escape( menu.avg_rating ) + ", " + mysql.escape( menu.store_id ) + ");" ;

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( menu, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('menusService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE menus SET name=" + mysql.escape( menu.name ) + ", description=" +
            mysql.escape( menu.description ) + ", category_id=" + mysql.escape( menu.category_id ) +
            ", available=" + mysql.escape( menu.available ) + ", price=" + mysql.escape( menu.price ) +
            ", time_start=" + mysql.escape( menu.time_start ) + ", time_end=" + mysql.escape( menu.time_end ) +
            ", avg_rating=" + mysql.escape( menu.avg_rating ) + ", store_id=" + mysql.escape( menu.store_id ) +
            ", updated_at=CURRENT_TIMESTAMP WHERE id=" + mysql.escape( menu.id );

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

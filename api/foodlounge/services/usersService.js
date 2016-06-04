var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    info: function( email, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('usersService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM users WHERE email=" + mysql.escape( email ) + " and deleted_at IS NULL LIMIT 1;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* info */
    save: function( user, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('usersService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO users(email, password, user_level_id, last_name, first_name, longitude, latitude ) VALUES (" +
            mysql.escape( user.email ) + ", " +  mysql.escape( user.password ) + ", " + mysql.escape( user.user_level_id ) + ", " +
            mysql.escape( user.last_name ) + ", " + mysql.escape( user.first_name ) + ", " + mysql.escape( user.longitude ) + ", " +
            mysql.escape( user.latitude ) + ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( user, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('usersService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE users SET email=" + mysql.escape( user.email ) + ", password=" + mysql.escape( user.password ) +
            ", user_level_id=" + mysql.escape( user.user_level_id ) + ", last_name=" + mysql.escape( user.last_name ) +
            ", first_name=" + mysql.escape( user.first_name ) + ", longitude=" + mysql.escape( user.longitude ) +
            ", latitude=" + mysql.escape( user.latitude ) + ", updated_at=CURRENT_TIMESTAMP where id=" + mysql.escape( user.id );

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

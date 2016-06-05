var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getSocials: function( callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('socialsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM socials WHERE deleted_at IS NULL ORDER BY created_at DESC;";

          console.log('socialsService.js query : ', query );

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    },
    /* getSocials */
    info: function( social_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('socialsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM socials WHERE id=" + mysql.escape( social_id ) + " and deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* info */
    save: function( social, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('socialsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO socials(image, comment, like_count, user_id) VALUES (" +
            mysql.escape( social.image ) + ", " + mysql.escape( social.comment ) + ", " +
            mysql.escape( social.like_count ) + ", " + mysql.escape( social.user_id ) + ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( social, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('socialsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE socials SET image=" + mysql.escape( social.image ) +
            ", comment=" + mysql.escape( social.comment ) + ", like_count=" +
            mysql.escape( social.like_count ) + ", user_id=" + mysql.escape( social.user_id ) +
            ", updated_at=CURRENT_TIMESTAMP WHERE id=" + social.id;

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

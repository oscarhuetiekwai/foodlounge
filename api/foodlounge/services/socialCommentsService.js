var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getSocialComments: function( social_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('socialCommentsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM social_comments WHERE social_id=" +
            mysql.escape( social_id ) + " AND deleted_at IS NULL ORDER BY created_at DESC;";

          console.log('socialCommentsService.js query : ', query );

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    },
    /* getSocialComments */
    info: function( social_comment_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('socialCommentsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM social_comments WHERE id=" + mysql.escape( social_comment_id ) + " and deleted_at IS NULL;";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* info */
    save: function( social_comment, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('socialCommentsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO social_comments(social_id, comment, liked, user_id) VALUES (" +
            mysql.escape( social_comment.social_id ) + ", " + mysql.escape( social_comment.comment ) +
            ", " + mysql.escape( social_comment.liked ) + ", " + mysql.escape( social_comment.user_id ) + ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }, /* save */
    update: function( social_comment, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('socialCommentsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "UPDATE social_comments SET social_id=" + mysql.escape( social_comment.social_id ) +
            ", comment=" + mysql.escape( social_comment.comment ) + ", liked=" +
            mysql.escape( social_comment.liked ) + ", user_id=" + mysql.escape( social_comment.user_id ) +
            ", updated_at=CURRENT_TIMESTAMP WHERE id=" + mysql.escape( social_comment.id );

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    } /* update */

  }; /* end return */
};

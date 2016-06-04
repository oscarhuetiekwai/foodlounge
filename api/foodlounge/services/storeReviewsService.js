var mysql = require('mysql');

module.exports = function( app_params ) {
  return {
    getStoreReviews: function( store_id, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err ) {
          console.log('storeReviewsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "SELECT * FROM store_reviews WHERE deleted_at IS NULL AND store_id=" +
            mysql.escape( store_id ) + ";";

          connection.query( query, function( err, rows) {
            callback( err, rows );
          });
        }
      });
    }, /* getStoreReviews */
    save: function( store_review, callback ) {
      app_params.mysql_pool.getConnection( function( err, connection ) {
        if ( err )  {
          console.log('storeReviewsService.js error getting connection: ', err );
          callback( err, [] );
        } else {
          var query = "INSERT INTO store_reviews( user_id, store_id, review, rating ) VALUES (" +
            mysql.escape( store_review.user_id ) + ", " + mysql.escape( store_review.store_id ) +
            ", " + mysql.escape( store_review.review ) + ", " + mysql.escape( store_review.rating ) +
            ");";

          connection.query( query, function( err, rows ) {
            callback( err, rows );
          });
        }
      });
    }
  }; /* end return */
};

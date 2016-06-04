module.exports = function( app_params ) {
  var socialCommentsService = require('../services/socialCommentsService.js')( app_params );

  app_params.app
    .post('/social_comments/social/:social_id', function(req, res ) {
      var reply = { code: 1, data: {msg: 'Error'} };
      console.log('/social_comments/social/ social_id ', req.params.social_id );

      socialCommentsService.getSocialComments( req.params.social_id, function( err, data ) {
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
    .post('/social_comments/save', function( req, res ) {
      console.log('/social_comments/save req.body: ', req.body );
      console.log('/social_comments/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var social_comment = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        social_id: ( 'social_id' in req.body ) ? req.body.social_id : 0,
        comment: ( 'comment' in req.body ) ? req.body.comment : "",
        liked: ( 'liked' in req.body ) ? req.body.liked : 0,
        user_id: ('user_id' in req.body ) ? req.body.user_id : req.session.user.id
      };

      if ( social_comment.id === 0 ) {
        socialCommentsService.save( social_comment, function( err, data ) {
          console.log('/social_comments/save error: ', err );
          console.log('/social_comments/save data: ', data );
          if ( err ) {
            console.log('/social_comments/save error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            social_comment.id = data.insertId;
            reply.code = 0;
            reply.data = social_comment;

            console.log('/social_comments/save social comment info ', social_comment );
          }

          res.send( reply );
        });
      } else {
        socialCommentsService.update( social_comment, function( err, data ) {
          console.log('/social_comments/update error: ', err );
          console.log('/social_comments/update data: ', data );

          if ( err ) {
            console.log('/social_comments/update error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            reply.code = 0;
            reply.data = social_comment;

            console.log('/social_comments/update social_comment info ', social_comment );
          }

          res.send( reply );
        });
      }
    });

};

module.exports = function( app_params ) {
  var socialsService = require('../services/socialsService.js')( app_params );
  var multer = require('multer');
  var upload = multer({ dest: 'uploads/socials/' });

  app_params.app
    .post('/socials/all', function(req, res ) {
      var reply = { code: 1, data: {msg: 'Error'} };
      console.log('/socials/all');

      socialsService.getSocials( function( err, data ) {
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
    .post('/socials/upload', upload.single('social'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
    })
    .post('/socials/save', function( req, res ) {
      console.log('/socials/save req.body: ', req.body );
      console.log('/socials/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var social = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        image: ( 'image' in req.body ) ? req.body.image : "",
        comment: ( 'comment' in req.body ) ? req.body.comment : "",
        like_count: ( 'like_count' in req.body ) ? req.body.like_count : 0,
        user_id: ('user_id' in req.body ) ? req.body.user_id : req.session.user.id
      };

      if ( social.id === 0 ) {
        socialsService.save( social, function( err, data ) {
          console.log('/socials/save error: ', err );
          console.log('/socials/save data: ', data );
          if ( err ) {
            console.log('/socials/save error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            social.id = data.insertId;
            reply.code = 0;
            reply.data = social;

            console.log('/socials/save social info ', social );
          }

          res.send( reply );
        });
      } else {
        socialsService.update( social, function( err, data ) {
          console.log('/socials/update error: ', err );
          console.log('/socials/update data: ', data );

          if ( err ) {
            console.log('/socials/update error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            reply.code = 0;
            reply.data = social;

            console.log('/socials/update store info ', social );
          }

          res.send( reply );
        });
      }
    });

};

module.exports = function( app_params ) {
  var usersService = require('../services/usersService.js')( app_params );
  var bcrypt = require('bcrypt-nodejs');

  app_params.app
    .post('/users/login', function( req, res ) {
      console.log('/users/login req.body: ', req.body );
      //req.session.destroy();
      var reply = { code: 2, data: {msg: 'Invalid username/password'} };

      usersService.info( req.body.email, function( err, data ){
        if ( err ) {
          reply.code = 1;
          reply.data = err;
        } else {
          if ( data.length > 0 ) {
            var user = data[0];

            if ( user.password === req.body.password ) {
              delete user.password;
              reply.code = 0;
              reply.data = user;
              req.session.user = user;
            }
          }

          console.log( '/users/login req.session.user: ', req.session.user );
        }

        res.send( reply );
      });
    });

};

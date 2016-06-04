module.exports = function( app_params ) {
  var menusService = require('../services/menusService.js')( app_params );

  app_params.app
    .post('/menus/store/:store_id', function(req, res ) {
      var reply = { code: 1, data: {msg: 'Error'} };
      console.log('/menus/store/ store_id ', req.params.store_id );

      menusService.getStoreMenus( req. params.store_id , function( err, data ) {
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
    .post('/menus/save', function( req, res ) {
      console.log('/menus/save req.body: ', req.body );
      console.log('/menus/save user: ', req.session.user );
      var reply = { code: 1, data: {msg: 'Error'} };
      var menu = {
        id: ( 'id' in req.body ) ? req.body.id : 0 ,
        name: ( 'name' in req.body ) ? req.body.name : '',
        description: ( 'description' in req.body ) ? req.body.description : '',
        category_id: ( 'category_id' in req.body ) ? req.body.category_id : '',
        available: ( 'available' in req.body ) ? req.body.available : '',
        price: ( 'price' in req.body ) ? req.body.price : '',
        time_start: ( 'time_start' in req.body ) ? req.body.time_start : "00:00:00",
        time_end: ( 'time_end' in req.body ) ? req.body.time_end : "00:00:00",
        avg_rating: ( 'avg_rating' in req.body ) ? req.body.avg_rating : 0.00,
        store_id: ( 'store_id' in req.body ) ? req.body.store_id : 0,
        user_id: req.session.user.id
      };

      if ( menu.id === 0 ) {
        menusService.save( menu, function( err, data ) {
          console.log('/stores/save error: ', err );
          console.log('/stores/save data: ', data );
          if ( err ) {
            console.log('/stores/save error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            menu.id = data.insertId;
            reply.code = 0;
            reply.data = menu;

            console.log('/menus/save menu info ', menu );
          }

          res.send( reply );
        });
      } else {
        menusService.update( menu, function( err, data ) {
          console.log('/menus/update error: ', err );
          console.log('/menus/update data: ', data );

          if ( err ) {
            console.log('/menus/update error: ', err );
            reply.code = 1;
            reply.data = err;
          } else {
            reply.code = 0;
            reply.data = menu;

            console.log('/menus/update store info ', menu );
          }

          res.send( reply );
        });
      }
    });

};

var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mysql_pool = mysql.createPool({
  connectionLimit: 100,
  host: '10.211.55.11',
  user: 'foodlounge',
  password: 'foodlounge',
  database: 'foodlounge'
});
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new FileStore,
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.all('/*',function( req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  next();
});

app.options('*', function(req, res) {
  res.send( 200 );
});

var app_params = {
  mysql_pool: mysql_pool,
  multer: multer,
  upload: upload,
  app: app
};

//app.use('/', routes);
//app.use('/users', users);

require('./routes/users.js')( app_params );
require('./routes/stores.js')( app_params );
require('./routes/storeReviews.js')( app_params );
require('./routes/menus.js')( app_params );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen( 3000, function() {
  console.log('Food Lounge v.0.0.1: Listening at port 3000');
});

module.exports = app;

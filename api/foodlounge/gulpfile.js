var gulp    = require('gulp'),
  nodemon   = require('gulp-nodemon');


gulp.task('default', function() {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node_modules', './public']
  })
  .on( 'restart', function() {
    console.log('restarting food lounmge....');
  });
});

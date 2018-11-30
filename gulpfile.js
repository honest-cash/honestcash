'use strict';

const gulp = require('gulp');

gulp.task('build', () => gulp
  .src([ "./node_modules/simple-bitcoin-wallet/dist/simplewallet.min.js" ])
  .pipe(gulp.dest('public/js')));

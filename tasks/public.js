const gulp = require('gulp');

const config = require('./config');

gulp.task('public', () =>
	gulp.src('./public/**/*')
	    .pipe(gulp.dest(config.build.path))
);

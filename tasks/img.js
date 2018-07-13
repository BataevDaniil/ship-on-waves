const gulp = require('gulp');
const {reload}= require('browser-sync');

const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');

const path = require('./config');
const mode = require('./mode');

gulp.task('img', () => {
	return gulp.src(path.src.img, {since: gulp.lastRun('img')})
		.pipe(gulpif('production' === mode, imagemin({
			optimizationLevel: 3,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			interlaced: true
		})))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

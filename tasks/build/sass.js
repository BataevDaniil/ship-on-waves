const gulp = require('gulp');
const {reload}= require('browser-sync');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const removeComments = require('gulp-strip-css-comments');
const sourcemaps = require('gulp-sourcemaps');

const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const path = require('../config');
const mode = require('../mode');

gulp.task('sass-build', () => {
	return gulp.src(path.src.sass)
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
			return {
				title: 'Error style',
				message: err.message
			}})
		}))
		.pipe(gulpif('production' !== mode, sourcemaps.init()))
		.pipe(sass('production' === mode?{
			outputStyle: 'compressed'
		}:undefined))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
		}))
		.pipe(gulpif('production' === mode, removeComments()))
		.pipe(gulpif('production' !== mode, sourcemaps.write()))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});
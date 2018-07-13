const gulp = require('gulp');
const {reload}= require('browser-sync');

const pug = require('gulp-pug');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const rename = require('gulp-rename');

const path = require('../config');


gulp.task('pug-build', function(){
	return gulp.src(path.src.pug)
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
			return{
				title: 'Error pug',
				message: err.message
			}})
		}))
		.pipe(pug({pretty: true}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});
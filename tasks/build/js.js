const gulp = require('gulp');
const {reload}= require('browser-sync');
const named = require('vinyl-named');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const path = require('../config');

const webpackConfig = require('../webpack.config');
const Log = require('../log');

gulp.task('js-build', (callback) => {
	return gulp.src(path.src.js)
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
						return {
						title: 'Error js',
						message: err.message
					}
				})
		}))
		.pipe(named())
		.pipe(webpackStream(webpackConfig, webpack, done))
		.pipe(gulp.dest(path.build.js))
		.on('data', () => {
				gulp.src(path.src.js, {read: false})
					.pipe(reload({stream:true}))
				callback();
		});
});

let done = (err, stats) => {
	if (err) {
		new Log('Webpack', err).error();
	}
	new Log('Webpack', stats.toString({
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: true,
		children: false,
		version: false,
		cached: false,
		cachedAssets: false,
		reasons: true,
		source: true,
		errorDetails: true
	})).info();
}

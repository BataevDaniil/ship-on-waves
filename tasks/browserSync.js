const gulp = require('gulp');
const browserSync = require('browser-sync');

const config = require('./config');

const browserSyncConfig = {
	logPrefix: 'server',
	port: config.browserSync.port,
	ui: {
		port: config.browserSync.port + 1,
	},
	server: {
		baseDir: config.browserSync.baseDir,
		// directory: true
	}
};

gulp.task('browser-sync', () => {
	browserSync.init(browserSyncConfig);
});

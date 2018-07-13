const gulp = require('gulp');

const ngrok = require('ngrok');

const config = require('./config');
const Log = require('./log');

gulp.task('ngrok', () => {
	ngrok.connect({
		proto: 'http',
		addr: config.browserSync.port
	}, (err, url) => {
		let taskName = 'ngrok';
		if (err)
			new Log(taskName, err).error();
		if (url)
			new Log(taskName, url).info();
	});
});

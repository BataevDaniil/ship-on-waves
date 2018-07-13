const gulp = require('gulp');

const path = require('./tasks/config');

const requireDir = require('require-dir');
requireDir('./tasks', { recurse: true });

gulp.task('build',
	gulp.series('clean',
	gulp.parallel(
	              'js-build',
	              'pug-build',
	              'sass-build',
	              'public')));

gulp.task('watch', () => {
	gulp.watch(path.watch.pug, gulp.series('pug-build'));
	gulp.watch(path.watch.sass, gulp.series('sass-build'));
	gulp.watch(path.watch.img, gulp.series('img'));
});

gulp.task('default',
	gulp.series('build',
	gulp.parallel(
	              'img',
	              'browser-sync',
	              'watch')));

gulp.task('gh-pages', gulp.series('build', 'img'));

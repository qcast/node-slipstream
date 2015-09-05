var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

gulp.task('compile', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {});

gulp.task('server', ['compile', 'styles'], function() {
	// Start the server at the beginning of the task 
	server.run(['dist/app.js']);

	// Restart the server when file changes 
	gulp.watch(['dist/**/*.html'], server.notify);
	gulp.watch(['dist/**/*.scss'], server.notify);
	gulp.watch(['dist/**/*.js'], server.notify);
});

gulp.task('serve', function() {
	nodemon({
		// the script to run the app
		script: 'dist/app.js',
		ext: 'js'
	});
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.scss'], ['styles']);
	gulp.watch(['src/**/*.js'], ['compile']);
});

gulp.task('default', ['compile']);

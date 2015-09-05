var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');

gulp.task('compile', function() {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
	return gulp.src('views/**/*')
		.pipe(gulp.dest('dist/views'));
});

gulp.task('styles', function() {
	return gulp.src('styles/**/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('dist/static/'));
});

gulp.task('server', ['compile', 'views', 'styles'], function() {
	// Start the server at the beginning of the task 
	server.run(['dist/app.js']);

	// Restart the server when file changes 
	gulp.watch(['dist/**/*.html'], server.notify);
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
	gulp.watch(['styles/**/*.css'], ['styles']);
	gulp.watch(['src/**/*.js'], ['compile']);
	gulp.watch(['views/**/*'], ['views']);
});

gulp.task('default', ['compile']);

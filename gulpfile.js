var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');

var browerifyConfig = {
	entries: './src/js/LYReactMobileRefresh.js',
	debug: true
};

gulp.task('css', function(){
	gulp.src('./src/css/*.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function(){
	browserify(browerifyConfig)
		.transform("babelify", {presets: ["es2015", "react"]})
		.bundle()
		.on('error',console.error.bind(console))
		.pipe(source('lyrmr.js'))
		.pipe(buffer())
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['css', 'js']);
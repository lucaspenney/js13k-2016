var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var fs = require('fs');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');
var htmlreplace = require('gulp-html-replace');
var through = require('through2');

//Chalk colors
var error = chalk.bold.red;
var success = chalk.green;
var regular = chalk.white;

gulp.task('watch', (done) => {
	gulp.watch('./src/js/**/*.js', gulp.series('build-js', 'zip', 'check'));
	gulp.watch('./src/html/**/*.html', gulp.series('build-html', 'check'));
	gulp.watch('./src/css/**/*.css', gulp.series('build-css', 'check'));
	gulp.watch('./src/assets/**/*', gulp.series('build-html', 'check'));
});

gulp.task('init', (done) => {
	//Create our directory structure
	mkdirp('./src', function(err) {
		mkdirp('./src/js', function(err) {
			mkdirp('./src/html', function(err) {
				mkdirp('./src/css', function(err) {
					mkdirp('./src/assets', function(err) {
						done();
					});
				});
			});
		});
	});
});

gulp.task('compile-js', (done) => {
	return gulp.src('src/js/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./temp/'));
});

gulp.task('build-js', gulp.series('compile-js', (done) => {
	return gulp.src('./temp/index.js')
		.pipe(uglify())
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('./build/'));
}));

gulp.task('build-html', (done) => {
	return gulp.src('./src/html/**/*.html')
	.pipe(htmlreplace({
			images: {
				src: gulp.src('./src/assets/img/*.gif')
						.pipe(through.obj(function(file, enc, cb) {
							var name = file.path.substr(file.path.lastIndexOf('/') + 1);
							var data = new Buffer(file.contents).toString('base64');
						file.contents = new Buffer('<img class="' + name + '" src="data:image/gif;base64,' + data + '">');
						cb(null, file)
					})),
				tpl: '%s'
			}
		}))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('build-css', (done) => {
	return gulp.src('./src/css/**/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./build/'));
});

gulp.task('build-assets', (done) => {
	done();
});

gulp.task('zip', (done) => {
	return gulp.src('./build/**/*')
		.pipe(zip('entry.zip')) //gulp-zip performs compression by default
		.pipe(gulp.dest('dist'));
});

gulp.task('check', gulp.series('zip', (done) => {
	var stats = fs.statSync("./dist/entry.zip")
	var fileSize = stats.size;
	if (fileSize > 13312) {
		console.log(error("Your zip compressed game is larger than 13kb (13312 bytes)!"))
		console.log(regular("Your zip compressed game is " + fileSize + " bytes"));
	} else {
		console.log(success("Your zip compressed game is " + fileSize + " bytes."));
	}
	done();
}));

gulp.task('build', gulp.series('build-html', 'build-js', 'build-assets', 'check', (done) => {
	done();
}));
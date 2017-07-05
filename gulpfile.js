const gulp        = require('gulp');
const clean       = require('gulp-clean');
const plumber     = require('gulp-plumber');
const sourcemaps  = require('gulp-sourcemaps');
const uglify      = require('gulp-uglify');
const babel       = require('gulp-babel');
const notify      = require('gulp-notify');
const concat      = require('gulp-concat');
const rename      = require('gulp-rename');

function reportError(error) {
  notify({
    title: `Task Failed [${error.plugin}]`,
    message: 'Check the terminal.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}

gulp.task('clean', () => {
  return gulp.src('dist/**/*', { read: false })
    .pipe(clean());
});

gulp.task('build', ['clean'], () => {
  return gulp.src(['src/*.module.js', 'src/*.js', '!src/*_test.js'])
    .pipe(plumber({ errorHandler: reportError }))
    .pipe(concat('mh-dragdrop-image.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
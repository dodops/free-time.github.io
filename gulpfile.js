var gulp 	    = require ( 'gulp' ),
	browserSync = require('browser-sync'),
	sass 				= require('gulp-sass'),
	cp          = require('child_process');

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/* Build the Jekyll Site */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
});

/* Rebuild Jekyll & do page reload */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/* Wait for jekyll-build, then launch the Server */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

gulp.task('sass', function () {
  return gulp.src('_sass/main.scss')
    .pipe(sass({
        includePaths: ['scss'],
        onError: browserSync.notify
    }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task( 'watch', function(){
	gulp.watch('_sass/**/*.scss', ['sass']);
	gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task( 'default', ['browser-sync', 'watch'] );
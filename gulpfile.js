var gulp = require('gulp')
var connect = require('gulp-connect')

// https://github.com/AveVlad/gulp-connect
gulp.task('connect', function() {
    /* jshint unused:false */
    connect.server({
        port: 5051
    })
})

gulp.task('default', ['connect'])
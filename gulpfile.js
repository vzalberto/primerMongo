var gulp    = require('gulp')
var concat  = require('gulp-concat')
var inject  = require('gulp-inject')
var rename  = require('gulp-rename')
var deletefile  = require('gulp-delete-file')

gulp.task('crea-route', function(){

    var regex = /\w*NEW\.pug/;

    gulp.src('./views/*NEW.pug')
        .pipe(rename(function (path) {
            path.basename   = path.basename.replace('NEW', '')
        }))
        .pipe(gulp.dest('./views/'))
        
        .pipe(rename(function (path) {
            path.extname   = '.js'
        }))
        .pipe(gulp.dest('./routes/'))
    
    gulp.src('./views/*.pug')
        .pipe(deletefile({
            reg : regex,
            deleteMatch : true
        }))
})

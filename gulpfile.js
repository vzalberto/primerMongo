var gulp    = require('gulp')
var concat  = require('gulp-concat')
var inject  = require('gulp-inject')
var rename  = require('gulp-rename')
var deletefile  = require('gulp-delete-file')
var map = require('map-stream')
var file = require('gulp-file')

// gulp.task('crea-route', function(){

//     var regex = /\w*NEW\.pug/;

//     gulp.src('./views/*NEW.pug')
//         .pipe(rename(function (path) {
//             path.basename   = path.basename.replace('NEW', '')
//         }))
//         .pipe(gulp.dest('./views/'))
        
//         .pipe(rename(function (path) {
//             path.extname   = '.js'
//         }))
//         .pipe(gulp.dest('./routes/'))
    
//     gulp.src('./views/*.pug')
//         .pipe(deletefile({
//             reg : regex,
//             deleteMatch : true
//         }))
// })

// gulp.task('paramet', function(){
//     console.log(process.argv)
// })

gulp.task('crear', function(){
    var archivo = process.argv[4]
    var contenidoPug = 'extends layout'
    var contenidoJS = 'var express = require(\'express\')'

    var appRutas = '\nvar ' + archivo + ' = require(\'./routes/' + archivo + '\')'
    var appRecursos = '\napp.use(\'' + archivo +  '\', ' + archivo + ')'

    var appRutasComment = '\n//hola-rutas'
    var appRecursosComment = '\n//hola-recursos'

    // console.log(appRutas)
    // console.log(appRecursos)
    
    gulp.src('')
        .pipe(file(archivo+'.pug', contenidoPug))
        .pipe(gulp.dest('./views'))

    gulp.src('')
        .pipe(file(archivo+'.js', contenidoJS))
        .pipe(gulp.dest('./routes/'))

    gulp.src('./app.js')
        .pipe(map(function(file, cb){
            var contenidoApp = file.contents.toString()
            contenidoApp = contenidoApp.replace(appRutasComment, appRutas + appRutasComment)
            contenidoApp = contenidoApp.replace(appRecursosComment, appRecursos + appRecursosComment)
            file.contents = new Buffer(contenidoApp)
            cb(null, file)
        }))
        .pipe(gulp.dest('./'))

    
})
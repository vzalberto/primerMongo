var gulp    = require('gulp')
var map = require('map-stream')
var file = require('gulp-file')

gulp.task('crear', function(){
    var archivo = process.argv[4]
    var contenidoPug = 'extends layout'
    var contenidoJS = 'var express = require(\'express\')'

    var appRutas = '\nvar ' + archivo + ' = require(\'./routes/' + archivo + '\')'
    var appRecursos = '\napp.use(\'' + archivo +  '\', ' + archivo + ')'

    var appRutasComment = '\n//hola-rutas'
    var appRecursosComment = '\n//hola-recursos'
    
    gulp.src('', { nodir: true })
        .pipe(file(archivo+'.pug', contenidoPug))
        .pipe(gulp.dest('./views'))

    gulp.src('', { nodir: true })
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
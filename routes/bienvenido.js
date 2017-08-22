var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  var db = req.db;
  var usuarios = db.get('usuarios');

  usuarios.count({
    usuario: req.body.txtUsuario,
    pass: req.body.txtClave
  }, {}).then(function(cuenta){

    if (cuenta > 0)
      res.render('bienvenido', { title: 'Express', nombre: req.body.txtUsuario });
    else
      res.render('index', { title: 'NEL', mensaje: 'Usuario no encontrado'});

    db.close()

  }) .catch(
    function(reason) {
      console.log('Rejected promise:  ('+reason+')')
    })
});

module.exports = router;
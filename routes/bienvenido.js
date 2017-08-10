var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
  console.log(req.body.txtClave);
  console.log(req.body.txtUsuario);
  var db = req.db;
  var usuarios = db.get('usuarios');
  usuarios.find({usuario: req.body.txtUsuario, pass: req.body.txtClave }, {}, function(e, docs){
    if(docs.length > 0)
      res.render('bienvenido', { title: 'Express', datos: docs });
    else
      res.render('index', { title: 'NEL'});
  });
});

module.exports = router;

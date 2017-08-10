var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var refacciones = db.get('refacciones');
  refacciones.find({}, {}, function(e, docs){
    res.render('tabla', { title: 'Express', datos: docs });
  });
});

module.exports = router;

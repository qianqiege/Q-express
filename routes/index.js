var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test',{title:"test"});
});

router.get('/ExceptionData', function(req, res, next) {
  res.render('ExceptionData',{title:"ExceptionData"});
});

router.get('/FetalhHeart', function(req, res, next) {
  res.render('FetalhHeart',{title:"FetalhHeart"});
});
module.exports = router;

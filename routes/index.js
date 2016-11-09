var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test',{title:"test"});
});

router.get('/newRecord', function(req, res, next) {
  res.render('newRecord',{title:"建立健康档案"});
});

module.exports = router;

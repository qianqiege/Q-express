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

router.get('/newRecord', function(req, res, next) {
  res.render('newRecord',{title:"建立健康档案"});
});

router.get('/userList', function(req, res, next) {
  res.render('userList',{title:"患者列表"});
});

router.get('/fileQuery', function(req, res, next) {
  res.render('fileQuery',{title:"档案查询"});
});

router.get('/project', function(req, res, next) {
  res.render('project',{title:"档案查询"});
});

router.get('/project1', function(req, res, next) {
  res.render('project1',{title:"档案查询"});
});

module.exports = router;

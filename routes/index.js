var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/test', function(req, res, next) {
    res.render('test', {title: "test"});
});

router.get('/ExceptionData', function(req, res, next) {
    res.render('ExceptionData', {title: "异常数据查询"});
});

router.get('/healthDetection', function(req, res, next) {
    res.render('healthDetection', {title: "健康监测"});
});

router.get('/healthInfoEntry', function(req, res, next) {
    res.render('healthInfoEntry', {title: "体检信息录入"});
});

router.get('/blood_pressure', function(req, res, next) {
    res.render('blood_pressure', {title: "血压监测"});
});

router.get('/blood_sugar', function(req, res, next) {
    res.render('blood_sugar', {title: "血糖监测"});
});

router.get('/temperature', function(req, res, next) {
    res.render('temperature', {title: "体温监测"});
});

router.get('/weight', function(req, res, next) {
    res.render('weight', {title: "体重监测"});
});

router.get('/heart_rate', function(req, res, next) {
    res.render('heart_rate', {title: "心率监测"});
});

router.get('/infoEntry', function(req, res, next) {
    res.render('infoEntry', {title: "体检信息录入"});
});

router.get('/newRecord', function(req, res, next) {
    res.render('newRecord', {title: "建立健康档案"});
});

router.get('/userList', function(req, res, next) {
    res.render('userList', {title: "患者列表"});
});

router.get('/doctorsList', function(req, res, next) {
    res.render('doctorsList', {title: "医生列表"});
});

router.get('/roles', function(req, res, next) {
    res.render('roles', {title: "角色管理"});
});

router.get('/add_friends', function(req, res, next) {
    res.render('add_friends', {title: "新朋友列表"});
});

router.get('/fileQuery', function(req, res, next) {
    res.render('fileQuery', {title: "档案查询"});
});

router.get('/project2', function(req, res, next) {
    res.render('project2', {title: "档案查询"});
});

router.get('/project1', function(req, res, next) {
    res.render('project1', {title: "档案查询"});
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: "登录"});
});

router.get('/project3', function(req, res, next) {
    res.render('project3', {title: "康复科"});
});
router.get('/adminIndex', function(req, res, next) {
    res.render('adminIndex', {title: "管理首页"});
});
module.exports = router;

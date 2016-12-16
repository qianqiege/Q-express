var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/index', {title: '首页'});
});

router.get('/exceptionData', function(req, res, next) {
    res.render('dynamicManagement/exceptionData', {title: "异常管理"});
});

router.get('/healthDetection', function(req, res, next) {
    res.render('physicalExamination/healthDetection', {title: "健康监测"});
});

router.get('/healthInfoEntry', function(req, res, next) {
    res.render('physicalExamination/healthInfoEntry', {title: "体检信息录入"});
});

router.get('/bloodPressure', function(req, res, next) {
    res.render('physicalExamination/bloodPressure', {title: "血压监测"});
});

router.get('/bloodSugar', function(req, res, next) {
    res.render('physicalExamination/bloodSugar', {title: "血糖监测"});
});

router.get('/temperature', function(req, res, next) {
    res.render('physicalExamination/temperature', {title: "体温监测"});
});

router.get('/weight', function(req, res, next) {
    res.render('physicalExamination/weight', {title: "体重监测"});
});

router.get('/heartRate', function(req, res, next) {
    res.render('physicalExamination/heartRate', {title: "心率监测"});
});

router.get('/infoEntry', function(req, res, next) {
    res.render('physicalExamination/infoEntry', {title: "体检信息录入"});
});

router.get('/newRecord', function(req, res, next) {
    res.render('file/newRecord', {title: "建立健康档案"});
});

router.get('/patientList', function(req, res, next) {
    res.render('file/patientList', {title: "客户列表"});
});

router.get('/doctorsList', function(req, res, next) {
    res.render('role/doctorsList', {title: "健康管理师列表"});
});

router.get('/roles', function(req, res, next) {
    res.render('role/roles', {title: "角色管理"});
});

router.get('/add_friends', function(req, res, next) {
    res.render('friendManagement/add_friends', {title: "新朋友列表"});
});

router.get('/fileQuery', function(req, res, next) {
    res.render('file/fileQuery', {title: "档案查询"});
});

router.get('/diseaseLocation', function(req, res, next) {
    res.render('project/diseaseLocation', {title: "疾病定位"});
});

router.get('/diseaseLocationSearch', function(req, res, next) {
    res.render('project/diseaseLocationSearch', {title: "疾病定位查询"});
});

router.get('/programmeSearch', function(req, res, next) {
    res.render('project/programmeSearch', {title: "健康管理方案查询"});
});

router.get('/registeredPost', function(req, res, next) {
    res.render('registeredManagement/registeredPost', {title: "挂号"});
});


router.get('/healthManagement', function(req, res, next) {
    res.render('project/healthManagement', {title: "健康管理"});
});

router.get('/spine', function(req, res, next) {
    res.render('project/spine', {title: "档案查询"});
});

router.get('/spineSearch', function(req, res, next) {
    res.render('project/spineSearch', {title: "脊柱查询"});
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: "登录"});
});

router.get('/project3', function(req, res, next) {
    res.render('project/project3', {title: "康复科"});
});

router.get('/viewTDSSearch', function(req, res, next) {
    res.render('physicalExamination/viewTDSSearch', {title: "数字中医信息查询"});
});

router.get('/adminIndex', function(req, res, next) {
    res.render('home/adminIndex', {title: "管理首页"});
});

router.get('/page/jibin', function(req, res, next) {
    res.render('project/page_jibin', {title: "疾病谱定位表"});
});

router.get('/page/jiankang', function(req, res, next) {
    res.render('project/page_jiankang', {title: "健康管理方案"});
});

router.get('/page/spine', function(req, res, next) {
    res.render('project/page_spine', {title: "龙氏脊筑方案"});
});





module.exports = router;

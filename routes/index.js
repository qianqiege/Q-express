var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/index', {title: '首页', pjax: req.get('X-PJAX')});
});

router.get('/exceptionData', function(req, res, next) {
    res.render('dynamicManagement/exceptionData', {title: "异常管理", pjax: req.get('X-PJAX')});
});

router.get('/healthDetection', function(req, res, next) {
    res.render('physicalExamination/healthDetection', {title: "健康监测", pjax: req.get('X-PJAX')});
});

router.get('/healthInfoEntry', function(req, res, next) {
    res.render('physicalExamination/healthInfoEntry', {title: "体检信息录入", pjax: req.get('X-PJAX')});
});

router.get('/bloodPressure', function(req, res, next) {
    res.render('physicalExamination/bloodPressure', {title: "血压监测", pjax: req.get('X-PJAX')});
});

router.get('/bloodSugar', function(req, res, next) {
    res.render('physicalExamination/bloodSugar', {title: "血糖监测", pjax: req.get('X-PJAX')});
});

router.get('/temperature', function(req, res, next) {
    res.render('physicalExamination/temperature', {title: "体温监测", pjax: req.get('X-PJAX')});
});

router.get('/weight', function(req, res, next) {
    res.render('physicalExamination/weight', {title: "体重监测", pjax: req.get('X-PJAX')});
});

router.get('/heartRate', function(req, res, next) {
    res.render('physicalExamination/heartRate', {title: "心率监测", pjax: req.get('X-PJAX')});
});

router.get('/infoEntry', function(req, res, next) {
    res.render('physicalExamination/infoEntry', {title: "体检信息录入", pjax: req.get('X-PJAX')});
});

router.get('/newRecord', function(req, res, next) {
    res.render('file/newRecord', {title: "建立健康档案", pjax: req.get('X-PJAX')});
});

router.get('/patientList', function(req, res, next) {
    res.render('file/patientList', {title: "客户列表", pjax: req.get('X-PJAX')});
});

router.get('/doctorsList', function(req, res, next) {
    res.render('role/doctorsList', {title: "健康管理师列表", pjax: req.get('X-PJAX')});
});

router.get('/roles', function(req, res, next) {
    res.render('role/roles', {title: "角色管理", pjax: req.get('X-PJAX')});
});

router.get('/add_friends', function(req, res, next) {
    res.render('friendManagement/add_friends', {title: "新朋友列表", pjax: req.get('X-PJAX')});
});

router.get('/fileQuery', function(req, res, next) {
    res.render('file/fileQuery', {title: "档案查询", pjax: req.get('X-PJAX')});
});

router.get('/diseaseLocation', function(req, res, next) {
    res.render('project/diseaseLocation', {title: "疾病定位", pjax: req.get('X-PJAX')});
});

router.get('/diseaseLocationSearch', function(req, res, next) {
    res.render('project/diseaseLocationSearch', {title: "疾病定位查询", pjax: req.get('X-PJAX')});
});

router.get('/programmeSearch', function(req, res, next) {
    res.render('project/programmeSearch', {title: "健康管理方案查询", pjax: req.get('X-PJAX')});
});

router.get('/registeredPost', function(req, res, next) {
    res.render('registeredManagement/registeredPost', {title: "挂号", pjax: req.get('X-PJAX')});
});


router.get('/healthManagement', function(req, res, next) {
    res.render('project/healthManagement', {title: "健康管理", pjax: req.get('X-PJAX')});
});

router.get('/spine', function(req, res, next) {
    res.render('project/spine', {title: "档案查询", pjax: req.get('X-PJAX')});
});

router.get('/spineSearch', function(req, res, next) {
    res.render('project/spineSearch', {title: "脊柱查询", pjax: req.get('X-PJAX')});
});

router.get('/login', function(req, res, next) {
    res.render('login', {title: "登录", pjax: req.get('X-PJAX')});
});

router.get('/project3', function(req, res, next) {
    res.render('project/project3', {title: "康复科", pjax: req.get('X-PJAX')});
});

router.get('/viewTDSSearch', function(req, res, next) {
    res.render('physicalExamination/viewTDSSearch', {title: "数字中医信息查询", pjax: req.get('X-PJAX')});
});

router.get('/adminIndex', function(req, res, next) {
    res.render('home/adminIndex', {title: "管理首页", pjax: req.get('X-PJAX')});
});

router.get('/page/jibin', function(req, res, next) {
    res.render('project/page_jibin', {title: "疾病谱定位表", pjax: req.get('X-PJAX')});
});

router.get('/page/jiankang', function(req, res, next) {
    res.render('project/page_jiankang', {title: "健康管理方案", pjax: req.get('X-PJAX')});
});

router.get('/page/spine', function(req, res, next) {
    res.render('project/page_spine', {title: "龙氏脊筑方案", pjax: req.get('X-PJAX')});
});

router.get('/page/diabetes-evaluation', function(req, res, next) {
    res.render('plugin/diabetes', {title: "糖尿病风险评估"});
});



module.exports = router;

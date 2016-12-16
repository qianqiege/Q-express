var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '首页'
    });
});

router.get('/test', function (req, res, next) {
    res.render('test', {
        title: "test"
    });
});


router.get('/exceptionData', function (req, res, next) {
    res.render('exceptionData', {
        title: "异常管理"
    });
});

router.get('/healthDetection', function (req, res, next) {
    res.render('healthDetection', {
        title: "健康监测"
    });
});

router.get('/healthInfoEntry', function (req, res, next) {
    res.render('healthInfoEntry', {
        title: "体检信息录入"
    });
});

router.get('/bloodPressure', function (req, res, next) {
    res.render('bloodPressure', {
        title: "血压监测"
    });
});

router.get('/bloodSugar', function (req, res, next) {
    res.render('bloodSugar', {
        title: "血糖监测"
    });
});

router.get('/temperature', function (req, res, next) {
    res.render('temperature', {
        title: "体温监测"
    });
});

router.get('/weight', function (req, res, next) {
    res.render('weight', {
        title: "体重监测"
    });
});

router.get('/heartRate', function (req, res, next) {
    res.render('heartRate', {
        title: "心率监测"
    });
});

router.get('/infoEntry', function (req, res, next) {
    res.render('infoEntry', {
        title: "体检信息录入"
    });
});

router.get('/newRecord', function (req, res, next) {
    res.render('newRecord', {
        title: "建立健康档案"
    });
});

router.get('/patientList', function (req, res, next) {
    res.render('patientList', {
        title: "患者列表"
    });
});

router.get('/doctorsList', function (req, res, next) {
    res.render('doctorsList', {
        title: "医生列表"
    });
});

router.get('/roles', function (req, res, next) {
    res.render('roles', {
        title: "角色管理"
    });
});

router.get('/add_friends', function (req, res, next) {
    res.render('add_friends', {
        title: "新朋友列表"
    });
});

router.get('/fileQuery', function (req, res, next) {
    res.render('fileQuery', {
        title: "档案查询"
    });
});

router.get('/diseaseLocation', function (req, res, next) {
    res.render('diseaseLocation', {
        title: "疾病定位"
    });
});

router.get('/diseaseLocationSearch', function (req, res, next) {
    res.render('diseaseLocationSearch', {
        title: "疾病定位查询"
    });
});

router.get('/programmeSearch', function (req, res, next) {
    res.render('programmeSearch', {
        title: "健康管理方案查询"
    });
});

router.get('/registeredPost', function (req, res, next) {
    res.render('registeredPost', {
        title: "挂号"
    });
});


router.get('/project2', function (req, res, next) {
    res.render('project2', {
        title: "档案查询"
    });
});

router.get('/project1', function (req, res, next) {
    res.render('project1', {
        title: "档案查询"
    });
});

router.get('/spineSearch', function (req, res, next) {
    res.render('spineSearch', {
        title: "脊柱查询"
    });
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: "登录"
    });
});

router.get('/project3', function (req, res, next) {
    res.render('project3', {
        title: "康复科"
    });
});

router.get('/viewTDSSearch', function (req, res, next) {
    res.render('viewTDSSearch', {
        title: "数字中医信息查询"
    });
});

router.get('/adminIndex', function (req, res, next) {
    res.render('adminIndex', {
        title: "管理首页"
    });
});

router.get('/page/jibin', function (req, res, next) {
    res.render('page_jibin', {
        title: "疾病谱定位表"
    });
});

router.get('/page/jiankang', function (req, res, next) {
    res.render('page_jiankang', {
        title: "健康管理方案"
    });
});

router.get('/page/spine', function (req, res, next) {
    res.render('page_spine', {
        title: "龙氏脊柱方案"
    });
});

module.exports = router;
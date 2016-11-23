/**
* Ajax 封装
*
* @param ajaxUrl {String} 请求地址
* @param ajaxType {String} 请求类型，例如 get, post
* @param ajaxData {(String｜Object)} 携带的数据，如果
* @param callbackFunc {Function} 回调函数
* @param callbackFuncArgus {*=} 回调函数携带参数，主要用于区分请求发起者（可选）
* @param ajaxExtendObject {Object=} Ajax 附加参数（可选）
* @return void
* @author jshensh@126.com 2016-11-23
*/
var doAjax = function(ajaxUrl, ajaxType, ajaxData, callbackFunc) {
    var ajaxObj = {
        type: ajaxType,
        url: ajaxUrl,
        dataType: 'json',
        timeout: 5000,
        data: ajaxData,
        success: function(re) {
            if (typeof arguments[4] !== "undefined") {
                callbackFunc(re, 1, callbackFuncArgus);
            } else {
                callbackFunc(re, 1);
            }
        },
        error: function(XMLHttpRequest, status) {
            if (typeof arguments[4] !== "undefined") {
                callbackFunc({
                    "type": ajaxType,
                    "url": ajaxUrl,
                    "data": ajaxData,
                    "reponseText":XMLHttpRequest.responseText || ""
                }, 0, callbackFuncArgus);
            } else {
                callbackFunc({
                    "type": ajaxType,
                    "url": ajaxUrl,
                    "data": ajaxData,
                    "reponseText":XMLHttpRequest.responseText || ""
                }, 0);
            }
        }
    };
    if (typeof arguments[5] === "object") {
        $.extend(ajaxObj, arguments[5]);
    }
    ajaxObj.beforeSend = function (XHR) {
        XHR.setRequestHeader('access-authorization', $.cookie('access_token') || "");
    };
    jQuery.ajax(ajaxObj);
};

/**
* 跳转至登录页
*
* @return void
* @author jshensh@126.com 2016-11-23
*/
var gotoLogin = function() {
    if (location.href.indexOf("/login") === -1) {
        location.href = "/login";
        return true;
    }
};

$(function() {
    /**
    * 创建菜单
    *
    * @param menuObj {String} 菜单对象
    * @return void
    * @author jshensh@126.com 2016-11-23
    */
    var createMenu = function(menuObj) {
        if (menuObj["children"].length) {
            var baseTemplate = '<li class="site-menu-item has-sub"><a href="javascript:void(0)"><i class="site-menu-icon{__icon__}" aria-hidden="true"></i><span class="site-menu-title">{__title__}</span><span class="site-menu-arrow"></a></span><ul class="site-menu-sub">{__subMenus__}</ul></li>',
                subMenuTemplate = '<li class="site-menu-item{__active__}"><a class="animsition-link" href="{__href__}"><span class="site-menu-title">{__title__}</span></a></li>'
                subMenus=[];
            for (var i = 0; i<menuObj["children"].length; i++) {
                subMenus.push(
                    subMenuTemplate.replace(/\{__href__\}/, menuObj["children"][i]["url"])
                                   .replace(/\{__title__\}/, " " + menuObj["children"][i]["name"])
                                   .replace(/\{__active__\}/, location.pathname === menuObj["children"][i]["url"] ? " active" : "")
                );
            }
            baseTemplate = baseTemplate.replace(/\{__title__\}/, menuObj["name"])
                                       .replace(/\{__subMenus__\}/, subMenus.join(""))
                                       .replace(/\{__icon__\}/, " " + menuObj["icon"]);
        } else {
            var baseTemplate = '<li class="site-menu-item{__active__}"><a class="animsition-link" href="{__href__}"><i class="site-menu-icon{__icon__}" aria-hidden="true"></i><span class="site-menu-title">{__title__}</span></a></li>';
            baseTemplate = baseTemplate.replace(/\{__href__\}/, menuObj["url"])
                                       .replace(/\{__active__\}/, location.pathname === menuObj["url"] ? " active" : "")
                                       .replace(/\{__title__\}/, menuObj["name"])
                                       .replace(/\{__icon__\}/, " " + menuObj["icon"]);
        }
        $("ul.site-menu").append(baseTemplate);
    };

    /**
    * 获取菜单
    *
    * @return void
    * @author jshensh@126.com 2016-11-23
    */
    var getMenu = function() {
        doAjax("http://192.168.1.229:3000/api/v1/menus", "get", {},
            function(data, status) {
                if (status) {
                    if (data["data"]) {
                        for (var i = 0; i < data["data"].length; i++) {
                            createMenu(data["data"][i]);
                        }
                    }
                } else {
                    gotoLogin();
                }
            }
        );
    };

    // 判断用户登录状态
    doAjax("http://192.168.1.229:3000/api/v1/users/current_user", "get", {},
        function(data, status) {
            if (status) {
                if (data["access_token"]) {
                    if (location.href.indexOf("/login") > -1) {
                        location.href = "/";
                        return true;
                    }
                    getMenu();
                } else {
                    gotoLogin();
                }
            } else {
                gotoLogin();
            }
        }
    );

    // HeartBeat
    if (location.href.indexOf("/login") === -1) {
        setInterval(function() {
            doAjax("http://192.168.1.229:3000/api/v1/users/current_user", "get", {},
                function(data, status) {
                    if (status) {
                        if (!data["access_token"]) {
                            gotoLogin();
                        }
                    } else {
                        gotoLogin();
                    }
                }
            );
        }, 60000);
    }
});

/**
* Ajax 封装
*
* @param ajaxUrl {String} 请求地址
* @param ajaxType {String} 请求类型，例如 get, post
* @param ajaxData {(String｜Object)} 携带的数据，如果为空就传入空对象 {}
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
                callbackFunc(re, 1, arguments[4]);
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
                    "reponseText": XMLHttpRequest.responseText || ""
                }, 0, arguments[4]);
            } else {
                callbackFunc({
                    "type": ajaxType,
                    "url": ajaxUrl,
                    "data": ajaxData,
                    "reponseText": XMLHttpRequest.responseText || ""
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
* 获取 GET 传参方式得到的参数
*
* @param name {String} Key
* @return String Key 所对应的 Value 或者空字符串
* @author jshensh@126.com 2016-11-25
*/
var getvl = function(name) {
   var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
   if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
   return "";
};

/**
* 验证身份证号合法性
*
* @param idcard {String} 身份证号
* @return bool 是否合法
* @author jshensh@126.com 2016-11-28
*/
var checkIdCard = function(idcard) {
    if (idcard.length !== 18) {
        return false;
    }
    var idcard_base = idcard.substr(0, 17),
        verify_code = idcard.substr(17, 1),
        factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        verify_code_list = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'],
        total = 0;
    for (i = 0; i < 17; i++){
        total += ~~idcard_base.substr(i, 1) * factor[i];
    }
    var mod = total % 11;
    if (verify_code == verify_code_list[mod]){
        return true;
    } else {
        return false;
    }
}

/**
* jQuery val 的替代方法，增加了 select2 的赋值，checkbox 与 radio 赋值的校验
*
* @param value {(String | Object)=} 值
* @return Object
* @author jshensh@126.com 2016-11-30
*/
$.fn.customVal = function() {
    if (arguments.length > 1) {
        return this;
    }
    var tag = this.prop("tagName").toLowerCase();
    if (tag === "select") {
        var usedSelect2 = true;
        try {
            this.select2("val");
        } catch (e) {
            usedSelect2 = false;
        }
        if (!arguments.length) {
            return this.val();
        } else {
            if (typeof arguments[0] !== "object") {
                return this;
            }
            if (usedSelect2) {
                return this.select2().val(arguments[0]).trigger("change");
            } else {
                return this.val(arguments[0]);
            }
        }
    } else if (tag === "input") {
        var type = this.attr("type") || "text";
        switch (type) {
            case "checkbox":
            case "radio":
                if (!arguments.length) {
                    var result = [];
                    this.filter(":checked").each(function() {
                        result.push($(this).val());
                    });
                    return result;
                } else {
                    if (typeof arguments[0] !== "object") {
                        return this;
                    }
                    return this.val(arguments[0]);
                }
                break;
            default:
                if (!arguments.length) {
                    return this.val();
                } else {
                    return this.val(arguments[0]);
                }
                break;
        }
    } else {
        return this.val();
    }
    console.log(this);
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
            for (var i = 0; i < menuObj["children"].length; i++) {
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

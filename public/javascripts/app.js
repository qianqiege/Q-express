window.baseUrl = "http://192.168.1.229:3000/api/v1"
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
    ajaxData["_t"] = new Date().getTime();
    var dataType = typeof arguments[5] !== "undefined" && typeof arguments[5]["dataType"] !== "undefined" ? arguments[5]["dataType"] : "json";
    var ajaxObj = {
        type: ajaxType,
        url: ajaxUrl,
        dataType: dataType,
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
    var authToken = false, pjax = false;
    if (typeof arguments[5] === "object") {
        if (typeof arguments[5]["access-authorization"] !== "undefined") {
            authToken = arguments[5]["access-authorization"];
            delete arguments[5]["access-authorization"];
        }
        if (typeof arguments[5]["X-PJAX"] !== "undefined") {
            pjax = arguments[5]["X-PJAX"];
            delete arguments[5]["X-PJAX"];
        }
        $.extend(ajaxObj, arguments[5]);
    }
    ajaxObj.beforeSend = function (XHR) {
        XHR.setRequestHeader('access-authorization', authToken || $.cookie('access_token') || "");
        if (pjax) {
            XHR.setRequestHeader('X-PJAX', pjax);
        }
    };
    jQuery.ajax(ajaxObj);
};

/**
* Ajax 封装 (Promise)
*
* @param ajaxUrl {String} 请求地址
* @param ajaxType {String} 请求类型，例如 get, post
* @param ajaxData {Object=} 携带的数据（可选）
* @param ajaxExtendObject {Object=} Ajax 附加参数（可选）
* @return Object
* @author jshensh@126.com 2016-12-22
*/
var doAjaxPromise = function(ajaxUrl, ajaxType, ajaxData) {
    var ajaxData = (typeof arguments[2] === "object") ? arguments[2] : {};
    ajaxData["_t"] = new Date().getTime();
    var dataType = typeof arguments[5] !== "undefined" && typeof arguments[5]["dataType"] !== "undefined" ? arguments[5]["dataType"] : "json";
    var ajaxObj = {
        type: ajaxType,
        url: ajaxUrl,
        dataType: dataType,
        timeout: 5000,
        data: ajaxData,
    };
    var authToken = false, pjax = false;
    if (typeof arguments[5] === "object") {
        if (typeof arguments[5]["access-authorization"] !== "undefined") {
            authToken = arguments[5]["access-authorization"];
            delete arguments[5]["access-authorization"];
        }
        if (typeof arguments[5]["X-PJAX"] !== "undefined") {
            pjax = arguments[5]["X-PJAX"];
            delete arguments[5]["X-PJAX"];
        }
        $.extend(ajaxObj, arguments[5]);
    }
    ajaxObj.beforeSend = function (XHR) {
        XHR.setRequestHeader('access-authorization', authToken || $.cookie('access_token') || "");
        if (pjax) {
            XHR.setRequestHeader('X-PJAX', pjax);
        }
    };
    return jQuery.ajax(ajaxObj);
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
    if (!this.length) {
        return this;
    }
    if (arguments[0] === null) {
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
            if (typeof arguments[0] === "string") {
                try {
                    var tmp = JSON.parse(arguments[0]);
                    arguments[0] = tmp;
                } catch(e) {
                    arguments[0] = [arguments[0]];
                }
            }
            if (typeof arguments[0] !== "object") {
                return this;
            }
            var optionsDom = this.find("option"), valueObj = [];
            for (var oi = 0; oi < optionsDom.length; oi++) {
                valueObj.push(optionsDom[oi].innerHTML);
            }
            for (var i = 0; i < arguments[0].length; i++) {
                if (valueObj.indexOf(arguments[0][i]) < 0) {
                    this.append($('<option />').attr("value", arguments[0][i]).text(arguments[0][i]));
                }
            }
            if (usedSelect2) {
                return this.select2().val(arguments[0]).trigger("change");
            } else {
                return this.val(arguments[0]);
            }
        }
    } else if (tag === "textarea") {
        if (!arguments.length) {
            return this.val();
        } else {
            return this.val(arguments[0]);
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
                    if (typeof arguments[0] === "string") {
                        try {
                            var tmp = JSON.parse(arguments[0]);
                            arguments[0] = tmp;
                        } catch(e) {
                            arguments[0] = [arguments[0]];
                        }
                    }
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
};

/**
* 跳转至登录页
*
* @return void
* @author jshensh@126.com 2016-11-23
*/
var gotoLogin = function() {
    if (location.href.indexOf("/login") === -1) {
        var replaceReg = new RegExp("^" + location.origin);
        location.href = "/login?from=" + (encodeURIComponent(location.href.replace(replaceReg, "")));
        return true;
    }
};

/**
* DateTime Format Prototype
*
* @param fmt {String} 输出格式
* @return String 指定日期
* @author jshensh@126.com 2016-12-05
*/
Date.prototype.Format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth()+3)/3),
        "S"  : this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("("+ k +")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

/**
* 设置菜单选中项
*
* @return void
* @author jshensh@126.com 2017-01-09
*/
var setMenu = function(pathname) {
    if (typeof pathname === "string") {
        var thisLi = $(".site-menu a[href='" + pathname + "']").parent();
    } else if (typeof pathname === "object") {
        var thisLi = $(pathname).parent();
    } else {
        return false;
    }
    var parentLi = thisLi.parent().parent().hasClass("has-sub") && thisLi.parent().parent();
    if (!thisLi.length) {
        return false;
    }
    $(".site-menu .open").removeClass("open");
    if (parentLi) {
        parentLi.addClass("open");
    }
    $(".site-menu-item").removeClass("active");
    thisLi.addClass("active");
};

/**
* PushState && Ajax
*
* @param aSelector {String} a 标签选择器
* @param divSelector {String} div 标签选择器
* @return void
* @author jshensh@126.com 2016-12-22
*/
var customPjax = function(aSelector, divSelector) {
    var pjaxEndEvent = $.Event('customPjax:end');

    var renderToDom = function(divSelector, data, newTitle) {
        data = data.replace(/<title>.*?<\/title>/, "");
        // $(".pjaxLoader").fadeOut(function() {
            var responseDom = $(data);
            $(divSelector).html(responseDom);
            if (!$(divSelector).find("script").length) {
                console.log($(divSelector).find("script"));
                responseDom.find('script').each(function() {
                    if (this.src) {
                        var script = document.createElement('script'), i, attrName, attrValue, attrs = this.attributes;
                        for (i = 0; i < attrs.length; i++) {
                            attrName = attrs[i].name;
                            attrValue = attrs[i].value;
                            script[attrName] = attrValue;
                        }
                        $(divSelector)[0].appendChild(script);
                    } else {
                        $.globalEval(this.text || this.textContent || this.innerHTML || '');
                    }
                }).promise().done(function() {
                    $(divSelector).fadeIn(function() {
                        document.title = newTitle;
                        $(document).trigger(pjaxEndEvent);
                        $(divSelector).find("a[data-plugin='customPjax']").each(function() {
                            customPjax(this, $(this).data("custom-pjax-render-to") || "#pjax");
                        });
                    });
                });
            } else {
                $(divSelector).fadeIn(function() {
                    document.title = newTitle;
                    $(document).trigger(pjaxEndEvent);
                    $(divSelector).find("a[data-plugin='customPjax']").each(function() {
                        customPjax(this, $(this).data("custom-pjax-render-to") || "#pjax");
                    });
                });
            }
        // });
    };

    $(aSelector).each(function() {
        var uri = $(this).attr('href');
        if (typeof uri === "undefined") {
            return true;
        }
        if (uri.match(/^javascript:/) || uri.match(/\#/)) {
            return true;
        }
        uri = uri.match(/^\//) ? uri : "/" + uri;
        $(this).on("click tap touchend", function(evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else {
                window.event.returnValue = false;
            }
            $(divSelector).fadeOut(function() {
                // $(".pjaxLoader").fadeIn(function() {
                    doAjax(uri, "get", {}, function(data, status) {
                        if (status && data) {
                            var newTitle = data.match(/<title>(.*?)<\/title>/)[1];
                            if (history.pushState) {
                                window.history.pushState('', newTitle, uri);
                                if (!arguments[2]) {
                                    setMenu(location.pathname);
                                }
                            }
                            renderToDom(divSelector, data, newTitle);
                        }
                    }, {}, {"X-PJAX": "true", "dataType": "text"});
                // });
            });

            return false;
        });
    });

    if (!customPjax.prototype.initialization) {
        customPjax.prototype.initialization = true;
        window.onpopstate = function(evt) {
            $(divSelector).fadeOut(function() {
                var uri = location.pathname;
                doAjax(uri, "get", {}, function(data, status) {
                    if (status && data) {
                        var newTitle = data.match(/<title>(.*?)<\/title>/)[1];
                        renderToDom(divSelector, data, newTitle);
                    }
                }, {}, {"X-PJAX": "true", "dataType": "text"});
            });
        };
    }
}

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
            var baseTemplate = '<li class="site-menu-item has-sub{__open__}"><a href="javascript:void(0)"><i class="site-menu-icon{__icon__}" aria-hidden="true"></i><span class="site-menu-title">{__title__}</span><span class="site-menu-arrow"></a></span><ul class="site-menu-sub">{__subMenus__}</ul></li>',
                subMenuTemplate = '<li class="site-menu-item{__active__}"><a class="animsition-link" href="{__href__}"><span class="site-menu-title">{__title__}</span></a></li>'
                subMenus=[],
                opened = false;
            for (var i = 0; i < menuObj["children"].length; i++) {
                if (location.pathname === menuObj["children"][i]["url"]) {
                    opened = true;
                }
                subMenus.push(
                    subMenuTemplate.replace(/\{__href__\}/, menuObj["children"][i]["url"])
                                   .replace(/\{__title__\}/, " " + menuObj["children"][i]["name"])
                                   .replace(/\{__active__\}/, location.pathname === menuObj["children"][i]["url"] ? " active" : "")
                );
            }
            baseTemplate = baseTemplate.replace(/\{__title__\}/, menuObj["name"])
                                       .replace(/\{__subMenus__\}/, subMenus.join(""))
                                       .replace(/\{__open__\}/, opened ? " open" : "")
                                       .replace(/\{__icon__\}/, " " + menuObj["icon"]);
        } else {
            var baseTemplate = '<li class="site-menu-item{__active__}"><a class="animsition-link" href="{__href__}"><i class="site-menu-icon{__icon__}" aria-hidden="true"></i><span class="site-menu-title">{__title__}</span></a></li>';
            baseTemplate = baseTemplate.replace(/\{__href__\}/, menuObj["url"])
                                       .replace(/\{__active__\}/, location.pathname === menuObj["url"] ? " active" : "")
                                       .replace(/\{__title__\}/, menuObj["name"])
                                       .replace(/\{__icon__\}/, " " + menuObj["icon"]);
        }


        $("ul.site-menu").append($(baseTemplate));
    };

    /**
    * 获取菜单
    *
    * @return void
    * @author jshensh@126.com 2016-11-23
    */
    var getMenu = function() {
        return doAjaxPromise(window.baseUrl + "/menus", "get")
            .done(function(data) {
                if (data["data"]) {
                    for (var i = 0; i < data["data"].length; i++) {
                        createMenu(data["data"][i]);
                    }
                }
            }).fail(function() {
                gotoLogin();
            });
    };

    // 判断用户登录状态
    doAjaxPromise(window.baseUrl + "/users/current_user", "get")
        .done(function(data) {
            if (data["access_token"]) {
                if (location.href.indexOf("/login") > -1) {
                    location.href = "/";
                    return true;
                }
                getMenu().then(function() {
                    $(".site-menu a[href!='javascript:void(0)']").on("click tap touchend", function() {
                        setMenu(this);
                    });
                    customPjax(".site-menu a[href!='javascript:void(0)']", "#page", true);
                    $(document).on('customPjax:end', function() {
                        $("select[data-plugin='select2']").each(function() {
                            $(this).select2();
                        });
                    });
                });
            } else {
                gotoLogin();
            }
        }).fail(gotoLogin);

    // HeartBeat
    if (location.href.indexOf("/login") === -1) {
        setInterval(function() {
            doAjax(window.baseUrl + "/users/current_user", "get", {},
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


    $(document).on('customPjax:end', function() {
        g_breadcumb();
        $(".input-search-close").prev().val('').trigger("input");
    });
    $(".input-search-close").prev().val('').trigger("input");

    $("a[data-plugin='customPjax']").each(function() {
        customPjax(this, $(this).data("custom-pjax-render-to") || "#pjax");
    });
});

var doAjax=function(ajaxUrl,ajaxType,ajaxData,callbackFunc,callbackFuncArgus) {
    var ajaxObj={
        type: ajaxType,
        url: ajaxUrl,
        dataType: 'json',
        timeout: 5000,
        data: ajaxData,
        success: function(re) {
            callbackFunc(re,1,callbackFuncArgus);
        },
        error: function(XMLHttpRequest,status) {
            callbackFunc({"type":ajaxType,"url":ajaxUrl,"data":ajaxData},0,callbackFuncArgus);
        }
    };
    if (typeof arguments[5]==="object") {
        $.extend(ajaxObj,arguments[5]);
    }
    ajaxObj.beforeSend = function (XHR) {
        XHR.setRequestHeader('access-authorization', $.cookie('access_token') || "");
    };
    jQuery.ajax(ajaxObj);
};

var gotoLogin=function() {
    if (location.href.indexOf("/login")===-1) {
        location.href="/login";
        return true;
    }
};

$(function() {
    var createMenu=function(menuObj) {
        console.log(menuObj);
        if (menuObj["children"].length) {
            var baseTemplate='<li class="site-menu-item has-sub"><a href="javascript:void(0)"><i class="site-menu-icon{__icon__}" aria-hidden="true"></i><span class="site-menu-title">{__title__}</span><span class="site-menu-arrow"></a></span><ul class="site-menu-sub">{__subMenus__}</ul></li>',
                subMenuTemplate='<li class="site-menu-item"><a class="animsition-link" href="{__href__}"><span class="site-menu-title">{__title__}</span></a></li>'
                subMenus=[];
            for (var i=0;i<menuObj["children"].length;i++) {
                subMenus.push(
                    subMenuTemplate.replace(/\{__href__\}/, menuObj["children"][i]["url"])
                                   .replace(/\{__title__\}/, " " + menuObj["children"][i]["name"])
                );
            }
            baseTemplate = baseTemplate.replace(/\{__title__\}/, menuObj["name"])
                                       .replace(/\{__subMenus__\}/, subMenus.join(""))
                                       .replace(/\{__icon__\}/, " " + menuObj["icon"]);
        } else {
            var baseTemplate='<li class="site-menu-item"><a class="animsition-link" href="{__href__}"><i class="site-menu-icon{__icon__}" aria-hidden="true"></i><span class="site-menu-title">{__title__}</span></a></li>';
            baseTemplate = baseTemplate.replace(/\{__href__\}/, menuObj["url"])
                                       .replace(/\{__title__\}/, menuObj["name"])
                                       .replace(/\{__icon__\}/, " " + menuObj["icon"]);
        }
        $("ul.site-menu").append(baseTemplate);
    }

    var getMenu=function() {
        doAjax("http://192.168.1.229:3000/api/v1/menus","get",{},
            function(data,status) {
                if (status) {
                    if (data["data"]) {
                        for (var i=0;i<data["data"].length;i++) {
                            createMenu(data["data"][i]);
                        }
                    }
                } else {
                    gotoLogin();
                }
            }
        );
    };

    doAjax("http://192.168.1.229:3000/api/v1/users/current_user","get",{},
        function(data,status) {
            if (status) {
                if (data["access_token"]) {
                    if (location.href.indexOf("/login")>-1) {
                        location.href="/";
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
});

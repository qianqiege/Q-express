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

$(function() {
    doAjax("http://192.168.1.229:3000/api/v1/users/current_user","get",{},
        function(data,status) {
            if (status) {
                if (data["access_token"]) {
                    if (location.href.indexOf("/login")>-1) {
                        location.href="/";
                        return true;
                    }
                } else {
                    if (location.href.indexOf("/login")===-1) {
                        location.href="/login";
                        return true;
                    }
                }
            } else {
                if (location.href.indexOf("/login")===-1) {
                    location.href="/login";
                    return true;
                }
            }
        }
    );
});

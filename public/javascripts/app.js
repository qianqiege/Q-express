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
        XHR.setRequestHeader('access-authorization', $.cookie('access-token') || "");
    };
    jQuery.ajax(ajaxObj);
};
var doAjax=function(ajaxUrl,ajaxType,ajaxData,callbackFunc,callbackFuncArgus,errFunc,errFuncArgus) {
    jQuery.ajax({
        type: ajaxType,
        url: ajaxUrl,
        dataType: 'json',
        timeout: 5000,
        data: ajaxData,
        success: function(re) {
            callbackFunc(re,callbackFuncArgus);
        },
        error: function(XMLHttpRequest,status) {
            errFunc(status,errFuncArgus,{"type":ajaxType,"url":ajaxUrl,"data":ajaxData});
        }
    });
};
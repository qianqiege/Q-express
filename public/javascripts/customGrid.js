window.customGrid = {
    init: function(params)  {
        var container = $(params["container"]);
        if (!container.length || container.find("table").length || !params["fields"].length || typeof params["fields"] !== "object") {
            return false;
        }

        var tableDom = $("<table />"), thDom = $("<tr />"), methods = {};

        if (typeof params["class"] === "string") {
            tableDom.addClass(params["class"]);
        }

        for (var i in params["fields"]) {
            thDom.append($("<th />").text(params["fields"][i]));
        }

        if (typeof params["control"] === "object") {
            if (params["control"]["insert"]) {
                var insertButton = $("<button />").attr("type", "button").addClass("btn btn-sm btn-icon btn-flat btn-default").append($("<i />").attr("aria-hidden", "true").addClass("icon wb-plus"));
            }
            thDom.append($("<th />").append(insertButton));
        }

        tableDom.append($("<thead />").append(thDom)).append($("<tbody />"));

        container.append(tableDom);

        container.on("click", "td", function() {
            var InputDom = $('<input />'), self = $(this);
            InputDom.css({
                "position": "absolute",
                "top": $(this).offset().top + 'px',
                "left": $(this).offset().left + 'px',
                "padding": '8.008px',
                "width": $(this).outerWidth() + 'px',
                "height": $(this).outerHeight() + 'px',
                "border-width": "1px 0px 0px",
                "border-style": "solid none none",
                "border-color": "rgb(228, 234, 236) rgb(118, 131, 143) rgb(118, 131, 143)"
            })
            .customVal($(this).text())
            .blur(function() {
                self.text($(this).customVal());
                $(this).remove();
            });
            $("body").append(InputDom);
            InputDom.focus();
        });

        var tbodyDom = container.find("tbody");

        methods.insert = function(obj) {
            if (typeof obj !== "object") {
                return false;
            }
            var trDom = $("<tr />");
            for (var i in obj) {
                var tdDom = $("<td />").text(obj[i]["value"]);
                trDom.append(tdDom);
            }
            var tdDom = $("<td />");
            if (typeof arguments[1] === "object" && typeof params["control"] === "object") {
                if (arguments[1]["delete"]) {
                    tdDom.append($("<button />").attr("type", "button").addClass("btn btn-sm btn-icon btn-flat btn-default").append($("<i />").attr("aria-hidden", "true").addClass("icon wb-close")));
                }
            }
            trDom.append(tdDom);
            return tbodyDom.append(trDom);
        };

        methods.destory = function() {
            return tableDom.remove();
        }

        return methods;
    }
}
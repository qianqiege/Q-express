/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2016 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  var Site = window.Site;

  $(document).ready(function($) {
    Site.run();
  });

  jsGrid.setDefaults({
    tableClass: "jsgrid-table table table-striped table-hover"
  });

  jsGrid.setDefaults("text", {
    _createTextBox: function() {
      return $("<input>").attr("type", "text").attr("class", "form-control input-sm");
    }
  });

  jsGrid.setDefaults("number", {
    _createTextBox: function() {
      return $("<input>").attr("type", "number").attr("class", "form-control input-sm");
    }
  });

  jsGrid.setDefaults("textarea", {
    _createTextBox: function() {
      return $("<input>").attr("type", "textarea").attr("class", "form-control");
    }
  });

  jsGrid.setDefaults("control", {
    _createGridButton: function(cls, tooltip, clickHandler) {
      var grid = this._grid;

      return $("<button>").addClass(this.buttonClass)
        .addClass(cls)
        .attr({
          type: "button",
          title: tooltip
        })
        .on("click", function(e) {
          clickHandler(grid, e);
        });
    }
  });

  jsGrid.setDefaults("select", {
    _createSelect: function() {
      var $result = $("<select>").attr("class", "form-control input-sm"),
        valueField = this.valueField,
        textField = this.textField,
        selectedIndex = this.selectedIndex;

      $.each(this.items, function(index, item) {
        var value = valueField ? item[valueField] : index,
          text = textField ? item[textField] : item;

        var $option = $("<option>")
          .attr("value", value)
          .text(text)
          .appendTo($result);

        $option.prop("selected", (selectedIndex === index));
      });

      return $result;
    }
  });

  // Example Basic
  // -------------------
  (function() {
    $('#exampleBasic').jsGrid({
      height: "300px",
      width: "100%",

      inserting: true,
      editing: true,
      sorting: true,
      paging: true,
      autoload: true,

      pageSize: 15,
      pageButtonCount: 5,

      deleteConfirm: "确定要删除吗?",

      controller: db,

      fields: [{
        name: "产品名",
        type: "select",
        items: db.products,
        valueField: "Id",
        textField: "Name"
      }, {
        name: "用法",
        type: "text",
        width: 200
      },{
        name: "实际数量",
        type: "number",
        width: 70
      },{
        name: "数量",
        type: "number",
        width: 70
      }, {
        type: "control"
      }]
    });
  })();
})(document, window, jQuery);

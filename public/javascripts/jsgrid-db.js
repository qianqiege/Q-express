/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2016 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function() {
  var db = {
    loadData: function(filter) {
      return $.grep(this.clients, function(client) {
        return (!filter.Name || client.Name.indexOf(filter.Name) > -1) && (!filter.Age || client.Age === filter.Age) && (!filter.Address || client.Address.indexOf(filter.Address) > -1) && (!filter.Country || client.Country === filter.Country) && (filter.Married === undefined || client.Married === filter.Married);
      });
    },

    insertItem: function(insertingClient) {
      this.clients.push(insertingClient);
    },

    updateItem: function(updatingClient) {},

    deleteItem: function(deletingClient) {
      var clientIndex = $.inArray(deletingClient, this.clients);
      this.clients.splice(clientIndex, 1);
    }

  };

  window.db = db;

  db.products = [{
    Name: "",
    Id: 0
  }, {
    Name: "甘净",
    Id: 1
  }, {
    Name: "矿宝",
    Id: 2
  }, {
    Name: "阿拉伯糖",
    Id: 3
  }, {
    Name: "冠心病方",
    Id: 4
  }, {
    Name: "芯动力",
    Id: 5
  }, {
    Name: "羔羊胃",
    Id: 6
  }];

  db.clients = [{
    "产品名": 1,
    "用法":"3片/次、4次/天（三餐前+睡前）" ,
    "数量": "3"
  }];
}());

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/App/Calendar', ['exports', 'Site', 'Config'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('Site'), require('Config'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Site, global.Config);
        global.AppCalendar = mod.exports;
    }
})(this, function (exports, _Site2, _Config) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getInstance = exports.run = exports.AppCalendar = undefined;

    var _Site3 = babelHelpers.interopRequireDefault(_Site2);

    var Config = babelHelpers.interopRequireWildcard(_Config);

    var AppCalendar = function (_Site) {
        babelHelpers.inherits(AppCalendar, _Site);

        function AppCalendar() {
            babelHelpers.classCallCheck(this, AppCalendar);
            return babelHelpers.possibleConstructorReturn(this, (AppCalendar.__proto__ || Object.getPrototypeOf(AppCalendar)).apply(this, arguments));
        }

        babelHelpers.createClass(AppCalendar, [{
            key: 'processed',
            value: function processed() {
                babelHelpers.get(AppCalendar.prototype.__proto__ || Object.getPrototypeOf(AppCalendar.prototype), 'processed', this).call(this);

                this.$actionToggleBtn = $('.site-action-toggle');
                this.$addNewCalendarForm = $('#addNewCalendar').modal({
                    show: false
                });

                this.handleFullcalendar();
                this.handleSelective();
                this.handleAction();
                this.handleListItem();
                this.handleEventList();
            }
        }, {
            key: 'handleFullcalendar',
            value: function handleFullcalendar() {
                var myEvents = [];
                var defaultDate = new Date();
                var myOptions = {
                    header: {
                        left: null,
                        center: 'prev,title,next',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    defaultDate: defaultDate.Format("yyyy-MM-dd"),
                    selectable: true,
                    selectHelper: true,
                    select: function select(start, end) {
                        //获取点击位置的当前日期
                        if (typeof start["_i"] === "string") {
                            var startDate=start["_d"].Format("yyyy-MM-dd"); var endDate =end["_d"].Format("yyyy-MM-dd");
                            var startTime = "00:00:00";
                            var endTime = "00:00:00";
                        } else {
                            var start =new Date(start["_i"][0], start["_i"][1], start["_i"][2], start["_i"][3], start["_i"][4], start["_i"][5]).Format("yyyy-MM-dd hh:mm:ss");
                            var end = new Date(end["_i"][0], end["_i"][1], end["_i"][2], end["_i"][3], end["_i"][4], end["_i"][5]).Format("yyyy-MM-dd hh:mm:ss");
                            var startDate =start.split(" ")[0];
                            var startTime = start.split(" ")[1];
                            var endDate =end.split(" ")[0];
                            var endTime = end.split(" ")[1];
                        }
                        $('#addNewEvent').modal('show');
                        $('#startDate').val(startDate);
                        $('#startTime').val(startTime);
                        $('#endDate').val(endDate);
                        $('#endTime').val(endTime);
                    },
                    editable: true,
                    eventLimit: true,
                    windowResize: function windowResize(view) {
                        var width = $(window).outerWidth();
                        var options = Object.assign({}, myOptions);
                        options.events = view.calendar.getEventCache();
                        options.aspectRatio = width < 667 ? 0.5 : 1.35;

                        $('#calendar').fullCalendar('destroy');
                        $('#calendar').fullCalendar(options);
                    },
                    eventClick: function eventClick(event) {
                        //编辑事件数据显示
                        $('#editPatient').html('姓名：'+event.patient.name+" <br/>"+'身份证：'+event.patient.id_number)
                        $('#editStartsTime').val("");
                        $('#endEditTime').val("");
                        $('#editEname').val(event.title);
                        $("#editSaveBtn").data("id",event.id);
                        $("#deleteFollowUpBtn").data("id",event.id);
                        var color = event.backgroundColor ? event.backgroundColor : Config.colors('blue', 600);
                        if (event.start) {
                            $('#editStarts').val( event.start._i.split(" ")[0]);
                            var startEditTime = event.start._i.split(" ")[1] ;
                            if (startEditTime) {
                                $('#editStartsTime').val(startEditTime);
                            } else {
                                $('#editStartsTime').val('00:00:00');
                            }

                        } else {
                            $('#editStarts').datepicker('update', '');
                        }
                        if (event.end) {
                            $('#editEnds').val( event.end._i.split(" ")[0]);
                            var endEditTime = event.end._i.split(" ")[1] ;
                            if (endEditTime) {
                                $('#endEditTime').val(endEditTime);
                            } else {
                                $('#endEditTime').val('00:00:00');
                            }
                        } else {
                            $('#editEnds').datepicker('update', '');
                        }

                        $('#editColor [type=radio]').each(function () {
                            var $this = $(this),
                            _value = $this.data('color').split('|'),
                            value = Config.colors(_value[0], _value[1]);
                            if (value === color) {
                                $this.prop('checked', true);
                            } else {
                                $this.prop('checked', false);
                            }
                        });

                        $('#editNewEvent').modal('show').one('hidden.bs.modal', function (e) {
                            event.title = $('#editEname').val();

                            // var color = $('#editColor [type=radio]:checked').data('color').split('|');
                            // color = Config.colors(color[0], color[1]);
                            // event.backgroundColor = color;
                            // event.borderColor = color;

                            // event.start = new Date($('#editStarts').data('datepicker').getDate());
                            // event.end = new Date($('#editEnds').data('datepicker').getDate());
                            // $('#calendar').fullCalendar('updateEvent', event);
                        });
                    },
                    eventDragStart: function eventDragStart() {
                        $('.site-action').data('actionBtn').show();
                    },
                    eventDragStop: function eventDragStop() {
                        $('.site-action').data('actionBtn').hide();
                    },

                    events: myEvents,
                    droppable: true
                };

                var _options = void 0;
                var myOptionsMobile = Object.assign({}, myOptions);

                myOptionsMobile.aspectRatio = 0.5;
                _options = $(window).outerWidth() < 667 ? myOptionsMobile : myOptions;

                $('#editNewEvent').modal();
                $('#calendar').fullCalendar(_options);
            }
        }, {
            key: 'handleSelective',
            value: function handleSelective() {
                doAjax(window.baseUrl + "/follow_up/follow_up_patient", "get",{},function(data, status){
                    var arr = [];
                    for(var i=0; i < data.length; i++){
                        arr[i] ={'id':data[i].id,'name': data[i].name,'avatar':'../images/1.jpg','id_number':data[i].id_number}
                    }
                    var  member = arr;
                    $('.plugin-selective').selective({
                        namespace: 'addMember',
                        local: member,
                        buildFromHtml: false,
                        tpl: {
                            optionValue: function optionValue(data) {
                                return data.id;
                            },
                            frame: function frame() {
                                return '<div class="' + this.namespace + '">\n          ' + this.options.tpl.items.call(this) + '\n          <div class="' + this.namespace + '-trigger">\n          ' + this.options.tpl.triggerButton.call(this) + '\n          <div class="' + this.namespace + '-trigger-dropdown">\n          ' + this.options.tpl.list.call(this) + '\n          </div>\n          </div>\n          </div>';
                            },
                            triggerButton: function triggerButton() {
                                return '<div class="' + this.namespace + '-trigger-button"><i class="wb-plus"></i></div>';
                            },
                            listItem: function listItem(data) {
                                return '<li class="' + this.namespace + '-list-item"><img class="avatar" src="' + data.avatar + '">' + data.name +'身份证号：'+data.id_number+ '</li>';
                            },
                            item: function item(data) {
                                return '<li class="' + this.namespace + '-item"><img class="avatar" src="' + data.avatar + '" title="' + data.name + '">' + this.options.tpl.itemRemove.call(this) + '<span>'+data.name+data.id_number+'</span>'+'</li>';
                            },
                            itemRemove: function itemRemove() {
                                return '<span class="' + this.namespace + '-remove"><i class="wb-minus-circle"></i></span>';
                            },
                            option: function option(data) {
                                return '<option value="' + this.options.tpl.optionValue.call(this, data) + '">' + data.name + '</option>';
                            }
                        }
                    });
                });
            }
        }, {
            key: 'handleAction',
            value: function handleAction() {
                var _this2 = this;

                this.$actionToggleBtn.on('click', function (e) {
                    _this2.$addNewCalendarForm.modal('show');
                    e.stopPropagation();
                });
            }
        }, {
            key: 'handleEventList',
            value: function handleEventList() {
                $('#addNewEventBtn').on('click', function () {
                    $('#addNewEvent').modal('show');
                });

                $('.calendar-list .calendar-event').each(function () {
                    var $this = $(this),
                    color = $this.data('color').split('-');
                    $this.data('event', {
                        title: $this.data('title'),
                        stick: $this.data('stick'),
                        backgroundColor: Config.colors(color[0], color[1]),
                        borderColor: Config.colors(color[0], color[1])
                    });
                    $this.draggable({
                        zIndex: 999,
                        revert: true,
                        revertDuration: 0,
                        appendTo: '.page',
                        helper: function helper() {
                            return '<a class="fc-day-grid-event fc-event fc-start fc-end" style="background-color:' + Config.colors(color[0], color[1]) + ';border-color:' + Config.colors(color[0], color[1]) + '">\n          <div class="fc-content">\n            <span class="fc-title">' + $this.data('title') + '</span>\n          </div>\n          </a>';
                        }
                    });
                });
            }
        }, {
            key: 'handleListItem',
            value: function handleListItem() {
                this.$actionToggleBtn.on('click', function (e) {
                    $('#addNewCalendar').modal('show');
                    e.stopPropagation();
                });

                $(document).on('click', '[data-tag=list-delete]', function (e) {
                    bootbox.dialog({
                        message: 'Do you want to delete the calendar?',
                        buttons: {
                            success: {
                                label: 'Delete',
                                className: 'btn-danger',
                                callback: function callback() {
                                    // $(e.target).closest('.list-group-item').remove();
                                }
                            }
                        }
                    });
                });
            }
        }]);
        return AppCalendar;
    }(_Site3.default);

    var instance = null;

    function getInstance() {
        if (!instance) {
            instance = new AppCalendar();
        }
        return instance;
    }

    function run() {
        var app = getInstance();
        app.run();
    }

    exports.default = AppCalendar;
    exports.AppCalendar = AppCalendar;
    exports.run = run;
    exports.getInstance = getInstance;
});

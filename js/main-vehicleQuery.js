/**
 * Created by dingyh on 2015/08/27.
 */
require.config({
    baseUrl: '../js',
    paths: {
        "jquery": "lib/jquery.min",
        "datetimepicker": "lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min",
        "datetimepicker-zh-CN": "lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        "jqGrid-custom": "lib/jquery-ui-bootstrap/jquery-ui-1.10.3.custom.min",
        "jqGrid-locale-cn": "lib/jquery-ui-bootstrap/jqGrid/js/i18n/grid.locale-cn",
        "jqGrid": "lib/jquery-ui-bootstrap/jqGrid/js/jquery.jqGrid.min",

        "vehicleQuery": "app/vehicleQuery"
    },
    shim: {
        "datetimepicker": {
            deps: ['jquery'],
            exports: 'datetimepicker'
        },
        "datetimepicker-zh-CN": {
            deps: ['datetimepicker'],
            exports: 'datetimepicker-zh-CN'
        },
        "jqGrid-custom": {
            deps: ['jquery'],
            exports: 'jqGrid-custom'
        },
        "jqGrid": {
            deps: ['jquery'],
            exports: 'jqGrid'
        },
        "jqGrid-locale-cn": {
            deps: ['jqGrid'],
            exports: 'jqGrid-locale-cn'
        }
    }
});


require(['vehicleQuery'], function (vehicleQuery) {
    var totalWidth = $(window).width();
    $("#jqGrid").setGridWidth(totalWidth - 3);
});
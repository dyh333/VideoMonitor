/**
 * Created by dingyh on 2015/08/27.
 */
require.config({
    baseUrl: '../js',
    paths: {
        "jquery": "lib/jquery.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "kendo": "lib/kendo/js/kendo.all.min",

        "showVideoList": "app/showVideoList",
        "videoCtrl": "app/videoControl"
    },
    shim: {
        "bootstrap": {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});


require(['showVideoList', 'videoCtrl'], function (showVideoList, videoCtrl) {
    $("#horizontal").kendoSplitter({
        panes: [
            {collapsible: true, size: "260px"},
            {collapsible: false}
        ]
    });

    $("#vertical").kendoSplitter({
        orientation: "vertical",
        panes: [
            {collapsible: false},
            {collapsible: true, resizable: false, size: "210px"}
        ]
    });

    videoCtrl.initVideoCtrl();

    showVideoList.loadVideoList();

    videoCtrl.bandingBtnCtrl();
});
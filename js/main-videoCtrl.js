/**
 * Created by dingyh on 2015/08/27.
 */
require.config({
    baseUrl: '../js',
    paths: {
        "jquery": "lib/jquery.min",
        "html5shiv": "lib/html5shiv.min",
        "respond": "lib/respond.min",
        "url": "lib/js-url/url.min",
        "xml2json": "lib/xml2json/xmlToJSON",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "kendo": "lib/kendo/js/kendo.all.min",
        "lodash": "lib/postal/lodash.min",
        "postal": "lib/postal/postal.min",

        "showVideoList": "app/showVideoList",
        "imosActives": "app/imosActives",
        "videoCtrl": "app/videoControl"
    },
    shim: {
        "url": ['jquery'],
        "bootstrap": ['jquery'],
        "postal": ['lodash']
    }
});


require(['showVideoList', 'videoCtrl'], function (showVideoList, videoCtrl) {
    $("#horizontal").kendoSplitter({
        panes: [
            {collapsible: true, size: "270px"},
            {collapsible: false}
        ]
    });

    $("#vertical").kendoSplitter({
        orientation: "vertical",
        panes: [
            {collapsible: false, resizable: false, size: "32px"},
            {collapsible: false},
            {collapsible: true, resizable: false, size: "210px"}
        ]
    });




    videoCtrl.initImosActive();

    showVideoList.loadVideoList();

    videoCtrl.bandingBtnCtrl();

    videoCtrl.login();
    videoCtrl.startPlay();
});
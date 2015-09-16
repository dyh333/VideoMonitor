/**
 * Created by dingyh on 2015/09/15.
 */
define(['jquery', 'bootstrap'], function ($, bootstrap) {
    var g_imosActivePlayer = null;

    function initVideoCtrl() {
        g_imosActivePlayer = document.all.h3c_IMOS_ActiveX;
        if (!checkActivePlayer()) {
            return;
        }

        var xmldoc;
        try {
            xmldoc = new ActiveXObject("Microsoft.XMLDOM");
            if (!xmldoc) {
                xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
            }
        }
        catch (e) {
        }
        g_xmlActive = xmldoc;
        if (!g_xmlActive) {
            alert("xml解析器获取错误，将导致某些功能不可用");
        }
        else {
            g_xmlActive.async = "false";
        }
        //TODO：延迟执行方法，因为播放控件初始化需要时间窗口 ？？？
        //setTimeout(DoLogin, 300);
        //setTimeout(DoStartPlay, 400);
    }

    function bandingBtnCtrl() {
        $('#td_lock').click(function () {
            if (!checkActivePlayer()) {
                return;
            }
            //摄像机名称
            var cameraId = document.getElementById("CamIDText").value;
            var flag = g_imosActivePlayer.IMOSAX_LockPtzCtrl(cameraId);
            if (0 != flag) {
                alert("锁定出错，错误码：" + flag);
            }
        });

        $('#td_unlock').click(function () {
            if (!checkActivePlayer()) {
                return;
            }
            //摄像机名称
            var cameraId = document.getElementById("CamIDText").value;
            var flag = g_imosActivePlayer.IMOSAX_UnlockPtzCtrl(cameraId);
            if (0 != flag) {
                alert("解锁出错，错误码：" + flag);
            }
        });

        $('#td_lightFar').click(function () {
            startPtzCMD('0x0104');
        });

        $('#td_lightNear').click(function () {
            startPtzCMD('0x0102');
        });

        $('#td_focusFar').click(function () {
            startPtzCMD('0x0202');
        });

        $('#td_focusNear').click(function () {
            startPtzCMD('0x0204');
        });

        $('#td_zoomFar').click(function () {
            startPtzCMD('0x0302');
        });

        $('#td_zoomNear').click(function () {
            startPtzCMD('0x0304');
        });

        $('#td_leftUp').click(function () {
            startPtzCMD('0x0702');
        });

        $('#td_up').click(function () {
            startPtzCMD('0x0402');
        });

        $('#td_rightUp').click(function () {
            startPtzCMD('0x0802');
        });

        $('#td_left').click(function () {
            startPtzCMD('0x0504');
        });

        $('#td_stop').click(function () {
            stopPtz();
        });

        $('#td_right').click(function () {
            startPtzCMD('0x0502');
        });

        $('#td_leftDown').click(function () {
            startPtzCMD('0x0704');
        });

        $('#td_down').click(function () {
            startPtzCMD('0x0404');
        });

        $('#td_rightDown').click(function () {
            startPtzCMD('0x0804');
        });

        $('#td_presetSel').click(function () {
            var cameraId = document.getElementById("TunnelText").value;
            var selTarget = $("#sel_preset").value();  //预置位控件对象
            var ulPresetValue = selTarget.value;  //选中值

            var retStr = g_imosActivePlayer.IMOSAX_UsePtzPreset(cameraId, ulPresetValue);
        });

        $('#td_presetAdd').click(function () {
            $("#modal_presetAdd").modal('show');

            $("#btn_presetSave").click(function(){

            });
        });

        $('#td_presetDel').click(function () {
            var cameraId = document.getElementById("TunnelText").value;
            var selTarget = document.getElementById("preset");  //预置位控件对象
            var ulPresetValue = selTarget.value;  //选中值

            var retStr = g_imosActivePlayer.IMOSAX_DelPtzPreset(cameraId, ulPresetValue);
            DoSetPresetInfo(cameraId);  //TODO: 设置云台控制面板中  预置位信息???
            alert("删除云台预置位信息: " + retStr);
        });
    }

    function checkActivePlayer() {
        if (!g_imosActivePlayer) {
            alert("未安装控件，请先安装后再使用本页面");
            return false;
        } else {
            return true;
        }
    }

    function startPtzCMD(ptzCmd) {
        if (!checkActivePlayer()) {
            return;
        }
        //摄像机名称
        var cameraId = document.getElementById("CamIDText").value;
        var PtzCmd = parseInt(ptzCmdStr, 16);
        //var ptzSpeed = 2;
        var flag = g_imosActivePlayer.IMOSAX_SendPtzCtrlCommand(cameraId, PtzCmd, ptzSpeed, ptzSpeed, 0);
        if (0 != flag) {
            alert("云台控制出错，错误码：" + flag);
        }
    }

    function stopPtzCMD() {
        if (!checkActivePlayer()) {
            return;
        }
        //摄像机名称
        var cameraId = document.getElementById("CamIDText").value;
        var PtzCmd = 0x0901;
        var ptzSpeed = 6;
        var flag = g_imosActivePlayer.IMOSAX_SendPtzCtrlCommand(cameraId, PtzCmd, ptzSpeed, ptzSpeed, 0);
        if (0 != flag) {
            alert("云台控制出错，错误码：" + flag);
        }
    }



    return {
        initVideoCtrl: initVideoCtrl,
        bandingBtnCtrl: bandingBtnCtrl
    };
});
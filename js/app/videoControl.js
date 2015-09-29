/**
 * Created by dingyh on 2015/09/15.
 */
define(['jquery', 'url', 'xml2json', 'bootstrap', 'imosActives'], function ($, url, xml2json, bootstrap, imosActives) {
    var serverIP = "10.100.8.170";
    var serverPort = "8800";
    var userName = "test";
    var cameraId = "320594000000050048_1"; //url('?tunnel');

    var imosActivePlayer = null;
    var curFrameNum = 1;


    function initImosActive() {
        imosActivePlayer = $("#h3c_IMOS_ActiveX")[0];
        if (!checkActivePlayer()) {
            return;
        }

        //var xmldoc;
        //try {
        //    xmldoc = new ActiveXObject("Microsoft.XMLDOM");
        //    if (!xmldoc) {
        //        xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
        //    }
        //}
        //catch (e) {
        //}
        //xmlActive = xmldoc;
        //if (!xmlActive) {
        //    alert("xml解析器获取错误，将导致某些功能不可用");
        //}
        //else {
        //    xmlActive.async = "false";
        //}
    }

    function login() {
        var user = imosActives.login(imosActivePlayer, serverIP, serverPort, userName);
    }

    /**
     * 启动实况
     */
    function startPlay() {
        var frameNum = curFrameNum++;
        //frameNum = parseInt(frameNum, 10);

        var flag = imosActivePlayer.IMOSAX_StartFrameLive(frameNum, cameraId);
        if (0 == flag) {
            $("#txt_camName").val(getCamera(cameraId).CameraName[0]._text);
            addPresetList(cameraId);
        }
        else {
            alert("播放实况失败，错误码：" + flag);
        }
    }


    /**
     * 查询摄像机信息
     */
    function getCamera(cameraId) {
        if (!checkActivePlayer()) {
            return;
        }

        var result = imosActivePlayer.IMOSAX_QueryCameraInfo(cameraId);
        //var tmpXmlDoc = loadXML(retStr);
        var camera = xml2json.parseString(result).data[0];
        return camera;
    }

    /**
     * 查询預置位信息
     */
    function addPresetList(cameraId) {
        if (!checkActivePlayer()) {
            return;
        }

        var result = imosActivePlayer.IMOSAX_QueryPtzPresetList(cameraId);
        //var tmpXmlDoc = loadXML(retStr);
        var presets = xml2json.parseString(result).PresetList[0];

        $('#sel_preset')
            .find('option')
            .remove()
            .end();
        $.each(presets.item, function (key, value) {
            $('#sel_preset')
                .append($("<option></option>")
                    .attr("value", value.PresetValue[0]._text)
                    .text(value.PresetDesc[0]._text));
        });
    }

    function bandingBtnCtrl() {
        $('#td_lock').click(function () {
            if (!checkActivePlayer()) {
                return;
            }

            var flag = imosActivePlayer.IMOSAX_LockPtzCtrl(cameraId);
            if (0 != flag) {
                alert("锁定出错，错误码：" + flag);
            }
        });

        $('#td_unlock').click(function () {
            if (!checkActivePlayer()) {
                return;
            }

            var flag = imosActivePlayer.IMOSAX_UnlockPtzCtrl(cameraId);
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
            stopPtzCMD();
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
            var selTarget = $("#sel_preset").value();  //预置位控件对象
            var ulPresetValue = selTarget.value;  //选中值

            var retStr = imosActivePlayer.IMOSAX_UsePtzPreset(cameraId, ulPresetValue);
        });

        $('#td_presetAdd').click(function () {
            $("#center-pane object").hide();

            $("#modal_presetAdd").modal('show');

            $("#btn_presetSave").click(function () {
                //TODO: 将当前摄像头位置添加到预置位列表中

                $("#modal_presetAdd").modal('hide');
                $("#center-pane object").show();
            });

            $('#modal_presetAdd').on('hidden.bs.modal', function () {
                $("#center-pane object").show();
            })
        });

        $('#td_presetDel').click(function () {
            var cameraId = document.getElementById("TunnelText").value;
            var selTarget = document.getElementById("preset");  //预置位控件对象
            var ulPresetValue = selTarget.value;  //选中值

            var retStr = imosActivePlayer.IMOSAX_DelPtzPreset(cameraId, ulPresetValue);
            DoSetPresetInfo(cameraId);  //TODO: 设置云台控制面板中  预置位信息???
            alert("删除云台预置位信息: " + retStr);
        });
    }

    function checkActivePlayer() {
        if (!imosActivePlayer) {
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

        var ptzSpeed = parseInt($("#ptzSpeed").find("option:selected").text());
        var PtzCmd = parseInt(ptzCmd, 16);
        var flag = imosActivePlayer.IMOSAX_SendPtzCtrlCommand(cameraId, PtzCmd, ptzSpeed, ptzSpeed, 0);
        if (0 != flag) {
            alert("云台控制出错，错误码：" + flag);
        }
    }

    function stopPtzCMD() {
        if (!checkActivePlayer()) {
            return;
        }

        var PtzCmd = 0x0901;
        var ptzSpeed = parseInt($("#ptzSpeed").find("option:selected").text());
        var flag = imosActivePlayer.IMOSAX_SendPtzCtrlCommand(cameraId, PtzCmd, ptzSpeed, ptzSpeed, 0);
        if (0 != flag) {
            alert("云台控制出错，错误码：" + flag);
        }
    }


    return {
        initImosActive: initImosActive,
        bandingBtnCtrl: bandingBtnCtrl,
        login: login,
        startPlay: startPlay
    };
});
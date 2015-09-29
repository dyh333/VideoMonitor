/**
 * Created by dingyh on 2015/09/15.
 */
define(['jquery', 'kendo'], function ($, kendo) {
    function loadVideoList(){
        var serviceUrl = "http://10.100.8.107:8081/ItsWeb/videoCtrl/getAllVideoDevices.do";
        homogeneous = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: serviceUrl,
                    dataType: "jsonp"
                }
            },
            schema: {
                model: {
                    id: "id",
                    hasChildren: "hasChild"
                }
            }
        });

        $("#treeview").kendoTreeView({
            dataSource: homogeneous,
            dataTextField: "name",
            dataImageUrlField: "imgUrl",
            select: onSelect
        });

        function onSelect(e) {
            var dataItem = this.dataItem(e.node);
            var cameraId = dataItem.id;

            //TODO：事件传递到videoControl
        }
    }

    return {
        loadVideoList: loadVideoList
    };
});
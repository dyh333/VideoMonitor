/**
 * Created by dingyh on 2015/09/15.
 */
define(['jquery', 'kendo'], function ($, kendo) {
    function loadVideoList(){
        var serviceUrl = "//10.100.13.206:8081/ItsWeb/videoCtrl/getAllVideoDevices.do";
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
            alert("Selecting: " + this.text(e.node));
        }
    }

    return {
        loadVideoList: loadVideoList
    };
});
/**
 * Created by Administrator on 2016/3/14.
 */
$(function () {
    alert("大家好");
    $('#addemp').click(function () {
        var eid = $('#id').val();
        var empname = $('#empname').val();
        var param = {"id": eid, "empname": empname};
        if (eid && empname) {
            $.ajax({
                type: "POST",
                //url: "http://localhost:8080/add",//作为独立前端跨域请求使用
                url: "/add",
                contentType: 'application/json;charset=utf-8',
                data: JSON.stringify(param),
                dataType: "json",
                success: function (data) {
                    var div = $('#resText');
                    $('#resText').html("新增加的员工是：" + data.id + ":" + data.empname);
                }
            });
        } else {
            alert("提示：请保证有正确的值");
        }

    });
    $('#addemp2post').click(function () {
        var eid = $('#id').val();
        var empname = $('#empname').val();
        var param = {"id": eid, "empname": empname};
        if (eid && empname) {
            //不要尝试使用一下方法提交json数据，$.post()是$.ajax()的简写形式
            //因为不能指定contentType 提交参数，将报415错误
            $.post("/add", param, function (result) {
                    var div = $('#resText');
                    $('#resText').html("新增加的员工是：" + data.id + ":" + data.empname);
                }, "json"
            );
        } else {
            alert("提示：请保证有正确的值");
        }
    });
});

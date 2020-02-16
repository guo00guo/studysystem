var feedbackClassHtml = '';
$(function () {
    var css = "<style>"
            + "* { margin:0; padding:0;}"
            + ".global_feedback {width: 530px;display: none;background: #fff;z-index: 999;}"
            + ".global_feedback table {width: 530px;text-align: center;font-size: 25px;}"
            + ".global_feedback .h_20 {height: 20px;}"
            + ".global_feedback table tr {height: 50px;}"
            + ".global_feedback .t_title {height: 40px;}"
            + ".global_feedback .tips {height: 30px;color: #ff0000;font-size: 12px;text-align: left;}"
            + ".global_feedback .t_left {text-align: right;font-size: 14px;}"
            + ".global_feedback .t_right {text-align: left;font-size: 14px;}"
            + ".global_feedback .t_right select {height:30px;}"
            + ".global_feedback .t_right input, .global_feedback textarea {width: 310px;border: 1px solid #dddddd;padding: 10px;height: 14px;border-radius: 3px;}"
            + ".global_feedback textarea {line-height: 20px;height: 116px;margin-top: 10px;}"
            + ".global_feedback .sub_btn {background: #288ce6;font-size: 20px;color: #fff;padding: 10px 32px;border-radius: 5px;border: none;cursor: pointer;margin: 20px;}"
            + "</style>";
    $('head').append(css);

    var body = "<div id=\"ys_global_feedbackBox\" class=\"global_feedback\">"
         + "<table>"
         + "<tr class=\"h_20\">"
         + "<td colspan=\"2\"></td>"
         + "</tr>"
         + "<tr class=\"t_title\">"
         + "<td colspan=\"2\">用户反馈</td>"
         + "</tr>"
         //+ "<tr class=\"tips\">"
         //+ "<td></td>"
         //+ "<td>* [联系人]不能为空！</td>"
         //+ "</tr>"
         + "<tr>"
         + "<td width='130px' class=\"t_left\">分类：</td>"
         + "<td width='*' class=\"t_right\">"
         + "<select id=\"fq_text_cate\">"
         //+ "<option>其他</option>"
         + "</select>"
         + "</td>"
         + "</tr>"
         + "<tr>"
         + "<td class=\"t_left\">标题：</td>"
         + "<td class=\"t_right\">"
         + "<input type=\"text\" id=\"fq_text_title\" /></td>"
         + "</tr>"
         + "<tr>"
         + "<td class=\"t_left\">联系人：</td>"
         + "<td class=\"t_right\">"
         + "<input type=\"text\" id=\"fq_text_linkname\"/></td>"
         + "</tr>"
         + "<tr>"
         + "<td class=\"t_left\">联系邮箱：</td>"
         + "<td class=\"t_right\">"
         + "<input type=\"text\" id=\"fq_text_email\"/></td>"
         + "</tr>"
         + "<tr>"
         + "<td class=\"t_left\">手机号码：</td>"
         + "<td class=\"t_right\">"
         + "<input type=\"text\" id=\"fq_text_tel\"/></td>"
         + "</tr>"
         + "<tr>"
         + "<td class=\"t_left\">联系QQ：</td>"
         + "<td class=\"t_right\">"
         + "<input type=\"text\" id=\"fq_text_qq\"/></td>"
         + "</tr>"
         + "<tr>"
         + "<td class=\"t_left\">反馈内容：</td>"
         + "<td class=\"t_right\">"
         + "<textarea id=\"fq_text_context\"></textarea></td>"
         + "</tr>"
         + "<tr>"
         + "<td colspan=\"2\">"
         + "<input id=\"sub_feedback\" class=\"sub_btn\" type=\"button\" value=\"提交\" /></td>"
         + "</tr></table></div>";
    $('body').append(body);

    //反馈弹出层
    $("#fd_feedback").click(function () {
        //if (feedbackClassHtml == '') {
            $.ajax({
                type: "get",
                url: "http://api.yingsheng.com/LogManager.ashx?op=ClassList",
                dataType: "jsonp",
                callback: "callback",
                success: function (json) {
                    //console.log(json)
                    var option = "";
                    //data = eval('(' + self.data + ')');
                    for (var i = 0, m; m = json.list[i++];) {
                        option += "<option value=\"" + m.classId + "\">" + m.classname + "</option>";
                    }
                    $("#fq_text_cate").html(option);
                    feedbackClassHtml = option;
                }, error: function () { alert("系统错误"); }
            });
        //}

        art.dialog({
            content: document.getElementById('ys_global_feedbackBox'),
            fixed: true,
            lock: true,
            width: 530,
            padding: 0,
            title:'提交您的反馈信息',
            id: 'ys_global_feedbackDialogBox'
        });



    });
    //提交表单
    $("#sub_feedback").click(function () {
        var $cate = $("#fq_text_cate"), $title = $("#fq_text_title"), $name = $("#fq_text_linkname"), $email = $("#fq_text_email"),
            $tel = $("#fq_text_tel"), $qq = $("#fq_text_qq"), $context = $("#fq_text_context"),
        regmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        regphone = mobile=/^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if ($title.val() == "") {
            art.dialog.tips('请输入标题', 2);
            return false;
        }
        if ($name.val() == "") {
            art.dialog.tips('请输入联系人名称', 2);
            return false;
        }
        if ($email.val() == "" && $tel.val() == "" && $qq.val() == "") {
            art.dialog.tips('请在联系邮箱、手机号码、联系QQ中任意填写一个', 2);
            return false;
        }
        if ($email.val() != "" && !regmail.test($email.val())) {
            art.dialog.tips('请输入正确的邮箱格式', 2);
            return false;
        }
        if ($tel.val() != "" && !regphone.test($tel.val())) {
            art.dialog.tips('请输入正确的手机格式', 2);
            return false;
        }
        if ($context.val() == "") {
            art.dialog.tips('请输入反馈内容', 2);
            return false;
        }
        var prams = { cate: $cate.find("option:selected").text(), title: $title.val(), name: $name.val(), email: $email.val(), tel: $tel.val(), qq: $qq.val(), context: $context.val() }

        $.ajax({
            type: "POST",
            url: "http://api.yingsheng.com/LogManager.ashx?op=AddUserBackLog",
            dataType: "jsonp",
            callback: "callback",
            data: prams,//"cate=" + $cate.find("option:selected").text() + "&title=" + $title.val() + "&name=" + $name.val() + "&email=" + $email.val() + "&tel=" + $tel.val() + "&qq=" + $qq.val() + "&context=" + $context.val(),
            success: function (json) {
                //console.log("cate=" + $cate.find("option:selected").text() + "&title=" + $title.val() + "&name=" + $name.val() + "&email=" + $email.val() + "&tel=" + $tel.val() + "&qq=" + $qq.val() + "&context=" + $context.val());
                //console.log(json);
                if (json.result == 1) {
                    art.dialog.tips('提交成功！感谢亲提出了您宝贵的意见！(*^__^*)', 2);
                    //setTimeout('layer.closeAll()', 2500);
                    art.dialog({ id: 'ys_global_feedbackDialogBox' }).close();
                } else {
                    art.dialog.tips('提交失败！', 2);
                }
            }, error: function () { art.dialog.tips("系统繁忙！请稍后重试",2); }
        });
    });
});
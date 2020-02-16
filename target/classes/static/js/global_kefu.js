 var html="";

 html+="\r\n";

html+="    <Style>\r\n";
html+="        .layer_kefu {\r\n";
html+="\r\n";
html+="            background:url(http://www.yingsheng.com/../images/kefu_bg.png) no-repeat;\r\n";
html+="            width:448px;\r\n";
html+="            height:158px;\r\n";
html+="            padding-top:175px;\r\n";
html+="            text-align:center;\r\n";
html+="            padding-left:85px;\r\n";
html+="            color:#fff;\r\n";
html+="            line-height:40px;\r\n";
html+="            font-size:20px;\r\n";
html+="            display:none;\r\n";
html+="        }\r\n";
html+="        .kefu_btn {\r\n";
html+="            margin-top:20px;\r\n";
html+="        }\r\n";
html+="            .kefu_btn .q_now,.kefu_btn .q_after {\r\n";
html+="                font-size:16px;\r\n";
html+="                background:#d74309;\r\n";
html+="                width:130px;\r\n";
html+="                height:30px;\r\n";
html+="                display:inline-block;\r\n";
html+="                border-radius:20px;\r\n";
html+="                color:#fff;\r\n";
html+="                line-height:30px;\r\n";
html+="                margin-right:25px;\r\n";
html+="                cursor:pointer;\r\n";
html+="            }\r\n";
html += "            .layer_kefu .q_after {\r\n";
html += "                background:#efac2f;\r\n";
html += "            }\r\n";
//html += "            .xubox_setwin {\r\n";
//html += "                top:130px;\r\n";
//html += "                right:35px;\r\n";
//html += "            }\r\n";
html += "    </Style>\r\n";
html+="    <!--客服弹窗-->\r\n";
html+="    <div class='layer_kefu'>\r\n";
html+="        <p>hi! 欢迎光临英盛网!</p>\r\n";
html+="        <p>自己看不如聊聊看，小英会迅速帮您解答！</p>\r\n";
html+="        <div class='kefu_btn'>\r\n";
html += "            <a href='http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODA2NDI0NV8yODA2NjZfNDAwNjY2NDM0M18yXw' class='q_now' target='_blank' title='马上交谈'>马上交谈</a>\r\n";
html+="            <a class='q_after' title='看看再说'>看看再说</a>\r\n";
html+="        </div>\r\n";
html+="    </div>\r\n";


document.write(html);

        //setTimeout(function () {


        //    $.layer({
        //        type: 1,
        //        shade: [0.5, '#000', true],
        //        area: ['auto', 'auto'],
        //        title: false,
        //        bgcolor: 'none',
        //        closeBtn: [0, true],
        //        border: [0, 0.3, '#000', false],
        //        page: { dom: '.layer_kefu' }
        //    });



        //    $(".q_after").click(function () {
        //        layer.closeAll();
        //    });

        //}, 30000);//1000毫秒，自己定义延迟时间
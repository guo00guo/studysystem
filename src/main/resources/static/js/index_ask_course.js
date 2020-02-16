/*你可能遇到的问题*/

/*zjs添加*/










/*默认函数*/

    function DY_scroll(wraper,prev,next,img,speed,or)
    {
        
    var wraper = $(wraper);
    var prev = $(prev);
    var next = $(next);
    var img = $(img).find('ul');
    var w = (img.find('li').outerWidth(true)*3);
    var s = speed;
    next.click(function()
    {
    img.animate({'margin-left':-w},function()
    {
    img.find('li').eq(0).appendTo(img);
    img.find('li').eq(0).appendTo(img);
    img.find('li').eq(0).appendTo(img);
    img.css({'margin-left':0});
    });
    });
    prev.click(function()
    {
    img.find('li:last').prependTo(img);
    img.find('li:last').prependTo(img);
    img.find('li:last').prependTo(img);
    img.css({'margin-left':-w});
    img.animate({'margin-left':0});
    });
    if (or == true)
    {
    ad = setInterval(function() { next.click();},s*1000);
    wraper.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() { next.click();},s*1000);});
    }
    }

    


    $(document).ready(function () {

        //换一批按钮
        $("#recommQACoursesBtn").click(function () {
            var qa_sort = $("#qa_sort").val();
            var qa_categoryId = $("#qa_categoryId").val();
            qa_sort = parseInt(qa_sort) ? parseInt(qa_sort) : 1;
            qa_sort++;
            $.post('/main-recommQACourseList.htm', { sort: qa_sort,categoryId:qa_categoryId }, function (data) {
                //data为json数据，直接引用如data.result
                if (data.result == '1') {
                    var maxSort = parseInt(data.listAttr.maxSort);
                    if (qa_sort >= maxSort) {
                        qa_sort = 1;    //当超过最大数时则选取第一页
                    }
                    //开始填充内容
                    $("#tagsCloud").empty();
                    $("#tagsCloud").text("载入中..");
                    var obj = data.itemSet;
                    var html = "";
                    html += "\r\n";
                    html += "			<div class='item-hover  tag-ielts tag-pos1 item-hover-weight0 bounceIn-infinite3 bg-div1' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos1 tag-weight0 tag-ielts tag-ielts0 bounceIn-infinite3' style='display: block;'><a href='javascript:;'  class='tag-webim' title='" + obj[0].title + "' alt='" + obj[0].qaId + "'><span><i>" + obj[0].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-toefl tag-pos2 item-hover-weight2 bounceIn-infinite bg-div2' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos2 tag-weight2 tag-toefl tag-toefl1 bounceIn-infinite' style='display: block;'><a href='javascript:;' class='tag-webim' title='" + obj[1].title + "' alt='" + obj[1].qaId + "'><span><i>" + obj[1].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-toefl tag-pos3 item-hover-weight1 bounceIn-infinite3 bg-div3' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos3 tag-weight1 tag-toefl tag-toefl0 bounceIn-infinite3' style='display: block;'><a href='javascript:;'  class='tag-webim' title='" + obj[2].title + "' alt='" + obj[2].qaId + "'><span><i>" + obj[2].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-toefl tag-pos4 item-hover-weight2 bounceIn-infinite bg-div4' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos4 tag-weight2 tag-toefl tag-ielts1 bounceIn-infinite' style='display: block;'><a href='javascript:;'  class='tag-webim' title='" + obj[3].title + "' alt='" + obj[3].qaId + "'><span><i>" + obj[3].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-ielts tag-pos5 item-hover-weight1 bounceIn-infinite3 bg-div5' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos5 tag-weight3 tag-ielts tag-ielts0 bounceIn-infinite3' style='display: block;'><a href='javascript:;'class='tag-webim' title='" + obj[4].title + "' alt='" + obj[4].qaId + "'><span><i>" + obj[4].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-ielts tag-pos6 item-hover-weight1 bounceIn-infinite bg-div6' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos6 tag-weight3 tag-ielts tag-ielts1 bounceIn-infinite' style='display: block;'><a href='javascript:;'class='tag-webim' title='" + obj[5].title + "' alt='" + obj[5].qaId + "'><span><i>" + obj[5].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-ielts tag-pos7 item-hover-weight0 bounceIn-infinite2 bg-div7' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos7 tag-weight0 tag-ielts tag-toefl2 bounceIn-infinite2' style='display: block;'><a href='javascript:;'class='tag-webim' title='" + obj[6].title + "' alt='" + obj[6].qaId + "'><span><i>" + obj[6].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-toefl tag-pos8 item-hover-weight1 bounceIn-infinite bg-div8' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos8 tag-weight1 tag-toefl tag-toefl1 bounceIn-infinite' style='display: block;'><a href='javascript:;'class='tag-webim' title='" + obj[7].title + "' alt='" + obj[7].qaId + "'><span><i>" + obj[7].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-ielts tag-pos9 item-hover-weight0 bounceIn-infinite3 bg-div9' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos9 tag-weight0 tag-ielts tag-ielts0 bounceIn-infinite3' style='display: block;'><a href='javascript:;'class='tag-webim' title='" + obj[8].title + "' alt='" + obj[8].qaId + "'><span><i>" + obj[8].title + "</i></span></a></div>\r\n";
                    html += "\r\n";
                    html += "            <div class='item-hover  tag-toefl tag-pos10 item-hover-weight0 bounceIn-infinite3 bg-div10' style='display: none;'></div>\r\n";
                    html += "            <div class='item pngfix tag-pos10 tag-weight0 tag-toefl tag-toefl0 bounceIn-infinite3' style='display: block;'><a href='javascript:;'class='tag-webim' title='" + obj[9].title + "' alt='" + obj[9].qaId + "'><span><i>" + obj[9].title + "</i></span></a></div>\r\n";
                    $("#tagsCloud").html(html);
                    $("#qa_sort").val(qa_sort);

                    //圆球点击
                    $(".tag-webim").click(function () {
                        //alert($(this).attr("alt"));
                        var qaId = $(this).attr("alt"); //问题ID，可以通过ID读取到相关课程
                        recommQACourseClick(qaId);

                    });

                    //圆球效果
                    for (var i = 1; i < 11; i++) {
                        hover(i);
                    }

                }
                else {
                    //alert(data.msg);
                    layer.msg(data.msg, 1, -1);
                    return false;
                }
            }, "json");
        });

        //圆球点击
        $(".tag-webim").click(function () {
            //alert($(this).attr("alt"));
            var qaId = $(this).attr("alt"); //问题ID，可以通过ID读取到相关课程
            recommQACourseClick(qaId);

        });
    });


    function recommQACourseClick(qaId) {
        
        $.post('/main-recommQACourseGet.htm', { qaId: qaId }, function (data) {
            //data为json数据，直接引用如data.result
            if (data.result == '1') {
                $("#show_ask_course_content").text("载入中..");
                //设置标题
                $("#ask_course_title").text(data.recommQACourses.title);
                //读取数据
                //alert(data.itemSet.length);
                var html = "";
                if (data.itemSet.length > 3) {
                    //超过3条，有滚屏的处理
                    html += "\r\n";
                    html += "<div class='scroll'>\r\n";
                    html += "            <a class='prev' id='prev_01' href='javascript:;'></a>\r\n";
                    html += "            <div class='scroll_list' id='s_list_01'>\r\n";
                    html += "                <ul>\r\n";
                    html += "\r\n";
                    var obj = data.itemSet;
                    for (var p in obj) {
                        var courseId = obj[p].courseId;
                        var imageUrl = "http://vimg.yingsheng.com/files/" + parseInt(courseId) % 1024 + "/" + courseId + "/" + courseId + "_353_279.jpg";
                        var zoneUrl = "http://zone.yingsheng.com/"+obj[p].userId+"/";

                        html += "            <li><a target='_blank' href='/course-" + obj[p].courseId + ".html?from=indexqa' title='" + obj[p].title + "'>\r\n";
                        html += "                <img alt='" + obj[p].title + "' src='" + imageUrl + "' width='118' height='93'></a>\r\n";
                        html += "                <strong>" + obj[p].title + "</strong>\r\n";
                        html += "                <!--<span class='s1'>￥" + obj[p].discPrice + "</span>-->\r\n";
                        html += "                <span class='s2'>讲师：<a href='" + zoneUrl + "' target='_blank'>" + obj[p].instrName + "</a></span>\r\n";
                        html += "            </li>\r\n";
                    }
                    html += "                </ul>\r\n";
                    html += "            </div>\r\n";
                    html += "\r\n";
                    html += "            <a class='next' id='next_01' href='javascript:;'></a>\r\n";
                    html += "        </div>\r\n";
                    $("#show_ask_course_content").html(html);
                    DY_scroll('.scroll', '#prev_01', '#next_01', '#s_list_01', 3, false);// true为自动播放，不加此参数或false就默认不自动
                } else {
                    //3条内，居中处理
                    html += "\r\n";
                    html += "<div class='ask_course_list'>\r\n";
                    html += "        <ul>\r\n";
                    html += "\r\n";
                    var obj = data.itemSet;
                    for (var p in obj) {
                        var courseId = obj[p].courseId;
                        var imageUrl = "http://vimg.yingsheng.com/files/" + parseInt(courseId) % 1024 + "/" + courseId + "/" + courseId + "_353_279.jpg";

                        html += "            <li><a target='_blank' href='/course-" + obj[p].courseId + ".html?from=indexqa' title='" + obj[p].title + "'>\r\n";
                        html += "                <img alt='" + obj[p].title + "' src='" + imageUrl + "' width='118' height='93'></a>\r\n";
                        html += "                <strong>" + obj[p].title + "</strong>\r\n";
                        html += "                <span class='s1'>￥" + obj[p].discPrice + "</span>\r\n";
                        html += "                <span class='s2'>讲师：" + obj[p].instrName + "</span>\r\n";
                        html += "            </li>\r\n";
                    }
                    html += "        </ul>\r\n";
                    html += "\r\n";
                    html += "    </div>\r\n";
                    $("#show_ask_course_content").html(html);
                }

                //点击的弹窗处理
                $.layer({
                    type: 1,
                    shade: [0.5, '#000', true],
                    area: ['auto', 'auto'],
                    title: false,
                    border: [0, 0.3, '#000', true],
                    page: { dom: '#show_ask_course_win' }
                });

            }
            else {
                //alert(data.msg);
                layer.msg(data.msg, 1, -1);
                return false;
            }
        }, "json");

    }



    for (var i = 1; i < 11; i++) {
        hover(i);
    }

    function hover(index) {
        $(".tag-pos" + index).hover(function () {
            if (index == 2 || index == 4 || index == 6 || index == 8) {
                $(".tag-pos" + index).removeClass(" bounceIn-infinite");
            } else if (index == 1 || index == 3 || index == 5 || index == 9 || index == 10 || index == 11) {
                $(".tag-pos" + index).removeClass(" bounceIn-infinite3");
            } else if (index == 7) {
                $(".tag-pos" + index).removeClass(" bounceIn-infinite2");
            }
            $(".bg-div" + index).addClass(" bounceIn-hover");
            $(".bg-div" + index).show();
        }, function () {
            if (index == 2 || index == 4 || index == 6 || index == 8) {
                $(".tag-pos" + index).addClass(" bounceIn-infinite");
            } else if (index == 1 || index == 3 || index == 5 || index == 9 || index == 10 || index == 11) {
                $(".tag-pos" + index).addClass(" bounceIn-infinite3");
            } else if (index == 7) {
                $(".tag-pos" + index).addClass(" bounceIn-infinite2");
            }
            $(".bg-div" + index).removeClass(" bounceIn-hover");
            $(".bg-div" + index).hide();
        })
    }

$(document).ready(function () {
    var layer_index_car;
    var tabIndex = 1;
    var spanCharLen = 200;

    $('#xxpx').click(function () {
        var $lecturer = $(this).attr('lecturer');

        var str = '<table class="xxpxtb"><form id="xxpxfrm">' +
                  '<tr><td class="xxpxtip">请拨打我们的热线电话咨询：</td></tr>' +
                  '<tr><td class="xxtel">400-666-4343</td></tr>' +
                  '<tr><td class="xxpxtip">或留下您的联系方式，我们会尽快与您联系</td></tr>' +
                  '<tr><td style="padding-top:10px"><table class="inputinfo">' +
                  '<tr><td align="right" height="30">姓名：</td><td><input id="xxpxname" maxlength="10" type="text"><b> *</b></td></tr>' +
                  '<tr><td align="right" height="30">手机：</td><td><input id="xxpxmobile" maxlength="11" type="text"><b> *</b></td></tr>' +
                  '<tr><td align="right" height="30">QQ：</td><td><input id="xxpxqq" maxlength="11" type="text"></td></tr>' +
                  '<tr><td valign="top" align="right" height="60">留言：</td><td><textarea id="xxpxmsg" maxlength="198"></textarea></td></tr>' +
                  '</table></td></tr>' +
                  '</form></table>';

        var frm = art.dialog({
            title: '邀请老师进行线下培训',
            content: str,
            lock: true,
            okValue: '提交需求',
            ok: function () {
                var $name = $.trim($('#xxpxname').val());
                var $mobile = $.trim($('#xxpxmobile').val());
                if ($name == '' || $mobile == '') {
                    alert('请填写姓名和手机'); return false;
                }
                if ($mobile.search(/^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/) == -1) {
                    alert('请输入正确的手机号码'); return false;
                }

                var $qq = $.trim($('#xxpxqq').val());
                var $msg = $.trim($('#xxpxmsg').val());

                $.ajax({
                    type: 'GET', url: '/e/extend/ajax', async: false, data: 'from=xxpx' + '&lecturer=' + $lecturer + '&name=' + $name + '&mobile=' + $mobile + '&qq=' + $qq + '&msg=' + $msg,
                    success: function (msg) {
                        if (msg == '1') {
                            alert('您的需求已提交成功，我们会尽快与您联系~');
                        } else {
                            alert('提交失败，请您稍后再试~');
                        }
                        frm.close();
                    }
                });

                return false;
            }
        });
    });

    //购物车
    $("#btnAddToCart").click(function () {
        ys.ShoppingCart.add({ itemId: live.id, type: "E", num: 1 }, false);
        $("#car_count").html(ys.ShoppingCart.items().length);//商品数量
        layer_index_car = $.layer({
            type: 1,
            shade: [0.5, '#000', true],
            area: ['auto', 'auto'],
            title: false,
            border: [0],
            page: { dom: '#add_car' }
        });
    });

    //购买
    $("#btnBuyNow").click(function () {
        ys.ShoppingCart.add({ itemId: live.id, type: "E", num: 1 }, true);
    });

    //免费直接报名
    $("#btnSign").click(function () {
        var url = "/courselive-courselive-sign.htm";
        var data = {};
        data.liveId = live.id;
        data.random = Math.random();
        $.ajax({
            url: url
            , dataType: "json"
            , data: data
            , async: false
            , success: function (d) {
                if (d.result == 1) {
                        $(".show_msg").css("display", "block");
                }
                else {
                    if (d.msg.indexOf("没有登录") > -1) {
                        alert(d.msg);
                        
                            OpenLoginOrRegBox('f', '1');
                    }
                    else {
                        alert(d.msg);
                    }
                    
                }
            }
        });
        return false;
    });

    $(".content_close").click(function () {
        window.location.href = window.location.href;
    });

    //更多
    ddheight = $(".detail_desc dd").height() + parseInt("20");
    $(".detail_desc_more").click(function () {
        if ($(".detail_desc dd").height() != '300') {
            $(".detail_desc dd").animate({ height: "300px" }, { queue: false, duration: 200 });
            $(".detail_desc_more i").removeClass("i1");
            $(".detail_desc_more span").html("展开");
        } else {
            $(".detail_desc dd").animate({ height: ddheight }, { queue: false, duration: 200 });
            $(".detail_desc_more i").addClass("i1");
            $(".detail_desc_more span").html("收起");
        }
    });

    //星星
    $("#ulCourseRating").rating({ allowRate: false }).append("<li style='float: left;height: 19px;'>&nbsp;&nbsp;(<a href='#divTabs'>" + setScore($("#ulCourseRating").attr("data-score")) + "分</a>)</li>");
    $("#ulCommentRating").rating();

    //评论
    $("#btnComment").click(function () {
        comment.add(null, function () {
                changeVerifyCode();
                $("#btnComment").val("编辑评论");
                $("#textfield").val("");
                comment.get(function () { comment.initCommentUI(); pageIndex = 1; comment.list(); });
                layer.msg('操作成功', 2, { type: 9, shade: [0, '#000'] });
            });
    });

    //更新验证码
    function changeVerifyCode() {
        var code = $("#captcha").attr("src");
        var sp_code = code.split('=');
        $("#captcha").attr('src', sp_code[0] + '=' + Math.random());
    }

    function setScore(obj) {
        var score = parseFloat(obj);
        if ($.isNumeric(score)) {
            return score == 0 ? "等您来评" : (parseFloat(score)).toFixed(1);
        }
        else {
            return "等您来评";//0.0;
        }
    }

    $("#spanEditComment").click(function () {
        $("#div_edit_comment").show();
        $("#div_view_comment").hide();
    });

    $("#captcha").click(function () {
        changeVerifyCode();
    });

    $("#for_captcha").click(function () {
        changeVerifyCode();
    });

    $("#saytext").keydown(function () {
        var nowNum = $(this).val().length;
        if (nowNum > spanCharLen) {
            $(this).val($(this).val().substring(0, spanCharLen));
        }
        else {
            $("#spanCharLen").html(spanCharLen - nowNum);
        }
    })
    .keyup(function () {
        var nowNum = $(this).val().length;
        if (nowNum > spanCharLen) {
            $(this).val($(this).val().substring(0, spanCharLen));
        }
        else {
            $("#spanCharLen").html(spanCharLen - nowNum);
        }
    });

    //倒计时
    var $spanDurationDays = $("#spanDurationDays");
    var $spanDurationHours = $("#spanDurationHours");
    var $spanDurationMinutes = $("#spanDurationMinutes");
    var $spanDurationSeconds = $("#spanDurationSeconds");
    function cal() {
        var timeInfo = {};
        spanTime--;
        var d = Math.floor((spanTime / (60 * 60 * 24)));
        var h = Math.floor((spanTime % (24 * 3600)) / 3600);
        var m = Math.floor((spanTime % 3600) / (60));
        var s = Math.floor(spanTime % 60);
        d = d < 0 ? 0 : d;
        h = h < 0 ? 0 : h;
        m = m < 0 ? 0 : m;
        s = s < 0 ? 0 : s;
        if ((d + "").length == 1) {
            d = "0" + d;
        }
        if ((h + "").length == 1) {
            h = "0" + h;
        }
        if ((m + "").length == 1) {
            m = "0" + m;
        }
        if ((s + "").length == 1) {
            s = "0" + s;
        }
        timeInfo.days = d;
        timeInfo.hours = h;
        timeInfo.minutes = m;
        timeInfo.seconds = s;
        return timeInfo;
    }
    function setCountDown() {
        var time = cal();
        $spanDurationDays.html(time.days);
        $spanDurationHours.html(time.hours);
        $spanDurationMinutes.html(time.minutes);
        $spanDurationSeconds.html(time.seconds);
    }

    //评论页码
    var pageIndex = 1;

    //分页栏
    var PagingBar = onyx.ui.PagingBar;

    var pagingBar = new PagingBar({
        box: "divPagingBar",
        pageGoto: function (pageNo) {
            pageIndex = pageNo;
            comment.list();
        }
    });

    pagingBar.setButtons({
        pageNo: 1,
        pagesCount: 1
    });

    var Post = {
        createPost: function () {
            var setting = {
                type: "post",
                dataType: "json"
            };
            var post = {};
            post.url = "";
            post.data = "";
            post.error = null;
            post.success = null;
            post.action = function () {
                var optins = { url: post.url, data: post.data, error: post.errorm, success: post.success };
                optins = $.extend(setting, optins);
                $.ajax(optins);
            };
            return post;
        }
    };

    var StrUtil = onyx.util.StrUtil;

    var Comment = {
        createComment: function () {
            var getPost = function (url, data, callBack) {
                var result = { result: 0, msg: "" };
                var post = Post.createPost();
                post.url = url;
                post.data = data;
                post.error = function (d) { result.result = 0; result.msg = "提交发生错误"; if ($.isFunction(callBack)) callBack.call(d, result); };
                post.success = function (d) {
                    if ($.isFunction(callBack)) callBack.call(d, result);
                };
                return post;
            };
            var posting = false;
            var comment = {};
            comment.groupID = "";
            comment.reviewID = "";
            comment.isCommented = false;
            comment.sayText = "";
            comment.star = 0;
            comment.face = "";
            comment.userName = "";
            comment.add = function (data, callBack) {
                if (posting) return false;
                var data = {};
                data.courseId = live.id;
                data.classId = live.catId;
                data.verifyCode = $.trim($("#textfield").val());
                data.sayText = $.trim($("#saytext").val());
                data.isGood = $("#ulCommentRating").attr("data-score");
                data.userId = "#UserId#";
                data.username = "#userName#";
                data.objType = "E";
                data.sayIp = "#sayIp#";
                if (data.sayText.length > spanCharLen) {
                    alert("长度不能大于" + spanCharLen);
                    return false;
                }
                if (data.courseId === "") { layer.msg("课程ID不能为空"); return false; }
                if (data.classId === "") { layer.msg("分类ID不能为空"); return false; }
                if (data.verifyCode === "") { layer.msg("验证码不能为空"); return false; }
                if (data.sayText === "") { layer.msg("评论内容不能为空"); return false; }
                posting = true;
                var post = getPost("/course-coursereview-add.htm", data, function (r) {
                    posting = false;
                    if (this.result === 1) {
                        comment.sayText = data.sayText;
                        comment.star = data.isGood;
                        if ($.isFunction(callBack)) callBack.call(data);
                    }
                    else {
                        cookieComment.set(data.courseId, data.sayText);
                        layer.msg(this.msg);
                    }
                    return false;
                });
                post.action();
            };
            comment.list = function () {
                var data = {};
                data.courseId = live.id;
                data.pageNo = pageIndex;
                data.pageSize = 5;
                data.objType = "E";
                var post = getPost("ajax.php", data, function (r) {
                    if (this.result === 1) {
                        $("#comment").html("");
                        $("#commentItemCout").html(this.pageInfo.itemsCount);
                        var sHtml = "";
                        $.each(this.list, function () {
                            if (this.reviewId == comment.reviewID)
                                return true;
                            sHtml += "<div class='feedback_member'>";
                            sHtml += "<dl>";
                            sHtml += "<dt>";
                            sHtml += "<img src='" + this.face + "?rnd=" + Math.random() + "'  alt='" + StrUtil.toHtml(this.userName) + "'/></dt>";
                            sHtml += "<dd>";
                            sHtml += "<strong><a href='javascript:void(0);' title='" + StrUtil.toHtml(this.userName) + "'></a>" + StrUtil.toHtml(this.userName);
                            if (this.groupId && this.groupId == "4") {
                                sHtml += "<i class='i1'></i>";
                            }
                            else if (this.groupId && this.groupId == "9") {
                                sHtml += "<i class='i2'></i>";
                            }
                            sHtml += "</strong>";
                            sHtml += StrUtil.toHtml(this.sayText);
                            sHtml += "</dd>";
                            sHtml += "</dl>";
                            sHtml += "<ul class='ulCommentRating' data-score='" + this.isGood + "'>";
                            sHtml += "</ul>";
                            //sHtml += "（" + this.isGood + "分）";
                            sHtml += "</div>";
                        });
                        $("#comment").html(sHtml);
                        $("#comment .ulCommentRating").each(function () {
                            $(this).rating({ allowRate: false }).append("<li style='float: left;height: 19px;'>&nbsp;&nbsp;(" + setScore($(this).attr("data-score")) + "分)</li>");
                        });
                        pagingBar.setButtons({
                            pageNo: data.pageNo,
                            pagesCount: this.pageInfo.pagesCount
                        });
                    }
                });
                post.action();
            };
            comment.get = function (afterSucceed) {
                var data = {};
                data.courseId = live.id;
                data.userId = "#UserId#";
                var post = getPost("ajax.php", data, function (r) {
                    if (this.result === 1) {
                        //console.log(this.list.sayText);
                        if (this.list.sayTime) {
                            comment.isCommented = true;
                            comment.sayText = this.list.sayText;
                            comment.star = this.list.isGood;
                            comment.face = this.list.face;
                            comment.userName = this.list.userName;
                            comment.reviewID = this.list.reviewId;
                            comment.groupID = this.list.groupId
                            if ($.isFunction(afterSucceed)) afterSucceed.call(this.list);
                        }
                    }
                    else {
                        if ($.isFunction(afterSucceed)) afterSucceed.call(null);
                    }
                    return false;
                });
                post.action();
            };
            comment.initCommentUI = function () {
                var sHtml = "";
                sHtml += "<dt><img alt='' src='" + comment.face + "?rnd=" + Math.random() + "'/></dt>";
                sHtml += "<dd style='margin:0px;'><strong><a title='" + StrUtil.toHtml(comment.userName) + "' href='javascript:void(0);'></a>" + StrUtil.toHtml(comment.userName);
                if (comment.groupID && comment.groupID == "4") {
                    sHtml += "<i class='i1'></i>";
                    //sHtml += "<i style='backgroup:url(http://www.yingsheng.com/../images/ask/renzhen.jpg) no-repeat;width:64px;height:15px;'></i>";
                }
                else if (comment.groupID && comment.groupID == "9") {
                    sHtml += "<i class='i2'></i>";
                }
                sHtml += "</strong>" + StrUtil.toHtml(comment.sayText) + "</dd>";
                $("#div_edit_comment").hide();
                $("#div_view_comment").show();
                $("#dlCommentContent").html(sHtml);
                $("#saytext").val(StrUtil.toHtml(comment.sayText));
                $("#ulCommentRating").attr("data-comment", StrUtil.toHtml(comment.sayText)).attr("data-score", comment.star).empty().rating();
                $("#btnComment").val("编辑评论");
                $("#ulCommentEdit").empty().attr("data-score", comment.star).rating({ allowRate: false }).append("<li style='float: left;height: 19px;'>&nbsp;&nbsp;(" + setScore(comment.star) + "分)</li>");
            };
            return comment;
        }
    };

    var comment = Comment.createComment();

    //comment.list();
    comment.get(function () {
        comment.list();
        if (this.reviewId != null) {
            comment.initCommentUI();
        }
    });

    //if ($(".detail_desc dd").height() <= 300) {
    //    $(".detail_desc_more").css("display", "none");
    //}
    //else {
    //    $(".detail_desc dd").height(300);
    //}

    setInterval(setCountDown, 1000);
});
$(document).ready(function () {
    var layer_index_car;
    var tabIndex = 1;
    var spanCharLen = 200;

    $("#btnAddToShoppingCar").click(function () {
        //ys.ShoppingCart.add({ itemId: courseId, type: "A", num: 1 }, false);
        //$("#car_count").html(ys.ShoppingCart.items().length);//商品数量
        addToShoppingCart(function (success) {
            if (success) {
                $("#car_count").html(1);//商品数量
                layer_index_car = $.layer({
                    type: 1,
                    shade: [0.5, '#000', true],
                    area: ['auto', 'auto'],
                    title: false,
                    border: [0],
                    page: { dom: '#add_car' }
                });
            }
            else {
                if (this.msg.indexOf("登录") > -1) {
                    OpenLoginOrRegBox('f', '1');
                }
                else {
                    alert(this.msg);
                }
            }
        });
    });

    $("#btnBuy").click(function () {
        //ys.ShoppingCart.add({ itemId: courseId, type: "A", num: 1 }, true);
        addToShoppingCart(function (success) {
            if (success) {
                location.href = "http://order.yingsheng.com/Order?source=1";
            }
            else {
                if (this.msg.indexOf("登录") > -1) {
                    OpenLoginOrRegBox('f', '1');
                }
                else {
                    alert(this.msg);
                }
            }
        });
    });

    function addToShoppingCart(callBack) {
        try {
            _adwq.push(['_setDataType', 'cart']);
            _adwq.push(['_setCustomer',
                yId
            ]);
            _adwq.push(['_setItem',
                courseId,    // 09890是一个例子，请填入商品编号  - 必填项
                title,       // 电视是一个例子，请填入商品名称  - 必填项
                disPrice,    // 12.00是一个例子，请填入商品金额  - 必填项
                '1',        // 1是一个例子，请填入商品数量  - 必填项
                classId,     // A123是一个例子，请填入商品分类编号  - 必填项
                className        // 家电是一个例子，请填入商品分类名称  - 必填项
            ]);
            _adwq.push(['_trackTrans']);
        }
        catch (e) { }
        var data = {};
        data.id = courseId;
        data.type = "A";
        data.count = 1;
        $.ajax({
            type: "Post",
            dataType: 'json',
            url: "/shoppingcart-shoppingcart-add.htm",
            async: false,
            data: data,
            success: function (d) {
                if ($.isFunction(callBack)) callBack.call(d, d.result === 1);
            }
        });
    }

    $("#btn_close_stay").click(function () {
        layer.close(layer_index_car);
    });

    $("#btnDownPPT").click(function () {
        if ($(this).attr("data-hasppt").toLowerCase() === "false" || $.trim($(this).attr("data-hasppt")) === "") {
            layer.tips('该课程暂无PPT', this, {
                guide: 2,
                time: 3,
                style: ['background:none;background:url(/../images/tips_ppt.png) no-repeat left;padding-left:25px;height:24px;line-height:24px;color:#13a5f0;width:113px; box-shadow:none;padding-top:10px;margin-top:-10px;']
            });
            return false;
        }
        if ($(this).attr("data-canplay").toLowerCase() === "false") {
            layer.tips('购买后才能下载', this, {
                guide: 2,
                time: 3,
                style: ['background:none;background:url(/../images/tips_ppt.png) no-repeat left;padding-left:25px;height:24px;line-height:24px;color:#13a5f0;width:113px; box-shadow:none;padding-top:10px;margin-top:-10px;']
            });
            return false;
        }
        var $iframeDownPPT = $("#iframe_down_ppt");
        $iframeDownPPT.attr("src", $iframeDownPPT.attr("data-url"))
        //.unbind("load").bind("load", function () {
        //    var $info = $("#labelInfo", document.frames("ifrmae_down_ppt").document);
        //    if ($info.length > 0) {
        //        $("#ppt_error").find("p.p5").html($info.html());
        //        $.layer({
        //            type: 1,
        //            shade: [0.5, '#000', true],
        //            area: ['auto', 'auto'],
        //            title: false,
        //            border: [0],
        //            page: { dom: '#ppt_error' }
        //        });
        //    }
        //})
        ;
    });

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

    $("#captcha").click(function () {
        changeVerifyCode();
    });

    $("#for_captcha").click(function () {
        changeVerifyCode();
    });

    $("#btnComment").click(function () {

        if (tabIndex == 1) {
            comment.add(null, function () {
                changeVerifyCode();
                $("#btnComment").val("编辑评论");
                $("#textfield").val("");
                //if (!comment.isCommented) {
                comment.get(function () { comment.initCommentUI(); pageIndex = 1; comment.list(); $(".tabs ol:eq(0)").click(); });
                //}
                //else {
                //    comment.initCommentUI();
                //}
                layer.msg('操作成功', 2, { type: 9, shade: [0, '#000'] });
                cookieComment.clear();

            });
        }
        else if (tabIndex == 2) {
            ask.add();
        }
        else {
        }
    });

    $("#btnFavorite").click(function () {
        try{
            _adwq.push([
'_setAction', '8crtms',
yId, //请填入用户id
courseId //请填入商品id
            ]);
        }
        catch (e) { }
        var favorite = Favorite.createFavorite();
        favorite.add("a", courseId, title, null);
        return false;
    });

    //Default Action(tab 评论和提问)
    $(".tab").hide(); //Hide all content
    $(".tabs ol:first").addClass("now").show(); //Activate first tab
    $(".index1").show(); //Show first tab content
    //On Click Event(tab 评论和提问)
    $(".tabs ol").click(function () {
        $("#saytext").val("");

        $(".tabs ol").removeClass("now"); //Remove any "active" class
        $(this).addClass("now"); //Add "active" class to selected tab
        $(".detail_feedback_list .tab").hide(); //Hide all tab content
        tabIndex = $(this).attr("data-index"); //Find the rel attribute value to identify the active tab + content

        $(".index" + tabIndex).show(); //Fade in the active content
        if (tabIndex == 1) {
            spanCharLen = 200;
            showCommentPannel();
            if (comment.isCommented) {
                $("#btnComment").val("编辑评论");
                $("#saytext").val(comment.sayText);
            }
            else {
                $("#btnComment").val("发表评论");
            }
        }
        else {
            spanCharLen = 50;
            $("#btnComment").val("请教老师");
        }
        $("#spanCharLen").html(spanCharLen);
        return false;
    });

    function showCommentPannel() {
        if (comment.isCommented) {
            $(".feedback_text .index" + tabIndex).hide();
            $(".feedback_text .index" + tabIndex + "Ext").show();
        }
        else {
            $(".feedback_text .index" + tabIndex).show();
            $(".feedback_text .index" + tabIndex + "Ext").hide();
        }
    }

    //星星
    $("#ulCourseRating").rating({ allowRate: false }).append("<li style='float: left;height: 19px;'>&nbsp;&nbsp;(<a href='#divTabs'>" + setScore($("#ulCourseRating").attr("data-score")) + "分</a>)</li>");
    $("#ulCommentRating").rating();

    $('.pro_middle dd .s2, .pro_middle dd .s3').hover(function () {
        $(".pro_middle .s3").show();
    }, function () {
        $(".pro_middle .s3").hide();
    })

    //更多
    ddheight = $(".detail_desc dd").height() + parseInt("20");
    $(".detail_desc_more").click(function () {
        if ($(".detail_desc dd").height() != '600') {
            $(".detail_desc dd").animate({ height: "600px" }, { queue: false, duration: 200 });
            $(".detail_desc_more i").removeClass("i1");
            $(".detail_desc_more span").html("展开");
        } else {
            $(".detail_desc dd").animate({ height: ddheight }, { queue: false, duration: 200 });
            $(".detail_desc_more i").addClass("i1");
            $(".detail_desc_more span").html("收起");
        }
    });

    //分享
    $("#share").click(function () {
        try{
            _adwq.push([
    '_setAction', '8cs0ld',
    yId, //请填入用户id
    courseId //请填入商品id
            ]);
        }
        catch (e) { }
        $(".share_tool .bds_more")[0].click();
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

    $("#spanEditComment").click(function () {
        $(".feedback_text .index" + tabIndex).show();
        $(".feedback_text .index" + tabIndex + "Ext").hide();
    });
    //
    function setScore(obj) {
        var score = parseFloat(obj);
        if ($.isNumeric(score)) {
            return score == 0 ? "等您来评" : (parseFloat(score)).toFixed(1);
        }
        else {
            return "等您来评";//0.0;
        }
    }

    //更新验证码
    function changeVerifyCode() {
        var code = $("#captcha").attr("src");
        var sp_code = code.split('=');
        $("#captcha").attr('src', sp_code[0] + '=' + Math.random());
    }

    //免费体验
    $("#btnExperience").click(function () {
        if (isLogin == "1") {
            $.layer({
                type: 1,
                shade: [0.5, '#000', true],
                area: ['auto', 'auto'],
                title: false,
                border: [0],
                page: { dom: '#divExperience' }
            });
        }
        else {
            OpenLoginOrRegBox('f', '1');
        }
        return false;
    });

    $("#btnExperienceOK").click(function () {
        var experienceCode = $("#txtExperienceCode").val();
        if (experienceCode == "")
            return false;
        var url = $(this).attr("data-url");
        var data = {};
        data.courseId = courseId;
        data.yzCode = experienceCode;

        $.ajax({
            url: "/course-course-checkcode.htm"
            , data: data
            , dataType: "json"
            , success: function (d) {
                if (d.result === 1) {
                    if (d.canPlay) {
                        window.location.href = url + "-" + data.yzCode;
                    }
                    else {
                        alert("体验码无效");
                    }
                }
                else {
                    layer.closeAll();
                    if (d.msg.indexOf("登录") > -1) {
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

    var Ask = {
        createAsk: function () {
            var getPost = function (url, data, callBack) {
                var result = { result: 0, msg: "" };
                var post = Post.createPost();
                post.url = url;
                post.data = data;
                post.error = function (d) { result.result = 0; result.msg = "提交发生错误"; if ($.isFunction(callBack)) callBack.call(d, result); };
                post.success = function (d) {
                    if (d.error) {
                        result.result = 0; result.msg = d.error;
                    } else {
                        result.result = 1; result.msg = "提交成功";
                    }
                    if ($.isFunction(callBack)) callBack.call(d, result);
                };
                return post;
            };
            var posting = false;
            var ask = {};
            ask.add = function (data, callBack) {
                if (posting) return false;
                var data = {};
                data.catId = "0";
                data.title = $.trim($("#saytext").val());
                data.content = "";
                data.score = "0";
                data.instrId = instrId;
                data.instrUserId = instrUserId;
                data.instrName = instrName;
                data.cosId = courseId;
                data.verifyCode = $.trim($("#textfield").val());
                if (data.title == "") {
                    alert("内容不能为空");
                    return false;
                }
                if (data.verifyCode == "") {
                    alert("验证码不为能空");
                    return false;
                }
                if (data.title.length > spanCharLen) {
                    alert("长度不能大于" + spanCharLen);
                    return false;
                }
                posting = true;
                var post = getPost("answer_detail.html?ask-add.htm", data, function (r) {
                    posting = false;
                    if (r.result == 0) {
                        alert(r.msg);
                        return false;
                    }
                    changeVerifyCode();
                    $("#textfield").val("");
                    $("#saytext").val("");
                });
                post.action();
            };
            
            return ask;
        }
    };

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
                data.courseId = courseId;
                data.classId = classId;
                data.verifyCode = $.trim($("#textfield").val());
                data.sayText = $.trim($("#saytext").val());
                data.isGood = $("#ulCommentRating").attr("data-score");
                data.userId = "#UserId#";
                data.username = "#userName#";
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
                data.courseId = courseId;
                data.pageNo = pageIndex;
                data.pageSize = 5;
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
                data.courseId = courseId;
                data.userId = "#UserId#";
                var post = getPost("ajax.php", data, function (r) {
                    if (this.result === 1) {
                        console.log(this.list.sayText);
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
                $("#dlCommentContent").html(sHtml);
                $("#saytext").val(StrUtil.toHtml(comment.sayText));
                $("#ulCommentRating").attr("data-comment", StrUtil.toHtml(comment.sayText)).attr("data-score", comment.star).empty().rating();
                $("#btnComment").val("编辑评论");
                $("#ulCommentEdit").empty().attr("data-score", comment.star).rating({ allowRate: false }).append("<li style='float: left;height: 19px;'>&nbsp;&nbsp;(" + setScore(comment.star) + "分)</li>");
            };
            return comment;
        }
    };

    var CookieComment = {
        createCookieComment: function () {
            var cookie = onyx.Cookie;
            var Window = onyx.Window;
            var StrUtil = onyx.util.StrUtil;
            var host = Window.url().host(),
                arr = host.split("."),
                DOMAIN = "." + arr[arr.length - 2] + "." + arr[arr.length - 1];
            var cookieConfig = {
                cookieKey: "cosCommnet",         //Cookie
                domain: DOMAIN,                     //域
                expires: 1000 * 60 * 30   //过期时间
            };
            var cookieComment = {};
            cookieComment.get = function (courseId) {
                var strComment = cookie.get(cookieConfig.cookieKey);
                if (StrUtil.isEmpty(strComment)) {
                    return "";
                }
                var ary = strComment.split("^");
                if (ary[0] == courseId && ary[1]) {
                    return ary[1];
                }
                return "";
            };
            cookieComment.set = function (courseId, sayText) {
                var tempStr = courseId + "^" + sayText;
                cookie.set(cookieConfig.cookieKey, tempStr, {
                    expires: cookieConfig.expires,
                    domain: cookieConfig.domain,
                    path: "/"
                });
            };
            cookieComment.clear = function () {
                cookie.remove(cookieConfig.cookieKey);
            };
            cookieComment.initElement = function () {
                var initStr = cookieComment.get($.trim($("#id").val()));
                if (initStr) {
                    $("#saytext").val(initStr);
                }
            };
            return cookieComment;
        }
    };

    var cookieComment = CookieComment.createCookieComment();

    var comment = Comment.createComment();

    var ask = Ask.createAsk();

    comment.list();
    comment.get(function () {
        comment.list();
        if (this.reviewId != null) {
            comment.initCommentUI();

        }
        $(".tabs ol:eq(0)").click();
    });

    cookieComment.initElement();

    /***************因为图片被截断**************/
    //if ($(".detail_desc dd").height() <= 600) {
    //    $(".detail_desc_more").css("display", "none");
    //}
    //else {
    //    $(".detail_desc dd").height(600);
    //}
    $(".detail_desc_more").css("display", "none");
    /******************************/
    try {
        _adwq.push(['_setDataType', 'view']);
        _adwq.push(['_setCustomer',
            yId
        ]);
        _adwq.push(['_setItem',
            courseId,    // 09890是一个例子，请填入商品编号  - 必填项
            title,       // 电视是一个例子，请填入商品名称  - 必填项
            disPrice,    // 12.00是一个例子，请填入商品现价  - 必填项
            "1",        // 1是一个例子，请填入商品数量  - 必填项
            classId,     // A123是一个例子，请填入商品分类编号  - 必填项
            className,      // 家电是一个例子，请填入商品分类名称  - 必填项
            price,     // 10.00是一个例子，请填入商品原价 - 必填项
            courseImgUrl, // 请填入素材图片地址，注意是完整地址 - 必填项
            'Y',             // 请填入商品状态，Y代表有效，N代表无效 - 必填项
            courseUrl,     //请填入商品url地址 - 必填项
            '',        //请填入商品下架时间，秒级别的时间戳 - 选填项
            '',        //请填入品牌id - 选填项
            ''        //请填入品牌名称  - 选填项   
        ]);
        _adwq.push(['_trackTrans']);
    }
    catch (e) {
    }
});

/// 易博代码
var _adwq = _adwq || [];
_adwq.push(['_setAccount', 'xl67l']);
_adwq.push(['_setDomainName', '.yingsheng.com']);
_adwq.push(['_trackPageview']);

(function () {
    var adw = document.createElement('script');
    adw.type = 'text/javascript';
    adw.async = true;
    adw.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://s') + '.emarbox.com/js/adw.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(adw, s);
})();

/// <reference path="artDialog4.1.7/plugins/iframeTools.js" />
/// <reference path="artDialog4.1.7/plugins/iframeTools.js" />
var SSODomain = window.location.host.indexOf("yingsheng.com") >= 0 ? "http://SSO.yingsheng.com/" : "http://SSO.yingsheng.cc/";
var SSOLoginCallBackEv = '0';

document.domain = GetMainDomain();
function GetMainDomain() {
    var strDomain = '';
    var d = window.location.host;
    var splitPoit = d.split('.')
    if (splitPoit.length >= 3) {
        strDomain = splitPoit[splitPoit.length - 2] + "." + splitPoit[splitPoit.length - 1];
    }
    else if (d.indexOf("localhost") >= 0) {
        strDomain = "localhost";
    }
    else if (d.indexOf("yingsheng.cc") >= 0) {
        strDomain = "yingsheng.cc";

    }
    else {
        strDomain = "yingsheng.com";
    }
    return strDomain;
}
//document.write('<div id="YingShengSSOTopDIV"></div>');

if (typeof (jQuery) == "undefined") {
    loadJS(SSODomain + 'js/jquery-1.11.0.min.js', function () {
        LoadYsLoingBar();
    })
}
else {
    LoadYsLoingBar();
}

function LoadYsLoingBar()
{
    var domCss = document.createElement('link');
    domCss.rel = "stylesheet";
    domCss.type = "text/css";
    domCss.href = SSODomain + "global/css/global.css";
    document.getElementsByTagName('head')[0].appendChild(domCss);


    if ($.cookie == null) {
        loadJS(SSODomain + 'js/jquery.cookie.js', function () {
            CreateSSOFile();
        })
    }
    else {
        CreateSSOFile();
    }
}


function CreateYS_SSODOC() {

    var shtml = '';

    //shtml += '<div id="top_ad">';
    //shtml += '<a id="hide_top_ad"></a>';
    //shtml += '<a id="top_ad_01" target="_blank" href="http://www.yingsheng.com/zhuanti-140919.html"></a>';
    //shtml += '<a id="top_ad_02" target="_blank" href="http://www.yingsheng.com/zhuanti-140917.html"></a>';
    //shtml += '<a id="top_ad_03" target="_blank" href="http://www.yingsheng.com/zhuanti-140916.html"></a>';
    //shtml += '<a id="top_ad_04" target="_blank" href="http://www.yingsheng.com/zhuanti-140913.html"></a>';
    //shtml += '</div>';
    //shtml += '<div id="top_ad_gif">';
    //shtml += '<a id="show_top_ad"></a>';
    //shtml += '<a id="close_top_ad"></a>';
    //shtml += '</div>';



    shtml += '<div id="yS_tOp_LoGinbaR" class="global_top">';
    shtml += '    <ul>';
    shtml += '        <li class="top_logo">';
    shtml += '            <a href="index.html"><img alt="英盛网" src="http://sso.yingsheng.com/global/images/global_logo.png" /></a></li>';
    shtml += '        <li class="login _sso"><a rel="nofollow" title="登录" href="javascript:void(0)" onclick="OpenLoginOrRegBox(\'f\',\'1\')">登录</a></li>';
    shtml += '        <li class="reg _sso"><a rel="nofollow" title="注册" href="javascript:void(0)" onclick="OpenLoginOrRegBox(\'f\',\'0\')">注册</a></li>';
    shtml += '        <li id="ys_top_Msg" class="msg" style="display:none;"><a href="javascript:void(0)" class="gradient_all msg_bg"><i class="i1"><i id="ys_top_haveMsgIcon" style="display:none" class="i2"></i></i></a>';
    shtml += '            <div class="msg_div" style="display:none;">';
    shtml += '                <dl>';
    shtml += '                                                                                                                                                                                                                                                                                                                                                                  <dd><a href="#" class="gradient_all">课程通知<span id="ys_top_msgType_2">0</span></a></dd>';
    shtml += '                    <dd><a href="#" class="gradient_all">交易通知<span id="ys_top_msgType_3">0</span></a></dd>';
    shtml += '                    <dd><a href="#" class="gradient_all">我的评论<span id="ys_top_msgType_4">0</span></a></dd>';
    shtml += '                    <dd><a href="#" class="gradient_all">系统消息<span id="ys_top_msgType_1">0</span></a></dd>';
    shtml += '                </dl>';
    shtml += '            </div>';
    shtml += '        </li>';
    shtml += '<li class="line"></li>';
    shtml += '        <li class="name global_top_LoginInfo"><a rel="nofollow" title="用户名" href="javascript:void()" id="global_top_UserName"><i></i></a>';
    shtml += '            <div class="member_div" style="display: none; ">';
    shtml += '                <dl>';
    shtml += '                    <dd><a target="_blank" title="个人中心" href="http://i.yingsheng.com/">个人中心</a></dd>';
    shtml += '                    <dd><a target="_blank" title="购 物 车" href="http://order.yingsheng.com/Order?source=1">购 物 车</a></dd>';
    shtml += '                    <dd><a target="_blank" title="已 购 买" href="http://i.yingsheng.com/courselist-1.html">已 购 买</a></dd>';
    shtml += '                    <dd><a target="_blank" title="我的收藏" href="http://i.yingsheng.com/collect.html">我的收藏</a></dd>';
    shtml += '                    <dd><a target="_blank" title="我的订单" href="http://i.yingsheng.com/orderlist-1.html">我的订单</a></dd>';
    shtml += '                    <dd><a target="_blank" title="观看历史" href="http://i.yingsheng.com/courseview.html">观看历史</a></dd>';
    shtml += '                    <dd><a id="ys_top_dl_dd_LinkZone" style="display: none; " target="_blank" title="我的空间" href="http://zone.yingsheng.com/">我的空间</a></dd>';
    shtml += '                    <dd><a id="action_logout" title="退出" href="http://sso.yingsheng.com/logout.aspx?from=http%3a%2f%2fwww.yingsheng.com" rel="nofollow" onclick="return confirm(\'确认要退出?\');">退出</a></dd>';
    shtml += '                </dl>';
    shtml += '            </div>';
    shtml += '';
    shtml += '       </li>';
    shtml += '        <li class="avatar global_top_LoginInfo">';
    shtml += '            <a href="member_index.html" target="_blank"><img id="global_top_UserFace" alt="头像" src="" class="m1"></a>';
    shtml += '            <img alt="vip" src="http://sso.yingsheng.com/global/images/vip_ioc.png" class="m2" style="display:none;" />';
    shtml += '        </li>';
    shtml += '<li id="top_btn_RegGift" class="reg_gift"><a rel="nofollow" target="_blank" title="注册有礼" href="http://www.yingsheng.com/zhuanti-141103.html">注册有礼</a></li>';
    shtml += '<li class="app_down"><a href="http://www.yingsheng.com/app" rel="nofollow" target="_blank">手机APP</a></li>';
    shtml += '    </ul>';
    shtml += '</div>';
    //shtml += '<div class="menuSpacing"></div>';
    $('.menuSpacing').remove();
    var topBox = $("#YingShengSSOTopDIV");
    topBox.css('height', 'auto');
    topBox.html(shtml);
    setTimeout('YsLoginBarSetUserDownList()', 0);
    setTimeout('SSOCheckLogin()', 100);
    //setTimeout('BindTopAds()', 250);
    setTimeout("$('.menuSpacing').remove()", 300);
}

//-----------------------------------------头部广告-----------------------------------------
var std = 1;
function clockon() {
    if (std == 1) {
        $("#top_ad").stop().animate({ marginTop: '-230px' }, { queue: false, duration: 300 });
        $("#top_ad_gif").stop().animate({ height: '70px' }, { queue: false, duration: 300 });
        $("#performance_list").css({ top: '217px' });
    }
}

function BindTopAds()
{
    //-----------------------------------------头部广告-----------------------------------------
    //console.log($.cookie("displayAds"))
    if ($.cookie("displayAds") =="1") {
        $("#top_ad").stop().animate({ marginTop: '-230px' }, { queue: false, duration: 0 });
        $("#top_ad_gif").stop().animate({ height: '70px' }, { queue: false, duration: 0 });
        $("#performance_list").css({ top: '217px' });
    } else {
        $("#performance_list").css({ top: '377px' });
        $("#top_ad").stop().animate({ marginTop: '0' }, { queue: false, duration: 300 });
        setTimeout('clockon()', 3000);
        $.cookie("displayAds", "1", { path: '/', expires:7 });
    }

    $("#show_top_ad").click(function () {
        $("#top_ad").stop().animate({ marginTop: '0' }, { queue: false, duration: 300 });
        $("#top_ad_gif").stop().animate({ height: '0' }, { queue: false, duration: 300 });
        $("#performance_list").css({ top: '377px' });
        std = 0;

    });
    $("#hide_top_ad").click(function () {
        $("#top_ad").stop().animate({ marginTop: '-230px' }, { queue: false, duration: 300 });
        $("#top_ad_gif").stop().animate({ height: '70px' }, { queue: false, duration: 300 });
        $("#performance_list").css({ top: '217px' });
    });
    $("#close_top_ad").click(function () {
        $("#top_ad_gif").stop().animate({ height: '0' }, { queue: false, duration: 300 });
        $("#performance_list").css({ top: '147px' });

    });

    //-----------------------------------------头部广告-----------------------------------------
}

//-----------------------------------------头部广告-----------------------------------------


function loadJS(url, success) {
    if (url != null) {
        var domScript = document.createElement('script');
        domScript.src = url;
        success = success || function () { };
        domScript.onload = domScript.onreadystatechange = function () {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                success();
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            }
        }
        document.getElementsByTagName('head')[0].appendChild(domScript);
    }
}

function CreateSSOFile() {
    loadJS(SSODomain + 'js/artDialog4.1.7/artDialog.js?skin=blue', function () {
        loadJS(SSODomain + 'js/artDialog4.1.7/plugins/iframeTools.js', function () {
            loadJS('http://sso.yingsheng.com/js/layer.min.js', function () {
                loadJS(SSODomain + 'js/SSOClient.js', function () {


                    setTimeout('CreateYS_SSODOC()', 200);

                    if (navigator.appName == "Microsoft Internet Explorer") {

                        var b_version = navigator.appVersion
                        var version = b_version.split(";");
                        var trim_Version = version[1].replace(/[ ]/g, "");

                        if (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0" || trim_Version == "MSIE8.0") {
                            loadJS(SSODomain + '/js/json2.js', function () { })
                        }

                    }


                })
            })
        })
    })
}

function YsLoginBarSetUserDownList()
{
    $('.global_top .name a').hover(function () {
        $(".member_div").show();
    }, function () {
        $(".member_div").hide();
    })

    $('.member_div').hover(function () {
        $(".member_div").show();
    }, function () {
        $(".member_div").hide();
    })

    /*站内信下拉*/
    $('.msg_bg').hover(function () {
        $(".msg_div").show();
        // $(this).animate({ background: '#126bbb' }, { queue: false, duration: 200 });
        $(".msg_bg").css({ background: "#126bbb" });
    }, function () {
        $(".msg_div").hide();
        $(".msg_bg").css({ background: "none" });
    })
    $('.msg_div').hover(function () {
        $(".msg_div").show();
        $(".msg_bg").css({ background: "#126bbb" });
    }, function () {
        $(".msg_div").hide();
        $(".msg_bg").css({ background: "none" });
    })


    //$('#action_logout').attr('href', 'http://sso.yingsheng.com/logout.aspx?from=http%3a%2f%2f' + window.lo);
}



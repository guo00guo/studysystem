//获取来路
var host = window.location.host;


//google统计----------------------------------------------------------------------------------------------
//(function (i, s, o, g, r, a, m) {
//    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
//        (i[r].q = i[r].q || []).push(arguments)
//    }, i[r].l = 1 * new Date(); a = s.createElement(o),
//    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
//})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
//ga('create', 'UA-61160289-1', 'auto');
//ga('send', 'pageview');


//百度统计----------------------------------------------------------------------------------------------
//if (host == "m.yingsheng.com") {
//    //百度m.yingsheng.com
//    var _hmt = _hmt || [];
//    (function () {
//        var hm = document.createElement("script");
//        hm.src = "//hm.baidu.com/hm.js?a4bb9b374778cf15d70a95ead7be02b5";
//        var s = document.getElementsByTagName("script")[0];
//        s.parentNode.insertBefore(hm, s);
//    })();
//} else if (host == "www.ys100.net") {
//    //百度统计www.ys100.net
//    var _hmt = _hmt || [];
//    (function() {
//        var hm = document.createElement("script");
//        hm.src = "//hm.baidu.com/hm.js?2410debe566f296fcd73407004027b53";
//        var s = document.getElementsByTagName("script")[0]; 
//        s.parentNode.insertBefore(hm, s);
//    })();
//} else if (host == "www.dayuedong.net") {
//    //百度统计www.dayuedong.net
//    var _hmt = _hmt || [];
//    (function() {
//        var hm = document.createElement("script");
//        hm.src = "//hm.baidu.com/hm.js?76de552b29e6dbb1ea6e0e6470f1c8ce";
//        var s = document.getElementsByTagName("script")[0]; 
//        s.parentNode.insertBefore(hm, s);
//    })();
//}else {
//    //百度统计yingsheng.com
//    var _hmt = _hmt || [];
//    (function () {
//        var hm = document.createElement("script");
//        hm.src = "//hm.baidu.com/hm.js?55fb330d006f37d00d270ef9160914de";
//        var s = document.getElementsByTagName("script")[0];
//        s.parentNode.insertBefore(hm, s);
//    })();
//}


//百度商桥----------------------------------------------------------------------------------------------
if (typeof (ismobile) == "undefined") {
    //非手机版
    switch (host) {
        case "ask.yingsheng.com":
            //问吧
            var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fe69372bea39c447a486aaba54ba79b27' type='text/javascript'%3E%3C/script%3E"));
            break;
        case "zone.yingsheng.com":
            //讲师空间
            var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F198f2e784f0ab6d439305711bf693d4e' type='text/javascript'%3E%3C/script%3E"));
            break;
        case "m.yingsheng.com":
            //手机站m.yingsheng.com
            var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fa4bb9b374778cf15d70a95ead7be02b5' type='text/javascript'%3E%3C/script%3E"));
            break;
        case "www.ys100.net":
        case "www.dayuedong.net":
        case "b.yingsheng.com":
            var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F38ae5973704218f1be0559310b93b18a' type='text/javascript'%3E%3C/script%3E"));
            break;
        case "www.yingsheng.com":
        default:
            //主站
            var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fd85942f9d726835581645aede0d012ea' type='text/javascript'%3E%3C/script%3E"));
            break;
    }
} else {
    //手机版使用m.yingsheng.com
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fa4bb9b374778cf15d70a95ead7be02b5' type='text/javascript'%3E%3C/script%3E"));
}

$(window).load(function () {
    function getScrollTop() {   //取得滚动条的竖直距离  
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    function show_collect() {     //修改参数可调整返回顶部的速度  

        $(window).scroll(function () {
            var scrollTop = getScrollTop();
            if (scrollTop > 145) {    //判断滚动条距离窗口顶部多远时显示出来，这里是100px  
                $(".collect_f").css({ "position": "fixed", "top": "0" });
            } else {
                $(".collect_f").css({ "position": "absolute", "top": "145px" });
            }
        });
    }
    show_collect();
});


$(function () {
    function CountDown(start, end) {
        var start = parseInt(start);
        var end = parseInt(end);
        var leftSec = parseInt(end) - parseInt(start);

        if (leftSec <= 0) {
            return '<span>&nbsp;&nbsp;&nbsp;&nbsp;活动已结束</span>';
        }

        var daySec = 86400; //一天的秒数
        var day = Math.floor(leftSec / daySec); //剩余天数
        var hour = Math.floor((leftSec - day * daySec) / 3600); //剩余小时
        var minute = Math.floor((leftSec - day * daySec - hour * 3600) / 60); //剩余分钟
        var second = leftSec - day * daySec - hour * 3600 - minute * 60; //剩余秒数
        return '&nbsp;&nbsp;&nbsp;&nbsp;<b>' + day + "</b>天<b>" + hour + "</b>时<b>" + minute + "</b>分<b>" + second + '</b>秒';
    }
    window.setInterval(function () {
        $('span.CountDown').each(function () {
            var self = $(this);
            var start = self.attr('now');
            var end = self.attr('end');
            var $str = CountDown(start, end);
            self.html($str).attr('now', parseInt(start) + 1);
        });
    }, 1000);

});
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
        return '&nbsp;&nbsp;&nbsp;&nbsp;' + day + "天" + hour + "时" + minute + "分" + second + '秒';
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
$('.mian_kc').hover(function () {
    $('.mian_kc').find(".jsinfo").css({ "right": "auto", "left": "0px" });
    $('.mian_kc').eq(2).find(".jsinfo").css({ "top": "auto", "bottom": "0px" });
    $(this).addClass('active');
    $(this).find('.jsinfo').delay(250).fadeIn(200);
}, function () {
    $(this).removeClass('active');
    $(this).find('.jsinfo').stop(true, true).hide(100);
});
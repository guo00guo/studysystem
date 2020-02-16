
document.write("<style>#slideSpring {height:240px;overflow:hidden;}</style>");
var _speed = 40;
var _slide = $("#slideSpring");
var _slideli1 = $(".slideli1");
function Marquee() {
    if (_slide.scrollTop() >= _slideli1.width())
        _slide.scrollTop(0);
    else {
        _slide.scrollTop(_slide.scrollTop() + 1);
    }
}
$(function () {
    var sliding = setInterval(Marquee, _speed)
    _slide.hover(function () {
        clearInterval(sliding);
    }, function () {
        sliding = setInterval(Marquee, _speed);
    });
});




function CountDown(end) {
    var leftSec = parseInt(end) - parseInt(start);

    if (leftSec <= 0) {
        return '<font color="red">活动已结束</font>';
    }

    var daySec = 86400; //一天的秒数
    var day = Math.floor(leftSec / daySec); //剩余天数
    var hour = Math.floor((leftSec - day * daySec) / 3600); //剩余小时
    var minute = Math.floor((leftSec - day * daySec - hour * 3600) / 60); //剩余分钟
    var second = leftSec - day * daySec - hour * 3600 - minute * 60; //剩余秒数

    start += 1;

    return "<em>" + day + "</em>天<em>" + hour + "</em>时<em>" + minute + "</em>分<em>" + second + "</em>秒";
}





//添加购物车
function toBuy(str) {
    addToShoppingCart(str, "C", function (success) {
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
    //var ShoppingCart = ys.ShoppingCart;
    //ShoppingCart.add({
    //    itemId: str,
    //    type: "B"
    //}, true);
}

function addToShoppingCart(id, courseType, callBack) {
    try {
        _adwq.push(['_setDataType', 'cart']);
        _adwq.push(['_setCustomer',
            yId
        ]);
        _adwq.push(['_setItem',
            id,    // 09890是一个例子，请填入商品编号  - 必填项
            title,       // 电视是一个例子，请填入商品名称  - 必填项
            newPrice,    // 12.00是一个例子，请填入商品金额  - 必填项
            '1',        // 1是一个例子，请填入商品数量  - 必填项
            'C',     // A123是一个例子，请填入商品分类编号  - 必填项
            '抢特惠'        // 家电是一个例子，请填入商品分类名称  - 必填项
        ]);
        _adwq.push(['_trackTrans']);
    }
    catch (e) { }
    var data = {};
    data.id = id;
    data.type = courseType;
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

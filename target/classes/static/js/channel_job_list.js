// JavaScript Document

(function () {
    $(document).ready(function () {
        $(".Current .s3").click(function () {
            if ($(".category_v3").is(":hidden") == true) {
                $("#allcat_ioc").addClass("i_show");
                $(".category_v3").toggle(300);
            } else {
                $("#allcat_ioc").removeClass("i_show");
                $(".category_v3").toggle(300);
            }
        });

        $(".fenx_for").mousemove(function () {
            $(".share_tool").show();
        });
        $(".share_tool").mousemove(function () {
            $(".share_tool").show();
        });
        $(".share_tool").mouseout(function () {
            if ($(".m_video").is(":hidden") != true) {
                $(".share_tool").hide();
            }
        });
        $(".fenx_for").mouseout(function () {
            if ($(".m_video").is(":hidden") != true) {
                $(".share_tool").hide();
            }
        });

        //搜索点击
        $("#jobSearchBtn").click(function () {
            var text = $("#jobSearchText").val();
            if (text == "" || text == "搜索岗位关键字") {
                layer.msg("请输入搜索岗位关键字", 1, -1);
                $("#jobSearchText").focus();
                return false;
            }
            window.location = "search_course.html?" + text ;
        });

    });
})();






//添加购物车
function toBuy(str) {
    addToShoppingCart(str, "B", function (success) {
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
            jobPosId,    // 09890是一个例子，请填入商品编号  - 必填项
            name,       // 电视是一个例子，请填入商品名称  - 必填项
            newPrice,    // 12.00是一个例子，请填入商品金额  - 必填项
            '1',        // 1是一个例子，请填入商品数量  - 必填项
            'B',     // A123是一个例子，请填入商品分类编号  - 必填项
            '岗位系统班'        // 家电是一个例子，请填入商品分类名称  - 必填项
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

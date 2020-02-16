// JavaScript Document
/** 图片轮播图 **/
$(function () {
    slider("#slider", 300);
    function slider(id, speed) {
        var $this = $(id),
            len = $this.find("ul li").length,
            $small = $this.find(".small"),
            index = 0;

        $this.hover(function () {
            if (MyTime) {
                clearInterval(MyTime);
            }
        }, function () {
            MyTime = setInterval(function () {
                showPic(index)
                index++;
                if (index == len) {
                    index = 0;
                }
            }, 5000);
        });

        $small.find("span").hover(function () {
                if (MyTime) {
                    clearInterval(MyTime);
                }
                ;
                var index = $small.find("span").index(this);
                showPic(index);
            },
            function () {
            });
        var MyTime = setInterval(function () {
                showPic(index)
                index++;
                if (index == len) {
                    index = 0;
                }
            },
            5000);

        function showPic(i) {
            $this.find("ul").stop(true, false).animate({
                    left: -619 * i
                },
                600);
            $small.find("span").eq(i).addClass("hover").siblings().removeClass("hover");
        }
    }

    $("#newslist li").hover(function () {
        $(this).addClass("hover")
    }, function () {
        $(this).removeClass("hover")
    })


    $("#aa").hover(
        function () {
            $(this).next(".stubox").fadeIn()
        },
        function () {
            $(this).next(".stubox").fadeOut()
        }
    );

    /** 导航 **/
    mnslider("#mnslider", 300);

    function mnslider(id, speed) {
        var $this = $(id),
            len = $this.find("ul li").length,
            $small = $this.find(".small"),
            $prev = $this.find(".prev"),
            $next = $this.find(".next"),
            index = 0,
            $ul = $this.find("div ul"),
            disc = $ul.find("li") ,
            auto;
        $next.click(function () {
            show(0)
        })
        $prev.click(function () {
            show(1)
        })
        var autoPlay = function () {
            auto = setInterval(show, 5000);
        };
        var autoStop = function () {
            clearInterval(auto);
        };

        function show(i) {
            if (i == 1) {
                $ul.find("li:last").prependTo($ul);
                $ul.css({
                    left: -disc
                });
                $ul.stop().animate({
                    left: 0
                }, speed, function () {
                    $ul.css({
                        left: 0
                    });
                })
            } else {
                $ul.animate({
                    left: -disc
                }, speed, function () {
                    $ul.find("li:first").appendTo($ul);
                    $ul.css({
                        left: 0
                    })
                })
            }
        }

        autoPlay();
        $this.hover(autoStop, autoPlay);
    }


    $("#tiDiv li").hover(
        function () {
            clearTimeout(setTimeout("0") + 1);

            $("#tiDiv .kind_menu").hide();
            $("#tiDiv .kind_menu2").hide();
            $("#tiDiv li .v .sele").attr("class", "shutAhover");
            $(this).attr("id", "nav_hover")
            $("#nav_hover .v a").attr("class", "sele");
            $("#nav_hover .kind_menu").show();
            $("#nav_hover .kind_menu2").show();
        },
        function () {

            if ($(this).attr("class") != "nav_lishw") {
                $("#nav_hover .v .sele").attr("class", "");
                $("#nav_hover .kind_menu").hide();
                $("#nav_hover .kind_menu2").hide();
            }
            $(this).attr("id", "")
            $("#tiDiv li .v .shutAhover").attr("class", "sele");
            setTimeout(function () {
                $(".nav_lishw .kind_menu").show();
                $(".nav_lishw .kind_menu2").show();
                $(".nav_lishw .v a").attr("class", "sele");
            }, 50);
        }
    );


    var t = n = 0, count;
    count = $("#banner_list a").length;
    $("#banner_list a:not(:first-child)").hide();
    $("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));
    $("#banner_info").click(function () {
        window.open($("#banner_list a:first-child").attr('href'), "_blank")
    });
    $("#banner li").click(function () {
        var i = $(this).text() - 1;//获取Li元素内的值，即1，2，3，4
        n = i;
        if (i >= count) return;
        $("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));
        $("#banner_info").unbind().click(function () {
            window.open($("#banner_list a").eq(i).attr('href'), "_blank")
        })
        $("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
        document.getElementById("banner").style.background = "";
        $(this).toggleClass("on");
        $(this).siblings().removeAttr("class");
    });
    t = setInterval(function () {
        showAuto();
    }, 4000);

    $("#banner").hover(function () {
        clearInterval(t)
    }, function () {
        t = setInterval(function () {
            showAuto();
        }, 4000);
    });

    function showAuto() {
        n = n >= (count - 1) ? 0 : ++n;
        $("#banner li").eq(n).trigger('click');
    }
});
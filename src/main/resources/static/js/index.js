/*!
 * SuperSlide v2.1 
 * 轻松解决网站大部分特效展示问题 *
 * Copyright 2011-2013, 大话主席
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 */
//banner 代码


(function (a) { a.fn.slide = function (b) { return a.fn.slide.defaults = { type: "slide", effect: "fade", autoPlay: !1, delayTime: 500, interTime: 6000, triggerTime: 150, defaultIndex: 0, titCell: ".hd li", mainCell: ".bd", targetCell: null, trigger: "mouseover", scroll: 1, vis: 1, titOnClassName: "on", autoPage: !1, prevCell: ".prev_banner", nextCell: ".next_banner", pageStateCell: ".pageState", opp: !1, pnLoop: !0, easing: "swing", startFun: null, endFun: null, switchLoad: null, playStateCell: ".playState", mouseOverStop: !0, defaultPlay: !0, returnDefault: !1 }, this.each(function () { var c = a.extend({}, a.fn.slide.defaults, b), d = a(this), e = c.effect, f = a(c.prevCell, d), g = a(c.nextCell, d), h = a(c.pageStateCell, d), i = a(c.playStateCell, d), j = a(c.titCell, d), k = j.size(), l = a(c.mainCell, d), m = l.children().size(), n = c.switchLoad, o = a(c.targetCell, d), p = parseInt(c.defaultIndex), q = parseInt(c.delayTime), r = parseInt(c.interTime); parseInt(c.triggerTime); var P, t = parseInt(c.scroll), u = parseInt(c.vis), v = "false" == c.autoPlay || 0 == c.autoPlay ? !1 : !0, w = "false" == c.opp || 0 == c.opp ? !1 : !0, x = "false" == c.autoPage || 0 == c.autoPage ? !1 : !0, y = "false" == c.pnLoop || 0 == c.pnLoop ? !1 : !0, z = "false" == c.mouseOverStop || 0 == c.mouseOverStop ? !1 : !0, A = "false" == c.defaultPlay || 0 == c.defaultPlay ? !1 : !0, B = "false" == c.returnDefault || 0 == c.returnDefault ? !1 : !0, C = 0, D = 0, E = 0, F = 0, G = c.easing, H = null, I = null, J = null, K = c.titOnClassName, L = j.index(d.find("." + K)), M = p = defaultIndex = -1 == L ? p : L, N = p, O = m >= u ? 0 != m % t ? m % t : t : 0, Q = "leftMarquee" == e || "topMarquee" == e ? !0 : !1, R = function () { a.isFunction(c.startFun) && c.startFun(p, k, d, a(c.titCell, d), l, o, f, g) }, S = function () { a.isFunction(c.endFun) && c.endFun(p, k, d, a(c.titCell, d), l, o, f, g) }, T = function () { j.removeClass(K), A && j.eq(defaultIndex).addClass(K) }; if ("menu" == c.type) return A && j.removeClass(K).eq(p).addClass(K), j.hover(function () { P = a(this).find(c.targetCell); var b = j.index(a(this)); I = setTimeout(function () { switch (p = b, j.removeClass(K).eq(p).addClass(K), R(), e) { case "fade": P.stop(!0, !0).animate({ opacity: "show" }, q, G, S); break; case "slideDown": P.stop(!0, !0).animate({ height: "show" }, q, G, S) } }, c.triggerTime) }, function () { switch (clearTimeout(I), e) { case "fade": P.animate({ opacity: "hide" }, q, G); break; case "slideDown": P.animate({ height: "hide" }, q, G) } }), B && d.hover(function () { clearTimeout(J) }, function () { J = setTimeout(T, q) }), void 0; if (0 == k && (k = m), Q && (k = 2), x) { if (m >= u) if ("leftLoop" == e || "topLoop" == e) k = 0 != m % t ? (0 ^ m / t) + 1 : m / t; else { var U = m - u; k = 1 + parseInt(0 != U % t ? U / t + 1 : U / t), 0 >= k && (k = 1) } else k = 1; j.html(""); var V = ""; if (1 == c.autoPage || "true" == c.autoPage) for (var W = 0; k > W; W++) V += "<li>" + (W + 1) + "</li>"; else for (var W = 0; k > W; W++) V += c.autoPage.replace("$", W + 1); j.html(V); var j = j.children() } if (m >= u) { l.children().each(function () { a(this).width() > E && (E = a(this).width(), D = a(this).outerWidth(!0)), a(this).height() > F && (F = a(this).height(), C = a(this).outerHeight(!0)) }); var X = l.children(), Y = function () { for (var a = 0; u > a; a++) X.eq(a).clone().addClass("clone").appendTo(l); for (var a = 0; O > a; a++) X.eq(m - a - 1).clone().addClass("clone").prependTo(l) }; switch (e) { case "fold": l.css({ position: "relative", width: D, height: C }).children().css({ position: "absolute", width: E, left: 0, top: 0, display: "none" }); break; case "top": l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({ top: -(p * t) * C, position: "relative", padding: "0", margin: "0" }).children().css({ height: F }); break; case "left": l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({ width: m * D, left: -(p * t) * D, position: "relative", overflow: "hidden", padding: "0", margin: "0" }).children().css({ "float": "left", width: E }); break; case "leftLoop": case "leftMarquee": Y(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({ width: (m + u + O) * D, position: "relative", overflow: "hidden", padding: "0", margin: "0", left: -(O + p * t) * D }).children().css({ "float": "left", width: E }); break; case "topLoop": case "topMarquee": Y(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({ height: (m + u + O) * C, position: "relative", padding: "0", margin: "0", top: -(O + p * t) * C }).children().css({ height: F }) } } var Z = function (a) { var b = a * t; return a == k ? b = m : -1 == a && 0 != m % t && (b = -m % t), b }, $ = function (b) { var c = function (c) { for (var d = c; u + c > d; d++) b.eq(d).find("img[" + n + "]").each(function () { var b = a(this); if (b.attr("src", b.attr(n)).removeAttr(n), l.find(".clone")[0]) for (var c = l.children(), d = 0; c.size() > d; d++) c.eq(d).find("img[" + n + "]").each(function () { a(this).attr(n) == b.attr("src") && a(this).attr("src", a(this).attr(n)).removeAttr(n) }) }) }; switch (e) { case "fade": case "fold": case "top": case "left": case "slideDown": c(p * t); break; case "leftLoop": case "topLoop": c(O + Z(N)); break; case "leftMarquee": case "topMarquee": var d = "leftMarquee" == e ? l.css("left").replace("px", "") : l.css("top").replace("px", ""), f = "leftMarquee" == e ? D : C, g = O; if (0 != d % f) { var h = Math.abs(0 ^ d / f); g = 1 == p ? O + h : O + h - 1 } c(g) } }, _ = function (a) { if (!A || M != p || a || Q) { if (Q ? p >= 1 ? p = 1 : 0 >= p && (p = 0) : (N = p, p >= k ? p = 0 : 0 > p && (p = k - 1)), R(), null != n && $(l.children()), o[0] && (P = o.eq(p), null != n && $(o), "slideDown" == e ? (o.not(P).stop(!0, !0).slideUp(q), P.slideDown(q, G, function () { l[0] || S() })) : (o.not(P).stop(!0, !0).hide(), P.animate({ opacity: "show" }, q, function () { l[0] || S() }))), m >= u) switch (e) { case "fade": l.children().stop(!0, !0).eq(p).animate({ opacity: "show" }, q, G, function () { S() }).siblings().hide(); break; case "fold": l.children().stop(!0, !0).eq(p).animate({ opacity: "show" }, q, G, function () { S() }).siblings().animate({ opacity: "hide" }, q, G); break; case "top": l.stop(!0, !1).animate({ top: -p * t * C }, q, G, function () { S() }); break; case "left": l.stop(!0, !1).animate({ left: -p * t * D }, q, G, function () { S() }); break; case "leftLoop": var b = N; l.stop(!0, !0).animate({ left: -(Z(N) + O) * D }, q, G, function () { -1 >= b ? l.css("left", -(O + (k - 1) * t) * D) : b >= k && l.css("left", -O * D), S() }); break; case "topLoop": var b = N; l.stop(!0, !0).animate({ top: -(Z(N) + O) * C }, q, G, function () { -1 >= b ? l.css("top", -(O + (k - 1) * t) * C) : b >= k && l.css("top", -O * C), S() }); break; case "leftMarquee": var c = l.css("left").replace("px", ""); 0 == p ? l.animate({ left: ++c }, 0, function () { l.css("left").replace("px", "") >= 0 && l.css("left", -m * D) }) : l.animate({ left: --c }, 0, function () { -(m + O) * D >= l.css("left").replace("px", "") && l.css("left", -O * D) }); break; case "topMarquee": var d = l.css("top").replace("px", ""); 0 == p ? l.animate({ top: ++d }, 0, function () { l.css("top").replace("px", "") >= 0 && l.css("top", -m * C) }) : l.animate({ top: --d }, 0, function () { -(m + O) * C >= l.css("top").replace("px", "") && l.css("top", -O * C) }) } j.removeClass(K).eq(p).addClass(K), M = p, y || (g.removeClass("nextStop"), f.removeClass("prevStop"), 0 == p && f.addClass("prevStop"), p == k - 1 && g.addClass("nextStop")), h.html("<span>" + (p + 1) + "</span>/" + k) } }; A && _(!0), B && d.hover(function () { clearTimeout(J) }, function () { J = setTimeout(function () { p = defaultIndex, A ? _() : "slideDown" == e ? P.slideUp(q, T) : P.animate({ opacity: "hide" }, q, T), M = p }, 300) }); var ab = function (a) { H = setInterval(function () { w ? p-- : p++, _() }, a ? a : r) }, bb = function (a) { H = setInterval(_, a ? a : r) }, cb = function () { z || (clearInterval(H), ab()) }, db = function () { (y || p != k - 1) && (p++, _(), Q || cb()) }, eb = function () { (y || 0 != p) && (p--, _(), Q || cb()) }, fb = function () { clearInterval(H), Q ? bb() : ab(), i.removeClass("pauseState") }, gb = function () { clearInterval(H), i.addClass("pauseState") }; if (v ? Q ? (w ? p-- : p++, bb(), z && l.hover(gb, fb)) : (ab(), z && d.hover(gb, fb)) : (Q && (w ? p-- : p++), i.addClass("pauseState")), i.click(function () { i.hasClass("pauseState") ? fb() : gb() }), "mouseover" == c.trigger ? j.hover(function () { var a = j.index(this); I = setTimeout(function () { p = a, _(), cb() }, c.triggerTime) }, function () { clearTimeout(I) }) : j.click(function () { p = j.index(this), _(), cb() }), Q) { if (g.mousedown(db), f.mousedown(eb), y) { var hb, ib = function () { hb = setTimeout(function () { clearInterval(H), bb(0 ^ r / 10) }, 150) }, jb = function () { clearTimeout(hb), clearInterval(H), bb() }; g.mousedown(ib), g.mouseup(jb), f.mousedown(ib), f.mouseup(jb) } "mouseover" == c.trigger && (g.hover(db, function () { }), f.hover(eb, function () { })) } else g.click(db), f.click(eb) }) } })(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, { def: "easeOutQuad", swing: function (a, b, c, d, e) { return jQuery.easing[jQuery.easing.def](a, b, c, d, e) }, easeInQuad: function (a, b, c, d, e) { return d * (b /= e) * b + c }, easeOutQuad: function (a, b, c, d, e) { return -d * (b /= e) * (b - 2) + c }, easeInOutQuad: function (a, b, c, d, e) { return 1 > (b /= e / 2) ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c }, easeInCubic: function (a, b, c, d, e) { return d * (b /= e) * b * b + c }, easeOutCubic: function (a, b, c, d, e) { return d * ((b = b / e - 1) * b * b + 1) + c }, easeInOutCubic: function (a, b, c, d, e) { return 1 > (b /= e / 2) ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c }, easeInQuart: function (a, b, c, d, e) { return d * (b /= e) * b * b * b + c }, easeOutQuart: function (a, b, c, d, e) { return -d * ((b = b / e - 1) * b * b * b - 1) + c }, easeInOutQuart: function (a, b, c, d, e) { return 1 > (b /= e / 2) ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c }, easeInQuint: function (a, b, c, d, e) { return d * (b /= e) * b * b * b * b + c }, easeOutQuint: function (a, b, c, d, e) { return d * ((b = b / e - 1) * b * b * b * b + 1) + c }, easeInOutQuint: function (a, b, c, d, e) { return 1 > (b /= e / 2) ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c }, easeInSine: function (a, b, c, d, e) { return -d * Math.cos(b / e * (Math.PI / 2)) + d + c }, easeOutSine: function (a, b, c, d, e) { return d * Math.sin(b / e * (Math.PI / 2)) + c }, easeInOutSine: function (a, b, c, d, e) { return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c }, easeInExpo: function (a, b, c, d, e) { return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c }, easeOutExpo: function (a, b, c, d, e) { return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c }, easeInOutExpo: function (a, b, c, d, e) { return 0 == b ? c : b == e ? c + d : 1 > (b /= e / 2) ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c }, easeInCirc: function (a, b, c, d, e) { return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c }, easeOutCirc: function (a, b, c, d, e) { return d * Math.sqrt(1 - (b = b / e - 1) * b) + c }, easeInOutCirc: function (a, b, c, d, e) { return 1 > (b /= e / 2) ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c }, easeInElastic: function (a, b, c, d, e) { var f = 1.70158, g = 0, h = d; if (0 == b) return c; if (1 == (b /= e)) return c + d; if (g || (g = .3 * e), Math.abs(d) > h) { h = d; var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h); return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c }, easeOutElastic: function (a, b, c, d, e) { var f = 1.70158, g = 0, h = d; if (0 == b) return c; if (1 == (b /= e)) return c + d; if (g || (g = .3 * e), Math.abs(d) > h) { h = d; var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h); return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c }, easeInOutElastic: function (a, b, c, d, e) { var f = 1.70158, g = 0, h = d; if (0 == b) return c; if (2 == (b /= e / 2)) return c + d; if (g || (g = e * .3 * 1.5), Math.abs(d) > h) { h = d; var f = g / 4 } else var f = g / (2 * Math.PI) * Math.asin(d / h); return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c }, easeInBack: function (a, b, c, d, e, f) { return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c }, easeOutBack: function (a, b, c, d, e, f) { return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c }, easeInOutBack: function (a, b, c, d, e, f) { return void 0 == f && (f = 1.70158), 1 > (b /= e / 2) ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c }, easeInBounce: function (a, b, c, d, e) { return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c }, easeOutBounce: function (a, b, c, d, e) { return 1 / 2.75 > (b /= e) ? d * 7.5625 * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c }, easeInOutBounce: function (a, b, c, d, e) { return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c } });


(function () {

    jQuery(".fullSlide").hover(function () {
        jQuery(this).find(".prev_banner,.next_banner").stop(true, true).fadeTo("show", 0.3);
    },
    function () {
        jQuery(this).find(".prev_banner,.next_banner").fadeOut();
    });
    jQuery(".fullSlide").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "fold",
        autoPlay: true,
        autoPage: true,
        trigger: "click",
        startFun: function (i) {
            var curLi = jQuery(".fullSlide .bd li").eq(i);
            if (!!curLi.attr("_src")) {
                curLi.css("background-image", curLi.attr("_src")).removeAttr("_src");
            }
        }
    });



    $(document).ready(function () {

        //添加Lazyload
        $("img.lazy").lazyload({
            effect: "fadeIn"
        });

        //选中第一项
        courseClick('11', '0');

        //banner下方岗位内容滚动变换效果
        $('#featureUL li').hover(function () {
            $(this).addClass("featureBox2");
        }, function () {
            $(this).removeClass("featureBox2");
        })


        //问问题切换效果

        $('.ask_index_list ul').hover(function () {
            $(this).css("z-index", "10");
            $(this).stop(true).animate({ marginTop: "-115px" }, { queue: false, duration: 200 });
            $(this).parent('div').stop(true).animate({ height: '305px', paddingBottom: "0" }, { queue: false, duration: 200 });
            $(this).find('.name').stop(true).animate({ paddingBottom: "0" }, { queue: false, duration: 200 });
        }, function () {
            $(this).stop(true).animate({ marginTop: "0" }, { queue: false, duration: 200 });
            $(this).parent('div').stop(true).animate({ height: '290px', paddingBottom: "15px" }, { queue: false, duration: 200 });
            $(this).find('.name').stop(true).animate({ paddingBottom: "20px" }, { queue: false, duration: 200 });

        })

        $('.ask_index_list dl').hover(function () {
            $(this).stop(true).find("dd").animate({ height: "180px" }, { queue: false, duration: 200 });
            $(this).find("dd").find("a").show();
            $(this).stop(true).parent('div').find('ul').css("z-index", "5");
            $(this).stop(true).parent('div').find('ul').animate({ marginTop: "-112px" }, { queue: false, duration: 200 });
        }, function () {
            $(this).stop(true).find("dd").animate({ height: "66px" }, { queue: false, duration: 200 });
            $(this).find("dd").find("a").hide();
            $(this).stop(true).parent('div').find('ul').animate({ marginTop: "0" }, { queue: false, duration: 200 });

        })


        //$(".cat_tag a").hover(function () {
        //    $(".cat_tag a").removeClass("now");
        //    $(this).addClass("now");
        //});


        /*首页岗位下拉分类

        $('#ys_top_performance').hover(function () {
            $("#performance_list").show();
        }, function () {
            $("#performance_list").hide();
        })

        $('#performance_list').hover(function () {
            $("#performance_list").show();
        }, function () {
            $("#performance_list").hide();
        })*/



    });





    //banner下方岗位内容滚动代码1
    (function ($) { $.fn.jCarouselLite = function (o) { o = $.extend({ btnPrev: null, btnNext: null, btnGo: null, mouseWheel: false, auto: null, speed: 1200, easing: null, vertical: false, circular: true, visible: 3, start: 0, scroll: 3, beforeStart: null, afterEnd: null }, o || {}); return this.each(function () { var b = false, animCss = o.vertical ? "top" : "left", sizeCss = o.vertical ? "height" : "width"; var c = $(this), ul = $("ul", c), tLi = $("li", ul), tl = tLi.size(), v = o.visible; if (o.circular) { ul.prepend(tLi.slice(tl - v - 1 + 1).clone()).append(tLi.slice(0, v).clone()); o.start += v } var f = $("li", ul), itemLength = f.size(), curr = o.start; c.css("visibility", "visible"); f.css({ overflow: "hidden", float: o.vertical ? "none" : "left" }); ul.css({ margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1" }); c.css({ overflow: "hidden", position: "relative", "z-index": "2", left: "0px" }); var g = o.vertical ? height(f) : width(f); var h = g * itemLength; var j = g * v; f.css({ width: f.width(), height: f.height() }); ul.css(sizeCss, h + "px").css(animCss, -(curr * g)); c.css(sizeCss, j + "px"); if (o.btnPrev) $(o.btnPrev).click(function () { return go(curr - o.scroll) }); if (o.btnNext) $(o.btnNext).click(function () { return go(curr + o.scroll) }); if (o.btnGo) $.each(o.btnGo, function (i, a) { $(a).click(function () { return go(o.circular ? o.visible + i : i) }) }); if (o.mouseWheel && c.mousewheel) c.mousewheel(function (e, d) { return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll) }); if (o.auto) setInterval(function () { go(curr + o.scroll) }, o.auto + o.speed); function vis() { return f.slice(curr).slice(0, v) }; function go(a) { if (!b) { if (o.beforeStart) o.beforeStart.call(this, vis()); if (o.circular) { if (a <= o.start - v - 1) { ul.css(animCss, -((itemLength - (v * 2)) * g) + "px"); curr = a == o.start - v - 1 ? itemLength - (v * 2) - 1 : itemLength - (v * 2) - o.scroll } else if (a >= itemLength - v + 1) { ul.css(animCss, -((v) * g) + "px"); curr = a == itemLength - v + 1 ? v + 1 : v + o.scroll } else curr = a } else { if (a < 0 || a > itemLength - v) return; else curr = a } b = true; ul.animate(animCss == "left" ? { left: -(curr * g) } : { top: -(curr * g) }, o.speed, o.easing, function () { if (o.afterEnd) o.afterEnd.call(this, vis()); b = false }); if (!o.circular) { $(o.btnPrev + "," + o.btnNext).removeClass("disabled"); $((curr - o.scroll < 0 && o.btnPrev) || (curr + o.scroll > itemLength - v && o.btnNext) || []).addClass("disabled") } } return false } }) }; function css(a, b) { return parseInt($.css(a[0], b)) || 0 }; function width(a) { return a[0].offsetWidth + css(a, 'marginLeft') + css(a, 'marginRight') }; function height(a) { return a[0].offsetHeight + css(a, 'marginTop') + css(a, 'marginBottom') } })(jQuery);













    //讲师阵容	
    $('.lecturer_list li').hover(function () {
        $('.lecturer_list li:first-child').find(".jsinfo").css({ "right": "auto", "left": "0px" });
        $('.lecturer_list').eq(1).find(".jsinfo").css({ "top": "auto", "bottom": "0px" });
        $(this).addClass('active');
        $(this).find('.jsinfo').delay(250).fadeIn(200);
    }, function () {
        $(this).removeClass('active');
        $(this).find('.jsinfo').stop(true, true).hide(100);
    });




    //免费·热点·趋势 向上滑动
    function setCourseEvent($divCourse) {

        $divCourse.find("li.ad_img_01").hover(function () {
            $(this).addClass('cf_on2');
        }, function () {
            $(this).removeClass('cf_on2');
        });
        $("#btnPopup").click(function () {
            $.layer({
                type: 1,
                title: false,
                area: ['auto', 'auto'],
                shade: [0.5, '#000', true],
                page: {
                    html: '<iframe style="width:750px;height:450px;" src="http://www.yingsheng.com/content/fla_movie/test_003.html?r="' + Math.random() + 'frameborder="0"></iframe>'
                }, success: function () {
                    layer.shift('top');
                }
            });
        });

    }


    //免费·热点·趋势左右滚动
    var _imgArray = new Array();
    $(document).ready(function () {

        /*scroll*/
        if ($("#maincontent").size() > 0) {
            var scrollDistance = 460;
        } else {
            var scrollDistance = 0;
        }
        $("#navcontainer").css("width", "100%");
        $("#navcontainer").append($("#siteHeader").clone());
        $("#navcontainer").append($("#siteNavigation").clone());

        var IE6browser = (navigator.userAgent.indexOf("MSIE 6") >= 0) ? true : false;

        if (!IE6browser) {
            var _visiflag;
            setInterval(function () {
                if (scrollDistance < ___getPageScroll()[1]) {
                    if (!_visiflag) {
                        _visiflag = true;
                        $("#navcontainer").show();
                    }
                } else {
                    if (_visiflag) {
                        _visiflag = false;
                        $("#navcontainer").hide();
                    }
                }
            }, 33);


            if (scrollDistance < ___getPageScroll()[1]) {
                _visiflag = true;
                $("#navcontainer").show();
            } else {
                _visiflag = false;
                $("#navcontainer").hide();
            }
        }
        $(".left,.right").VogueRollOver();


        var _preNum = 0;
        $("#slide1").find(".slideinner").find("a").mouseover(function () {
            if (_preNum != ($("#slide1").find(".slideinner").find("a").index(this))) {
                $("#special_mainimg").find("img").eq(_preNum).fadeOut();
                _preNum = ($("#slide1").find(".slideinner").find("a").index(this));
                $("#special_mainimg").find("img").eq(_preNum).fadeIn();
            }
        })


        setCourseEvent($(".pict"));

        /*
        if ($("#maincontent").size()) {
            funcmaincontent();
        };

        funcbnr($("#bnrcontent1"));
        funcbnr($("#bnrcontent2"));
        funcbnr($("#bnrcontent3"));
        funcbnr($("#bnrcontent4"));

        funcslide($("#slide1"));
        funcslide($("#slide2"));
        funcslide($("#slide3"));
        funcslide($("#slide4"));
        funcslide($("#slide5"));
        

        $(".pict").hover(function () {
            $(this).addClass("jhover");
        }, function () {
            $(this).removeClass("jhover");
        })
        .css("cursor", "pointer")
        .click(function () {
            //	if($(this).find("a").eq(0).attr("href")){
            //		location.href = $(this).find("a").eq(0).attr("href");
            //	}
            if ($(this).find("a").eq(0).attr("href")) {
                if ($(this).find("a").eq(0).attr("target") == "_blank") {
                    window.open($(this).find("a").eq(0).attr("href"));
                } else {
                    location.href = $(this).find("a").eq(0).attr("href");
                }
            }
            return false;
        });

        */
    });

    /*---------------
    slide FUNCTION
    ---------------*/

    function funcslide(_slide) {

        var _slideCount = 0;
        var _slideMax = Math.ceil(_slide.find(".slidecontent").find(".element").length / 3);
        var _slideLength = _slide.find(".slidecontent").find(".element").length;
        var _slideHeight = 0;

        if (_slide.find(".element").length > 3) {
            var _str = '<div class="slidenavigate"><a href="#" class="prev nouse">PREV</a>';
            for (var i = 0 ; i < _slideMax ; i++) {
                _str += '<a href="#" class="num">' + Number(i + 1) + '</a>';
            }
            _str += '<a href="#" class="next">NEXT</a></div>';
            _slide.prepend(_str);
        } else {
            _slide.find(".slidecontent").css("padding-top", "20px");
        }

        _slide.find(".slidecontent").find(".element").css("width", "165px").flatHeights();
        _slideHeight = (parseInt(_slide.find(".slidecontent").find(".element:first-child").outerHeight()) + 5) + "px";
        _slide.find(".slidecontent").css({ height: _slideHeight, overflow: "hidden" });
        _slide.find(".slideinner").css({ width: _slideLength * 185 });

        _slide.find(".slidenavigate").css({ visibility: "visible" });
        _slide.find(".slideinner").css({ position: "absolute", left: "0px" });

        _slide.find(".slidenavigate").find("a.prev").click(function () {
            if (_slideCount != 0) {
                _slideCount--;
                var _left = -637 * _slideCount;
                _slide.find(".slideinner").animate({ left: _left + "px" });
                _slide.find(".slidenavigate").find(".current").removeClass("current");
                _slide.find(".slidenavigate").find("a.num").eq(_slideCount).addClass("current");
                _slide.find(".slidenavigate").find(".nouse").removeClass("nouse");
                if (_slideCount == 0) _slide.find(".slidenavigate").find("a.prev").addClass("nouse");
            }
            return false;
        })

        _slide.find(".slidenavigate").find("a.next").click(function () {
            if (_slideCount != _slideMax - 1) {
                _slideCount++;
                var _left = -637 * _slideCount;
                _slide.find(".slideinner").animate({ left: _left + "px" });
                _slide.find(".slidenavigate").find(".current").removeClass("current");
                _slide.find(".slidenavigate").find("a.num").eq(_slideCount).addClass("current");
                _slide.find(".slidenavigate").find(".nouse").removeClass("nouse");
                if (_slideCount == _slideMax - 1) _slide.find(".slidenavigate").find("a.next").addClass("nouse");
            }
            return false;
        })

        for (i = 0 ; i < _slideMax; i++) {
            _slide.find(".slidenavigate").find("a.num").eq(i)
            .click(function () {
                if (_slideCount != $(this).index() - 1) {
                    _slideCount = $(this).index() - 1;
                    var _left = -637 * _slideCount;
                    _slide.find(".slideinner").animate({ left: _left + "px" });
                    _slide.find(".slidenavigate").find(".current").removeClass("current");
                    _slide.find(".slidenavigate").find("a.num").eq(_slideCount).addClass("current");
                    _slide.find(".slidenavigate").find(".nouse").removeClass("nouse");
                    if (_slideCount == 0) _slide.find(".slidenavigate").find("a.prev").addClass("nouse");
                    if (_slideCount == _slideMax - 1) _slide.find(".slidenavigate").find("a.next").addClass("nouse");
                }
                return false;
            })
        }
        _slide.find(".slidenavigate").find("a.num").eq(_slideCount).addClass("current");

    }

    /*--------------
    bnrFUNCTION
    --------------*/

    function funcbnr(_bnrcontent) {
        var _bnrCount = 0;
        var _bnrMax = _bnrcontent.find(".pict").length;
        var _bnrHeight = 0;

        if (_bnrMax > 1) {
            _bnrcontent.find(".left,.right").css("display", "block");
        }
        _bnrcontent.find(".pict").flatHeights();
        _bnrcontent.find(".pict");
        _bnrHeight = (parseInt(_bnrcontent.find(".pict:first-child").outerHeight()) + 5) + "px";
        _bnrcontent.css("height", _bnrHeight);

        _bnrcontent.find(".left").click(function () {
            if (_bnrCount != 0) {
                _bnrcontent.find(".pict").eq(_bnrCount).fadeOut(400, "linear");
                _bnrCount--;
                if (_bnrCount == 0) {
                    var str = _bnrcontent.find(".left").find("img").attr("src");
                    if (str.indexOf("_nouse") == -1) {
                        str = str.replace("_on.gif", ".gif");
                        str = str.replace("_on.jpg", ".jpg");
                        str = str.replace(".gif", "_nouse.gif");
                        str = str.replace(".jpg", "_nouse.jpg");
                        _bnrcontent.find(".left").find("img").attr("src", str);
                    }
                }
                var str = _bnrcontent.find(".right").find("img").attr("src");
                if (str.indexOf("_nouse") != -1) {
                    str = str.replace("_nouse.gif", ".gif");
                    str = str.replace("_nouse.jpg", ".jpg");
                    _bnrcontent.find(".right").find("img").attr("src", str);
                }

                _bnrcontent.find(".pict").eq(_bnrCount).fadeIn(400, "linear");
            }
        })
        _bnrcontent.find(".right").click(function () {
            if (_bnrCount != _bnrMax - 1) {
                _bnrcontent.find(".pict").eq(_bnrCount).fadeOut(400, "linear");
                _bnrCount++;
                if (_bnrCount == _bnrMax - 1) {
                    var str = _bnrcontent.find(".right").find("img").attr("src");
                    if (str.indexOf("_nouse") == -1) {
                        str = str.replace("_on.gif", ".gif");
                        str = str.replace("_on.jpg", ".jpg");
                        str = str.replace(".gif", "_nouse.gif");
                        str = str.replace(".jpg", "_nouse.jpg");
                        _bnrcontent.find(".right").find("img").attr("src", str);
                    }
                }
                var str = _bnrcontent.find(".left").find("img").attr("src");
                if (str.indexOf("_nouse") != -1) {
                    str = str.replace("_nouse.", ".");
                    _bnrcontent.find(".left").find("img").attr("src", str);
                }

                _bnrcontent.find(".pict").eq(_bnrCount).fadeIn(400, "linear");
            }
        })

    }


    /*--------------
    mainFUNCTION
    --------------*/
    //function funcmaincontent() {

    //    $("#maincontent").find(".main").css({
    //        "position": "absolute"
    //    });
    //    for (var i = 0 ; i < $("#maincontent").find(".element").length ; i++) {
    //        if ($("#maincontent").find(".element").eq(i).find("img").attr("src")) {
    //            _imgArray.push($("#maincontent").find(".element").eq(i).find("img").attr("src"));
    //        }
    //    }
    //    if (/*@cc_on!@*/false) {
    //        //IE
    //        setTimeout(startslide, 400);
    //    } else {
    //        //Non IE
    //        if (_imgArray.length) {
    //            loopImageLoader(0);
    //        } else {
    //            setTimeout(startslide, 400);
    //        }
    //    }

    //    function loopImageLoader(i) {
    //        var image1 = new Image();
    //        image1.src = _imgArray[i];
    //        image1.onload = function () {
    //            i++;
    //            if (_imgArray.length != i) {
    //                loopImageLoader(i);
    //            } else {
    //                startslide();
    //            }
    //        }
    //    }


    //    var _maxpage = 0;
    //    var _currentpage = 0;

    //    function startslide() {
    //        $("#maincontent").find(".element").css("display", "inline-block");

    //        $("#maincontent").find(".right").hide();
    //        $("#maincontent").find(".left").hide();

    //        $("#maincontent").find(".right").fadeIn(600);
    //        $("#maincontent").find(".left").fadeIn(600);

    //        $("#maincontent").find(".left,.right").VogueRollOver();

    //        var $el;
    //        if ($("#maincontent").find(".pict").length == 1) {
    //            for (var i = 0; i < 3; i++) {
    //                $el = $("#maincontent").find(".pict").clone();
    //                setCourseEvent($el);
    //                $("#maincontent").prepend($el);
    //            }
    //        } else if ($("#maincontent").find(".pict").length < 4) {
    //            $el = $("#maincontent").find(".pict").clone();
    //            setCourseEvent($el);
    //            $("#maincontent").prepend($el);
    //        }

    //        _maxpage = $("#maincontent").find(".pict").length;

    //        for (var i = 0 ; i < _maxpage ; i++) {
    //            var _pos = Math.round(1180 * (i - _currentpage) + $(window).width() / 2 - 590);
    //            var _opa = 0.5;
    //            /*alert(_pos);*/

    //            if (_pos < 100 && $(window).width() < 1180) _pos = 0;
    //            if (i == _currentpage) _opa = 1;
    //            if (_pos > $(window).width()) {
    //                _pos -= _maxpage * 1180
    //            } else if (_pos < -1180) {
    //                _pos += _maxpage * 1180
    //            }

    //            $("#maincontent").find(".pict").eq(i).css({
    //                left: _pos,
    //                opacity: 0
    //            })
    //            .animate({
    //                opacity: _opa
    //            }, {
    //                duration: 400,
    //                easing: 'linear'
    //            })
    //        }
    //        $("#maincontent").stop().find(".main").removeClass("main");
    //        $("#maincontent").stop().find(".pict").eq(_currentpage).addClass("main").css({ "position": "absolute" });


    //        window.onresize = function () {
    //            for (var i = 0 ; i < _maxpage ; i++) {
    //                var _pos = Math.round(1180 * (i - _currentpage) + $(window).width() / 2 - 590);
    //                var _opa = 0.5;

    //                if (_pos < 100 && $(window).width() < 1180) _pos = 0;
    //                if (i == _currentpage) _opa = 1;
    //                if (_pos > $(window).width()) {
    //                    _pos -= _maxpage * 1180
    //                }

    //                $("#maincontent").stop().find(".pict").eq(i).css({
    //                    left: _pos,
    //                    opacity: _opa
    //                })
    //            }
    //        }
    //        $("#maincontent").find(".right").click(nextPage);
    //        $("#maincontent").find(".left").click(prevPage);
    //    }


    //    function nextPage() {
    //        _currentpage++;
    //        if (_currentpage > _maxpage - 1) _currentpage = 0;
    //        $("#maincontent").stop().find(".main").removeClass("main");
    //        $("#maincontent").stop().find(".pict").eq(_currentpage).addClass("main").css({ "position": "absolute" });;
    //        _pict = $("#maincontent").find(".pict");
    //        for (var i = 0 ; i < _maxpage ; i++) {
    //            var _pos = Math.round(1180 * (i - _currentpage) + $(window).width() / 2 - 590);
    //            var _opa = 0.5;

    //            if (_pos < 100 && $(window).width() < 1180) _pos = 0;
    //            if (i == _currentpage) _opa = 1;
    //            if (_pos > $(window).width()) {
    //                _pos -= _maxpage * 1180
    //            } else if (_pos < -1180 * 2) {
    //                _pos += _maxpage * 1180
    //            }
    //            _pict.eq(i)
    //            .stop()
    //            .css({
    //                left: _pos + 1180
    //            })
    //            .animate({
    //                left: _pos,
    //                opacity: _opa
    //            }, {
    //                duration: 700,
    //                easing: 'easeOutQuint'
    //            })
    //        }
    //    }

    //    function prevPage() {
    //        _currentpage--;
    //        if (_currentpage < 0) _currentpage = _maxpage - 1;
    //        $("#maincontent").stop().find(".main").removeClass("main");
    //        $("#maincontent").stop().find(".pict").eq(_currentpage).addClass("main").css({ "position": "absolute" });;
    //        for (var i = 0 ; i < _maxpage ; i++) {
    //            var _pos = Math.round(1180 * (i - _currentpage) + $(window).width() / 2 - 590);
    //            var _opa = 0.5;
    //            if (i == _currentpage) _opa = 1;
    //            if (_pos < -1180) {
    //                _pos += _maxpage * 1180
    //            } else if (_pos > $(window).width() + 1180) {
    //                _pos -= _maxpage * 1180
    //            }
    //            $("#maincontent").find(".pict").eq(i)
    //            .stop()
    //            .css({
    //                left: _pos - 1180
    //            })
    //            .animate({
    //                left: _pos,
    //                opacity: _opa
    //            }, {
    //                duration: 700,
    //                easing: 'easeOutQuint'
    //            })
    //        }
    //    }
    //}


    /*----------------
    ROLLOVER PLUG-IN
    ----------------*/

    (function ($) {
        $.fn.VogueRollOver = function () {
            var _imgArray = new Array();
            for (var i = 0 ; i < this.length ; i++) {
                var _str = this.eq(i).find("img").attr("src");
                _str = _str.replace("_nouse.gif", ".gif");
                _str = _str.replace("_nouse.jpg", ".jpg");
                _str = _str.replace(".gif", "_on.gif");
                _str = _str.replace(".jpg", "_on.jpg");
                _imgArray.push(_str);
            }
            loopImageLoader(0);
            function loopImageLoader(i) {
                if (_imgArray[i]) {
                    var image1 = new Image();
                    image1.src = _imgArray[i];
                    image1.onload = function () {
                        i++;
                        if (_imgArray.length != i) {
                            loopImageLoader(i);
                        }
                    }
                }
            }
            return this.hover(function () {
                var str = $(this).find("img").attr("src");
                if (str.indexOf("_on") == -1 && str.indexOf("_nouse") == -1) {
                    str = str.replace(".gif", "_on.gif");
                    str = str.replace(".jpg", "_on.jpg");
                    $(this).find("img").attr("src", str);
                }
            }, function () {
                var str = $(this).find("img").attr("src");
                str = str.replace("_on.gif", ".gif");
                str = str.replace("_on.jpg", ".jpg");
                $(this).find("img").attr("src", str);
            });
        };
    })($);
    jQuery.easing['jswing'] = jQuery.easing['swing'];

    /*-----
    EASING
    ------*/

    jQuery.extend(jQuery.easing, {
        def: 'easeOutQuint',
        swing: function (x, t, b, c, d) {
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        }
    });

    document.write('<style type="text/css">div#maincontent div.main{display:none;}div#maincontent div.element{position:absolute !important;}</style>')


    /**
     / THIRD FUNCTION
     * getPageSize() by quirksmode.com
     *
     * @return Array Return an array with page width, height and window width, height
     */
    function ___getPageSize() {
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }
        var windowWidth, windowHeight;
        if (self.innerHeight) {	// all except Explorer
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }
        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }
        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }
        arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
        return arrayPageSize;
    };
    /**
     / THIRD FUNCTION
     * getPageScroll() by quirksmode.com
     *
     * @return Array Return an array with x,y page scroll values.
     */
    function ___getPageScroll() {
        var xScroll, yScroll;
        if (self.pageYOffset) {
            yScroll = self.pageYOffset;
            xScroll = self.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
            yScroll = document.documentElement.scrollTop;
            xScroll = document.documentElement.scrollLeft;
        } else if (document.body) {// all other Explorers
            yScroll = document.body.scrollTop;
            xScroll = document.body.scrollLeft;
        }
        arrayPageScroll = new Array(xScroll, yScroll);
        return arrayPageScroll;
    };


    //banner下方岗位内容滚动代码2

    $("#botton-scroll").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev"
    });

    $('#top-menu li').hover(
    function () { $('ul', this).slideDown(200); },
    function () {
        $('ul', this).slideUp(200);
    });

    $(".click").click(function () {
        $("#panel").slideToggle("slow");
        $(this).toggleClass("active"); return false;
    });

    $('.fade').hover(
    function () { $(this).fadeTo("slow", 0.5); },
    function () {
        $(this).fadeTo("slow", 5);
    });


    //播放课程
    //new Marquee(
    //{
    //    MSClassID: "main1",
    //    ContentID: "content1",
    //    TabID: "myTab_btns1",
    //    TabEvent: "onclick",
    //    Direction: 2,
    //    Step: 0.1,
    //    Width: 1180,
    //    Height: 525,
    //    Timer: 0,
    //    DelayTime: 5000,
    //    WaitTime: 5000,
    //    ScrollStep: 1180,
    //    SwitchType: 0,
    //    AutoStart: 1
    //})



})();

//课程渐进播放函数
function courseClick(clickTotal, clickNum) {
    //alert(clickTotal + clickNum);
    for (var i = 0; i < clickTotal; i++) {
        $("#courseclick_" + i).removeClass("now");
        $("#course_" + i).hide();
    }
    $("#courseclick_" + clickNum).addClass("now");
    $("#course_" + clickNum).fadeIn();

    //添加曝光率
    var course_string = $("#course_" + clickNum + "_courseString").text();
    //console.log(course_string);
//    $.post('/main-IndexLogManager.htm', { courseid: course_string }, function (data) {
//        //alert(data);
//        //console.log(data);
//        jQuery.getScript(data);
//
//    }, "");

    currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= 1;
    window.scroll(0, currentPosition);
    currentPosition += 1;
    window.scroll(0, currentPosition);
}

//courseClick(8, 1);


/*判断浏览器宽度

*/
$(function () { setTimeout(onWidthChange, 1000); });

function onWidthChange() {
    if ($(window).width() < 1366) {
        $("#maincontent .left").addClass("left_1024");
        $("#maincontent .right").addClass("right_1024");
    } else {
        $("#maincontent .left").removeClass("left_1024");
        $("#maincontent .right").removeClass("right_1024");
    }
    setTimeout(onWidthChange, 1000);
}





$(window).load(function () {

    $('.cat_tag_div .right_pro dl').hover(function () {
        $(this).find("dd").stop().animate({ left: '0px', top: '0px', width: '198px', padding: '16px 12px' }, { queue: false, duration: 200 });
    }, function () {
        $(this).find("dd").stop().animate({ left: '230px', top: '0px', width: '0px', padding: '16px 0' }, { queue: false, duration: 200 });
    })


});

// 首页新闻Tab
$(window).load(function () {
    var $Tab = $('.index_news');
    var $TabBtnList = $Tab.find('.tabTop').find('li');
    var $TabBtnContent = $Tab.find('.tabItem');
    var $TabBtnContentAct = $Tab.find('.tabItem.activate');

    $TabBtnList.on('click', function () {
        var activeIndex = $(this).data('tab');
        var $activeIndex = $('#' + activeIndex);
        $TabBtnList.removeClass('activate');
        $(this).addClass('activate');

        $TabBtnContentAct.fadeOut(200, function () {
            $activeIndex.addClass('activate');
            $activeIndex.fadeIn(200)
        });
        $TabBtnContent.removeClass('activate');
        $TabBtnContentAct = $activeIndex;
    })

})


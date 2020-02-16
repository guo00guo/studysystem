/**
 * Created by Administrator on 2015/12/2.
 */


$(function () {

    var $ulTab = $('.login_left').find('ul'),
        $login_nav = $('.login_nav'),
        $register_nav = $('.register_nav');

    var $formLoginAccount = $('.form-login-account'),
        $formLoginMobile = $('.form-login-mobile'),
        $formLoginQuickmark = $('.form-login-quickmark'),
        $formRegMobile = $('.form-reg-mobile'),
        $formRegEmail = $('.form-reg-email'),
        $formRegAccount = $('.form-reg-account');


    $ulTab.on('click', 'li', function () {

        var index = $(this).index();
        $ulTab.find('li').removeClass('now');
        $(this).addClass('now');
        var index2 = $login_nav.find('.now').index();
        var index3 = $register_nav.find('.now').index();

        if (index) {
            $login_nav.addClass('hidden');
            $register_nav.removeClass('hidden');

            $formLoginAccount.addClass('hidden');
            $formLoginQuickmark.addClass('hidden');

            switch (index3) {
                case 0:

                    $formRegAccount.removeClass('hidden');
                    break;
                case 1:
                    $formRegEmail.removeClass('hidden');

                    break;
                case 2:
                    $formRegMobile.removeClass('hidden');
                    break;
            }

        } else {
            $register_nav.addClass('hidden');
            $login_nav.removeClass('hidden');

            $formRegMobile.addClass('hidden');
            $formRegEmail.addClass('hidden');
            $formRegAccount.addClass('hidden');

            switch (index2) {
                case 0:
                    $formLoginAccount.removeClass('hidden');
                    break;
                case 1:
                    $formLoginQuickmark.removeClass('hidden');
                    break;
            }

        }

    });


    $login_nav.on('click', 'li', function () {
        $login_nav.find('li').removeClass('now');
        $(this).addClass('now');
        $formLoginAccount.addClass('hidden');
        $formLoginQuickmark.addClass('hidden');

        var index = $(this).index();
        switch (index) {
            case 0:
                $formLoginAccount.removeClass('hidden');
                break;
            case 1:
                $formLoginQuickmark.removeClass('hidden');
                break;
        }
    });

    $register_nav.on('click', 'li', function () {
        $register_nav.find('li').removeClass('now');
        $(this).addClass('now');
        $formRegMobile.addClass('hidden');
        $formRegEmail.addClass('hidden');
        $formRegAccount.addClass('hidden');
        var index = $(this).index();
        switch (index) {
            case 0:
                $formRegAccount.removeClass('hidden');
                break;
            case 1:
                $formRegEmail.removeClass('hidden');
                break;
            case 2:
                $formRegMobile.removeClass('hidden');
                break;
        }

    });




//url转对象
    var paramObj = {};
    var paramrStr = window.location.search.substr(1),
        paramArr = paramrStr.split('&'),
        paramLen = paramArr.length, i;
    for (i = 0; i < paramLen; i++) {
        var arr = paramArr[i].split('=');
        paramObj[arr[0]] = arr[1];
    }

    if(paramObj['tab']==='register'){
        //console.log($login_nav.find('li').last()[0])

        $ulTab.find('li').first().removeClass('now');
        $ulTab.find('li').last().addClass('now');
        //$register_nav.addClass('now');


        $login_nav.addClass('hidden');
        $register_nav.removeClass('hidden');
        $formLoginAccount.addClass('hidden');
        $formRegAccount.removeClass('hidden');
    }

    if(paramObj['from']!== null&& paramObj['from'] !== undefined && paramObj['from'] !== ''){
        parentFramUrl= decodeURIComponent(paramObj['from']);
    }
    if(paramObj['acUrl']!== null&& paramObj['acUrl'] !== undefined && paramObj['acUrl'] !== ''){
        acUrl= decodeURIComponent(paramObj['acUrl']);
    }

    //关闭
    $('.login_close').on('click', function () {

        try{
            try{
                window.parent.callbackFn(window.name);
            }catch(err){
                parent.layer.close(parent.layer.getFrameIndex(window.name));
            }

        }catch(e){
            console.log('e-',e);
            console.log(parentFramUrl)
            domainIframe(parentFramUrl);
        }

    });
});

function jd(pws) {
    var len = pws.length;
    pws_1 = pws.substring(0, (len / 2));
    pws_2 = pws.substring(len / 2, len);
    var timestamp = (new Date()).valueOf();
    if(len.length<2)len=0+len;
    p = randomString(5)+len+'b' + pws_1 + timestamp + pws_2 + randomString(5) + 'i#n'+len+'==';
    return p;
}



function randomString(len) {
    len = len || 32;
    var $chars = 'ASDFGHJKLPOIUYTREWQZXCVBNM&^%$@!abcdefhijkmnporstwxyz234567890';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

/**
 * @param wz
 * @param isLogin 是否是点了登陆
 * @constructor
 */
//    var Rooturl = location.href,
function OpenLoginOrRegBox(wz, isLogin) {

    alert(host);
    var Rooturl = host,
        iFrameURL = ''

    if (isLogin == '0') {
        try {
            iFrameURL = Rooturl + '/userLogin2?from=' + escape(window.sso.TopBar.hiddenFirameUrl) + '&tab=register&acUrl=' + escape(window.location.href)
        } catch (e) {
            iFrameURL = Rooturl + '/userLogin2?from=' + escape('http://' + window.location.host) + '&tab=register&acUrl=' + escape(window.location.href)

        }
    } else {
        try {
            iFrameURL = Rooturl + '/userLogin2?from=' + escape(window.sso.TopBar.hiddenFirameUrl) + '&acUrl=' + escape(window.location.href)
        } catch (e) {
            iFrameURL = Rooturl + '/userLogin2?from=' + escape('http://' + window.location.host) + '&acUrl=' + escape(window.location.href)

        }
    }


    $.layer({
        type: 2,
        shadeClose: true,
        title: false,
        bgcolor: 'none',
        closeBtn: [0, false],
        shade: [0.8, '#000'],
        border: [0],
        fix: true,
        offset: ['220px', ''],
        area: ['752px',($(window).height() - 50)],  //600
        iframe: {src: iFrameURL}
    });


    $('.txt-account').focus();
    wz.blur();
}

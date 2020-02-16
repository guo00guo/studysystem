
$(function () {

    $(".findPaw").on('click', function () {
            domainIframe4(parentFramUrl,'http://'+location.host+'/findpass');
    })

    var h = window.location.href;
    var s;
    try{
        var s = h.split("?")[1];
        s = s.split("_")[0];
    }catch(e){
        var s = h.split("?")[1];
    }

    if (s==="qq"){
        $(".login_qq").click();
    }
    if (s==="weibo"){
        $(".login_sina").click();
    }

//========================================================
    //输出提示
    function outMsg(ele, msg) {
        ele.parent().find('.s1').text(msg)
    }

    //判断是否为空的函数
    var isNullReg = /^\s*$/g;

    function isNULL(ele, msg) {
        var pd = isNullReg.test(ele.val());
        if (pd) {
            outMsg(ele, msg);
            return false;
        }
        return true;
    }


    //清除提示
    function clearMsg(perant, childenStr) {
        perant.find(childenStr).text("");
    }


//        判断密码范围6-16
    function pwdScope(ele, msg) {
        var pwdLen = ele.val().length;
        if (pwdLen < 6) {
            outMsg(ele, msg);
            return false;
        } else if (pwdLen > 16) {
            outMsg(ele, msg);
            return false;
        }
        return true;
    }

    //验证邮箱
    function isEmail(ele, msg) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        var isok = reg.test($.trim(ele.val()));

        if (!isok) {
            outMsg(ele, msg);
            return false;
        }
        return true;
    }

//        验证手机
    function isPhone(ele, msg) {
        var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var isok = reg.test($.trim(ele.val()));
        if (!isok) {
            outMsg(ele, msg);
            return false;
        }

        return true;
    }


    function outMsg2(ele, msg) {
        ele.parent().find('.s1').removeClass('hidden');
        ele.parent().find('.s1').html(msg);
    }


//==================================================================

//    普通登陆表单 对象
    var commonLogin = {
        ele: $('.form-login-account'),
        btnLogin: $('.form-login-account').find('.btnLogin'),
        txtAccount: $('.form-login-account').find('.txt-account'),
        txtPaw: $('.form-login-account').find('.txt-paw'),
        loginSussecc: function (data) {
//                console.log(data);
            commonLogin.btnLogin.val('登陆成功~');
            console.log('xxx')

            try {
                fillData(data);
                parent.layer.close(parent.layer.getFrameIndex(window.name));
            } catch (e) {
                var newData = {}
                newData.userId = data.userId;
                newData.userName = data.userName;
                newData.userFen = data.userFen;
                newData.token = getCookie("__t");
                newData.email = data.email;

                newData.mobile = data.mobile;
                newData.userInviteCount = data.userInviteCount;
                domainIframe2(parentFramUrl, newData);
            }


        },
        ifError: function (errMsg) {
            switch (errMsg) {
                case "用户信息不存在":
                    outMsg(commonLogin.txtAccount, errMsg);
                    break;
                case "密码错误":
                    outMsg(commonLogin.txtPaw, errMsg);
                    break;
                case "密码格式不正确，必须为6~16位字符组成。":
                    outMsg(commonLogin.txtPaw, errMsg);
                    break;
                default:
                    outMsg(commonLogin.txtAccount, errMsg);
                    break;
            }
        },
        commonLoginData: function (data) {
            if (data.msg) {
                commonLogin.ifError(data.msg);
            } else if (data.userId) {
                commonLogin.loginSussecc(data);
            } else {
                console.log('服务器错误:', data);
            }
        }
    }

    commonLogin.btnLogin.on('click', function () {
        //清除提示
        clearMsg(commonLogin.ele, ".s1");

        var pd = isNULL(commonLogin.txtAccount, '用户名不能为空'),
            pd2 = isNULL(commonLogin.txtPaw, '密码不能为空');


        if (pd && pd2) {
            $.ajax({
                type: "POST",
                url: 'userLogin',
                data: "account=" + $.trim(commonLogin.txtAccount.val()) + "&password=" + commonLogin.txtPaw.val() + "&type=0"
            }).then(function (data) {
//              console.log(data);
                return commonLogin.commonLoginData(data);
            }, function (err) {
                console.log("AJAX请求失败" + err.statusText + " " + err.status);
            })

        }
    });


    //用户名注册
    var regAccount = {
        ele: $('.form-reg-account'),
        btnLogin: $('.form-reg-account').find('.btn_Reg'),
        txtAccount: $('.form-reg-account').find('.txt-account'),
        txtPaw: $('.form-reg-account').find('.txt-paw'),
        txtPaw2: $('.form-reg-account').find('.txt-paw2'),
        regSussecc: function (data) {
            regAccount.btnLogin.val('注册成功~~');
            //fillDataAndClose(data);
            fillDataAndRename(data);
        },
        ifError: function (errMsg) {
            switch (errMsg) {
                case "该用户名已被注册，请更换后重试":
                    outMsg(regAccount.txtAccount, errMsg);
                    break;
                case "用户名格式不正确，必须字母开头，由数字和字母组成6~16位字符串。":
                    outMsg(regAccount.txtAccount, errMsg);
                    break;
                default:
                    outMsg(regAccount.txtAccount, errMsg);
                    break;
            }
        },
        regAccountData: function (data) {
            if (data.msg) {
                regAccount.ifError(data.msg);
            } else if (data.userId) {
                regAccount.regSussecc(data);
            } else {
                console.log('服务器错误:', data);
            }

        }
    }

    regAccount.btnLogin.on('click', function () {
        //清除提示
        clearMsg(regAccount.ele, '.s1');
        var pd = isNULL(regAccount.txtAccount, '用户名不能为空'),
            pd2 = isNULL(regAccount.txtPaw, '密码不能为空'),
            pd3 = isNULL(regAccount.txtPaw2, '确认密码不能为空');

        if (pd && pd2 && pd3) {
            var pd4 = pwdScope(regAccount.txtPaw, '密码格式不正确，必须为6~16位字符组成');

            if (pd4) {
                if (regAccount.txtPaw.val() === regAccount.txtPaw2.val()) {

                    $.ajax({
                        type: 'POST',
                        url: '/accountReg',
                        data: "account=" + $.trim(regAccount.txtAccount.val()) + "&pwd=" + regAccount.txtPaw.val() + '&acUrl=' + acUrl//+ "&login_type=0&app_id=100002"
                    }).then(function (data) {
                        console.log(data);
                        return regAccount.regAccountData(data);
                    }, function () {
                        console.log('ajax请求失败');
                    })
                } else {
                    outMsg(regAccount.txtPaw2, '密码与确认密码不一致');
                }
            }

        }
    })

    //邮箱注册
    var regEmail = {
        ele: $('.form-reg-email'),
        btnLogin: $('.form-reg-email').find('.btn_Reg'),
        txtAccount: $('.form-reg-email').find('.txt-email'),
        txtPaw: $('.form-reg-email').find('.txt-paw'),
        txtPaw2: $('.form-reg-email').find('.txt-paw2'),
        regSussecc: function (data) {
            regEmail.btnLogin.val('注册成功~~');

            fillDataAndRename(data);
            //fillDataAndClose(data);
        },
        ifError: function (errMsg) {
            outMsg(regEmail.txtAccount, errMsg);
        },
        regAccountData: function (data) {
            if (data.msg) {
                regEmail.ifError(data.msg);
            } else if (data.userId) {
                regEmail.regSussecc(data);
            } else {
                console.log('服务器错误:', data);
            }

        }
    }

    regEmail.btnLogin.on('click', function () {
//清除提示
        clearMsg(regEmail.ele, '.s1');
        var pd = isNULL(regEmail.txtAccount, 'Email不能为空'),

            pd2 = isNULL(regEmail.txtPaw, '密码不能为空'),
            pd3 = isNULL(regEmail.txtPaw2, '确认密码不能为空');

        if (pd && pd2 && pd3) {
            var pd5 = isEmail(regEmail.txtAccount, '邮箱格式不正确，请重新输入！');
            if (pd5) {
                var pd4 = pwdScope(regEmail.txtPaw, '密码格式不正确，必须为6~16位字符组成');
                if (pd4) {

                    if (regEmail.txtPaw.val() === regEmail.txtPaw2.val()) {

                        $.ajax({
                            type: 'POST',
                            url: '/emailReg',
                            data: "reg_num=" + $.trim(regEmail.txtAccount.val()) + "&pwd=" + regEmail.txtPaw.val() + '&acUrl=' + acUrl
                        }).then(function (data) {
                            console.log(data);
                            return regEmail.regAccountData(data);
                        }, function () {
                            console.log('ajax请求失败');
                        })
                    } else {
                        outMsg(regEmail.txtPaw2, '密码与确认密码不一致');
                    }
                }
            }
        }
    })

    //手机注册
    var regMobile = {
        ele: $('.form-reg-mobile'),
        btnLogin: $('.form-reg-mobile').find('.btn_Reg'),
        txtAccount: $('.form-reg-mobile').find('.txt-mobile'),
        txtPaw: $('.form-reg-mobile').find('.txt-paw'),
        txtPaw2: $('.form-reg-mobile').find('.txt-paw2'),
        regSussecc: function (data) {

            regEmail.btnLogin.val('注册成功~~');

            fillDataAndRename(data);
            //fillDataAndClose(data);

        },
        ifError: function (errMsg) {
            outMsg(regMobile.txtAccount, errMsg);
        },
        regAccountData: function (data) {
            if (data.msg) {
                regMobile.ifError(data.msg);
            } else if (data.userId) {
                regMobile.regSussecc(data);
            } else {
                console.log('服务器错误:', data);
            }

        }
    }

    regMobile.btnLogin.on('click', function () {
        console.log('sfsdf');
//清除提示
        clearMsg(regMobile.ele, '.s1');
        var pd = isNULL(regMobile.txtAccount, '手机不能为空'),
            pd2 = isNULL(regMobile.txtPaw, '密码不能为空'),
            pd3 = isNULL(regMobile.txtPaw2, '确认密码不能为空');

        if (pd && pd2 && pd3) {
            var pd5 = isPhone(regMobile.txtAccount, '手机格式不正确，请重新输入！');
            if (pd5) {
                var pd4 = pwdScope(regMobile.txtPaw, '密码格式不正确，必须为6~16位字符组成');
                if (pd4) {

                    if (regMobile.txtPaw.val() === regMobile.txtPaw2.val()) {

                        $.ajax({
                            type: 'POST',
                            url: '/mobileReg',
                            data: "reg_num=" + $.trim(regMobile.txtAccount.val()) + "&pwd=" + regMobile.txtPaw.val() + '&acUrl=' + acUrl
                        }).then(function (data) {
                            console.log(data);
                            return regMobile.regAccountData(data);
                        }, function () {
                            console.log('ajax请求失败');
                        })
                    } else {
                        outMsg(regMobile.txtPaw2, '密码与确认密码不一致');
                    }
                }
            }
        }
    })


//        修改用户名
//        <i class="iconfont">&#xe645;</i>该用户名已存在
    $('.btn_fix').on('click', function () {
        var inputText = $('.p_input').find('.input_text');
        if (inputText.val() == "") {
            outMsg2(inputText, "<i class='iconfont'>&#xe645;</i>用户名不能为空")
        } else {
//                outMsg2(inputText,"<i class='iconfont'>&#xe645;</i>该用户名已存在");

            $.ajax({
                type: 'POST',
                url: '/resetName',
                data: "account=" + $.trim(inputText.val())
            }).then(function (data) {
                console.log(data);


                if (data.msg) {
                    outMsg2(inputText, "<i class='iconfont'>&#xe645;</i>" + data.msg)
                } else if (data.userId) {
                    fillDataAndClose(data);
                    //try {
                    //    parent.$('#nav_login_sso').addClass('hidden');
                    //    parent.$('#nav_reg_sso').addClass('hidden');
                    //    parent.$('.global_name').removeClass('hidden');//.css('display','block');
                    //    parent.$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
                    //    parent.$('.member_div').find('h3').text(data.userName);
                    //    parent.$('.user-fen').find('b').text(data.userFen);
                    //
                    //    parent.layer.close(parent.layer.getFrameIndex(window.name));
                    //} catch (e) {
                    //    var newData = {}
                    //    newData.userId = data.userId;
                    //    newData.userName = data.userName;
                    //    newData.userFen = data.userFen;
                    //    newData.token = getCookie("__t");
                    //
                    //    domainIframe2(parentFramUrl, newData);
                    //}


                } else {
                    console.log('服务器错误:', data);
                }
            }, function () {
                console.log('ajax请求失败');
            })
        }
    });
    $('.p_input').find('.s1').on('click', function () {
        $(this).addClass('hidden');
    })


//刷新二维码
    $('#refreshBtn').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/rq/getQR'
        }).then(function (data) {
            $('#QRCodeImg').attr('src', 'http://qc.api.yingsheng.com/?msg=' + data);
        }, function (e) {
            console.log('AJAX失败')
        })
    })
//检测二维码
    $('#QRCode,#Login-QR').on('click', function () {
        var jsq = setInterval(function () {

            if ($('.form-login-quickmark').hasClass('hidden')) {
                clearInterval(jsq);
            } else {
                //console.log('avc');
                detectionQR();
            }
        }, 1000);
    })


    //逛一逛点击关闭
    $('.btn_fix').on('click',function(){
        try {
            $('.global_login').addClass('hidden');
            parent.layer.close(parent.layer.getFrameIndex(window.name));
        } catch (e) {
            domainIframe(parentFramUrl);
        }
    })
//验证手机按钮
    $('.half_1').on('click',function(e){

        try{

            parent.location.href = "http://i.yingsheng.com/Phone";
        }catch(e){
            console.log('e-',e);
            console.log(parentFramUrl)
            domainIframe4(parentFramUrl,'http://i.yingsheng.com/Phone');
        }
    })
    //验证邮箱按钮
    $('.half_2').on('click',function(e){


        try{
            parent.location.hrefpathname = "http://i.yingsheng.com/Email";
        }catch(e){
            console.log('e-',e);
            console.log(parentFramUrl)
            domainIframe4(parentFramUrl,'http://i.yingsheng.com/Email');
        }
    })

    $('.s1 > a').on('click', function(e){
        parent.location.href='http://www.yingsheng.com/app';
    })
});

//检测二维码的请求
function detectionQR() {
    var rCodeStr = '';
    var srcStr = $('#QRCodeImg').attr('src');
    rCodeStr = srcStr.substr(srcStr.search(/msg=/g) + 4);
    $.ajax({
        type: 'POST',
        url: '/rq/detectionQR',
        data: "qrCode=" + rCodeStr
    }).then(function (data) {

        if (!data.msg) {
            try {
                console.log('abcdd');
                parent.$('#nav_login_sso').addClass('hidden');
                parent.$('#nav_reg_sso').addClass('hidden');
                parent.$('.global_name').removeClass('hidden');//.css('display','block');
                parent.$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
                parent.$('.member_div').find('h3').text(data.userName);
                parent.$('.user-fen').find('b').text(data.userFen);
                //                parent.location.reload();

                parent.layer.close(parent.layer.getFrameIndex(window.name));
            } catch (e) {
                var newData = {}
                newData.userId = data.userId;
                newData.userName = data.userName;
                newData.userFen = data.userFen;
                newData.token = getCookie("__t");

                domainIframe2(parentFramUrl, newData);
            }
        }

    }, function () {

    })
}


function getCookie(cookie_name) {
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度

    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可。
        cookie_pos += cookie_name.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1) {
            cookie_end = allcookies.length;
        }

        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}


var parentFramUrl='',acUrl='';
//关闭iFrame
function domainIframe(url){
    var hiddeniFrame= document.createElement('iframe');
    //hiddeniFrame.src='http://192.168.0.27:1234/iframeHidden.html?callback='+window.name;
    //hiddeniFrame.src='http://192.168.0.27:1234/iframeHidden.html?close='+window.name;

    hiddeniFrame.src=unescape(url)+'?close='+encodeURI(encodeURI(window.name));
    $(hiddeniFrame).addClass('hidden');
    $('body').append(hiddeniFrame);
    $(hiddeniFrame).on('load',function(){
        $(this).remove();
    });
}
//关闭并填充异步数据
function domainIframe2(url,data){

    var hiddeniFrame= document.createElement('iframe');
    //hiddeniFrame.src='http://192.168.0.27:1234/iframeHidden.html?callback='+window.name;
    var ObjStr='',key;
    ObjStr+='{';
    for(key in data){
        ObjStr+=key+':'+data[key]+',';
    }
    ObjStr=ObjStr.slice(0,ObjStr.length-1);
    ObjStr+='}';
    var URLParamStr='?close='+encodeURI(encodeURI(window.name))+'&show='+encodeURI(encodeURI(ObjStr));

    //hiddeniFrame.src='http://192.168.0.27:1234/iframeHidden.html'+URLParamStr;
    hiddeniFrame.src=unescape(url)+URLParamStr;

    $(hiddeniFrame).addClass('hidden');
    $('body').append(hiddeniFrame);
    $(hiddeniFrame).on('load',function(){
        $(this).remove();
    })
}
//填充数据
function domainIframe3(url,data){

    var hiddeniFrame= document.createElement('iframe');
    //hiddeniFrame.src='http://192.168.0.27:1234/iframeHidden.html?callback='+window.name;
    var ObjStr='',key;
    ObjStr+='{';
    for(key in data){
        ObjStr+=key+':'+data[key]+',';
    }
    ObjStr=ObjStr.slice(0,ObjStr.length-1);
    ObjStr+='}';
    var URLParamStr='?show='+encodeURI(encodeURI(ObjStr));

    //hiddeniFrame.src='http://192.168.0.27:1234/iframeHidden.html'+URLParamStr;
    hiddeniFrame.src=unescape(url)+URLParamStr;

    $(hiddeniFrame).addClass('hidden');
    $('body').append(hiddeniFrame);
    $(hiddeniFrame).on('load',function(){
        $(this).remove();
    })
}

//跳转iFrame 第二个参数为跳转的路径
function domainIframe4(url,url2){
    var hiddeniFrame= document.createElement('iframe');
    hiddeniFrame.src=unescape(url)+'?goto='+url2;
    console.log(hiddeniFrame.src)
    $(hiddeniFrame).addClass('hidden');
    $('body').append(hiddeniFrame);
    $(hiddeniFrame).on('load',function(){
        $(this).remove();
    });
}


//ajax填充数据并关闭父iframe

function fillDataAndClose(data) {
    try {
        //parent.$('#nav_login_sso').addClass('hidden');
        //parent.$('#nav_reg_sso').addClass('hidden');
        //parent.$('.global_name').removeClass('hidden');//.css('display','block');
        //parent.$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
        //parent.$('.member_div').find('h3').text(data.userName);
        //parent.$('.user-fen').find('b').text(data.userFen);


        $('.global_login').addClass('hidden');
        fillData(data);

        parent.layer.close(parent.layer.getFrameIndex(window.name));
    } catch (e) {
        var newData = {}
        newData.userId = data.userId;
        newData.userName = data.userName;
        newData.userFen = data.userFen;
        newData.token = getCookie("__t");

        domainIframe2(parentFramUrl, newData);
    }
}

//ajax 填充数据并跳到改名界面
function fillDataAndRename(data) {
    try {
        //parent.$('#nav_login_sso').addClass('hidden');
        //parent.$('#nav_reg_sso').addClass('hidden');
        //parent.$('.global_name').removeClass('hidden');//.css('display','block');
        //parent.$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
        //parent.$('.member_div').find('h3').text(data.userName);
        //parent.$('.user-fen').find('b').text(data.userFen);

        fillData(data);
        $('.global_login').addClass('hidden');
        $('.after_box').removeClass('hidden');
    } catch (e) {
        var newData = {}
        newData.userId = data.userId;
        newData.userName = data.userName;
        newData.userFen = data.userFen;
        newData.token = getCookie("__t");

        domainIframe3(parentFramUrl, newData);
        $('.global_login').addClass('hidden');
        $('.after_box').removeClass('hidden');
    }
}


//登陆 填充数据 parent不跨域
function fillData(data) {
    parent.$('#nav_login_sso').addClass('hidden');
    parent.$('#nav_reg_sso').addClass('hidden');
    parent.$('.global_name').removeClass('hidden');//.css('display','block');
    parent.$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId%1024 +'/'+ data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
    parent.$('.member_div').find('h3').text(data.userName);
    parent.$('.user-fen').find('b').text(data.userFen);
    if (data.userInviteCount > 0 || (data.mobile == '' && data.email == '')) {
        parent.$('.global_top_tips').removeClass('hidden');
        if (data.mobile == '' && data.email == '') {
            parent.$('.tips_email_mobile').removeClass('hidden');
        }
        if (data.userInviteCount > 0) {
            parent.$('.userInviteCount').removeClass('hidden');
            parent.$('.userInviteCount').find('span').text(data.userInviteCount);
        }
    }

}



function oauthFun(data) {
    try {
        fillData(data);
        $('.global_login').addClass('hidden');

        parent.layer.close(parent.layer.getFrameIndex(window.name));
    } catch (e) {
        var newData = {}
        newData.userId = data.userId;
        newData.userName = data.userName;
        newData.userFen = data.userFen;
        newData.token = getCookie("__t");

        domainIframe2(parentFramUrl, newData);
    }
}

function oauthFun2() {
    try {
        parent.layer.close(parent.layer.getFrameIndex(window.name));
    } catch (e) {
        domainIframe(parentFramUrl)
    }
}

function oauthFun3(data) {

    try {
        //parent.$('#nav_login_sso').addClass('hidden');
        //parent.$('#nav_reg_sso').addClass('hidden');
        //parent.$('.global_name').removeClass('hidden');//.css('display','block');
        //parent.$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
        //parent.$('.member_div').find('h3').text(data.userName);
        //parent.$('.user-fen').find('b').text(data.userFen);
        fillData(data)
        $('.global_login').addClass('hidden');
        $('#oauthBox').removeClass('hidden');

    } catch (e) {
        var newData = {}
        newData.userId = data.userId;
        newData.userName = data.userName;
        newData.userFen = data.userFen;
        newData.token = getCookie("__t");
        $('.global_login').addClass('hidden');
        $('#oauthBox').removeClass('hidden');
        domainIframe3(parentFramUrl, newData);
    }
}
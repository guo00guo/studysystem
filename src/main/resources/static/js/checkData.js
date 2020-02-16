/**
 * Created by zguorui on 2016/3/19.
 */
$(function(){
    var regConfig = {
        action:getAction,
        onBtn:$('.go_btn'),
        isSub:null,
        m : null
    };

    var getAction = function () {
        switch (m()){
            case 'm':
                return '/mobileReg';
            case 'e':
                return '/emailReg';
            default:
                return '/accountReg';
        }
    };

    var isSub = function () {
        if (!regConfig.isSub || null){
            return false;
        } else
        {
            return true;
        }
    }

    var subValue = function () {
        switch (m()){
            case 'm' :
                return $('.i10').next('input').val();
            case 'e':
                return $('.i11 ').next('input').val();
            case 'u':
                return $('.i1').next('input').val();
        }
    };

    var steErrText = function (id, msg){
        $(id).nextAll('span').show().find('b').text(msg);
    };

    var m = function (){
        var url = $('#regForm').attr('action');
        regConfig.m = getUrlQueryString('m', url);
        return regConfig.m;
    }

    function getUserName(uv){
        var a = m();
        if(a=="m" || a=="e" ){
            return "reg_num="+uv;
        } else {
            return "account="+uv;
        }
    }

    var setErrMsg = function (msg) {
        switch (m()){
            case 'm':
                steErrText('.i10', msg);
                break;
            case 'e':
                steErrText('.i11', msg);
                break;
            case 'u':
                steErrText('.i1', msg);
                break;
        }
    }

    var getErrName = function () {
        switch (m()){
            case 'm' :
                return "手机号";
            case  'u':
                return "用户名";
            case 'e':
                return "邮箱";
        }
    }

    var ckPassword = function (){
        if(pwdScope($('.password').val())){
            if ($('.password').val() == $('.password2').val()){
                return true;
            } else {
                steErrText('.password2','两次密码填写不一致')
                return false;
            }
        }else{
            steErrText('.password','6-18位字符');
            return false;
        }
    }

    var ckDateIsNull = function (){
        var isTrue = true;
        if (!isNULL($('.password').val())){
            isTrue=false ;
            steErrText('.password', '密码不能为空')
        }
        if (!isNULL($('.password2').val())){
            isTrue=false ;
            steErrText('.password2','密码不能为空')
        }
        return isTrue;
    }

    var ckDate = function (){
        var isNull = ckDateIsNull();
        var isTrue = true;

        if(isNULL(subValue())){
            switch (m()){
                case 'm':
                    if (!checkMobile(subValue())){
                        isTrue=false;
                        steErrText('.i10','请正确填写手机');
                    }
                    break;
                case 'e':
                    if (!checkMail(subValue())){
                        isTrue = false;
                        steErrText('.i11','请正确填写邮箱');
                    }
                    break;
                case 'u':
                    if (!checkUserName(subValue())){
                        isTrue=false;
                        steErrText('.i1','以字母开头，6-18位');
                    }
                    break;
            }
        } else {
            isTrue=false;
            setErrMsg(getErrName() + "不能为空");
        }

        if (isNull){
            if(!ckPassword()){
                isTrue=false;
            }
        }else{
            isTrue = false;
        }

        return isTrue;
    }

    regConfig.onBtn.on('click', function () {
        if (!isSub()){
            regConfig.isSub = true;
            if(ckDate()){
                regConfig.onBtn.text("信息提交中,请稍后……");
                var acc = getUserName(subValue());
                $.ajax({
                    type: 'POST',
                    url: getAction(),
                    data:acc+"&pwd=" + $.trim($('.password').val()) + '&acUrl=' + getUrlQueryString('from')
                }).then(function (data){
                    if(data.msg){
                        //注册失败
                        layer.msg(data.msg);
                    }
                    if (data.userId){
                        var url, form=getUrlQueryString('from');
                        if(form){
                            url = decodeURIComponent(form);
                        }else{
                            if(getUrlQueryString("t")=="true"){
                                url='http://i.qy.yingsheng.com/applyjoincorplist-1.html'
                            }else{
                                url = 'http://i.yingsheng.com';
                            }
                        }
                        if(getUrlQueryString("t")=="true"){
                            parent.openLayer(url);
                        } else {
                            $.layer({
                                type: 2,
                                title: false,
                                shadeClose: true,
                                closeBtn:false,
                                shade: 0.8,
                                area: ['752px', '520px'],
                                scrolling: "no",
                                iframe: {src: '/userlogin2?sb=after_box'},
                                end: function () {
                                    window.location.href = url;
                                }
                            });
                        }
                    }
                    regFalse();
                },function (){
                    console.log('ajax请求失败');
                    regFalse();
                })
            } else{
                regConfig.isSub=false;
            }

        }
    })

    function regFalse(){
        regConfig.onBtn.text("注册");
        regConfig.isSub=false;
    }

    $("input[type=text], input[type=password]").focus(function (){
        $(this).nextAll('span').hide();
    })
});



//电子邮件校验
function checkMail(str) {
    RegularExp = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
    if (RegularExp.test(str))
    {
        return true;
    }else{
        //alert("电子信箱格式不对！");
        return false;
    }
}

//手机号码校验，长度为11位数字
function checkMobile(str) {
    RegularExp=/^[1-9][0-9]{10}$/;
    if (RegularExp.test(str)) {
        return true;
    }
    else {
        //alert("手机号格式不正确！应该为11位长度的数字！");
        return false;
    }
}

//判断是否为空的函数
function isNULL(ele) {
    var isNullReg = /^\s*$/g;
    var pd = isNullReg.test(ele);
    if (pd) {
        return false;
    }
    return true;
}

//判断密码范围6-16
function pwdScope(ele) {
    var pwdLen = ele.length;
    if (pwdLen < 6) {
        return false;
    } else if (pwdLen > 16) {
        return false;
    }
    return true;
}

//判断用户名是否正确
function checkUserName (str){
    RegularExp=/^[A-Za-z][A-Za-z0-9_-]{5,17}$/;
    if (RegularExp.test(str)){
        return true;
    } else {
        return false
    }
}


//获取URL参数
function getUrlQueryString(name,url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r;
    if (url == null || undefined){
        r = window.location.search;
    } else {
        r = url.substr(url.indexOf('?'));
    }
    if (r != null) {
        r = r.substr(1).match(reg);
        if(r==null){
            return null
        }else {
            return unescape(r[2]);
        }
    }
    return null;
}
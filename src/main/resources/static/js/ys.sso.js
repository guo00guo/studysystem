/**
 *@auhor 郭欣荣
 *@requires 依赖jquery
 *@desc jsonp外部加载html
 */

window.sso={};
(function(window,$){
    'use strict';
    var config={
        el:'body',
        topBarDataUrl:'http://sso2.yingsheng.com/sso-session.htm',  //后面需改！
        topBarHtmlUrl:'http://sso2.yingsheng.com/sso-topbarjsonp.htm', //后面需改！
        hiddenFirameUrl:encodeURI('http://'+window.location.host+'/iframeHidden.html') //隐藏的iframe的地址
    }


    var util={
        /**
         * 合并对象，浅拷贝
         * @param  {Object} obj1
         * @param  {Object} obj2
         */
        extend:function (obj1,obj2){
            if(!obj2) return; //第二个对象为空直接返回
            for(var key in obj2){

                if(obj2.hasOwnProperty(key)){ //如果属性在原型上则排除
                    //原型上的属性不会赋值
                    obj1[key]=obj2[key];
                }
            }
            return obj1;
        }
    }

    var jsonpReq={
        topBarHtml:function(){
            $.ajax({
                url:config.topBarHtmlUrl,
                dataType:'jsonp',
                jsonpCallback:'window.sso.TopBar.topBarHtmlCallback'
            })
        },
        topBarData:function(){
            $.ajax({
                url:config.topBarDataUrl,
                dataType:'jsonp',
                jsonpCallback:'window.sso.TopBar.topBarDataCallback'
            });
        }

    }
    var _TopBar={
        init:function(options){
            util.extend(config,options);
            //console.log(options);
            //console.log(config)
            jsonpReq.topBarHtml();
            jsonpReq.topBarData();
            this.hiddenFirameUrl=config.hiddenFirameUrl;
        },
        topBarHtmlCallback:function (data) {
            var htmlStr=data.html;
            htmlStr=htmlStr.replace(/<script.*jquery-1.9.1.min.js"><\/script>/g,' ');
            htmlStr=htmlStr.replace(/(id="action_logout".*)href="(.*)logout2"/g,'$1 href="$2logout2?from='+window.location.href+'" ');

            // htmlStr=htmlStr.replace(/<script.*layer.min.js"><\/script>/g,' ');
            $(config.el).prepend(htmlStr);
            // $('body').append('<script src="./layer.min.js"><\/script>');
        },
        topBarDataCallback:function(data){
            //待定..
            //console.log(data);
        },
        //关闭iframe
        closeIframe:function(childLayer){
            layer.close(layer.getFrameIndex(decodeURI(decodeURI(childLayer))));
        },
        //跳转iframe
        gotoIframe:function(url){
            location.href=url;
        },
        //异步显示
        asyncShow:function(dataStr){
            var dataStrjx=decodeURI(decodeURI(dataStr)),data={},tempArr,i;
            dataStrjx = dataStrjx.substring(1,dataStrjx.length+1);
            tempArr=dataStrjx.split(',');
            for(i=0;i<tempArr.length;i++){
                var tempArr2=tempArr[i].split(':');
                data[tempArr2[0]]=tempArr2[1];
            }
            //console.log(data);
            $('#nav_login_sso').addClass('hidden');
            $('#nav_reg_sso').addClass('hidden');
            $('.global_name').removeClass('hidden');
            var src = "http://face.yingsheng.com/files/{0}/-/-_100_100.jpg?rnd={2}";
            src = src.replace("{0}",data.userId%1024);
            src = src.replace(/-/g,data.userId);
            src = src.replace("{2}", Math.floor(Math.random() * (1000000 + 1)));
            $('#global_top_UserFace').attr('src', src);
            //$('#global_top_UserFace').attr('src', 'http://face.yingsheng.com/files/' + data.userId%1024 + "/" + data.userId+ "/" + data.userId + '_100_100.jpg?rnd=' + Math.floor(Math.random() * (1000000 + 1)));
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

    }



    window.sso.TopBar=_TopBar;


})(window,jQuery)

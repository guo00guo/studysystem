        var $YSTJ_MouseX_ID = 'YSTJ_MouseX';
        var $YSTJ_MouseY_ID = 'YSTJ_MouseY';
        var $YSTJ_MouseX = 0;
        var $YSTJ_MouseY = 0;
        var $YSTJ_PageTime = new Date();
        var $YSTongJiParams = null;
        var $YSTJ_ThisPageLogID = 0;
        var $YSTJ_AutoSaveTime = 60;
        var $YSTJ_ServerUrl = 'http://api.yingsheng.com/webviewlog.ashx';

        function CheckUrl(str) {
            var RegUrl = new RegExp();
            RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
            if (!RegUrl.test(str)) {
                return false;
            }
            return true;
        }


        function mouseMove(ev) {
            ev = ev || window.event;
            var mousePos = mouseCoords(ev);
            $YSTJ_MouseX=mousePos.x;
            $YSTJ_MouseY= mousePos.y;
            //测试用
            //document.getElementById($YSTJ_MouseX_ID).value = mousePos.x;
            //document.getElementById($YSTJ_MouseY_ID).value = mousePos.y;
        }

        function mouseCoords(ev) {
            if (ev.pageX || ev.pageY) {
                return { x: ev.pageX, y: ev.pageY };
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }

        document.onmousemove = mouseMove;

        function diffDate(date1, date2) {
            var date3 = date2.getTime() - date1.getTime(); 
            var seconds = Math.floor(date3 / 1000);
            return seconds;
        }

        var getOSAndBrowser = function () {
            var os = navigator.platform;
            var userAgent = navigator.userAgent;
            var info = "";
            var tempArray = "";
            if (os.indexOf("Win") > -1) {
                if (userAgent.indexOf("Windows NT 5.0") > -1) {
                    info += "Win2000";
                } else if (userAgent.indexOf("Windows NT 5.1") > -1) {
                    info += "WinXP";
                } else if (userAgent.indexOf("Windows NT 5.2") > -1) {
                    info += "Win2003";
                } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
                    info += "WindowsVista";
                } else if (userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
                    info += "Win7";
                } else if (userAgent.indexOf("Windows 8") > -1) {
                    info += "Win8";
                } else {
                    info += "Other";
                }
            } else if (os.indexOf("Mac") > -1) {
                info += "Mac";
            } else if (os.indexOf("X11") > -1) {
                info += "Unix";
            } else if (os.indexOf("Linux") > -1) {
                info += "Linux";
            } else {
                info += "Other";
            }
            info += "/";
            if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
                tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
                info += tempArray[1] + tempArray[2];
            } else if (/MSIE \d+\.\d+/.test(userAgent)) {
                tempArray = /MS(IE) (\d+\.\d+)/.exec(userAgent);
                info += tempArray[1] + tempArray[2];
            }
                //IE11.0以上与之前的版本不同
            else if (/Trident\/(\d+\.\d+)/.test(userAgent)) {
                var v = /rv:\d+\.\d+/.exec(userAgent);
                var item = v[0].replace('rv:');
                info += 'IE' + v[0].split(':')[1];
            }
            else if (/[Cc]hrome\/\d+/.test(userAgent)) {
                tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
                info += tempArray[1] + tempArray[2];
            } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
                tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
                info += tempArray[3] + tempArray[1];
            } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
                tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
                info += tempArray[1] + tempArray[2];
            } else {
                info += "unknown";

            }
            return info;
        };

        $(document).ready(function () {
            
            if (CheckUrl(window.location.href)) {
                var os_browser = getOSAndBrowser().split('/');
                var from_url = document.referrer != '' ? document.referrer : '';
                var _stay_times = diffDate($YSTJ_PageTime, new Date());
                var _userid = $.cookie('aeaakmluserid') != null ? $.cookie('aeaakmluserid') : '0';
                var _username = $.cookie('aeaakmlusername') != null ? $.cookie('aeaakmlusername') : '';

                $YSTongJiParams = {
                    domain: document.domain,
                    view_url: escape(window.location.href),
                    from_url: escape(from_url),
                    os_ver: os_browser[0],
                    browser: os_browser[1],
                    srceen_height: window.screen.height,
                    srceen_width: window.screen.width,
                    mouse_x: 0,
                    mouse_y: 0,
                    loadTime: '\/Date(' + new Date().getTime() + ')\/',
                    stay_times: 0,
                    userid: _userid,
                    username: _username,
                    sessionid: '0',
                    goto_url: ''
                };

                pageLoadSetLog();
            }
            else {
            }

        })

        function pageLoadSetLog()
        {
            $.getJSON($YSTJ_ServerUrl + "?action=GetSessionId&jsoncallback=?", function (resultData) {
                $YSTongJiParams.sessionid = resultData.sid;
                $YSTongJiParams.loadTime = resultData.loadtime;
                //初始打开记录LOG
                YSTJ_SaveLog();
            })


        }

        $(document).click(function (e) {
            if ($(e.target).is('a') || $(e.target).is('input:button') || $(e.target).is('img')) {

                //点击的图片父节点是否为链接,非链接则不登记日志
                if ($(e.target).is('img'))
                {
                    if (!$(e.target).parent().is('a'))
                    {
                        //console.log('not img link');
                        return;
                    }
                }

                var _goto_url = '';
                if ($(e.target).is('input:button'))
                {
                    _goto_url = $(e.target).attr('onclick');
                    if (_goto_url == undefined)
                    {
                        _goto_url = 'btn Click ';
                        if ($(e.target).attr('id') != undefined) {
                            _goto_url += 'id:' + $(e.target).attr('id');
                        }
                    }
                }
                else {
                    
                    //是否为链接
                    if ($(e.target).is('a')) {
                        _goto_url = escape($(e.target).attr('href'));
                    }
                    //是否为图片链接
                    else if ($(e.target).is('img')) {
                        _goto_url = escape($(e.target).parent().attr('href'));
                    }

                    if (_goto_url == undefined || _goto_url == '#' || _goto_url.indexOf('javascript:') > -1) {
                        _goto_url = 'js Click ';
                        if ($(e.target).attr('id') != undefined)
                        {
                            _goto_url += 'id:' + $(e.target).attr('id');
                        } else if ($(e.target).attr('onclick') != undefined) {
                            _goto_url += 'e:' + $(e.target).attr('onclick');
                        }
                    }
                }

                var $YSTongJiClickParams = {
                    mouse_x: parseInt($YSTJ_MouseX),
                    mouse_y: parseInt($YSTJ_MouseY),
                    goto_url: _goto_url,
                    view_url: $YSTongJiParams.view_url,
                    sessionid: $YSTongJiParams.sessionid
                };

                var _modelJson = JSON.stringify($YSTongJiClickParams);
                //console.log(_modelJson);

                $.getJSON($YSTJ_ServerUrl + "?action=2&modelJson=" + _modelJson + "&jsoncallback=?", function (resultData) {
                    //console.log("______________________________________");
                    //console.log(resultData);
                    YSTJ_SaveLog();
                })

            }



        })

        window.onbeforeunload = onbeforeunload_handler;
        function onbeforeunload_handler() {
            //退出时，记录LOG
            YSTJ_SaveLog();
        }



        function YSTJ_SaveLog()
        {
            //var mx = document.getElementById($YSTJ_MouseX_ID).value;
            //var my = document.getElementById($YSTJ_MouseY_ID).value;

            $YSTongJiParams.mouse_x = $YSTJ_MouseX;
            $YSTongJiParams.mouse_y = $YSTJ_MouseY;
            $YSTongJiParams.stay_times = diffDate($YSTJ_PageTime, new Date());

            var _modelJson = JSON.stringify($YSTongJiParams);

            $.getJSON($YSTJ_ServerUrl+"?action=1&modelJson=" + _modelJson + "&jsoncallback=?", function (resultData) {
                //执行成功后定时执行
                //console.log(resultData);

            })            

        }

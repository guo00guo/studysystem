BizQQWPA.define("wpa.SelectPanel","lang.browser,util.Style,util.className,util.events,util.offset,util.css,util.proxy,lang.extend",function(require){var Style=require("Style"),className=require("className"),events=require("events"),offset=require("offset"),browser=require("browser"),css=require("css"),proxy=require("proxy"),extend=require("extend");var NODE_TYPE_ELEMENT=1;var doc=document;var findById=function(parent,id){var append=function(host,tail){for(var i=0,len=tail.length;i!==len;host.push(tail[i++])){}return host},children=append([],parent.childNodes),len=children.length,pos=0,curNode,ret=null;while(len>pos){curNode=children[pos++];if(curNode.nodeType!==NODE_TYPE_ELEMENT){continue}if(curNode.getAttribute("id")===id){ret=curNode;break}append(children,curNode.childNodes);len=children.length}return ret};var SETTINGS={container:doc.getElementsByTagName("body")[0],template:['<div class="WPA3-SELECT-PANEL">','<div class="WPA3-SELECT-PANEL-TOP">','<a id="WPA3-SELECT-PANEL-CLOSE" href="javascript:;" class="WPA3-SELECT-PANEL-CLOSE"></a>',"</div>",'<div class="WPA3-SELECT-PANEL-MAIN">','<p class="WPA3-SELECT-PANEL-GUIDE">请选择发起聊天的方式：</p>','<div class="WPA3-SELECT-PANEL-SELECTS">','<a id="WPA3-SELECT-PANEL-AIO-CHAT" href="javascript:;" class="WPA3-SELECT-PANEL-CHAT WPA3-SELECT-PANEL-AIO-CHAT">','<span class="WPA3-SELECT-PANEL-QQ WPA3-SELECT-PANEL-QQ-AIO"></span>','<span class="WPA3-SELECT-PANEL-LABEL">QQ帐号聊天</span>',"</a>",'<a id="WPA3-SELECT-PANEL-ANONY-CHAT" href="javascript:;" class="WPA3-SELECT-PANEL-CHAT WPA3-SELECT-PANEL-ANONY-CHAT">','<span class="WPA3-SELECT-PANEL-QQ WPA3-SELECT-PANEL-QQ-ANONY"></span>','<span class="WPA3-SELECT-PANEL-LABEL">匿名聊天</span>',"</a>","</div>","</div>",'<div class="WPA3-SELECT-PANEL-BOTTOM">','<a target="_blank" href="http://im.qq.com" class="WPA3-SELECT-PANEL-INSTALL">安装QQ</a>',"</div>","</div>"].join(""),cssText:[".WPA3-SELECT-PANEL { z-index:2147483647; width:463px; height:292px; margin:0; padding:0; border:1px solid #d4d4d4; background-color:#fff; border-radius:5px; box-shadow:0 0 15px #d4d4d4;}",'.WPA3-SELECT-PANEL * { position:static; z-index:auto; top:auto; left:auto; right:auto; bottom:auto; width:auto; height:auto; max-height:auto; max-width:auto; min-height:0; min-width:0; margin:0; padding:0; border:0; clear:none; clip:auto; background:transparent; color:#333; cursor:auto; direction:ltr; filter:; float:none; font:normal normal normal 12px "Helvetica Neue", Arial, sans-serif; line-height:16px; letter-spacing:normal; list-style:none; marks:none; overflow:visible; page:auto; quotes:none; -o-set-link-source:none; size:auto; text-align:left; text-decoration:none; text-indent:0; text-overflow:clip; text-shadow:none; text-transform:none; vertical-align:baseline; visibility:visible; white-space:normal; word-spacing:normal; word-wrap:normal; -webkit-box-shadow:none; -moz-box-shadow:none; -ms-box-shadow:none; -o-box-shadow:none; box-shadow:none; -webkit-border-radius:0; -moz-border-radius:0; -ms-border-radius:0; -o-border-radius:0; border-radius:0; -webkit-opacity:1; -moz-opacity:1; -ms-opacity:1; -o-opacity:1; opacity:1; -webkit-outline:0; -moz-outline:0; -ms-outline:0; -o-outline:0; outline:0; -webkit-text-size-adjust:none; font-family:Microsoft YaHei,Simsun;}',".WPA3-SELECT-PANEL a { cursor:auto;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-TOP { height:25px;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CLOSE { float:right; display:block; width:47px; height:25px; background:url(http://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/SelectPanel-sprites.png) no-repeat;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CLOSE:hover { background-position:0 -25px;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-MAIN { padding:23px 20px 45px;}",'.WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-GUIDE { margin-bottom:42px; font-family:"Microsoft Yahei"; font-size:16px;}',".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-SELECTS { width:246px; height:111px; margin:0 auto;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CHAT { float:right; display:block; width:88px; height:111px; background:url(http://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/SelectPanel-sprites.png) no-repeat 0 -80px;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-CHAT:hover { background-position:-88px -80px;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-AIO-CHAT { float:left;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-QQ { display:block; width:76px; height:76px; margin:6px; background:url(http://combo.b.qq.com/crm/wpa/release/3.3/wpa/views/SelectPanel-sprites.png) no-repeat -50px 0;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-QQ-ANONY { background-position:-130px 0;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-LABEL { display:block; padding-top:10px; color:#00a2e6; text-align:center;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-BOTTOM { padding:0 20px; text-align:right;}",".WPA3-SELECT-PANEL .WPA3-SELECT-PANEL-INSTALL { color:#8e8e8e;}"].join(""),modal:true};Style.add("_WPA_SELECT_PANEL_STYLE",SETTINGS.cssText);var SelectPanel=function(opts){this.opts=extend({},opts,SETTINGS);this.render()};SelectPanel.prototype={render:function(){var panel=this,opts=this.opts,body=this.container=opts.container;var frag=doc.createElement("div"),frame;frag.innerHTML=opts.template;this.$el=frame=frag.firstChild;events.addEvent(findById(frame,"WPA3-SELECT-PANEL-CLOSE"),"click",function(){panel.remove();opts.onClose&&opts.onClose()});events.addEvent(findById(frame,"WPA3-SELECT-PANEL-AIO-CHAT"),"click",function(){panel.remove();opts.onAIOChat&&opts.onAIOChat()});events.addEvent(findById(frame,"WPA3-SELECT-PANEL-ANONY-CHAT"),"click",function(){panel.remove();opts.onAnonyChat&&opts.onAnonyChat()});(function(){try{body.appendChild(frame)}catch(e){setTimeout(arguments.callee,1);return}if(opts.modal){panel.renderModal()}panel.setCenter()})()},show:function(){this.css("display","block");this.modal&&css(this.modal,"display","block");return this},hide:function(){this.css("display","none");this.modal&&css(this.modal,"display","none");return this},remove:function(){this.$el.parentNode.removeChild(this.$el);this.modal&&this.modal.parentNode.removeChild(this.modal);return this},css:function(){var args=[this.$el].concat(Array.prototype.slice.call(arguments));return css.apply(this,args)},setCenter:function(){this.css({position:"absolute",top:"50%",left:"50%"});var styles={position:"fixed",marginLeft:"-"+this.outerWidth()/2+"px",marginTop:"-"+this.outerHeight()/2+"px"};var isQuirk=doc.compatMode==="BackCompat";if(browser.msie&&parseInt(browser.version,10)<7||isQuirk){styles.position="absolute";styles.marginTop=0;var top=styles.top=(offset.getClientHeight()-this.outerHeight())/2;setInterval(proxy(this.$el,function(){this.style.top=offset.getScrollTop()+top+"px"}),128)}this.css(styles)},renderModal:function(){var container=this.container,width=css(container,"width"),height=css(container,"height"),overflow=css(container,"overflow");var modalLayer=doc.createElement("div"),styles={position:"fixed",top:0,left:0,zIndex:2147483647,width:offset.getClientWidth()+"px",height:offset.getClientHeight()+"px",backgroundColor:"white",opacity:.1,filter:"alpha(opacity=10)"};var isQuirk=doc.compatMode==="BackCompat";if(browser.msie&&parseInt(browser.version,10)<7||isQuirk){styles.position="absolute";setInterval(proxy(modalLayer,function(){this.style.top=offset.getScrollTop()+"px"}),128)}css(modalLayer,styles);container.insertBefore(modalLayer,this.$el);this.modal=modalLayer;events.addEvent(window,"resize",proxy(modalLayer,function(){css(this,{width:offset.getClientWidth()+"px",height:offset.getClientHeight()+"px"})}))},outerWidth:function(){return this.$el.offsetWidth},outerHeight:function(){return this.$el.offsetHeight}};return SelectPanel});
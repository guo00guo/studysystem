/*!
 * mokit plugin - dialog v1.0
 * http://www.mokit.in/
 * 
 * Copyright 2012(c) mokit Project
 * Dual licensed under the MIT licenses.
 * http://www.mokit.in/license
 */
;"use strict";
(function(win,undefined){
    var mk=mokit, $=jQuery, doc=document, buttons={}, actived=0, timer, dlgUI, _singleton,
        DEF_CLASS='mk-dialog', DEF_COMFIRM_TXT = '确定', DEF_CANCEL_TXT = '关闭', EVENT_NS='.mkdlg', EVENT_ESC = 'keydown.mkdlg', EVENT_RESIZE='resize.mkdlg';

    function initConfig(config){
        mk.extend(
            config,
            {
                title : '',
                content : '',
                btnConfirm : null,
                btnCancel : null,
                btnConfirmTxt : DEF_COMFIRM_TXT,
                btnCancelTxt : DEF_CANCEL_TXT,
                button : null,

                width : 'auto',
                height : 'auto',

                fixed : 1,
                follow : null,

                lock : 0,
                cls : null,
                showCancel:0,

                id : '',
                onInit : null,
                onBeforeClose : null,
                onAfterClose : null,
                time : 0,
                esc : true
            }
        );
    }
    function dialog(){
        var args = arguments, defConfig={};
        initConfig(defConfig);
        if(typeof args[0] !== 'object'){
            mk.extend(defConfig,{
                content : args[0],
                btnConfirm : args[1],
                btnCancel : args[2],
                onAfterClose : args[3]
            });
            defConfig.button = [
                {
                    value: defConfig.btnConfirmTxt || DEF_COMFIRM_TXT,
                    callback: defConfig.btnConfirm
                },
                {
                    value: defConfig.btnCancelTxt || DEF_CANCEL_TXT,
                    callback: defConfig.btnCancel
                }
            ];
        }else{
            mk.extend(defConfig,args[0]);
        }
        return _singleton ? _singleton.constructor(defConfig) : (_singleton = new dialog.fn.constructor(defConfig));
    };
    dialog.fn = dialog.prototype = {
        constructor:function(config){
            this.config = config;
            this._teardown();
            !dlgUI && this._initUI();
            dlgUI.main.attr('class',DEF_CLASS);
            dlgUI.main.off(mk.event.TAP).on(mk.event.TAP,'button',$.proxy(this._addEvent,this));
            config.esc && $(doc).on(EVENT_ESC,$.proxy(this._esc,this));
            $(win).on(EVENT_RESIZE,$.proxy(this._position,this));
            config.cls && dlgUI.main.addClass(config.cls);
            config.lock && this.lock();
            this.width(config.width)
                .height(config.height)
                .title(config.title)
                .content(config.content)
                .button(config.button)
                .time(config.time)
                .show();
            config.onInit && config.onInit.apply(this);
            return this;
        },
        title:function(){
            var arg = arguments[0];
            arg && dlgUI.title.html(arg);
            return this;
        },
        content:function(){
            var arg = arguments[0];
            arg && dlgUI.content.html(arg);
            return this;
        },
        width:function(){
            var arg = arguments[0];
            arg && dlgUI.main.css('width', arg);
            return this;
        },
        height:function(){
            var arg = arguments[0];
            arg && dlgUI.content.css('height',arg);
            return this;
        },
        follow:function(){
            
        },
        lock:function(){
            mk.ui.mask && mk.ui.mask();
            return this;
        },
        unlock:function(){
            mk.ui.mask && mk.ui.mask.hide();
            return this;
        },
        time:function(sec,fn){
            var self=this;
            sec && sec>0 && (timer=setTimeout(function(){self.close();fn&&fn();},sec));
            return this;
        },
        cls:function(cls){
            dlgUI.main.attr('class',DEF_CLASS).addClass(cls);
            return this;
        },
        button:function(btns){
            var self=this, frm=doc.createDocumentFragment(), btn, isNew;
            if(!btns && !self.config.showCancel){return this;}
            btns && $.each(btns,function(i,config){
                btn = buttons[config.id || config.value];
                isNew = !btn;
                if(!btn){
                    btn = $('<button>',{
                        id : config.id,
                        type : 'button',
                        'class' : 'mk-dialog-btn'
                    });
                    buttons[config.id || config.value] = btn;
                }
                config.cls && btn.addClass(config.cls);
                btn.attr('disabled',config.disabled);
                btn.text(config.value);
                config.callback && (buttons[config.id || config.value].callback = config.callback);
                isNew && frm.appendChild(btn[0]);
            });
            if(self.config.showCancel){
                btn = buttons['mk-dialog-cancel'];
                isNew = !btn;
                if(!btn){
                    btn = $('<button>',{
                        'id':'mk-dialog-cancel',
                        'type':'button',
                        'class':'mk-dialog-cancel',
                        'text':DEF_CANCEL_TXT
                    });
                    buttons['mk-dialog-cancel'] = btn;
                }
                frm.appendChild(btn[0]);
            }
            frm.firstChild && dlgUI.footer.html(frm) && dlgUI.footer.show();
            return this;
        },
        show:function(){
            dlgUI.main.show();
            return this._position();
        },
        close:function(){
            var config = this.config;
            if(!config.onBeforeClose || config.onBeforeClose.apply(this) !== false){
                this._teardown();
                config.onAfterClose && config.onAfterClose.apply(this);
            }
            return this;
        },
        onBeforeClose:function(fn){
            this.config.onBeforeClose = fn;
            return this;
        },
        onAfterClose:function(fn){
            this.config.onAfterClose = fn;
            return this;
        },
        setPos:function(){
            var layout = dlgUI.main, isFixed=!mk.isIE6 && !mk.isTouchDevice, scrollTop=0,
                dw=$(doc).width(), dh=doc.documentElement.clientHeight, w=layout.width(), h=layout.height();
            !isFixed && (scrollTop = $(doc).scrollTop());
            layout.css({'left':(dw-w)/2,'top':scrollTop + (dh-h)/3});
            return this;
        },
        _position:function(){
            var self=this, layout = dlgUI.main, config = this.config, isFixed=!mk.isIE6 && !mk.isTouchDevice, fixTimer;
            layout.css('position','absolute');
            if(config.fixed){
                if(isFixed){
                    layout.css('position','fixed');
                }else{
                    $('html').css({'background-image':'url(about:blank)','background-attachment':'fixed'});
                    $(win).on('scroll.mkdlg resize.mkdlg',function(){
                        self.setPos();
                    });
                }
            };
            this.setPos();
            return this;
        },
        _esc:function(event){
            (event.keyCode === 27) && this.close();
            return this;
        },
        _teardown:function(){
            clearTimeout(timer);
            buttons={};
            dlgUI && dlgUI.main.hide() && dlgUI.footer.html('');
            $(doc).off(EVENT_NS);
            $(win).off(EVENT_NS);
            this.unlock();
            return this;
        },
        _addEvent:function(e){
            var tar = e.target, fn = buttons[tar.id || tar.innerHTML].callback;
            if(!fn || fn.apply(this) !== false){
                this.close.apply(this);
            }
        },
        _initUI:function(){
            //Initailize dialog UI
            dlgUI={};
            dlgUI.main = $(
                '<div>' +
                    '<div class="mk-dialog-header">' +
                        '<div class="mk-dialog-title"></div>' +
                        '<a href="javascript:;" target="_self" class="mk-dialog-close">×</a>' +
                    '</div>' +
                    '<div class="mk-dialog-main">' +
                        '<div class="mk-dialog-content"></div>' +
                    '</div>' +
                    '<div class="mk-dialog-footer"></div>' +
                '</div>'
            ).hide();
            dlgUI.title=$('.mk-dialog-title',dlgUI.main);
            dlgUI.content=$('.mk-dialog-content',dlgUI.main);
            dlgUI.footer=$('.mk-dialog-footer',dlgUI.main);
            dlgUI.close=$('.mk-dialog-close',dlgUI.main);
            dlgUI.close.on(mk.event.TAP,$.proxy(this.close,this));
            $('body').append(dlgUI.main);
            dlgUI.footer.hide();
        }
    }
    dialog.fn.constructor.prototype = dialog.fn;

    mk.extend(mk.ui,{dialog:dialog});
})(window);
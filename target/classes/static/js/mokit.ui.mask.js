/*!
 * mokit plugin - mask v1.0
 * http://www.mokit.in/
 * 
 * Copyright 2012(c) mokit Project
 * Dual licensed under the MIT licenses.
 * http://www.mokit.in/license
 */
"use strict";
(function(win,undefined){
	var mk=mokit, doc=document, maskUI, _singleton,defConfig={};
	function mask(opts){
		var args = arguments;
		$.extend(defConfig,{zIndex:9, opacity:0.7, background:'#000'});
		return _singleton ? _singleton.constructor(defConfig) : (_singleton = new mask.fn.constructor(defConfig));
	}
	mask.hide = function(){
		$(win).off('resize.mask',mask.resize);
		maskUI && maskUI.hide();
	}
	mask.resize = function(){
		maskUI.width($(win).width()).height($(doc).height());
	}
	mask.fn = mask.prototype = {
		constructor:function(c){
			!maskUI && this._initUI();
			this._setConfig(c);
			maskUI.show();
			return this;
		},
		_setConfig:function(c){
			maskUI.css(c);
		},
		_initUI:function(){
			var isFixed=!mk.isIE6;
			maskUI = $('<div>').css({position:'fixed', top:0, left:0,bottom:0,right:0});
			if(!isFixed){
				maskUI.css('position','absolute');
				mask.resize();
				$(win).on('resize.mask',mask.resize);
			}
			$('body').append(maskUI);
		}
	};
	mask.fn.constructor.prototype = mask.fn;
	
	mk.extend(mk.ui,{mask:mask});
})(window);
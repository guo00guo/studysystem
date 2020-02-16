/*!
 * mokit plugin - template v1.0
 * http://www.mokit.in/
 * 
 * Copyright 2012(c) mokit Project
 * Dual licensed under the MIT licenses.
 * http://www.mokit.in/license
 */
"use strict";
(function(win,undefined){
	var tmplCaches = {},
		dictDecode = { "quot": '"', "lt": "<", "gt": ">", "amp": "&", "nbsp": " " },
		dictEncode = { '"': "quot", "<": "lt", ">": "gt", "&": "amp", " ": "nbsp" };
 
	/**
	 * HTML解码
	 * @param {String} html
	 */
	function htmlDecode(html) {
		return String(html).replace(/&(quot|lt|gt|amp|nbsp);/ig, function(all, key) {
			return dictDecode[key];
		});
	}
 
	/**
	 * HTML编码
	 * @param {String} html 
	 */
	function htmlEncode(html) {
		return String(html).replace(/["<>& ]/g, function(all) {
			return "&" + dictEncode[all] + ";";
		});
	}
 
	/**
	 * 模板解析函数
	 * @param {String} templating 模板字符
	 */
	function analyze(templating){
		var _temp =templating.replace(/<#([\s\S]*?)#>/g,function(s){
			return s.replace(/(\'|\\)/g,'\\$1')
					.replace(/[\r\n]/g,' ')
					.replace('<#',"_s.push('")
					.replace('#>',"');")
					.replace(/{\$([\s\S]*?)\$}/g,'\',$1,\'');
		});
		return new Function('var _s=[];' + _temp + ';return _s');
 
	}
 
	/**
	 * 模板注册函数
	 * @param {String} id 模板字符
	 * @param {String} data 模板字符
	 */
	function register(id,data){
		var tar,txt;
		if(!id) return '';
		if(typeof id === 'object' && id.tagName){
			tar = id ;
			id = tar.getAttribute('id');
		}else{
			tar = document.getElementById(id);
		}
		txt = !tar ? id : tar.innerHTML;
		if(!tmplCaches[id]){
			tmplCaches[id] = analyze(txt);
		}
		return tmplCaches[id].apply(data).join('');
	}
 
	/**
	 * 功能主调方法
	 * @param {String / Object} id 字符或dom对象
	 * @param {ALL} json 模板主要数据,任何数据类型都可以,模板使用this获取数据
	 */
	function tpl(id,json){
		return register.apply(this,[id,json || '']);
	}
	/**
	 * 辅助方法
	 */
	tpl.htmlEncode = htmlEncode;
	tpl.htmlDecode = htmlDecode;
	mokit.extend({tpl:tpl});
})(window);

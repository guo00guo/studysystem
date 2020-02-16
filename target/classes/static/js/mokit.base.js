/*!
 * mokit Library v1.0
 * http://www.mokit.in/
 * 
 * Copyright 2012(c) mokit Project
 * Dual licensed under the MIT licenses.
 * http://www.mokit.in/license
 */
"use strict";
(function (win, undefined) {
    var doc = document, scripts = doc.getElementsByTagName('script'),
		mokit = window.mokit = function () {
		    return new mokit.fn.constructor();
		};
    !window.mk && (window.mk = mokit);
    mokit.fn = mokit.prototype = {
        constructor: function () {
            return this;
        }
    };
    mokit.fn.constructor.prototype = mokit.fn;

    function getScriptAbsoluteSrc(node) {
        return node.hasAttribute ? node.src : node.getAttribute('src', 4);
    }

    mokit.extend = mokit.fn.extend = function () {
        var args = arguments, extTar = args.length > 1 ? args[0] : this,
			options = args[1] || args[0] || {};
        for (var name in options) {
            extTar[name] = options[name];
        };
        return extTar;
    };

    mokit.extend({
        version: '1.0',
        ui: {},
        isTouchDevice: ('ontouchstart' in win),
        isIE6: !-[1, ] && !window.XMLHttpRequest,
        //File's location is relative to baseURI, default to mokit.base.js file location
        //If set it to empty, will relative to current page.
        baseURI: getScriptAbsoluteSrc(scripts[scripts.length - 1]).match(/http[s]?:\/\/.*\//ig),
        log: function () { (typeof console !== undefined) && console.log(arguments); }
    });
})(window);

(function (win, undefined) {
    var config = { modes: {} }, loadedList = {}, loading = {}, doc = document;
    function require(config, urls, deps, callback) {
        var args = [].slice.call(arguments), fn, before;
        if (typeof args[args.length - 1] === 'function')
            fn = args.pop();
        if (typeof args[args.length - 1] === 'function')
            before = args.pop();
        before && before();
        if ((args.length === 0) && fn) {
            fn();
        } else {
            setup(args, function () { fn && fn(); });
        }
        return this;
    };
    require.add = function () {
        var args = [].slice.call(arguments), i = 0, o;
        for (; o = args[i++];) {
            if (!o['url'] || !o['name']) {
                mokit.log(o);
                throw Error('ERROR:faile to map arguments');
            }
            (config['modes'][o.name] = o);
        }
        return this;
    };
    function setup(args, callback) {
        var mode, o,
			i = 0, len = args.length,
			loaded = function () {
			    !--len && callback();
			};
        for (; o = args[i++];) {
            mode = getMode(o);
            if (loadedList[mode.name]) {
                loaded();
                continue;
            }
            if (mode['requires']) {
                setup(mode['requires'], (function (m) { return function () { fileLoader(m, loaded); } })(mode));
            } else
                fileLoader(mode, loaded);
        }
    };
    function fileLoader(mode, callback) {
        var type = getType(mode['url']),
			fn = { 'js': scriptLoader, 'css': cssLoader };
        if (loading[mode['name']]) {
            setTimeout(function () { fileLoader(mode, callback); }, 20);
            return;
        }
        if (loadedList[mode.name]) {
            callback();
            return;
        }
        loading[mode['name']] = 1;
        fn[type] && fn[type](mode, callback);
    }
    function scriptLoader(mode, callback) {
        var url = getUrl(mode),
			head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement,
			script = doc.createElement('script');
        script.async = "async";
        script.charset = mode.charset || 'utf-8';
        script.onload = script.onreadystatechange = script.onerror = function () {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                script.onload = script.onreadystatechange = script.onerror = null;
                script = undefined;
                loading[mode['name']] = 0;
                loadedList[mode['name']] = 1;
                callback && callback();
            }
        };
        script.src = url;
        head.insertBefore(script, head.firstChild);
    };
    function cssLoader(mode, callback) {
        var url = getUrl(mode), img,
			head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement,
			link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        if (link.attachEvent) {
            link.attachEvent('onload', callback);
        } else {
            cssPoll(link, callback, mode['name']);
        }
        head.insertBefore(link, head.firstChild);
    };
    function cssPoll(node, callback, name) {
        var sheet = doc.styleSheets, i = 0, m, owner;
        for (; m = sheet[i++];) {
            owner = m.ownerNode ? m.ownerNode : m.owningElement;
            if (owner && (owner == node)) {
                loading[name] = 0;
                loadedList[name] = 1;
                callback();
                return;
            }
        }
        setTimeout(function () { cssPoll(node, callback, name) }, 1);
    }
    function getMode(m) {
        var modes = config['modes'], mode;
        if (typeof m === 'string') {
            mode = modes[m] ? modes[m] : { name: m, url: m };
        } else {
            mode = m;
            !mode['name'] && (mode['name'] = mode['url']);
        }
        if (!/css|js/ig.test(getType(mode.url))) {
            mokit.log(mode);
            throw Error('ERROR:failed to map the arguments');
        }
        return mode;
    };
    function getType(url) {
        return (url.indexOf('.') > -1) && url ? url.split('.').pop().replace(/[#|\?].*$/ig, '') : '';
    };
    function getUrl(mode) {
        var url = mode['url'];
        return mode['url'].indexOf('http') === 0 ? mode['url'] : (url.indexOf('$') === 0 ? url.replace(/^\$/, '') : (mokit.baseURI + url));
    };
    mokit.extend({ require: require });
})(window);
BizQQWPA.define("util.sessionStorage","util.localStorage,util.cookie",function(require){var localStorage=require("util.localStorage"),cookie=require("util.cookie");var SESSION_STORAGE_PRE="IESESSION";var getAliveStatus=function(){return!!cookie.get(SESSION_STORAGE_PRE)},setAliveStatus=function(value){cookie.set(SESSION_STORAGE_PRE,value,null,"/")},clear=function(){var pattern=new RegExp("^"+SESSION_STORAGE_PRE+"[\\S]+$"),queue=[];for(var i=0;i<localStorage.length;i++){if(localStorage.key(i).match(pattern)){queue.push(localStorage.key(i))}}while(queue.length){localStorage.removeItem(queue[0]);queue.shift()}};if(!getAliveStatus()){setAliveStatus("alive");clear()}return{setItem:function(key,value){localStorage.setItem(SESSION_STORAGE_PRE+key,value)},getItem:function(key){return localStorage.getItem(SESSION_STORAGE_PRE+key)},removeItem:function(key){localStorage.removeItem(SESSION_STORAGE_PRE+key)},clear:clear}});
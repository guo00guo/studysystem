BizQQWPA.define("util.onLoad","util.events",function(require){var events=require("events");return onLoad=function(fn,context){context=context||window;if(/loaded|complete|undefined/.test(context.document.readyState)){fn()}else{events.addEvent(context,"load",fn)}return context}});
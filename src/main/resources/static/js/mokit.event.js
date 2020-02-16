/*!
 * mokit event extension v1.0
 * http://www.mokit.in/
 * 
 * Copyright 2012(c) mokit Project
 * Dual licensed under the MIT licenses.
 * http://www.mokit.in/license
 */
"use strict";
(function(win,undefined){
	!mokit.event && mokit.extend({event:{}});
	var mk=mokit, $=jQuery, $event=$.event;
	mokit.extend({
		getNativeEvent : function(event){
			while (event && event.originalEvent!==undefined) {
				event = event.originalEvent;
			}
			return event;
		}
	});
	//Need to pay attention to 'tap event' and 'leave event' in proper order for touch device
	mokit.extend(mokit.event,
		!mk.isTouchDevice?
		{
			TOUCH_START : 'mousedown',
			TOUCH_END : 'mouseup',
			TOUCH_MOVE : 'mousemove',
			TOUCH_LEAVE : 'mouseleave',
			TAP : 'click',
			TAP_HOLD:'taphold'
		}:
		{
			TOUCH_START : 'touchstart',
			TOUCH_END : 'touchend',
			TOUCH_MOVE : 'touchmove',
			TOUCH_LEAVE : 'touchend',
			TAP : 'tap',
			TAP_HOLD:'taphold'
		}
	);
	//Handles tap and taphold for touch device
	$event.special.tap = {
		latency : 0,
		isMoved : 0,
		timer : null,
		setup: function() {
			$event.add(this,'touchstart',$event.special.tap._touchStart);
			$event.add(this,'touchend',$event.special.tap._touchEnd);
			$event.add(this,'touchmove',$event.special.tap._touchMove);
		},
		teardown:function(){
			$event.remove(this,'touchstart',$event.special.tap._touchStart);
			$event.remove(this,'touchend',$event.special.tap._touchEnd);
			$event.add(this,'touchmove',$event.special.tap._touchMove);
		},
		_touchStart:function(e){
			e.preventDefault();
			var self = this,evt=e;
			$event.special.tap.latency = +(new Date());
			$event.special.tap.isMoved = 0;
			$event.special.tap.timer = setTimeout(function(){
				!$event.special.tap.isMoved && (evt.type = 'taphold') && $event.handle.call(self, evt);
				evt = null;
			},800);
		},
		_touchEnd:function(e){
			e.preventDefault();
			clearTimeout($event.special.tap.timer);
			if(!$event.special.tap.isMoved && (+(new Date()) - $event.special.tap.latency) <= 180 ){
				e.type = 'tap';
				$event.handle.apply(this, arguments); 
			}
		},
		_touchMove:function(e){
			$event.special.tap.isMoved=1;
		}
	};
	$.fn.tap = function(callback){return this.on('tap',callback);}
	$.fn.taphold = function(callback){return this.on('taphold',callback);}
})(window);
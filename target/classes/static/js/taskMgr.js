BizQQWPA.define("util.taskMgr","util.proxy",function(require){var TASK_RUN="run",TASK_PAUSE="pause",TASK_DROP="drop",LOOP_TIME=50;var proxy=require("proxy");var TM=function(){this.circle=[];this.pos=0;setInterval(proxy(this,this.loop),16)};TM.prototype={newTask:function(fn,gap){var t=new Task(fn,gap);this.circle.push(t);return t},once:function(fn,gap){return this.newTask(function(){fn.apply(this);this.drop()},gap)},loop:function(){var c=this.circle,pos=this.pos,count=c.length,start=+new Date,loopTime=LOOP_TIME,t=c[pos];while(count>0&&+new Date-start<loopTime){if(t.isRunning()){t.execute()}else if(t.isDropped()){c.splice(pos,1);pos--}pos=(pos+1)%c.length;t=c[pos];count--}this.pos=pos}};var Task=function(fn,gap){this.fn=fn;this.gap=gap;this.status=TASK_PAUSE;this.lastExecTime=+new Date};Task.prototype={run:function(){this.status=TASK_RUN;return this},pause:function(){this.status=TASK_PAUSE;return this},drop:function(){this.status=TASK_DROP;return this},execute:function(){if(+new Date-this.lastExecTime<this.gap){return false}this.fn();this.lastExecTime=+new Date;return true},getGap:function(){return this.gap},setGap:function(newGap){this.gap=newGap;return this},isRunning:function(){return this.status===TASK_RUN},isPaused:function(){return this.status===TASK_PAUSE},isDropped:function(){return this.status===TASK_DROP}};return new TM});
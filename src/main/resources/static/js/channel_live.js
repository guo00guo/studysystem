/* scroll load */

$(function () {

	//轮播类初始化
	if(typeof XstSlide != 'undefined'){
		var $xstSlide = $('.xst-slide');
		$xstSlide.each(function(){
			new XstSlide({wrap : $(this), countdown : 5});
		});
	}

});

//轮播类
function XstSlide(o){
	this.$wrap = o.wrap || $('#xst_slide');

	this.current = o.current || 0;
	this.countdown = o.countdown || 0;
	this.isDelay = o.isDdelay || 1;
	this.direction = 1;
	this.speed = o.speed || 500;
	this.timer = o.timer || 0;
	this.init();
}

XstSlide.prototype.init = function(){
	this.$nav = this.$wrap.find('.nav');
	this.$navLi = this.$nav.find('li');
	this.$list = this.$wrap.find('.list');
	this.$li = this.$list.find('li');
	this.liNum = this.$li.length;
	this.wrapWidth = this.$wrap.width();
	this.$prev = this.$wrap.find('.prev');
	this.$next = this.$wrap.find('.next');
	if(this.$li.length <= 1){
		this.$nav.addClass('hide');
		this.$prev.addClass('hide');
		this.$next.addClass('hide');
	}else{
		var $first = this.$li.eq(0).clone(), $last = this.$li.eq(this.liNum - 1).clone();
		this.$list.append($first).prepend($last);
	}

	this.reset().bind();
	return this;
};

XstSlide.prototype.reset = function(){

	this.$li = this.$list.find('li');
	this.liNum = this.$li.length;
	this.wrapWidth = this.$wrap.width();
	if(this.wrapWidth && this.liNum){
		this.$li.width(this.wrapWidth);
		this.$list.width(this.wrapWidth * this.liNum);
		if(this.$li.length <= 1){
			return this;
		}
		this.current = 1;
		this.$list.css({'left' : - this.wrapWidth});
	}else{
		debug('error');
		return false;
	}
	this.setStatus();
	return this;
};

XstSlide.prototype.bind = function(){
	var that = this;

	$(window).resize(function(){
		that.reset();
	});

	if(this.$li.length <= 1){
		return this;
	}

	if(this.$navLi.length > 0){
		this.$navLi.click(function(){
			var $this = $(this);
			if($this.hasClass('active')) return;
			var index = $this.index();
			that.current = index + 1;
			that.slideTo();
		});
	}

	this.$prev.click(function(e){
		e.preventDefault();
		that.current--;
		that.slideTo();
	});

	this.$next.click(function(e){
		e.preventDefault();
		that.current++;
		that.slideTo();
	});

	//设置间隔X秒自动滑动
	if(this.countdown){
		this.autoSlide();
	}

	//鼠标进入清除，移出设置自动滑动
	this.mouseHover(this.$wrap).mouseHover(this.$nav).mouseHover(this.$prev).mouseHover(this.$next);

	return this;
};

XstSlide.prototype.slideTo = function(x){
	var that = this;
	this.setStatus();
	var left = this.current * this.wrapWidth;
	this.$list.stop().animate({'left' : - left}, this.speed);
	return this;
};

XstSlide.prototype.setStatus = function(){
	var left, index, exit;
	if(this.current < 0){
		this.current = this.liNum - 2;
		left = this.wrapWidth * this.current;
		this.current--;
		index = this.current;
	}else if(this.current > this.liNum - 1){
		this.current = 1;
		left = this.wrapWidth * this.current;
		this.current++;
		index = this.current;
	}else{
		index = this.current;
		if(this.current == 0){
			index = this.liNum - 2;
		}else if(this.current == this.liNum - 1){
			index = 1;
		}
		exit = true;
	}
	if(this.isDelay){
		this.delayLoad(index);
		if(index == this.liNum - 2){
			this.delayLoad(0);
		}
	}

	if(this.$navLi.length > 0){
		var $current = this.$navLi.eq(index - 1);
		this.$navLi.removeClass('active');
		if($current.length > 0){
			$current.addClass('active');
		}
	}
	if(exit){
		return this;
	}
	this.$list.css({'left' : - left});
	return this;
};

XstSlide.prototype.autoSlide = function(){
	var that = this;
	clearInterval(this.timer);
	this.timer = setInterval(function(){
		that.direction ? that.current++ : that.current--;
		that.slideTo();
	}, this.countdown * 1000);
	return this;
};

XstSlide.prototype.mouseHover = function(t){
	var that = this;
	t.mouseover(function(e){
		e.stopPropagation();
		clearInterval(that.timer);
	}).mouseout(function(e){
		e.stopPropagation();
		that.autoSlide();
	});
	return this;
};

//延迟加载指定图片
XstSlide.prototype.delayLoad = function(index){
	if(typeof index != 'undefined'){
		var $item = this.$list.find('.item').eq(index);
		if($item.length > 0){
			var $img = $item.find('img'), url = $img.attr('data-url');
			if(url){
				if($img.hasClass('bg')){
					$img.css('background-image', 'url(' + url +')');
				}else{
					$img.attr('src', url);
				}
				$img.removeAttr('data-url');
			}
		}
	}
	var $all = this.$list.find('*[data-url]');
	if(!$all.length){
		this.isDelay = 0;
	}
	return this;
};

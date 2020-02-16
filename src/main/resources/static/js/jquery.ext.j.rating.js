/*****************
author: j
date: 2014-12-20
******************/
; (function ($) {
	$.fn.rating = function(options){
		var settings =
		{
			score: 2,
			totalScore: 10,
			postUrl: "",
			queryUrl: "",
			isPosting: false,
			allowRate: true,
			afterRate: null
		}
		var $this = $(this);
		if(options != null){
			delete options.posting;
			delete options.defaultRating;
			if(options.score != null && !$.isNumeric(options.score)) delete options.score;
			if(options.totalScore != null && !$.isNumeric(options.totalScore)) delete options.totalScore;
			if(options.score != null && options.totalScore != null && options.totalscore < options.score){
				delete options.score;
				delete options.totalscore;
			}
		}
		if($this.attr("data-score") && $.isNumeric($this.attr("data-score"))){
			settings.defaultRating = $this.attr("data-score");
		}
		else{
			settings.defaultRating = 0;
		}
		$.extend(settings, options);
		$this.html();

		var html = "";
		for(var i = 1; i <= Math.floor(settings.totalScore / settings.score); i++){
			html += "<li style='";
			html += settings.allowRate ? "cursor:pointer;" : "";
			html += "background: url(images/star.png) no-repeat;list-style:none;padding:0;margin-right:4px;float:left;display:block;width:19px;height:19px;'";
			html += " data-score='" + i * settings.score + "'></li>";
		}

		var iClear;
		$this.append(html).css("list-style", "none")
		.find("li")
		.click(function(){
			if(!settings.allowRate) return false;
			//event.stopPropagation();
			settings.defaultRating = $(this).attr("data-score");
			$this.attr("data-score", settings.defaultRating);

			if(!settings.isPosting && settings.postUrl && settings.postUrl !== ""){
				$.ajax({ url: settings.postUrl + settings.defaultRating,
						success: function(){
							if(settings.queryUrl && settings.queryUrl !== ""){
								$.ajax({ url: settings.queryUrl,
										success: function(text){
											if($.isNumeric(text)){
												settings.defaultRating = text;
												defaultRating();
											}
										}
								});
							}
							if($.isFunction(settings.afterRate)) settings.afterRate.call($this, settings.defaultRating);
						}
				});
			}
		})
		.mouseover(function(e){
			if(!settings.allowRate) return false;
			clearTimeout(iClear);
			$(this).css('background-position','0px -28px').prevAll().css('background-position','0px -28px').end().nextAll().css('background-position','0px 0px');
		})
		.mouseout(function(){
			if(!settings.allowRate) return false;
			clearTimeout(iClear);
			iClear = setTimeout(defaultRating, 100);
		})
		;
		function defaultRating(){
			settings.defaultRating = Math.floor(settings.defaultRating);
			//console.log(settings.defaultRating);
			if(settings.defaultRating % settings.score != 0){
				settings.defaultRating += settings.score - (settings.defaultRating % settings.score)
			}
			//console.log(settings.defaultRating);
			settings.defaultRating = settings.defaultRating > settings.totalScore ? settins.totalScore : settings.defaultRating;
			//console.log(settings.defaultRating);
			if(settings.defaultRating > 0)
			{
				var $li = $this.find("li[data-score='" + settings.defaultRating + "']:eq(0)");
				$li.css('background-position','0px -28px').prevAll().css('background-position','0px -28px').end().nextAll().css('background-position','0px 0px');
			}
			else{
				$this.find("li").css('background-position','0px 0px');
			}
		}
		defaultRating();
		return this;
	}
})(jQuery);
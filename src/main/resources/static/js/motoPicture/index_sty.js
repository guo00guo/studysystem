// JavaScript Document
$(function(){
	$('.leftBg').show().addClass('animated fadeInLeft');//添加蓝色背景
	$('.rightBg').show().addClass('animated fadeInRight');//添加黄色背景
	setTimeout(function(){
		$('.leftBg').removeClass('fadeInLeft');//移除蓝色背景
		$('.rightBg').removeClass('fadeInRight');//移除黄色背景
		$('.logo a img').show().addClass('animated bounceInDown');//添加logo
		setTimeout(function(){
			$('.logo a img').removeClass('bounceInDown');//移除logo
			$('.big_word img').show().addClass('animated flip');//添加大企业大能量
			setTimeout(function(){
				$('.big_word img').removeClass('flip');//移除大企业大能量
				$('.btnbg').show().addClass('animated rotateIn');//添加 HR抢人才背景
				$('.peo').show().addClass('animated bounceIn');//添加挑工作背景
				$('.btnbg_rf').show().addClass('animated lightSpeedIn');//添加求职者背景
				/////////////两个箭头		
				setInterval(function(){
					$('.btn_arow,.btnWord,.btn_arow_rf,.btnWord_rf').show().addClass('animated tada');//HR抢人才箭头,HR抢人才
					setTimeout(function(){
						$('.btn_arow,.btnWord,.btn_arow_rf,.btnWord_rf').removeClass('tada');
						},3000);
				}, 1000*2);
				///////////////	
				setTimeout(function(){
					$('.btnbg').removeClass('rotateIn');//移除 HR抢人才背景
					$('.btnbg_rf').removeClass('lightSpeedIn');//移除求职者背景
					$('.btnWord').show().addClass('animated rotateInDownLeft');//添加 HR抢人才
					$('.btnWord_rf').show().addClass('animated flipInY');//添加求职者
					$('.work').show().addClass('animated lightSpeedIn');//添加挑工作
					setTimeout(function(){
						$('.btnWord').removeClass('rotateInDownLeft');//移除 HR抢人才
						$('.btnWord_rf').removeClass('flipInY');//移除求职者
						$('.work').removeClass('lightSpeedIn');//移除挑工作
						setTimeout(function(){
							$('.house').show().addClass('animated swing');//添加小房子
							$('.big_word_rf img').show().addClass('animated rotateInUpRight');//添加小白领，大作为
							setTimeout(function(){
								$('.house').removeClass('swing');//移除小房子
								$('.big_word_rf img').removeClass('rotateInUpRight');//移除小白领，大作为
								},1000);
							},1000);
						},1000);
					},1000);
				},1000);
			},1000);
	},1000);
})


// JavaScript Document

(function(){
	$(document).ready(function() {
		$("#all_cat").click(function(){
			$(".category_v2 .ul_01").show();
			$(".category_v2 .ul_02").hide();
			$(".category_v2 dl").hide();
			$("#all_gw").addClass("no");
			$("#all_cat").css("border-bottom","none");
			$("#all_cat").removeClass("no");
			$("#all_gw").css("border-top","1px solid #ddd");
			$("#all_gw").css("height","auto");
		});
		$("#all_gw").click(function(){
			$(".category_v2 .ul_01").hide();
			$(".category_v2 .ul_02").show();
			$(".category_v2 #dl_01").show();
			$("#all_cat").addClass("no");
			$("#all_gw").css("border-top","none");
			$("#all_cat").css("border-top","none");
			$("#all_gw").removeClass("no");
			$("#all_cat").css("border-bottom","1px solid #ddd");
			//$("#all_gw").css("height","107px");
		});
		
		$(".category_v2 .ul_02 a").mousemove(function(){
			id=$(this).attr('id');
			$(".category_v2 .ul_02 a").removeClass("now");
			$(this).addClass("now");
			$(".category_v2 dl").hide();
			$(".category_v2 #dl_"+id+"").show();
		});

	});
})();


function orderField(a1,a2,a3,a4) {
    window.location = "/college/list-" + a1 + "-" + a2 + "-" + a3 + "-" + a4;
}
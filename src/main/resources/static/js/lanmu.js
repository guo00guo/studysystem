$(function(){
	var id=$("#shubusgu").val();
	var id1=$("#gangwei").val();
	var id2=$("#player").val();
	if(id){document.getElementById("shubusgu"+id).className="biabianbian";}
	if(id1){document.getElementById("gw"+id1).className="biabianbian";}
	if(id2){document.getElementById("player"+id2).className="biabianbian";}
});
$(function(){
	var a = $('#showpfs').val();
	for (var i=1;i<=a;i++){
		document.getElementById('on'+i).className="on";
	}
})
var http_request = false;
//Ã·Ωª¡Ù—‘
function makeRequestr(url, functionName, httpType, sendData) {
	var text=document.getElementById('qacontent').value;
	if(!text){
		alert("«ÎÃÓ–¥ƒ⁄»›");
		return false;
	}
	http_request = false;
	if (!httpType) httpType = "GET";

	if (window.XMLHttpRequest) { // Non-IE...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/plain');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {} 
		}
	}

	if (!http_request) {
		alert('Cannot send an XMLHTTP request');
		return false;
	}

	var changefunc="http_request.onreadystatechange = "+functionName;
	eval (changefunc);
	//http_request.onreadystatechange = alertContents;
	http_request.open(httpType, url+"&content="+text, true);
	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(sendData);
	window.location.reload();
}
function makeRequests(url, functionName, httpType, sendData) {
	var text=document.getElementById('touser').value;
	if(!text){
		alert("«ÎÃÓ–¥ƒ⁄»›");
		return;
	}
	http_request = false;
	if (!httpType) httpType = "GET";

	if (window.XMLHttpRequest) { // Non-IE...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/plain');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Cannot send an XMLHTTP request');
		return;
	}

	var changefunc="http_request.onreadystatechange = "+functionName;
	eval (changefunc);
	//http_request.onreadystatechange = alertContents;
	http_request.open(httpType, url+"&content="+ text, true);
	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(sendData);
}
function getReturnedText () {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var messagereturn = http_request.responseText;
			return messagereturn;
		} else {
			//alert('There was a problem with the request.');
		}
	}
}

function EchoReturnedTexts () {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var messagereturn = http_request.responseText;
			if(messagereturn!='isfail')
			{
				var r;
				r=messagereturn.split('|');
				if(r.length!=1)
				{
					if(r[0]==1)
					{
						$("#qacontent").val(" ");
						var quer=r[1]+"  “ª√Î«∞ ";
							var liNode = document.createElement("li");
							liNode.appendChild(document.createTextNode(quer));
							document.getElementById("qa-list").insertBefore(liNode, document.getElementById("qa-list").firstChild);
						

					}else{
						alert(r[2]);
					}
					
				}
				else
				{
					
					document.getElementById('ajaxarea').innerHTML=messagereturn;
				}
			}
		} else {
			//alert('There was a problem with the request.');
		}
	}
}

function insertlang (ids,usernames,id,classid,aeaakmluserid,lid,maxid){
			var liu=document.getElementById("liuyanb");
			var values="<div class='yangshi1' id='liuyanb'>∂‘"+usernames+"Àµ<input type='text' value='' id='touser'><a class='five-stars' href=\"JavaScript:makeRequests('/e/enews/a.php?enews=AddInfoPfen&bclassid="+classid+"&mid="+id+"&classid=133&enews=MAddInfo&uid="+aeaakmluserid+"&lid="+lid+"&touser="+usernames+"&maxid="+maxid+"','EchoReturnedTexts','GET','');\">¡Ù—‘</a></div>";
			if(!liu){
				document.getElementById(ids).innerHTML += values;
			}else{
				var one=document.getElementById("liuyanb");
				one.parentNode.removeChild(one);
				document.getElementById(ids).innerHTML += values;
			}
        }
function shanchu(id){
	http_request = false;
	if (window.XMLHttpRequest) { // Non-IE...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/plain');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}

	if (!http_request) {
		alert('Cannot send an XMLHTTP request');
		return false;
	}

	var changefunc="http_request.onreadystatechange = EchoReturnedTexts";
	eval (changefunc);
	//http_request.onreadystatechange = alertContents;
	http_request.open("GET", "/e/enews/a.php?enews=date&id="+id, true);
	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send();			
}


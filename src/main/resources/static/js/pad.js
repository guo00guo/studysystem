BizQQWPA.define("util.pad",function(){return function(str,pad,length,isLeft){var padLength=length-str.length,i;if(isLeft===false){for(i=0;i<padLength;i++){str+=pad}}else{for(i=0;i<padLength;i++){str=pad+str}}return str}});
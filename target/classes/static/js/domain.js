BizQQWPA.define("util.domain",function(){var domain={},dm=document.domain;try{domain.url=location.href}catch(e){domain.url=""}domain.topDomain=function(){var reg1=/\.(?:(?:edu|gov|com|org|net)\.cn|co\.nz)$/,reg2=/^[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d$/,slicePos=reg1.test(dm)?-3:reg2.test(dm)?0:-2;return dm.split(".").slice(slicePos).join(".")}();domain.domain=function(){var reg=/(?::[\/]{2}|:[\\]{3})([a-zA-Z0-9_\.]+)/;try{var ret=reg.exec(domain.url);return ret?ret[1]||dm:dm}catch(e){return dm}}();return domain});
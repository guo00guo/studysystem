BizQQWPA.define("util.contains",function(){return document.documentElement.contains?function(node,context){var adown=node.nodeType===9?node.documentElement:node,bup=context&&context.parentNode;return node===bup||!!(bup&&bup.nodeType===1&&adown.contains&&adown.contains(bup))}:document.documentElement.compareDocumentPosition?function(node,context){return context&&!!(node.compareDocumentPosition(context)&16)}:function(node,context){while(context=context.parentNode){if(context===node){return true}}return false}});
!function(a){function h(a,b){return(parseInt(a,10)||0)*(g.test(a)?b/100:1)}function i(a,b,c,d){return["right"===a[0]?c:"center"===a[0]?c/2:0,"bottom"===a[1]?d:"center"===a[1]?d/2:0,h(b[0],c),h(b[1],d)]}function j(a){var b=a[0],c=b.preventDefault;return b=b.touches&&b.touches[0]||b,9===b.nodeType||b===window||c?{width:c?0:a.width(),height:c?0:a.height(),top:b.pageYOffset||b.pageY||0,left:b.pageXOffset||b.pageX||0}:a.offset()}function k(b){var c=a(b=b||window),d=j(c);return b=c[0],{$el:c,width:d.width,height:d.height,scrollLeft:b.pageXOffset||b.scrollLeft,scrollTop:b.pageYOffset||b.scrollTop}}function l(a,b){["my","at"].forEach(function(c){var d=(a[c]||"").split(" "),g=a[c]=["center","center"],h=b[c]=[0,0];1===d.length&&d[f.test(d[0])?"unshift":"push"]("center"),e.test(d[0])&&(g[0]=RegExp.$1)&&(h[0]=RegExp.$2),f.test(d[1])&&(g[1]=RegExp.$1)&&(h[1]=RegExp.$2)})}var c=a.fn.position,d=Math.round,e=/^(left|center|right)([\+\-]\d+%?)?$/,f=/^(top|center|bottom)([\+\-]\d+%?)?$/,g=/%$/;a.fn.position=function(b){if(!b||!b.of)return c.call(this);b=a.extend({},b);var o,e=a(b.of),f=b.collision,g=f&&k(b.within),h={},m=j(e),n={left:m.left,top:m.top};return e[0].preventDefault&&(b.at="left top"),l(b,h),o=i(b.at,h.at,m.width,m.height),n.left+=o[0]+o[2],n.top+=o[1]+o[3],this.each(function(){var c=a(this),e=c.offset(),j=a.extend({},n),k=i(b.my,h.my,e.width,e.height);j.left=d(j.left+k[2]-k[0]),j.top=d(j.top+k[3]-k[1]),f&&f.call(this,j,{of:m,offset:e,my:b.my,at:b.at,within:g,$el:c}),j.using=b.using,c.offset(j)})}}(Zepto);
(function(e){e.matchMedia=function(){var t=0,n="gmu-media-detect",r=e.fx.transitionEnd,i=e.fx.cssPrefix,s=e("<style></style>").append("."+n+"{"+i+"transition: width 0.001ms; width: 0; position: absolute; top: -10000px;}\n").appendTo("head");return function(i){var o=n+t++,u,a=[],f;return s.append("@media "+i+" { #"+o+" { width: 1px; } }\n"),"matchMedia"in window?window.matchMedia(i):(u=e('<div class="'+n+'" id="'+o+'"></div>').appendTo("body").on(r,function(){f.matches=u.width()===1,e.each(a,function(t,n){e.isFunction(n)&&n.call(f,f)})}),f={matches:u.width()===1,media:i,addListener:function(e){return a.push(e),this},removeListener:function(e){var t=a.indexOf(e);return~t&&a.splice(t,1),this}},f)}}()})(Zepto);
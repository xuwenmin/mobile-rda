!function(a){function d(b){return this.each(function(d){var e=a(this),f=a.isFunction(b)?b.call(this,d,e.offset()):b,g=e.css("position"),h="absolute"===g||"fixed"===g||e.position();"relative"===g&&(h.top-=parseFloat(e.css("top"))||-1*parseFloat(e.css("bottom"))||0,h.left-=parseFloat(e.css("left"))||-1*parseFloat(e.css("right"))||0),parentOffset=e.offsetParent().offset(),props={top:c(f.top-(h.top||0)-parentOffset.top),left:c(f.left-(h.left||0)-parentOffset.left)},"static"==g&&(props.position="relative"),f.using?f.using.call(this,props,d):e.css(props)})}var b=a.fn.offset,c=Math.round;a.fn.offset=function(a){return a?d.call(this,a):b.call(this)}}(Zepto);
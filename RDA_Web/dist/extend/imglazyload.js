(function(e){var t=[];e.fn.imglazyload=function(n){function l(e){var t=o?window:i.offset(),r=t[u.win[0]],s=t[u.win[1]];return r>=e[u.img[0]]-n.threshold-s&&r<=e[u.img[0]]+e[u.img[1]]}function c(r){var i=e(r),s={},o=i;f||(e.each(i.get(0).attributes,function(){~this.name.indexOf("data-")&&(s[this.name]=this.value)}),o=e("<img />").attr(s)),i.trigger("startload"),o.on("load",function(){!f&&i.replaceWith(o),i.trigger("loadcomplete"),o.off("load")}).on("error",function(){var n=e.Event("error");i.trigger(n),n.defaultPrevented||t.push(r),o.off("error").remove()}).attr("src",i.attr(n.urlName))}function h(){var n,i,s,o;for(n=t.length;n--;)i=e(o=t[n]),s=i.offset(),l(s)&&(r.call(t,n,1),c(o))}function p(){!f&&a&&e(t).append(a)}var r=Array.prototype.splice,n=e.extend({threshold:0,container:window,urlName:"data-url",placeHolder:"",eventName:"scrollStop",innerScroll:!1,isVertical:!0},n),i=e(n.container),s=n.isVertical,o=e.isWindow(i.get(0)),u={win:[s?"scrollY":"scrollX",s?"innerHeight":"innerWidth"],img:[s?"top":"left",s?"height":"width"]},a=e(n.placeHolder).length?e(n.placeHolder):null,f=e(this).is("img");return!o&&(u.win=u.img),t=Array.prototype.slice.call(e(t.reverse()).add(this),0).reverse(),e.isFunction(e.fn.imglazyload.detect)?(p(),this):(e(document).ready(function(){p(),h()}),!n.innerScroll&&e(window).on(n.eventName+" ortchange",function(){h()}),e.fn.imglazyload.detect=h,this)}})(Zepto);
(function(e){e.extend(e,{throttle:function(t,n,r){function o(){function a(){i=Date.now(),n.apply(e,u)}function f(){s=undefined}var e=this,o=Date.now()-i,u=arguments;r&&!s&&a(),s&&clearTimeout(s),r===undefined&&o>t?a():s=setTimeout(r?f:a,r===undefined?t-o:t)}var i=0,s;return typeof n!="function"&&(r=n,n=t,t=250),o._zid=n._zid=n._zid||e.proxy(n)._zid,o},debounce:function(t,n,r){return n===undefined?e.throttle(250,t,!1):e.throttle(t,n,r===undefined?!1:r!==!1)}})})(Zepto);
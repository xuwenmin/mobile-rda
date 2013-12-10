// 公共js功能模块.by xuwm
define(["zepto"],function($){
	 //检测平台
    var versions=function() {
            var  u  =  navigator.userAgent,
                 app  =  navigator.appVersion;
            return  {
                trident:  u.indexOf('Trident')  >  -1,
                  //IE内核                
                presto:  u.indexOf('Presto')  >  -1,
                  //opera内核                
                webKit:  u.indexOf('AppleWebKit')  >  -1,
                  //苹果、谷歌内核                
                gecko:  u.indexOf('Gecko')  >  -1  &&  u.indexOf('KHTML')  ==  -1,
                  //火狐内核                
                mobile:   !! u.match(/AppleWebKit.*Mobile.*/) || !! u.match(/AppleWebKit/),
                  //是否为移动终端                
                ios:   !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                  //ios终端                
                android:  u.indexOf('Android')  >  -1  ||  u.indexOf('Linux')  >  -1,
                  //android终端或者uc浏览器                
                iPhone:  u.indexOf('iPhone')  >  -1  ||  u.indexOf('Mac')  >  -1,
                  //是否为iPhone或者QQHD浏览器                
                iPad:  u.indexOf('iPad')  >  -1,
                  //是否iPad                
                webApp:  u.indexOf('Safari')  ==  -1  //是否web应该程序，没有头部与底部            
            };
     }();
     //遮盖层对象
    var markobj = (function() {
	    var width = $("body").offset().width;
	    var height = $("body").offset().height;
	    var _show = function() {
	        $(".bgmark").css({
	            "width": width + "px",
	            "height": height + "px"
	        }).show();
	    };
	    var _hide = function() {
	        $(".bgmark").hide();
	    }
	    return {
	        show: function() {
	            _show();
	        },
	        hide: function() {
	            _hide();
	        }
	    }
	})();
	//弹出层管理对象
	var popwindow = (function() {
	    var html = "<div class=\"bgmark\" id=\"mark\"></div>";
	    var _show = function(id) {
	        if (!$("#mark").length) {
	            $("#" + id).parent().append(html);
	        }
	        markobj.show();
	        $("#" + id).position({
	            my: 'center center',
	            at: 'center',
	            of: document.body
	        }).css("visibility", "visible");
	    };
	    var _hide = function(id) {
	        markobj.hide();
	        $("#" + id).css("visibility", "hidden");
	    };
	    return {
	        show: function(id) {
	            _show(id);
	        },
	        hide: function(id) {
	            _hide(id);
	        }
	    }
	})();
	//按下退去按钮绑定事件
	var returnexit = (function() {
	    var onDeviceReady = function() {
	        //添加回退按钮事件
	        document.addEventListener("backbutton", eventBackButton, false);
	    };
	    var eventBackButton = function() {
	        if (window.location.hash == "#index" || 1 == 1) {
	            if (confirm("是否退出系统?")) {
	                //移除存储的用户信息.by xuwm 
	                window.localStorage.removeItem("userinfo");
	                navigator.app.exitApp();
	            }
	        }
	    };

	    var exitApp = function() {
	        navigator.app.exitApp();
	    };
	    var _init = function() {
	        document.addEventListener("deviceready", onDeviceReady, false);
	    };
	    return {
	        init: function() {
	            _init();
	        }
	    }
	})();
	//获取数字对应的两位有效数字
	var getFloat2 = function(s) {
	    return parseFloat(parseFloat(s).toFixed(2));
	};
	//动态加载JS
	var loadJs = function(src, fn) {
	    var container = document.getElementsByTagName("head")[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = src;
	    if (typeof(script.onreadystatechange) !== "undefined") {
	        script.onreadystatechange = function() {
	            if (script.readyState == 'loaded' || script.readyState == 'complete') {
	                script.onreadystatechange = null;
	                fn && (typeof fn == "function") && fn();
	            }
	        };
	    } else {
	        script.onload = function() {
	            setTimeout(function() {
	                fn && (typeof fn == "function") && fn();
	            }, 0);
	        };
	    }
	    container.appendChild(script);
	};
	//正在加载对象
	var _loadtip=(function(){
		var _show=function(){
			$("#loaddiv").position({
                my: 'center center',
                at: 'center',
                of: document.body
            }).show();
		};
		var _hide=function(){
			 $("#loaddiv").hide();
		};
		return {
			show:function(){
				_show();
			},
			hide:function(){
				_hide();
			}
		}
	})();
	return {
		//当前浏览器信息
		_platform:versions,
		//弹出层对象
		popwindow:popwindow,
		//遮盖层对象
		markobj:markobj,
		//系统退出对象
		returnexit:returnexit,
		getFloat2:getFloat2,
		loadJs:loadJs,
		loadtip:_loadtip
	}
});
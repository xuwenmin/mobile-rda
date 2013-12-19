// 公共js功能模块.by xuwm
define(["underscore"],function(_){
	var _scrollload=["rzgl_fbrzxx","rzgl_fbrzxx_2","cwzb",
	"fxyj_zhsl","fxyj_xjll","fxyj_zczl","fxyj_cwbb","xjll","zcfz_sub","rzgl_view"];

	var _autoupdate=["cwzb_hbzj","zcfz","zcfz_sub","xjll","ly"];
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
    var markobj = function() {
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
	};
	//弹出层管理对象
	var popwindow = (function() {
	    var html = "<div class=\"bgmark\" id=\"mark\"></div>";
	    var _show = function(id) {
	        if (!$("#mark").length) {
	            $("#" + id).parent().append(html);
	        }
	        markobj().show();
	        $("#" + id).position({
	            my: 'center center',
	            at: 'center',
	            of: document.body
	        }).css("visibility", "visible");
	    };
	    var _hide = function(id) {
	        markobj().hide();
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
	                //检查，假如下次自动登录，则不清除当前登录信息.by xuwm
	                var userinfo=window.localStorage["userinfo"] ? JSON.parse(window.localStorage["userinfo"]) :undefined;
	                if(userinfo){
	                	if(!userinfo.autologin){
	                		window.localStorage.removeItem("userinfo");
	                	}
	                }
	                window.localStorage.removeItem("rz_sslx1");
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
	var _isscroll=function(s){
		return _.contains(_scrollload,s);
	};
	var _isautoupdate=function(s){
		return _.contains(_autoupdate,s);
	};
	//获取当前登录信息
	var _getsysinfo=function(){
		var result={};
		result=JSON.parse(window.localStorage["userinfo"]);
		result.GroupID=result.groupid;
		return result;
	};
		//获取企业基本信息
	var _get_e_baseinfo=function(fn){
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{
				action:"Enterprise_BasicData",
				ibdid:_getsysinfo().GroupID
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0){
						if(msg.Data.table0.length){
							//放到本地存储中，以方便各个页面调用
							window.localStorage["e_baseinfo"]=JSON.stringify(msg.Data.table0[0]);
							if(fn && _.isFunction(fn)){
								fn(msg.Data.table0[0]);
							}
						}
					}
				}
			}
		});
	};
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
		loadtip:_loadtip,
		isscroll:function(s){
			return _isscroll(s);
		},
		getsysinfo:function(){
			return _getsysinfo();
		},
		isautoupdate:function(s){
			return _isautoupdate(s);
		},
		//获取系统基本信息
		getbaseinfo:function(fn){
			_get_e_baseinfo(fn);
		}
	}
});
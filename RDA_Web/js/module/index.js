//应用首页功能模块.by xuwm 
define(["zepto","util","underscore"],function($,util,_){
	var indexsetting = (function() {
	    var width = $("body").offset().width;
	    var height = $("body").offset().height;
	    if (!util._platform.android && !util._platform.iPhone) {
	        width = 480;
	    }
	    var html = "<div class=\"bgmark\" id=\"mark\"></div>";
	    var _show = function(id) {
	        if (!$("#mark").length) {
	            $("#" + id).parent().append(html);
	        }
	        util.markobj.show();
	        var _width = width * 0.7;
	        $("#" + id).css("width", _width + "px");
	    };
	    var _hide = function(id) {
	        util.markobj.hide();
	        $("#" + id)[0].style.webkitTransition = "width .1s linear 0s";
	        $("#" + id).css("width", "0px");
	        _.delay(function() {
	            $("#" + id)[0].style.webkitTransition = "width .3s linear 0s";
	        }, 500);

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
	//首页动画效果
	var animateindex = (function() {
	    var curx = 1;
	    var cury = 1;
	    var number = 1;
	    var timeid;
	    //动画执行函数
	    var animate1 = function() {
	        if (timeid) {
	            clearInterval(timeid);
	        }
	        var sumcount = 88;
	        timeid = setInterval(function() {
	            var _num = parseInt((100 / 360) * number);
	            if (_num > sumcount || _num > 100) {
	                clearInterval(timeid);
	                return;
	            }
	            var html = "<p class=\"pf_f1\">" + _num + " <img src=\"images/index_1.png\" alt=\"\" />" + "</p>" + "<p class=\"pf_f2\">比较健康,建议优化</p>";
	            if (curx <= 180) {
	                $(".m_pingfen .pf_left")[0].style.webkitTransform = 'rotate(' + curx + 'deg)';
	                curx++;
	                $(".m_pingfen .pf_display").html(html);
	            } else {
	                $(".m_pingfen .pf_right")[0].style.webkitTransform = 'rotate(' + cury + 'deg)';
	                cury++;
	                $(".m_pingfen .pf_display").html(html);
	            }
	            if (curx > 180) {
	                $(".m_pingfen .pf_right").show();
	            }
	            number++;
	            if (cury > 180) {
	                curx = 1;
	                $(".m_pingfen .pf_right").hide();
	                cury = 1;
	                number = 1;
	            }
	        }, 1);
	    };
	    //清空动画参数
	    var clear = function() {
	        curx = 1;
	        cury = 1;
	        number = 1;
	        $(".m_pingfen .pf_left")[0].style.webkitTransform = 'rotate(' + 0 + 'deg)';
	        $(".m_pingfen .pf_right").hide();
	    };
	    var stop = function() {
	        if (timeid) {
	            clearInterval(timeid);
	        }
	    }
	    //重新开始动画
	    var start = function() {
	        clear();
	        animate1();
	    }
	    return {
	        action: function() {
	            animate1();
	        },
	        reload: function() {
	            start();
	        },
	        stop: function() {
	            stop();
	        }
	    }
	})();
	return {
		indexsetting:indexsetting,
		animateindex:animateindex
	}
});
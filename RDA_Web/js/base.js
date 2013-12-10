define(["zepto","util","index","fxyj","cwzb"], function($,util,index,fxyj,cwzb) {
    var _init = function() {
        console.log("if have some problem,please call me 151481184@qq.com,tks!")
        var $target = $(".main1");
        var curx = 0;
        var curwidth, touchevent, curmodel, isgo;
        var hashobj = {}; //hash对象,保存hash和传的参数信息
        //iscroll滚动条初始化
        var myScroll;
        var isend;
        var scroll_loaded = function(_h) {
            myScroll = new iScroll('qm_wrapper', {
                checkDOMChanges: true,
                onBeforeScrollStart: function(e) {
                    var target = e.target;
                    while (target.nodeType != 1) target = target.parentNode;
                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                        e.preventDefault();
                }
            });
        }
        var html = " <div  class=\"wrapper deviceselction gonext\"></div>";
        console.log(util._platform);
        if (util._platform.android || util._platform.iPhone) {
            curwidth = parseFloat($("body").offset().width); //获取当前设备的width
            touchevent = "touchstart";
            // touchevent = "click";
            //开始加载cordova.js
            util.loadJs("js/cordova.js", function() {
                util.returnexit.init();
            });
        } else {
            curwidth = 480;
            touchevent = "click";
        }
        //路由事件
        $(window).on("hashchange", function(event) {
            if (isgo) return;
            var hash = window.location.hash;
            if (!hash) return;
            isgo = true;
            index.animateindex.stop();
            var reg = /(#(.*)!\/(.*))|(#(.*))/;
            var result = hash.match(reg);
            hashobj = {}; //清空hash对象
            if (result) {
                if (result[2]) {
                    hashobj.hash = result[2];
                    var _para = result[3];
                    var _obj = {};
                    var _args = _para.split('&');
                    for (var i = 0; i < _args.length; i++) {
                        var ss = _args[i].split('=');
                        _obj[ss[0]] = ss[1];
                    }
                    hashobj.para = _obj;
                } else if (result[5]) {
                    hashobj.hash = result[5];
                }
            }

            var url = "tmpl/" + hashobj.hash + ".tpl?" + (+new Date());
            // console.log(url);
            $.ajax({
                url: url,
                type: "get",
                dataType: "text",
                beforeSend: function() {
                    //开始加载时
                    util.loadtip.show();
                },
                success: function(msg) {
                    var dotobj = doT.template(msg);
                    $(".gonext").html(dotobj(_obj)).addClass("gopre").removeClass("gonext");
                    $target[0].style.webkitTransition = "-webkit-transform .3s linear 0s";
                    $target[0].style.webkitTransform = 'translateX(' + -curwidth + 'px)';

                    isend = true;

                    
                   
                },
                error: function() {
                     util.loadtip.hide();
                }
            });
        });
        isgo = false;
        curmodel = "page1";
        window.location.hash = "bj";
        if (util._platform.android || util._platform.iPhone) {
            //动态绑定跳转下一页的事件
                $target.delegate("[to]", touchevent, function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    isgo=false;
                });
                //按下滑动事件
                 $target.delegate("[to]", "touchmove", function(event) {
                            // event.stopPropagation();
                    event.preventDefault();
                    sgo=true;
                });
                //按下弹起事件
                $target.delegate("[to]", "touchend", function(event) {
                            // event.stopPropagation();
                    event.preventDefault();
                    if(!isgo){
                        window.location.hash = $(this).attr("to");
                    }
                    isgo=false;
                 });
        }else{
             //动态绑定跳转下一页的事件
            $target.delegate("[to]", touchevent, function(event) {
                event.stopPropagation();
                event.preventDefault();
                // isgo=false;
                if (!isgo) {
                    window.location.hash = $(this).attr("to");
                }
            });
        }
        //动态绑定返回上一页的事件
        $target.delegate(".pre[from]", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            if (!isgo) {
                window.location.hash = $(this).attr("from");
            }
        });
        //动态绑定收起和展开事件
        $target.delegate(".hassub", touchevent, function() {
            var groupname = $(this).attr("rel");
            if ($(this).hasClass("active")) {
                $("[name=" + groupname + "]").hide();
                $(this).removeClass("active");
            } else {
                $("[name=" + groupname + "]").show();
                $(this).removeClass("active").addClass("active");
                $(this).siblings(".hassub").each(function() {
                    $(this).removeClass("active");
                    var groupname = $(this).attr("rel");
                    $("[name=" + groupname + "]").hide();
                });
            }
        });

        //动态的加载父级下面的子级内容.by xuwm 
        $target.delegate(".hasloadsub",touchevent,function(){
            if ($(this).hasClass("active")) {
                var code=$(this).attr("data-code");
                fxyj.getsubitembycode(code,$(this));
            }
        });

        //动态绑定融资类型的事件
        $target.delegate("#rzgl_rzlx", touchevent, function() {
            var groupname = $(this).attr("id");
            var $obj = $("[rel=" + groupname + "]");
            if ($obj.hasClass("hide")) {
                $obj.removeClass("hide");
            } else {
                $obj.addClass("hide");
            }

        });
        //动态绑定选中选项的效果
        $target.delegate(".divwhite", touchevent, function() {
            var $obj = $(this).find("img");
            if ($obj.hasClass("hide")) {
                $obj.removeClass("hide");
            } else {
                $obj.addClass("hide");
            }
        });
        //动态绑定动画单击事件
        $target.delegate(".m_pingfen .pf_display", touchevent, function() {
            window.location.hash = "ssxyzhpf";
        });
        //动态绑定弹出层取消事件
        $("body").delegate(".popwin .pop_return", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            var id = $(this).parent().attr("id");
            util.popwindow.hide(id);
        })
        //绑定下一页事件
        $target.delegate("#rzgl_next", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            var val = $("#rzgl_pinfo").val();
            if (val) {
                window.location.hash = "rzgl_fbrzxx_2";
            } else {
                util.popwindow.show("pop1");
            }
        })
        //绑定首页设置事件
        $target.delegate("#img_setting", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            index.indexsetting.show("index_setting");
        });
        //绑定首页登录设置事件
        $target.delegate("#img_msg", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            window.location.hash = "mymsg";
        });
        //绑定登录事件
        $target.delegate(".a_login", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();

            //此处调用后台登录
            var username = $("#log_username").val();
            var pwd = $("#log_pwd").val();
            if (!username || !pwd) {
                alert("亲，用户名或者密码不能为空!");
            } else {
                username = encodeURIComponent(username);
                pwd = encodeURIComponent(pwd);
                $.ajax({
                    url: "getdata.aspx",
                    type: "get",
                    dataType: "json",
                    data: {
                        action: "USER_Login",
                        username: username,
                        pwd: pwd
                    },
                    beforeSend: function() {
                        util.loadtip.show();
                    },
                    success: function(msg) {
                        util.loadtip.hide();
                        if (msg.Result) {
                            if (msg.Data.table0.length) {
                                if (msg.Data.table0[0].Flag == "2") {
                                    alert("亲,用户名或者密码不对!");
                                } else if (msg.Data.table0[0].Flag == "1") {
                                    //此处保存当前登录的信息,使用本地存储.
                                    if ("localStorage" in window) {
                                        window.localStorage["userinfo"] = JSON.stringify({
                                            groupid: msg.Data.table0[0].InfoList[0].GroupID,
                                            userid: msg.Data.table0[0].InfoList[0].UserID
                                        });
                                        console.log(window.localStorage["userinfo"]);
                                    }
                                    window.location.hash = "index";
                                }
                            }
                        } else {
                            alert("亲,登录失败啦!");
                        }
                    },
                    error: function() {
                        util.loadtip.hide();
                        alert("亲,登录失败啦!");
                    }
                });
            }
        });
        //绑定注册事件
        $target.delegate(".a_register", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();

            var etpname = $("#etpname").val();
            var type = "1";
            var username = $("#reg_username").val();
            var pwd = $("#reg_pwd").val();
            var rep_pwd = $("#reg_reppwd").val();

            if (!etpname || !username || !pwd) {
                alert("亲，请把信息输入完整!");
                return;
            }
            if (pwd != rep_pwd) {
                alert("亲,两次密码不相等！");
                return;
            }
            username = encodeURIComponent(username),
            pwd = encodeURIComponent(pwd),
            etpname = encodeURIComponent(etpname),
            type = encodeURIComponent(type);
            $.ajax({
                url: "getdata.aspx",
                type: "get",
                data: {
                    action: "USER_Register",
                    username: username,
                    pwd: pwd,
                    etpname: etpname,
                    type: type
                },
                dataType: "json",
                beforeSend: function() {
                    util.loadtip.show();
                },
                success: function(msg) {
                    util.loadtip.hide();
                    console.log(msg);
                    if (msg.Result) {
                        if (msg.Data.table0.length) {
                            if (msg.Data.table0[0].Flag == "2") {
                                alert("亲，用户名已经被人抢了!")
                            } else if (msg.Data.table0[0].Flag == "6") {
                                alert("亲，企业名称被人抢了!");
                            } else if (msg.Data.table0[0].Flag == "10") {
                                alert("亲，注册成功了");
                            } else {
                                alert("亲，注册失败了!");
                            }
                        }
                    } else {
                        alert("亲，注册失败了!");
                    }

                },
                error: function() {
                    util.loadtip.hide();
                }
            });

        });
        //隐藏设置层
        $target.delegate("#mark", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            index.indexsetting.hide("index_setting");
        });
        //绑定登录和注册切换事件
        $target.delegate(".tabdiv a", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).hasClass("active")) return;
            $(this).removeClass("active").addClass("active").siblings("a").removeClass("active");
            var $login = $(".div_login"),
                $register = $(".div_register");
            if ($login.hasClass("hide")) {
                $login.removeClass("hide");
                $register.addClass("hide");
            } else {
                $login.addClass("hide");
                $register.removeClass("hide");
            }
        });
        //绑定类型切换事件类似页签按钮
        $target.delegate(".tabtype a", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ($(this).hasClass("active")) return;
            $(this).removeClass("active").addClass("active").siblings("a").removeClass("active");
        });
        //调用打电话的phonegap插件功能
        $target.delegate("a#a_tel", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ("_Phone" in window) {
                _Phone.call(function(msg) {}, function(err) {}, "10086");
            }
        });
        //调用发短信的phonegap插件功能
        $target.delegate("a#a_msg", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            if ("_SMS" in window) {
                _SMS.send(function(msg) {}, function(err) {}, "10086");
            }
        });
        // 绑定翻页完成事件
        $target[0].addEventListener("webkitTransitionEnd", function(e) {

            if (!isend) return;
            //翻页完成之后的操作
            $target[0].style.webkitTransition = "none 0s linear 0s";
            $target.children().first().remove();
            $target[0].style.webkitTransform = 'translateX(' + 0 + 'px)';
            $target.append(html);
            isgo = false;
            //效果做玩之后,再执行下面的check
            if (hashobj.hash == "cwzb_hbzj") {
                //财务指表的数据报表页
                $.ajax({
                    url: "getdata.aspx",
                    type: "get",
                    dataType: "json",
                    data: {
                        action: "Index_KeyFinancial_Data",
                        code: hashobj.para.code
                    },
                    success: function(msg) {
                        cwzb.createchart_cwzb(msg, hashobj);
                    },
                    error: function() {
                        alert("亲，暂时无数据！");
                    }
                });
            } else if (hashobj.hash == "fxyj_xjll_xjdqzwb") {
                _.delay(function() {
                    fxyj.createchart_fxyj_xjll_xjdqzwb();
                }, 0);
            } else if (hashobj.hash == "index" || hashobj.hash == "ssxyzhpf") {
                _.delay(function() {
                    index.animateindex.reload();
                });
            } else if (hashobj.hash == "rzgl_fbrzxx" || hashobj.hash == "rzgl_fbrzxx_2" || hashobj.hash == "cwzb" || hashobj.hash == "fxyj_zhsl") {
                _.delay(function() {
                    scroll_loaded();
                }, 0)
            } else if (hashobj.hash == "bj") {
                _.delay(function() {
                    window.location.hash = "login";
                }, 1000);
            }

            util.loadtip.hide();

            isend = false;
        });
    };
    return {
        init: function() {
            _init();
        }
    }
});
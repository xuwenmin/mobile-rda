define(["util", "index","wdxm","fxyj"], function(util, index,wdxm,fxyj) {
    var _init = function() {
        console.log("if have some problem,please call me 151481184@qq.com,tks!")
        var $target = $(".main1");
        var curx = 0;
        var curwidth, touchevent, curmodel, isgo, oldhash;
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
        if (util._platform.android || util._platform.iPhone) {
            curwidth = parseFloat($("body").offset().width); //获取当前设备的width
            // touchevent = "touchstart";
            touchevent = "singleTap";
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
            var reg = /(#(.*)!\/(.*))|(#(.*))/;
            var result = hash.match(reg);
            hashobj = {}; //清空hash对象
            if (result) {
                if (result[2]) {
                    hashobj.hash = result[2];
                    var _para = result[3];
                    var _obj = {};
                    var _oldobj = {};
                    var _args = _para.split('&');
                    for (var i = 0; i < _args.length; i++) {
                        var ss = _args[i].split('=');
                        _obj[ss[0]] = ss[1];
                        _oldobj[ss[0]] = ss[1];
                    }
                    hashobj.para = _obj;
                    hashobj._para = _oldobj;
                } else if (result[5]) {
                    hashobj.hash = result[5];
                }
            }

            var url = "tmpl/" + hashobj.hash + ".tpl?" + (+new Date());
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
                    if(hashobj.hash=="wdxm_ztxm_sqwt_tp1"){
                        _obj.sqtypedesc= _obj.qf=="zt" ? "在投项目" :"关注项目";
                        _obj.gohash=_obj.qf=="zt" ? "wdxm_ztxm" :"wdxm_gzxm";
                    }
                    if (hashobj.hash == "yjzx_tb") {
                        _obj = (_.where(JSON.parse(localStorage["fxyj_tb"]), {
                            id: parseInt(_obj.code)
                        }))[0];
                        _obj.oldhash = oldhash;
                    }
                    hashobj.para = _obj;
                    $(".gonext").html(dotobj(_obj)).addClass("gopre").removeClass("gonext");
                    $target[0].style.webkitTransition = "-webkit-transform .3s linear 0s";
                    $target[0].style.webkitTransform = 'translateX(' + -curwidth + 'px)';
                    isend = true;
                    oldhash = hashobj.hash;
                },
                error: function() {
                    util.loadtip.hide();
                }
            });
        });
        isgo = false;
        curmodel = "page1";
        window.location.hash = "bj";
        //动态绑定跳转下一页的事件
        $target.delegate("[to]", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            var to = $(this).attr("to");
            if (!isgo) {
                var reg = /((.*)!\/(.*))|((.*))/;
                var result = to.match(reg);
                if (result) {
                    if (result[2]) {
                        if ($(".selyear").length) {
                            to = to + "&year=" + $(".selyear").val() + "&month=" + $(".selmonth").val();
                            localStorage["dateinfo"] = JSON.stringify({
                                year: $(".selyear").val(),
                                month: $(".selmonth").val()
                            });
                        }
                    } else {
                        if ($(".selyear").length) {
                            to = to + "!/" + "year=" + $(".selyear").val() + "&month=" + $(".selmonth").val();
                            localStorage["dateinfo"] = JSON.stringify({
                                year: $(".selyear").val(),
                                month: $(".selmonth").val()
                            });
                        }
                    }
                }
                window.location.hash = to;
            }
        });
        //动态绑定返回上一页的事件
        $target.delegate(".pre[from]", touchevent, function(event) {
            event.stopPropagation();
            event.preventDefault();
            // 此处检查假如是发布获取所属行业时，不应该返回到上一页，只用切换显示隐藏即可
            if(hashobj.hash.indexOf("rzgl_fbrzxx")>-1){
                if($("#rzgl_rzxx_sub")[0].style.display=="block"){
                    $("#sel_rzsshy").trigger(touchevent);
                    return false;
                }
            }

            var from = $(this).attr("from");
            if (!isgo) {
                var reg = /((.*)!\/(.*))|((.*))/;
                var result = from.match(reg);
                if (result) {
                    if (result[2]) {
                        if ($(".selyear").length) {
                            from = from + "&year=" + $(".selyear").val() + "&month=" + $(".selmonth").val();
                            localStorage["dateinfo"] = JSON.stringify({
                                year: $(".selyear").val(),
                                month: $(".selmonth").val()
                            });
                        }
                    } else {
                        if ($(".selyear").length) {
                            from = from + "!/" + "year=" + $(".selyear").val() + "&month=" + $(".selmonth").val();
                            localStorage["dateinfo"] = JSON.stringify({
                                year: $(".selyear").val(),
                                month: $(".selmonth").val()
                            });
                        }
                    }
                }
                window.location.hash = from;
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
        $target.delegate(".hasloadsub", touchevent, function() {
            if ($(this).hasClass("active")) {
                var code = $(this).attr("data-code");
                if (hashobj.hash == "yjzx_cwbb") {
                    fxyj.get_fxyj_cwbb(code, $(this),hashobj);
                }else if (hashobj.hash == "yjzx_jhsl") {
                    fxyj.getsubitembycode(code, $(this),hashobj);
                }
                else if (hashobj.hash == "yjzx_zczl") {
                    fxyj.getsubitembycode(code, $(this),hashobj);
                }
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
        $target.delegate("#sel_rzsshy", touchevent, function() {
            $("#rzgl_rzxx_main").show();
            $("#rzgl_rzxx_sub").hide();
            $("#sel_rzsshy").hide();
            var data=window.localStorage["rz_sslx1"] ? JSON.parse(window.localStorage["rz_sslx1"]):{};
            //此处开始给所属行业赋值
            var data_val=_.map(data,function(v){
                v=v.split('_')[1];
                return v;
            });
            var data_desc=_.map(data,function(v){
                v=v.split('_')[2];
                return v;
            });
            if(data_val.length || data_desc.length){
                $("#rzgl_sshy").val(data_desc.join('/'));
                $("#rzgl_sshy").attr("data-val",data_val.join(','));
            }else{
                $("#rzgl_sshy").val("");
                $("#rzgl_sshy").attr("data-val","");
            }
        });
        //动态绑定所属行业 事件
        $target.delegate("#rzgl_sshy", touchevent, function() {
            $("#rzgl_rzxx_main").hide();
            $("#rzgl_rzxx_sub").show();
            //清空所属行来的本地存储
            window.localStorage.removeItem("rz_sslx1");
            rzgl.getrzgl_enum("2", $("#rzgl_rzxx_sub"));
        });
        //动态绑定融资时长,融资金额的事件
        $target.delegate("#rzgl_sc,#rzgl_rmb,#rzgl_qyxz,#rzgl_qyrmb", touchevent, function() {
            var groupname = $(this).attr("id");
            var $obj = $("[for=" + groupname + "]");
            if ($obj.hasClass("hide")) {
                $obj.removeClass("hide");
            } else {
                $obj.addClass("hide");
            }
        });

        //动态绑定下拉列表选中的事件
        $target.delegate(".ul_select li", touchevent, function() {
            var val = $(this).html();
            var _for = $(this).parent().attr("for");
            $("#" + _for).val(val).attr("data-val", $(this).attr("data-eid"));
            $(this).parent().addClass("hide");
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

        //动态的勾选赋值,适合没有下级的单选enum  以hascheckbox为标识
        $target.delegate(".hascheckbox", touchevent, function() {
            var sto = $(this).attr("toid");
            //获取所有相同目标选中的状态
            var arg = [];
            var arg_val = [];
            $("[toid=" + sto + "]").each(function() {
                var _for = $(this).attr("for");
                if (!$(this).find("img").first().hasClass("hide")) {
                    arg.push($("[name=" + _for + "]").html());
                    arg_val.push($("[name=" + _for + "]").attr("data-eid"));
                }
            });
            $("#" + sto).val(arg.join('/')).attr("data-val", arg_val.join(','));
        });

        //动态的勾选,适合多级的多选enum  以hascheckbox1为标识
        $target.delegate(".hascheckbox1", touchevent, function() {
            // 设置一个本地存储放已经选中的多选值

            var rz_sslx1 =window.localStorage["sqwt_tp"] ? JSON.parse(window.localStorage["sqwt_tp"]):[];
            var _for = $(this).attr("for");
            var data_fid = $("[name=" + _for + "]").attr("data-fid"); //父ID
            var data_eid = $("[name=" + _for + "]").attr("data-eid"); //当前ID
            var data_desc=$("[name=" + _for + "]").html();//当前选中的值
            var newval = data_fid + "_" + data_eid+"_"+data_desc; //当前要插件的新值
            var $obj = $(this).find("img");

            if (rz_sslx1.length) {
                if (!$obj.hasClass("hide")) {
                    var existarg = _.filter(rz_sslx1, function(v) {
                        return v.indexOf(data_fid + "_") > -1;
                    });
                    if (existarg.length) {
                        //假如是同一种类型，则检查是否超过5个
                        if (rz_sslx1.length >= 3) {
                            alert("亲,只能选择一个值!");
                            //然后去掉此项的勾
                            $obj.addClass("hide");
                        } else {
                            //不超过5个，则插入到数组中
                            if (!_.contains(existarg, newval)) {
                                rz_sslx1.push(newval);
                            }
                        }
                    } else {
                         alert("亲,只能选择一个值!");
                        $obj.addClass("hide");
                    }
                } else {
                    //删除此项
                    rz_sslx1 = _.filter(rz_sslx1, function(v) {
                        return v != newval;
                    });
                }

            } else {
                rz_sslx1.push(newval);
            }
            //保存数据到localstorage
            window.localStorage["sqwt_tp"] = JSON.stringify(rz_sslx1);
        });
        
        //提交申请委托操作
        $target.delegate("#savesqwt",touchevent,function(e){
            e.stopPropagation();
            e.preventDefault();
            if(hashobj.hash=="wdxm_ztxm_sqwt_tp1"){
                wdxm.action_sqwt(hashobj);
            }
        });
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
        $target.delegate("#but_login", touchevent, function(event) {
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
                        // console.log(msg);
                        if (msg.Result) {
                            if (msg.Data.table0.length) {
                                if (msg.Data.table0[0].Flag == "2") {
                                    alert("亲,用户名或者密码不对!");
                                } else if (msg.Data.table0[0].Flag == "1") {
                                    //此处保存当前登录的信息,使用本地存储.
                                    if ("localStorage" in window) {
                                        window.localStorage["userinfo"] = JSON.stringify({
                                            groupid: msg.Data.table0[0].InfoList[0].GroupID,
                                            userid: msg.Data.table0[0].InfoList[0].UserID,
                                            autologin:!$("#div_autologin").find("img").hasClass("hide")
                                        });
                                        // console.log(window.localStorage["userinfo"]);
                                    }
                                    window.location.hash = "index";
                                } else {
                                    alert("亲,登录失败啦!");
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
            var type = "3";
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
                    // console.log(msg);
                    if (msg.Result) {
                        if (msg.Data.table0.length) {
                            if (msg.Data.table0[0].Flag == "2") {
                                alert("亲，用户名已经被人抢了!")
                            } else if (msg.Data.table0[0].Flag == "6") {
                                alert("亲，企业名称被人抢了!");
                            } else if (msg.Data.table0[0].Flag == "10") {
                                alert("亲，注册成功了");
                            } else if(msg.Data.table0[0].Flag=="0"){
                                alert("亲,用户名位数不能少于6位!")
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

            if(hashobj.hash=="yjzx"){
                //风险预警首页
                _.delay(function(){
                    fxyj.get_fxyj_inxex($("#ul_fxyj_index"));
                },0);
            }
            if(hashobj.hash=="wdxm_ztxm"){
                //在投项目列表
                _.delay(function(){
                    wdxm.get_wdxm_ztxm($("#ul_ztxm"));
                },0);
            }
            if(hashobj.hash=="wdxm_jxxm"){
                //结项目列表
                _.delay(function(){
                    wdxm.get_wdxm_jxxm($("#ul_jxxm"));
                },0);
            }
            if(hashobj.hash=="wdxm_gzxm"){
                 //已关注项目列表
                 _.delay(function(){
                    wdxm.get_wdxm_ygjxm($("#ul_gzxm"));
                },0);
            }
            if(hashobj.hash=="wdxm_ztxm_sqwt_tp1"){
                //申请委托页面选择监控类型初始化
                 _.delay(function(){
                    window.localStorage.removeItem("sqwt_tp");//先清空
                    wdxm.get_sqwt_tp($("#sqwt_tp"));
                },0);
            }


            //效果做玩之后,再执行下面的check
            if(hashobj.hash=="index"){
               
            } else if (hashobj.hash == "yjzx_tb") {
                _.delay(function() {
                    fxyj.createchart_fxyj_tb(hashobj);
                }, 0);
            } else if (util.isscroll(hashobj.hash)) {
                _.delay(function() {
                    scroll_loaded();
                }, 0)
            } else if (hashobj.hash == "bj") {
                _.delay(function() {
                    //此处检查是否自动登录
                    var userinfo=window.localStorage["userinfo"] ? JSON.parse(localStorage["userinfo"]) : undefined;
                    if(userinfo){
                        if(userinfo.autologin){
                            window.location.hash="index";
                        }else{
                            window.location.hash = "login";  
                        }
                    }else{
                      window.location.hash = "login";  
                    } 
                }, 1000);
            }

            util.loadtip.hide();

            isend = false;

            //更新年份和月份的数据
            if (hashobj._para) {
                if (hashobj._para.year) {
                    $(".selyear").val(hashobj._para.year);
                    $(".selmonth").val(hashobj._para.month);
                }
            }


        });

        //绑定当前选择的年和月
        $target.delegate(".selyear", "change", function(event) {
            var dateinfo = localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]) : {};
            dateinfo.year = $(this).val();
            localStorage["dateinfo"] = JSON.stringify(dateinfo);
            //此处检查是否触动自动更新
            if (util.isautoupdate(hashobj.hash)) {
                if (hashobj.hash == "cwzb_hbzj") {
                    cwzb.getcwzbdata(hashobj);
                }
                if (hashobj.hash == "zcfz") {
                    cwbb.getcwbb_zcfz_upindex($("#container_tmpl"));
                }
                if (hashobj.hash == "zcfz_sub") {
                    cwbb.getcwbb_zcfz_upsub(hashobj, $("#ul_zcfz"));
                }
                if (hashobj.hash == "xjll") {
                //开始获取现金流量信息
                    cwbb.getcwbb_byfid(0, $("#ul_cwbb"), "Report_CashFlow_Data");
                };
                if (hashobj.hash == "ly") {
                    //开始获取现金流量信息
                    cwbb.getcwbb_byfid(0, $("#ul_cwbb"), "Report_Profit_Data");
                };

            }
        });
        $target.delegate(".selmonth", "change", function(event) {
            var dateinfo = localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]) : {};
            dateinfo.month = $(this).val();
            localStorage["dateinfo"] = JSON.stringify(dateinfo);
            //此处检查是否触动自动更新
            if (util.isautoupdate(hashobj.hash)) {
                if (hashobj.hash == "cwzb_hbzj") {
                    cwzb.getcwzbdata(hashobj);
                }
                if (hashobj.hash == "zcfz") {
                    cwbb.getcwbb_zcfz_upindex($("#container_tmpl"));
                }
                if (hashobj.hash == "zcfz_sub") {
                    cwbb.getcwbb_zcfz_upsub(hashobj, $("#ul_zcfz"));
                }
                if (hashobj.hash == "xjll") {
                //开始获取现金流量信息
                    cwbb.getcwbb_byfid(0, $("#ul_cwbb"), "Report_CashFlow_Data");
                };
                if (hashobj.hash == "ly") {
                    //开始获取现金流量信息
                    cwbb.getcwbb_byfid(0, $("#ul_cwbb"), "Report_Profit_Data");
                };
            }

        });
        
        //保存融资发布信息
        $target.delegate("#rzgl_save",touchevent,function(event){
            event.stopPropagation();
            event.preventDefault();
            rzgl.save();
        });

        //退出账户的时候，清除掉登录信息
        $target.delegate("#but_cancellogin",touchevent,function(e){
            e.stopPropagation();
            e.preventDefault();
            if(confirm("是否退出当前登录?")){
                window.localStorage.removeItem("userinfo");
                window.location.hash="login";
            }
        });
    };
    return {
        init: function() {
            _init();
        }
    }
});
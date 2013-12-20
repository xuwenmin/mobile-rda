//我的项目功能JS模块.by xuwm 
define(["util","underscore"],function(util,_){
	//在投项目模板
	var $template='{{ for(var i=0;i<it.length;i++) { }}'+
	' <li rel="li{{=i}}" class="hassub">'+
             '<a href="#" class="desc">'+
                 '{{=it[i].name}}<div class="list_next list_topright">'+
                 '<img src="images/a_down.png" alt="" class="imgdown">'+
                 '<img src="images/a_top.png" alt="" class="imgtop">'+
             '</div></a>'+
         '</li>'+
         '<div name="li{{=i}}" class="subli e-showC">'+

            '<p><span class="e-type">融资类型：</span>{{=it[i].rzlx}}</p>'+
            '<p><span class="e-type">所属行业：</span>{{=it[i].sshy}}</p>'+
            '<p><span class="e-type">融资金额：</span>￥{{=it[i].rzjestart}}-{{=it[i].rzjeend}}</p>'+
            '<p><span class="e-type e-cg">关注度：</span><span class="e-c3">{{=it[i].gjd}} 点击率：{{=it[i].djl}}次</span> <span class="e-date e-c3">{{=it[i].timestart}}</span></p>'+
            '<p class="e-tl">'+
            '{{ if(!it[i].iswt) { }}'+
            '<a href="#" class="e-sqwt" to="wdxm_ztxm_sqwt_tp1!/qf=zt&proid={{=it[i].proid}}&sc={{=it[i].sc}}">'+
             '{{  } else if (it[i].iswt && it[i].iscontains) {  }}'+
              '<a href="#" class="e-sqwt e-sqwt-disable">'+
              '{{  } else if (it[i].iswt && !it[i].iscontains) {  }}'+
               '<a href="#" class="e-sqwt addsqwtz" data-val="{{=it[i].qf}},{{=it[i].proid}}" >'+
                '{{  } }}'+
            '申请委托</a></p>'+
         '</div>'+
           '{{ } }}';
    //结项目列表模板
    var $template_jx='{{ for(var i=0;i<it.length;i++) { }}'+
      '<li rel="li{{=i}}" class="hassub">'+
             '<a href="#" class="desc">'+
                '{{=it[i].name}}<div class="list_next list_topright">'+
                 '<img src="images/a_down.png" alt="" class="imgdown">'+
                 '<img src="images/a_top.png" alt="" class="imgtop">'+
             '</div></a>'+
         '</li>'+
         '<div name="li{{=i}}" class="subli e-showC">'+
            '<p><span class="e-type">融资类型：</span>{{=it[i].rzlx}}</p>'+
            '<p><span class="e-type">所属行业：</span>{{=it[i].sshy}}</p>'+
            '<p><span class="e-type">融资金额：</span>￥{{=it[i].rzjestart}}-{{=it[i].rzjeend}}</p>'+
            '<p><span class="e-type">结项日期：</span>{{=it[i].timeend}}</p>'+
         '</div>'+
           '{{ } }}';
     var $template_gz='{{ for(var i=0;i<it.length;i++) { }}'+
      '<li rel="li{{=i}}" class="hassub">'+
             '<a href="#" class="desc">'+
                 '{{=it[i].name}}<div class="list_next list_topright">'+
                 '<img src="images/a_down.png" alt="" class="imgdown">'+
                 '<img src="images/a_top.png" alt="" class="imgtop">'+
             '</div></a>'+
         '</li>'+
         '<div name="li{{=i}}" class="subli e-showC">'+
            '<p><span class="e-type">融资类型：</span>{{=it[i].rzlx}}</p>'+
            '<p><span class="e-type">所属行业：</span>{{=it[i].sshy}}</p>'+
            '<p><span class="e-type">融资金额：</span>￥{{=it[i].rzjestart}}-{{=it[i].rzjeend}}</p>'+
            '<p class="e-tl">'+
           '{{ if(!it[i].iswt) { }}'+
            '<a href="#" class="e-sqwt" to="wdxm_ztxm_sqwt_tp1!/qf=zt&proid={{=it[i].proid}}&sc={{=it[i].sc}}">'+
             '{{  } else if (it[i].iswt && it[i].iscontains) {  }}'+
              '<a href="#" class="e-sqwt e-sqwt-disable">'+
              '{{  } else if (it[i].iswt && !it[i].iscontains) {  }}'+
               '<a href="#" class="e-sqwt addsqwtz" data-val="{{=it[i].qf}},{{=it[i].proid}}" >'+
                '{{  } }}'+
            '申请委托</a></p>'+
         '</div>'+
         '{{ } }}';
    	//所属行业enum模板 
	var $template_sqwt_tp ='{{ for(var i=0;i<it.length;i++) { }}' +
		' <li rel="li{{=it[i].Id}}"  class="hassub">' +
		'<a href="#" class="desc">' +
		'<div class="enum_item enum_item80">' +
		'<div for="r_t{{=it[i].Id}}" class="divwhite hascheckbox1">' +
		'<img class="hide" src="images/select.png" alt=""/>' +
		'</div>' +
		'<p data-fid="{{=it[i].ParentId}}" name="r_t{{=it[i].Id}}" class="p_item" data-eid="{{=it[i].Id}}">{{=it[i].Name}}</p>' +
		'</div>' +
		'{{ if(it[i].ischild) { }}' +
		'<div class="list_next list_topright">' +
		'<img src="images/a_down.png" alt="" class="imgdown">' +
		'<img src="images/a_top.png" alt="" class="imgtop">' +
		'</div>' +
		'{{  } }}' +
		'</a>' +
		'</li>' +
		'{{ if(it[i].ischild) { }}' +
		'<li name="li{{=it[i].Id}}" class="subli subli_desc">' +
		'<a href="#" class="desc">' +
		'{{ for(var j=0;j<it[i].Childs.length;j++) { }}' +
		'<div  class="enum_item">' +
		'<div for="r_t{{=it[i].Childs[j].Id}}" class="divwhite hascheckbox1">' +
		'<img class="hide" src="images/select.png" alt=""/>' +
		'</div>' +
		'<p name="r_t{{=it[i].Childs[j].Id}}" class="p_item" data-fid="{{=it[i].Childs[j].ParentId}}" data-eid="{{=it[i].Childs[j].Id}}">{{=it[i].Childs[j].Name}}</p>' +
		'</div>' +
		'{{ } }}' +
		'</a>' +
		'</li>' +
		'{{  } }}' +
		'{{ } }}';
    //获取在投项目列表
	var _get_wdxm_ztxm=function($this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{
				action:"ZTProject_List",
				ibdid:util.getsysinfo().GroupID,
				userid:util.getsysinfo().userid
			},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					msg.Data.table0 && msg.Data.table0.length && (function(){
						result=_.map(msg.Data.table0,function(v){
							v.name=v["在投项目信息__标题"];
							v.rzlx=v["_在投项目信息__融资类型_"];
							v.sc=v["在投项目信息__融资时长"];
							v.proid=v["在投项目信息__项目编号"];
							v.sshy=v["_在投项目信息__所属行业_"];
							v.rzjeend=v["在投项目信息__融资金额始"];
							v.rzjestart=v["在投项目信息__融资金额起"];
							v.djl=v["在投项目信息__点击率"];
							v.gjd=parseInt(v.djl)>200 ? "高" :"低";
							v.timestart=v["在投项目信息__发布时间"];
							v.qf="zt";
							v.iswt=(+v["在投项目信息__委托状态"])>0 ? true :false;
							if(!!v["在投项目信息__委托者"]){
								v.iscontains=_.contains(v["在投项目信息__委托者"].split(','),util.getsysinfo().userid);
							}else{
								v.iscontains=false;
							}
							
							return v;
						});
						// console.log(result);
						//开始填充模板
						var doobj=doT.template($template);
						$this.html(doobj(result));
					}());
				}
				util.loadtip.hide();
			},error:function(){
				util.loadtip.hide();
			}
		});
	};
	//获取结项列表
	var _get_wdxm_jxxm=function($this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{
				action:"JXProject_List",
				ibdid:util.getsysinfo().GroupID
			},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				// console.log(msg);
				if(msg.Result){
					msg.Data.table0 && msg.Data.table0.length && (function(){
						result=_.map(msg.Data.table0,function(v){
							v.name=v["TITLE"];
							v.rzlx=v["_在投项目信息__融资类型_"];
							v.sshy=v["_在投项目信息__所属行业_"];
							v.rzjeend=v["AMOUNT_FINANCING_Y"];
							v.rzjestart=v["AMOUNT_FINANCING_C"];
							v.timeend=v["JXTime"];
							return v;
						});
						//开始填充模板
						var doobj=doT.template($template_jx);
						$this.html(doobj(result));
					}());
				}
				util.loadtip.hide();
			},error:function(){
				util.loadtip.hide();
			}
		});
	};
	//获取已关注项目列表
	var _get_wdxm_ygjxm=function($this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{
				action:"YIGZProject_List",
				ibdid:util.getsysinfo().GroupID,
				userid:util.getsysinfo().userid
			},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				// console.log(msg);
				if(msg.Result){
					msg.Data.table0 && msg.Data.table0.length && (function(){
						result=_.map(msg.Data.table0,function(v){
							v.name=v["TITLE"];
							v.sc=v["RongZiShiChang"];
							v.proid=v["EQUITYID"];
							v.rzlx=v["_项目信息__融资类型_"];
							v.sshy=v["_项目信息__所属行业_"];
							v.rzjeend=v["AMOUNT_FINANCING_Y"];
							v.rzjestart=v["AMOUNT_FINANCING_C"];
							v.qf="gt";
							v.iswt=(+v["ThisTHIsWeiTuo"])>0 ? true :false;
							if(!!v["WTZ"]){
								v.iscontains=_.contains(v["WTZ"].split(','),util.getsysinfo().userid);
							}else{
								v.iscontains=false;
							}

							return v;
						});
						// console.log(result);
						//开始填充模板
						var doobj=doT.template($template_gz);
						$this.html(doobj(result));
					}());
				}
				util.loadtip.hide();
			},error:function(){
				util.loadtip.hide();
			}
		});
	};
	//获取申请委托，临控类型
	var _get_sqwt_tp=function($this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			data:{
				action:"SZWTInit"
			},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				msg=eval("("+msg+")");
				// console.log(msg);
				if(msg.Result){
					msg.Data.table0 && msg.Data.table0.length && (function(){
						result=_.map(msg.Data.table0[0].DataContent,function(v){
							if(v.Childs && v.Childs.length){
								v.ischild=true;
							}else{
								v.ischild=false;
							}
							return v;
						});
						// console.log(result);
						//开始填充模板
						var doobj=doT.template($template_sqwt_tp);
						$this.html(doobj(result));
					}());
				}
				util.loadtip.hide();
			},error:function(msg){
				util.loadtip.hide();
			}
		});
	};
	//申请委托
	var _action_sqwt=function(hashobj){
		//THGZ_Ope
		var result=[];
		var typs=window.localStorage["sqwt_tp"] ? JSON.parse(window.localStorage["sqwt_tp"]) :"";
		if(typs){
			_.each(typs,function(v){
				result.push(v.split('_')[1]);
			});
		}
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{
				action:"THGZ_Ope",
				userid:util.getsysinfo().userid,
				qf:hashobj._para.qf,
				proid:hashobj._para.proid,
				sc:hashobj._para.sc,
				typs:result.join(',')
			},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				util.loadtip.hide();
				if(msg.Result){
					msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
						if(msg.Data.table0[0].msg=="1"){
							alert("亲,申请委托成功!");
							if(hashobj._para.qf=="zt"){
								window.location.hash="wdxm_ztxm";
							}else{
								window.location.hash="wdxm_gzxm";
							}
							
						}else{
							alert("亲,申请委托失败!");
						}
					}());
				}else{
					alert("亲,申请委托失败!");
				}
				
			},error:function(){
				util.loadtip.hide();
			}
		});
	};

	//添加当前用户到委托者列表
	var _action_addwtz=function(qf,proid,$this){

		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{
				action:"Add_WTZ",
				qf:qf,
				proid:proid,
				userid:util.getsysinfo().userid
			},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
						if(msg.Data.table0[0].msg=="1"){
							alert(msg.Data.table0[0].msgbox);
							$this.removeClass("addsqwtz").addClass("e-sqwt-disable");
						}else{
							alert(msg.Data.table0[0].msgbox);
						}
					}());
				}
				util.loadtip.hide();
			},
			error:function(){
				util.loadtip.hide();
			}
		});
	}
	return {
		//在投项目列表
		get_wdxm_ztxm:_get_wdxm_ztxm,
		//结项项目列表
		get_wdxm_jxxm:_get_wdxm_jxxm,
		//关注项目列表
		get_wdxm_ygjxm:_get_wdxm_ygjxm,
		//获取申请委托监控类型
		get_sqwt_tp:_get_sqwt_tp,
		//申请委托操作
		action_sqwt:_action_sqwt,
		//添加委托者到已委托人员列表中
		action_addwtz:_action_addwtz
	}
});
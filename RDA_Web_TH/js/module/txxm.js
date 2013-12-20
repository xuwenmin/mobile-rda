//挑选项目模块功能.by xuwm
define(["util","underscore"],function(util,_){
	var $template_enum_rzlx='{{ for(var i=0;i<it.length;i++) { }}'+
	'<label class="e-w50b"><div data-val="{{=it[i].EnumID}}" class="divwhite">'+
	 '<img class="hide" src="images/select.png" alt="" /></div>{{=it[i].EnumName}}</label>'+
	   '{{ } }}';
	   var $template_enum='{{ for(var i=0;i<it.length;i++) { }}'+
	'<label class="e-txlae"><div data-val="{{=it[i].EnumID}}" class="divwhite">'+
	 '<img class="hide" src="images/select.png" alt="" /></div>{{=it[i].EnumName}}</label>'+
	   '{{ } }}';
	   var $template_txxm_query='{{ for(var i=0;i<it.length;i++) { }}'+
	    '<li class="e-whbg">'+
               '<a href="#" class="desc">{{=it[i].name}}</a>'+
           '</li>'+
            '<div class="e-showC">'+
               '<p><span class="e-type">融资类型：</span>{{=it[i].rzlx}}</p>'+
               '<p><span class="e-type">所属行业：</span>{{=it[i].sshy}}</p>'+
               '<p><span class="e-type">融资金额：</span>￥{{=it[i].rzjestart}}-{{=it[i].rzjeend}}</p>'+
               '<p class="e-tl"><a href="#" class="e-sqwt" to="txxm_xmjj!/ibdid={{=it[i].e_ibdid}}&proid={{=it[i].proid}}">查看</a></p>'+
            '</div>'+
             '{{ } }}';
	//所属行业enum模板 
	var $template_enum_sshy ='{{ for(var i=0;i<it.length;i++) { }}' +
		' <li rel="li{{=it[i].EnumID}}"  class="hassub">' +
		'<a href="#" class="desc">' +
		'<div class="enum_item enum_item80">' +
		'<div for="r_t{{=it[i].EnumID}}" class="divwhite hascheckbox1">' +
		'<img class="hide" src="images/select.png" alt=""/>' +
		'</div>' +
		'<p data-fid="{{=it[i].EnumID}}" name="r_t{{=it[i].EnumID}}" class="p_item" data-eid="{{=it[i].EnumID}}">{{=it[i].EnumName}}</p>' +
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
		'<li name="li{{=it[i].EnumID}}" class="subli subli_desc">' +
		'<a href="#" class="desc">' +
		'{{ for(var j=0;j<it[i].childs.length;j++) { }}' +
		'<div  class="enum_item">' +
		'<div for="r_t{{=it[i].childs[j].EnumID}}" class="divwhite hascheckbox1">' +
		'<img class="hide" src="images/select.png" alt=""/>' +
		'</div>' +
		'<p name="r_t{{=it[i].childs[j].EnumID}}" class="p_item" data-fid="{{=it[i].EnumID}}" data-eid="{{=it[i].childs[j].EnumID}}">{{=it[i].childs[j].EnumName}}</p>' +
		'</div>' +
		'{{ } }}' +
		'</a>' +
		'</li>' +
		'{{  } }}' +
		'{{ } }}';
	//详细页面中，项目信息模板
	var $template_xmxx_pro=' <p><span class="e-xmt">项目名称：</span>{{=it.name}}</p>'+
            '<p><span class="e-xmt">融资类型：</span>{{=it.rzlx}}</p>'+
            '<p><span class="e-xmt">所属行业：</span>{{=it.sshy}}</p>'+
            '<p><span class="e-xmt">融资时长：</span>{{=it.sc}}</p>'+
            '<p><span class="e-xmt">融资金额：</span>{{=it.rzjestart}}~{{=it.rzjeend}}万元人民币</p>'+
            '<p><span class="e-xmt">项目简介：</span>{{=it.desc}}</p>'+
            '<p><span class="e-xmt">商业计划书：</span>{{=it.syjhs}}   {{=it.time}}</p>'+
            '<p><span class="e-xmt">项目联系人：</span>{{=it.xmlxy}}<span class="e-xmtT"><em>电话：</em>{{=it.phone}}</span></p>'+
            '<p><span class="e-xmt">电子邮件：</span>{{=it.email}}<span class="e-xmtT"><em>手机：</em>{{=it.mphone}}</span></p>';
    //详细页面中，企业信息模板
    var $template_xmxx_e='<p><span class="e-xmt">企业名称：</span>{{=it.name}}</p>'+
            '<p><span class="e-xmt">企业性质：</span>{{=it.qyxz}}<span class="e-xmtT"><em>企业规模：</em>{{=it.qygm}}</span></p>'+
            '<p><span class="e-xmt">所属行业：</span>{{=it.sshy}}</p>'+
            '<p><span class="e-xmt">发展阶段：</span>{{=it.fzjd}}<span class="e-xmtT"><em>员工人数：</em>{{=it.ygrs}}人</span></p>'+
            '<p><span class="e-xmt">注册资金：</span>{{=it.zczj_rmb}}{{=it.zczj}}万元整</p>'+
            '<p><span class="e-xmt">实收资本：</span>{{=it.sszb_rmb}}{{=it.sszb}}万元整</p>'+
            '<p><span class="e-xmt">年销售额：</span>{{=it.nxse_rmb}}{{=it.nxse}}万元整</p>'+
            '<p><span class="e-xmt">所属园区：</span>{{=it.ssyq}}</p>'+
            '<p><span class="e-xmt">办公地址：</span>{{=it.bgdz}}</p>'+
            '<p><span class="e-xmt">企业网址：</span>{{=it.qywz}}</p>';
	//通用的获取enum的ajax请求
	var _geteunmajaxforsshy = function(desc, fn) {
		var result = [];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "TXProCondiInit",
				enumname:encodeURIComponent(desc)
			},
			dataType: "json",
			beforeSend: function() {
				util.loadtip.show();
			},
			success: function(msg) {
				result = msg.Data["table0"] || msg.Data["Table1"];
				//深度depth:2相对于typeid来说是子级，但是在结果里是父级
				var parenarg = _.where(result, {
					Depth: 2
				});
				//假定depth只到3
				var childarg = _.filter(result, function(v) {
					return v.Depth !== 2;
				});
				result = _.map(parenarg, function(v) {
					v.childs = _.where(childarg, {
						ParentID: v.EnumID
					});
					if (v.childs.length) {
						v.ischild = true;
					}
					return v;
				});
				if (fn && _.isFunction(fn)) {
					fn(result);
					setTimeout(function() {
						util.loadtip.hide();
					}, 0);
				}

			},
			error: function() {
				util.loadtip.hide();
			}
		});
	}
	//通用的获取enum的ajax请求
	var _geteunmajax = function(desc, fn) {
		var result = [];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "TXProCondiInit",
				enumname:encodeURIComponent(desc)
			},
			dataType: "json",
			beforeSend: function() {
				util.loadtip.show();
			},
			success: function(msg) {
				result = msg.Data["table0"] || msg.Data["Table1"] || [];	
				if (fn && _.isFunction(fn)) {
					fn(result);
					setTimeout(function() {
						util.loadtip.hide();
					}, 0);
				}

			},
			error: function() {
				util.loadtip.hide();
			}
		});
	};
	//获取所属行业enum
	var _initenum_sshy= function($this) {
		_geteunmajaxforsshy("所属行业", function(result) {
			if (result.length) {
				// console.log(result);
				//开始拼html
				var dotobj = doT.template($template_enum_sshy);
				$this.html(dotobj(result));
			};
		});
	};
	//初始化挑选项目首页enum信息
	var _initenum=function($rzlx,$rmb,$rzje,$rzsc,$sshy){
		_geteunmajax("融资类型",function(msg){
			var doobj=doT.template($template_enum_rzlx);
			$rzlx.html(doobj(msg));
		});
		_geteunmajax("币种",function(msg){
			var doobj=doT.template($template_enum);
			$rmb.html(doobj(msg));
		});

		_geteunmajax("融资金额",function(msg){
			var doobj=doT.template($template_enum);
			$rzje.html(doobj(msg));
		});

		_geteunmajax("融资时长",function(msg){
			var doobj=doT.template($template_enum);
			$rzsc.html(doobj(msg));
		});
		_geteunmajaxforsshy("所属行业", function(result) {
			if (result.length) {
				//开始拼html
				var dotobj = doT.template($template_enum_sshy);
				$sshy.html(dotobj(result));
			};
		});
	};
	//查询挑选项目列表信息
	var _query_txxm=function($this){
		//RZLX:"",SSHY:"",RZJE:"",BZ:"",RZSC:""
		var _txxm_query=window.localStorage["txxm_query"] ? JSON.parse(window.localStorage["txxm_query"]) :undefined;
		var result = [];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "TXProject_List",
				ibdid:util.getsysinfo().groupid,
				RZLX:_txxm_query.RZLX.length ? _txxm_query.RZLX.join(',') :"",
				SSHY:_txxm_query.SSHY.length ? _txxm_query.SSHY.join(',') :"",
				RZJE:_txxm_query.RZJE.length ? _txxm_query.RZJE.join(',') :"",
				BZ:_txxm_query.BZ.length ? _txxm_query.BZ.join(',') :"",
				RZSC:_txxm_query.RZSC.length ? _txxm_query.RZSC.join(',') :""
			},
			dataType: "json",
			beforeSend: function() {
				util.loadtip.show();
			},
			success: function(msg) {
				// console.log(msg);
				util.loadtip.hide();
				if(msg.Result){
					msg.Data.table0 && msg.Data.table0.length && (function(){
						result=_.map(msg.Data.table0,function(v){
							v.name=v["TITLE"];
							v.rzlx=v["_项目信息__融资类型_"];
							v.proid=v["EQUITYID"]; //项目编号
							v.sshy=v["_项目信息__所属行业_"];
							v.rzjeend=v["AMOUNT_FINANCING_Y"];
							v.rzjestart=v["AMOUNT_FINANCING_C"];
							v.e_ibdid=v["USERID"]; //企业编号
							return v;
						});
						//开始填充模板
						var doobj=doT.template($template_txxm_query);
						$this.html(doobj(result));
					}());
				}
			},
			error: function() {
				util.loadtip.hide();
			}
		});
	};
	//检查是否付费
	var _isfufei=function(hashobj){
		var result =false;
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "IsFuFei",
				ibdid:util.getsysinfo().groupid,
				proid:hashobj._para.proid
			},
			async:false,
			dataType: "json",
			success: function(msg) {
				msg.Result && msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
					if(msg.Data.table0[0].msg=="1"){
						result=true;
					}
				}());
			}
		});
		return result;
	};
	//付费接口
	var _fufei=function(hashobj){
		var result =false;
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "FuFei",
				ibdid:util.getsysinfo().groupid,
				proid:hashobj._para.proid,
				"e_ibdid":hashobj._para.ibdid
			},
			async:false,
			dataType: "json",
			success: function(msg) {
				msg.Result && msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
					if(msg.Data.table0[0].msg=="1" ||  msg.Data.table0[0].msg=="2" ){
						result=true;
					}
				}());
			}
		});
		return result;
	};
	//项目付费页面获取项目简介
	var _getprodesc=function(hashobj,$this){
		_gettrading(hashobj,function(result){
			$this.html(result[0].desc)
		});						
	}
	//根据编号信息获取企业信息
	var _gettrading=function(hashobj,fn){
		var result =[];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "gettrading",
				proid:hashobj._para.proid
			},
			dataType: "json",
			beforeSend:function(){
				util.loadtip.show();
			},
			success: function(msg) {
				util.loadtip.hide();
				msg.Result && msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
					console.log(msg.Data.table0);
					result=_.map(msg.Data.table0,function(v){
						v.desc=v["INTRO"] ? v["INTRO"]:"这家伙很懒，暂时没有简介.......";//项目简介
						v.name=v["TITLE"];
						v.rzjeend=v["AMOUNT_FINANCING_Y"];
						v.rzjestart=v["AMOUNT_FINANCING_C"];
						v.rzlx=v["CATEGORY"];
						v.sc=v["RONGZISHICHANG"];
						v.sshy=v["TRADE"];
						v.time=v["CREATE_DATE"];
						v.syjhs=v["SHANGYEJIHUASHU"];
						v.xmlxy=v["XIANGMULIANXIREN"];
						v.mphone=v["MPHONE"];
						v.email=v["EMAIL"];
						v.phone=v["PHONEAREA"]? v["PHONEAREA"]+"-"+(v["DIANHUAHAOMAFENJI"] ? v["PHONE"]+"-"+v["DIANHUAHAOMAFENJI"] : v["PHONE"]) :(v["DIANHUAHAOMAFENJI"] ? v["PHONE"]+"-"+v["DIANHUAHAOMAFENJI"] : v["PHONE"]);
						return v;
					});
					if(fn && _.isFunction(fn)){
						fn(result);
					};
				}());
			},error:function(){
				util.loadtip.hide();
			}
		});
	};
	//根据企业编号获取企业信息
	var _getenterprise=function(hashobj,fn){
		var result =[];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "getenterprise",
				e_ibdid:hashobj._para.ibdid
			},
			dataType: "json",
			beforeSend:function(){
				util.loadtip.show();
			},
			success: function(msg) {
				util.loadtip.hide();
				msg.Result && msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
					console.log(msg.Data.table0);
					result=_.map(msg.Data.table0,function(v){
						v.name=v["name"];
						v.qyxz=v["EType"]; //企业性质
						v.qygm=v["EScale"]; //企业规模
						v.sshy=v["Industry"];//所属行业
						v.fzjd=v["Stage"]; //发展阶段
						v.ygrs=v["StaffNum"];//人工人数
						v.zczj=v["RegFunds"];//注册资金
						v.zczj_rmb=v["RegFundsCurrency"];//注册资金币种
						v.sszb=v["ShiShouZiBen"];//实收资本
						v.sszb_rmb=v["ShiShouZiBenBiZhong"];//实收资本币种
						v.nxse=v["Sales"];//年销售额
						v.nxse_rmb=v["SalesCurrency"];//年销售额
						v.ssyq=!!v["County"] ? v["County"] :"&nbsp";//所属园区
						v.qywz=v["WebSite"];//企业网址
						v.bgdz=v["WorkAddress"];//办公地址
						return v;
					});
					if(fn && _.isFunction(fn)){
						fn(result);
					};
				}());
			},error:function(){
				util.loadtip.hide();
			}
		});
	};
	//初始化项目和企业信息
	var _getallinfo=function(hashobj,$txxm_pro,$txxm_e){
		//初始化项目信息
		_gettrading(hashobj,function(msg){
			var doobj=doT.template($template_xmxx_pro);
			$txxm_pro.html(doobj(msg[0]));
		});
		//初始化企业信息
		_getenterprise(hashobj,function(msg){
			var doobj=doT.template($template_xmxx_e);
			$txxm_e.html(doobj(msg[0]));
		});
	};
	//添加关注项目操作
	var _addgzxm=function(hashobj){
		var result =false;
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "THGZ_Add",
				ibdid:util.getsysinfo().groupid,
				proid:hashobj._para.proid,
				"e_ibdid":hashobj._para.ibdid,
				userid:util.getsysinfo().userid
			},
			async:false,
			dataType: "json",
			success: function(msg) {
				msg.Result && msg.Data && msg.Data.table0 && msg.Data.table0.length && (function(){
					if(msg.Data.table0[0].msg=="1" || msg.Data.table0[0].msg=="3"){
						// alert("关注成功!");
						result=true;
					}
				}());
			}
		});
		return result;
	}
	return {
		//初始化挑选项目首页enum信息
		initenum:_initenum,
		//初始化所属行业enum
		initenum_sshy:_initenum_sshy,
		//查询挑选项目列表信息
		query_txxm:_query_txxm,
		//检查是否付费
		isfufei:_isfufei,
		//付费接口
		fufei:_fufei,
		//根据编号信息获取企业信息
		gettrading:_getprodesc,
		//初始化详细页的项目和企业信息
		getallinfo:_getallinfo,
		//添加到已关注列表中
		addgzxm:_addgzxm
	}
});
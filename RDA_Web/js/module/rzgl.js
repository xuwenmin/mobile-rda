define(["zepto", "util", "underscore"], function($, util, _) {

	// 查看融资信息enum模板
	var $template = '{{ for(var i=0;i<it.length;i++) { }}' +
		'<li rel="li{{=i}}"  class="hassub">' +
		'<a href="#" class="desc">' +
		'{{=it[i].title}}<div class="list_next list_topright">' +
		'<img src="images/a_down.png" alt="" class="imgdown">' +
		'<img src="images/a_top.png" alt="" class="imgtop">' +
		'</div></a>' +
		'</li>' +
		'<li  name="li{{=i}}"  class="subli subli_desc">' +
		'<a href="#" class="desc">' +
		'<p class="pleft pleft_up">' +
		'项目发布时间:{{=it[i].time}}<br/>' +
		'项目所处状态:{{=it[i].status}}' +
		'</p>' +
		'<div class="list_next list_topright list_right_content">' +
		'<p class="pred">' +
		'<button class="rzbutton normal">查看</button>' +
		'<button class="rzbutton disable">编辑</button>' +
		'</p>' +
		'</div>' +
		'</a>' +
		'</li>' +
		'{{ } }}';

	//所属行业enum模板 
	var $template_enum = '<li><a href="#" class="desc">所属行业</a></li>' +
		'{{ for(var i=0;i<it.length;i++) { }}' +
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

	//融资类型enum模板
	var $template_rzlx_enum = '{{ for(var i=0;i<it.length;i++) { }}' +
		'<div class="enum_item">' +
		'<div class="divwhite hascheckbox" for="r_t{{=it[i].EnumID}}" toid="rzgl_rzlx" >' +
		'<img class="hide" src="images/select.png" alt="">' +
		'</div>' +
		'<p name="r_t{{=it[i].EnumID}}" data-eid="{{=it[i].EnumID}}" class="p_item">{{=it[i].EnumName}}</p>' +
		'</div>' +
		'{{ } }}';
	// 项是li组成的通用enum模板
	var $template_rzli_enum = '{{ for(var i=0;i<it.length;i++) { }}' +
		'<li data-eid="{{=it[i].EnumID}}">{{=it[i].EnumName}}</li>' +
		'{{ } }}';
	//查询融资详细信息
	var _getrzgl_desc = function(projectid) {
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			dataType: "json",
			data: {
				action: "Trading_Get",
				projectid: projectid,
				ibdid: util.getsysinfo().GroupID
			},
			success: function(msg) {
				console.log(msg);
			},
			error: function() {

			}
		});
	};

	//查询融资列表信息
	var _getrzgl_list = function($this) {
		var result = [];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			dataType: "json",
			data: {
				action: "Trading_List",
				ibdid: util.getsysinfo().GroupID
			},
			async: false,
			success: function(msg) {
				console.log(msg);
				if (msg.Result) {
					if (msg.Data.table0.length) {
						//开始过滤不符合条件的项
						result = _.map(msg.Data.table0, function(v) {
							//此处可以把参考值的相关信息加进去
							v.time = v["项目信息__发布时间"];
							v.title = v["项目信息__标题"];
							v.status = v["项目信息__融资状态"];
							v.id = v["项目信息__项目编号"];
							return v;
						});
					}
				};
				console.log(result);
				if (result.length) {
					//开始拼html
					var dotobj = doT.template($template);
					$this.append(dotobj(result));
				};
			},
			error: function(msg) {
				console.log(msg);
			}
		});
	};
	//通用的获取enum的ajax请求
	var _geteunmajax = function(typeid, fn) {
		var result = [];
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			data: {
				action: "Trading_Enum_Data",
				typeid: typeid,
				ibdid: util.getsysinfo().GroupID
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
	//获取所属行业enum
	var _getrzgl_enum = function(typeid, $this) {
		_geteunmajax(typeid, function(result) {
			if (result.length) {
				//开始拼html
				var dotobj = doT.template($template_enum);
				$this.html(dotobj(result));
				$("#sel_rzsshy").show();
			};
		});
	};
	//获取融资类型enum
	var _getrzgl_rzlx = function(typeid, $this) {
		_geteunmajax(typeid, function(result) {
			if (result.length) {
				//开始拼html
				var dotobj = doT.template($template_rzlx_enum);
				$this.html(dotobj(result));
			};
		});
	}
	//获取融资enum项是li组成的
	var _getrzgl_rzli = function(typeid, $this) {
		_geteunmajax(typeid, function(result) {
			if (result.length) {
				//开始拼html
				var dotobj = doT.template($template_rzli_enum);
				$this.html(dotobj(result));
			};
		});
	};
	//根据企业基本信息来回显
	var _displaybaseinfo=function(){
		var data=window.localStorage["e_baseinfo"] ? JSON.parse(window.localStorage["e_baseinfo"]) :undefined;
		if(data){
			$("#r_ename").val(data["E_基本信息__Name"] || "");
			$("#rzgl_qyxz").attr("data-val",data["E_基本信息__EType"] || ""); //企业性质
			$("#rzgl_qyxz").val(data["_E_基本信息__EType_"] || "");
			$("#rzgl_sshy").attr("data-val",data["E_基本信息__Industry"] || ""); //所属行业
			$("#rzgl_sshy").val(data["_E_基本信息__Industry_"] || "");
			$("#rzgl_qyrmb").attr("data-val",data["E_基本信息__SalesCurrency"] || ""); //年销售额币种
			$("#rzgl_qyrmb").val(data["_E_基本信息__SalesCurrency_"] || "");
			$("#r_Park").val(data["E_基本信息__Park"] || ""); //所属园区
			$("#r_Sales").val(data["E_基本信息__Sales"] || ""); //年销售额
		}
	};
	var _display_rzgl1=function(){
		var result=window.localStorage["rzgl_1"] ? JSON.parse(window.localStorage["rzgl_1"]):undefined;
		if(result){
		    $("#r_projectname").val(result["ProjectName"]); //项目名称
			$("#rzgl_rzlx").attr("data-val",result["Category"].k); //融资类型
			$("#rzgl_rzlx").val(result["Category"].v);
			$("#rzgl_sshy").attr("data-val",result["Trade"].k); //所属行业
			$("#rzgl_sshy").val(result["Trade"].v);
			$("#rzgl_sc").attr("data-val",result["RZSC"].k); //融资时长
			$("#rzgl_sc").val(result["RZSC"].v);
			$("#rzgl_rmb").attr("data-val",result["Currency"].k); //融资币种
			$("#rzgl_rmb").val(result["Currency"].v);
			$("#r_moneystart").val(result["MoneyBegin"]); //融资金额起
			$("#r_moneyend").val(result["MoneyEnd"]); //融资金额始
		}	
	};
	var _display_rzgl2=function(){
		var result=window.localStorage["rzgl_2"] ? JSON.parse(window.localStorage["rzgl_2"]):undefined;
		if(result){
		    $("#r_ename").val(result["Ename"]); //企业名称
			$("#rzgl_qyxz").attr("data-val",result["EType"].k); //企业性质
			$("#rzgl_qyxz").val(result["EType"].v);
			$("#rzgl_sshy").attr("data-val",result["Industry"].k); //所属行业
			$("#rzgl_sshy").val(result["Industry"].v);
			$("#rzgl_qyrmb").attr("data-val",result["SalesCurrency"].k); //年销售额币种
			$("#rzgl_qyrmb").val(result["SalesCurrency"].v);
			$("#r_Park").val(result["Park"]); //所属园区
			$("#r_Sales").val(result["Sales"]); //年销售额
			$("#r_LXR").val(result["LXR"]); //联系人
			$("#r_MPhone").val(result["MPhone"]);//联系电话
			$("#r_Email").val(result["Email"]);//邮箱
		}else{
			//则从企业基本信息中获取信息
			_displaybaseinfo();
		}	
	};
	//初始化enum信息
	var _initrzgl_enum = function() {

		//开始回显数据，只有从上一步过来的才能回显数据
		_display_rzgl1();

		//融资类型
		_getrzgl_rzlx("1", $("#rzgl_rzlx_item"));
		//融资时长
		_getrzgl_rzli("3", $("#rzgl_rzsc_item"));
		//融资币种
		_getrzgl_rzli("4", $("#rzgl_rzbz_item"));
	};
	//初始化发布融资2 enum信息
	var _initrzgl_enum2=function(){
		//开始回显数据，只有从上一步过来的时候才能回显
		_display_rzgl2();
		//企业性质
		_getrzgl_rzli("5", $("#rzgl_qyxz_item"));
		//企业币种
		_getrzgl_rzli("4", $("#rzgl_qyrmb_item"));
	};
	//发布融资第一步保存
	//先放在本地存储里
	var _saverzgl_1 = function() {
		//GroupID：企业id,UserID:用户id,ProjectName:项目名称,Category:融资类型,
		//Trade:所属行业,RZSC:融资时长,Currency:融资币种,MoneyBegin:融资金额起,MoneyEnd:融资金额始
		var GroupID = util.getsysinfo().GroupID; //企业id
		var UserID = util.getsysinfo().userid;
		var ProjectName = $("#r_projectname").val(); //项目名称
		var Category = $("#rzgl_rzlx").attr("data-val"); //融资类型
		var Category_desc=$("#rzgl_rzlx").val();
		var Trade = $("#rzgl_sshy").attr("data-val"); //所属行业
		var Trade_desc=$("#rzgl_sshy").val();
		var RZSC = $("#rzgl_sc").attr("data-val"); //融资时长
		var RZSC_desc=$("#rzgl_sc").val();
		var Currency = $("#rzgl_rmb").attr("data-val"); //融资币种
		var Currency_desc=$("#rzgl_rmb").val();
		var MoneyBegin = $("#r_moneystart").val(); //融资金额起
		var MoneyEnd = $("#r_moneyend").val(); //融资金额始
		var data = {
			"GroupID": GroupID,
			"UserID": UserID,
			"ProjectName":ProjectName, 
			"Category":{
				k:Category,
				v:Category_desc
			},
			"Trade":{
				k:Trade,
				v:Trade_desc
			},
			"RZSC":{
				k:RZSC,
				v:RZSC_desc
			},
			"Currency":{
				k:Currency,
				v:Currency_desc
			},
			"MoneyBegin":MoneyBegin,
			"MoneyEnd":MoneyEnd
		}
		for(var i in data){
			if(!!!data[i]){
				alert("亲，信息不完整！");
				return false;
			}
		}
		window.localStorage["rzgl_1"]=JSON.stringify(data);
		return true;
		//r_projectname,rzgl_rzlx,rzgl_sshy,rzgl_sc,rzgl_rmb,r_moneystart,r_moneyend
	};
	var _saverzgl_2 = function() {
		//LXR：联系人,MPhone:手机号码,PhoneArea:座机区号,Phone:座机号码,PhoneFJ:分机号码，Email：电子邮箱
		//EType：企业性质，Industry：所属行业，Sales：年销售额，SalesCurrency：年销售额币种，Park：所属园区
		var Ename = $("#r_ename").val(); //企业名称
		var EType = $("#rzgl_qyxz").attr("data-val"); //企业性质
		var EType_desc=$("#rzgl_qyxz").val();
		var Industry = $("#rzgl_sshy").attr("data-val"); //所属行业
		var Industry_desc=$("#rzgl_sshy").val();
		var SalesCurrency = $("#rzgl_qyrmb").attr("data-val"); //年销售额币种
		var SalesCurrency_desc=$("#rzgl_qyrmb").val();
		var Park = $("#r_Park").val(); //所属园区
		var Sales = $("#r_Sales").val(); //年销售额
		var PhoneArea="",Phone="",PhoneFJ="";
		var LXR=$("#r_LXR").val(); //联系人
		var MPhone=$("#r_MPhone").val();//联系电话
		var Email=$("#r_Email").val();//邮箱

		var data = {
			"EType":{
				k:EType,
				v:EType_desc
			},
			"Industry":{
				k:Industry,
				v:Industry_desc
			},
			"SalesCurrency":{
				k:SalesCurrency,
				v:SalesCurrency_desc
			},
			"Ename":Ename,"Park":Park,"Sales":Sales,"PhoneArea":"","Phone":"","PhoneFJ":"",
			"LXR":LXR,"MPhone":MPhone,"Email":Email
		}
		window.localStorage["rzgl_2"]=JSON.stringify(data);
		return true;
	}
	var _save=function(){
		//先从本地取第一步保存的信息
		//获取第二步要写的信息
		var data={
			action:"Trading_Edit",
		};
		$.ajax({
			url: "getdata.aspx",
			type: "get",
			dataType: "json",
			data: data,
			beforeSend: function() {
				util.loadtip.show();
			},
			success: function(msg) {
				console.log(msg);
			},
			error: function() {
				util.loadtip.hide();
			}
		});
	}
	return {
		//查看融资详细信息
		getrzgl_desc: _getrzgl_desc,
		//查看融资列表信息
		getrzgl_list: _getrzgl_list,
		//获取融资enum信息
		getrzgl_enum: _getrzgl_enum,
		//初始化发布融资第一步的enum信息
		initenum1: _initrzgl_enum,
		//初始化发布融资第二步的enum信息
		initenum2:_initrzgl_enum2,
		//保存第一步信息
		saverzgl_1:_saverzgl_1,
		//保存第二步信息
		saverzgl_2:_saverzgl_2
	}
});
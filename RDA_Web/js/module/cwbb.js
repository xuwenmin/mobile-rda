//财务报表相关操作js类
define(["util","underscore"],function(util,_){
	//财务报表-现金流量中的li模板内容

	var $template='{{ for(var i=0;i<it.length;i++) { }}'+
					'{{ if(it[i].HaveNext) { }}'+
						'<li rel="li{{=it[i].typeid}}" data-code="{{=it[i].typeid}}" class="hassub hasloadsub">'+
					 '{{ }else { }}'+
    					'<li>'+
    				  '{{ } }}'+
                            '<a href="#" class="desc">'+
                                 '<img src="images/icon2.png" alt="" class="icon">'+
                                 '{{=it[i].truename}}<div class="list_next list_topright">'+
                                 '<p>{{=it[i].Money}}</p>'+
                                 '{{ if(it[i].HaveNext) { }}'+
                                  ' <img src="images/a_down.png" alt="" class="imgdown">'+
                                 '<img src="images/a_top.png" alt="" class="imgtop">'+
                                  '{{ } }}'+
                             '</div></a>'+
                         '</li>'+
                         '{{ } }}';
    var $template_sub='{{ for(var i=0;i<it.length;i++) { }}'+
    ' <li name="li{{=it[i].fid}}" class="subli">'+
                             '<a href="#" class="desc">'+
                                 '{{=it[i].truename}}<div class="list_next list_topright">'+
                                 '<p>{{=it[i].Money}}</p>'+
                             '</div></a>'+
                         '</li>'+
                          '{{ } }}';
    //父级加上子级内容的模板
    var $template_indexsub='<li><a href="#" class="desc">{{=it._truename}}<p class="list_next list_topright">{{=it._Money}}</p></a></li>'+
   '{{ for(var i=0;i<it.length;i++) { }}'+
					'{{ if(it[i].HaveNext) { }}'+
						'<li rel="li{{=it[i].typeid}}" data-code="{{=it[i].typeid}}" class="hassub hasloadsub">'+
					 '{{ }else { }}'+
    					'<li>'+
    				  '{{ } }}'+
                            '<a href="#" class="desc">'+
                                 '<img src="images/icon2.png" alt="" class="icon">'+
                                 '{{=it[i].truename}}<div class="list_next list_topright">'+
                                 '<p>{{=it[i].Money}}</p>'+
                                 '{{ if(it[i].HaveNext) { }}'+
                                  ' <img src="images/a_down.png" alt="" class="imgdown">'+
                                 '<img src="images/a_top.png" alt="" class="imgtop">'+
                                  '{{ } }}'+
                             '</div></a>'+
                         '</li>'+
                         '{{ } }}';                   
    var $template_index=' <div to="zcfz_sub!/fid={{=it[0].typeid}}" class="f1 qmcenter">'+
                            '<div class="item_desc item_desc_w100">'+
                                '<img src="images/zcicon.png" alt=""/>'+
                                '<p>{{=it[0].truename}}</p>'+
                                '<p>{{=it[0].Money}}</p>'+
                            '</div>'+
                        '</div>'+
                        '<div to="zcfz_sub!/fid={{=it[1].typeid}}" class="r1 qmcenter">'+
                            '<div class="item_desc item_desc_w100">'+
                                '<img src="images/fzicon.png" alt=""/>'+
                                '<p>{{=it[1].truename}}</p>'+
                                '<p>{{=it[1].Money}}</p>'+
                            '</div>'+
                        '</div>'+
                        '<div to="zcfz_sub!/fid={{=it[2].typeid}}" class="r1 r2 qmcenter">'+
                            '<div class="item_desc item_desc_w100">'+
                                '<img src="images/syzqyicon.png" alt=""/>'+
                                '<p>{{=it[2].truename}}</p>'+
                                '<p>{{=it[2].Money}}</p>'+
                            '</div>'+
                        '</div>';

	//根据父级获取相关信息
	var _getcwbb_byfid=function(fid,$this,typename){
		var result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:typename,fid:fid,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						//开始加载子项
						var dotobj=doT.template($template);
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							v.HaveNext=v.HaveNext ? true:false;
							return v;
						});
						$this.html(dotobj(result));
						// console.log(msg);
					}
				}			
				util.loadtip.hide();
			},
			error:function(){
				util.loadtip.hide();
			}
		});
	};
	//获取子级的相关信息
	var _getcwbb_sub_byfid=function(fid,$this,typename){
		var result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:typename,fid:fid,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						//开始加载子项
						var groupname = $this.attr("rel");
						$("[name=" + groupname + "]").remove();
						var dotobj=doT.template($template_sub);
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							v.HaveNext=v.HaveNext ? true:false;
							v.fid=fid;
							return v;
						});
						$this.after(dotobj(result));
						$("[name=" + groupname + "]").show();
						// console.log(msg);
					}
				}			
				util.loadtip.hide();
			},
			error:function(){
				util.loadtip.hide();
			}
		});
	};
	//根据父级获取财务报表-资产负债 相关信息
	var _getcwbb_zcfz=function(fid,$this){
		var result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Report_Assets_Data",fid:fid,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						//开始加载子项
						var dotobj=doT.template($template);
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							v.HaveNext=v.HaveNext ? true:false;
							return v;
						});
						$this.append(dotobj(result));
						// console.log(msg);
					}
				}				
				util.loadtip.hide();
			},
			error:function(){
				util.loadtip.hide();
			}
		});
	};
	//根据父级获取财务报表-资产负债 相关信息
	var _getcwbb_zcfz_sub=function(fid,$this){
		var result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Report_Assets_Data",fid:fid,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						//开始加载子项
						var groupname = $this.attr("rel");
						$("[name=" + groupname + "]").remove();
						var dotobj=doT.template($template_sub);
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							v.HaveNext=v.HaveNext ? true:false;
							v.fid=fid;
							return v;
						});
						$this.after(dotobj(result));
						$("[name=" + groupname + "]").show();
					}
				}			
				util.loadtip.hide();
			},
			error:function(){
				util.loadtip.hide();
			}
		});
	};
	//根据父级获取财务报表-资产负债 相关信息 资产负债首页应用
	var _getcwbb_zcfz_index=function(){
		var result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Report_Assets_Data",fid:0,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			async:false,
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							return v;
						});
						//开始加载子项
						if("localStorage" in window){
							window.localStorage["cwbb_index"]=JSON.stringify(result);
						}
					}
				}		
			}
		});
	};
	//选择日期自动更新财务报表-资产负债 
	var _getcwbb_zcfz_upindex=function($this){
		var result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Report_Assets_Data",fid:0,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							return v;
						});
						//开始加载子项
						if("localStorage" in window){
							window.localStorage["cwbb_index"]=JSON.stringify(result);
						}
						var dotobj=doT.template($template_index);
						$this.html(dotobj(result));
					}
				}
				util.loadtip.hide();		
			},error:function(){
				util.loadtip.hide();
			}
		});
	};

	var _getcwbb_upsub=function(hashobj,$this){
		var result=[];
		var rel_result=[];
		var dateinfo=localStorage["dateinfo"] ? JSON.parse(localStorage["dateinfo"]):{};
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Report_Assets_Data",fid:0,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						result=_.map(msg.Data.table0,function(v){
							v.Money=util.getFloat2(v.Money);
							return v;
						});
						var code=(_.where(result, {
                            "typeid": parseInt(hashobj._para.fid)
                        }))[0];
						//开始获取当前hash中的子集
						$.ajax({
							url:"getdata.aspx",
							type:"get",
							dataType:"json",
							data:{action:"Report_Assets_Data",fid:hashobj._para.fid,ibdid:util.getsysinfo().GroupID,year:dateinfo.year,month:dateinfo.month},
							success:function(msg){
								if(msg.Result){
									if(msg.Data.table0.length){
										//开始加载子项
										var dotobj=doT.template($template_indexsub);
										rel_result=_.map(msg.Data.table0,function(v){
											v.Money=util.getFloat2(v.Money);
											v.HaveNext=v.HaveNext ? true:false;
											v.fid=hashobj._para.fid;
											return v;
										});
										rel_result._truename=code.truename;
										rel_result._Money=code.Money;
										$this.html(dotobj(rel_result));
									}
								}			
								util.loadtip.hide();
							}
						});
					}
				}	
			},error:function(){
				util.loadtip.hide();
			}
		});
	}
	return {
		//获取相关父级信息
		getcwbb_byfid:_getcwbb_byfid,
		//获取相关子级信息
		getcwbb_sub_byfid:_getcwbb_sub_byfid,
		//根据父级获取财务报表-资产负债 相关信息
		getcwbb_zcfz:_getcwbb_zcfz,
		////根据父级获取财务报表-资产负债 子级 相关信息
		getcwbb_zcfz_sub:_getcwbb_zcfz_sub,
		//根据父级获取财务报表-资产负债 相关信息 为首页准备
		getcwbb_zcfz_index:_getcwbb_zcfz_index,
		//根据父级获取财务报表-资产负债 更新相关信息
		getcwbb_zcfz_upindex:_getcwbb_zcfz_upindex,
		//根据父级获取财务报表-资产负债 更新子集相关信息
		getcwbb_zcfz_upsub:_getcwbb_upsub,
	};
});
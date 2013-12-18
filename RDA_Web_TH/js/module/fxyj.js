// 风险预警js功能模块.by xuwm
define(["zepto","util","underscore"],function($,util,_){
	//风险预警--现金流量--现金到期债务比 图表
	var createchart_fxyj_tb = function(hash) {
		var _data=hash.para;
		var arg=_data.vals;//所有月份的数剧
		//获取所有的月份值和月份
		var month_arg=[];
		var month_val=[];

		_.each(arg,function(v,k){ 
			month_arg.push(v.cmonth+"月");
			month_val.push(v.cval);
		})
		//参考值
		var codenumber=parseFloat(_data.codenumber);

	    var data = [{
	        name: 'rda',
	        value: month_val,
	        color: '#00ac82',
	        line_width: 3
	    }];
	    var chart = new iChart.LineBasic2D({
	        render: 'fxyj_zhsl_tb',
	        data: data,
	        title: {
	            text: '参考值:'+codenumber,
	            color: '#666',
	            textAlign: 'right',
	            fontsize: 12,
	            offsetx: -20
	        },
	        width: parseFloat($("body").offset().width),
	        height: 200,
	        coordinate: {
	            height: '80%',
	            background_color: null,
	            gridlinesVisible: false,
	            axis: {
	                color: "#d9d9d9",
	                width: [0, 0, 1, 0]
	            },
	            scale: [{
	                position: 'left',
	                start_scale: 0,
	                end_scale: 40,
	                scale_enable: false,
	                listeners: {
	                    parseText: function(t, x, y) {
	                        return {
	                            text: ""
	                        }
	                    }
	                }
	            }, {
	                position: 'bottom',
	                label: {
	                    color: '#666',
	                    font: '微软雅黑',
	                    fontsize: 11,
	                    fontweight: 600
	                },
	                scale_enable: false,
	                labels: month_arg
	            }]
	        },
	        listeners: {
	            parsePoint: function(d, v, x, y, j) {
	                if (v < 20) {
	                    return {
	                        color: '#eb3d3d'
	                    }
	                } else if (v == 20) {
	                    return {
	                        color: '#ff9600'
	                    }
	                }
	            }
	        },
	        border: {
	            enable: false
	        },
	        sub_option: {
	            hollow_inside: false, //设置一个点的亮色在外环的效果
	            point_size: 10,
	            hollow: false,
	            smooth: false,//true为曲线
	            label: {
	                color: "blank",
	                fontsize: 0
	            }
	        }
	    });
	   /* chart.plugin(new iChart.Custom({
	        drawFn: function() {
	            var coo = chart.getCoordinate(),
	                x = coo.get('originx'),
	                W = coo.width,
	                S = coo.getScale('left'),
	                H = coo.height,
	                y = H;
	            var base = (coo.height / S.distance) * 20 + chart.y;
	            var startx = x,
	                endx = x;
	            var len = W / 10;
	            for (var i = 1; i < len; i++) {
	                endx = startx + 10;
	                chart.target.line(startx, base, endx, base, 1, '#999');
	                startx = startx + 20;
	                if (startx > (x + W)) break;
	            }
	        }
	    }));*/
	    chart.draw();
	};
	var $template='{{ for(var i=0;i<it.length;i++) { }}'+
	'<li  name="li{{=it[i].code}}" to="fxyj_tb!/code={{=it[i].id}}" class="subli">'+
                                '<a href="#fxyj_tb!/code={{=it[i].id}}" class="desc">'+
                                    '{{=it[i].name}}<div class="list_next list_topright">'+
                                    '<img src="images/a_right.png" alt="">'+
                                '</div></a>'+
                             '</li>'+
                             '{{ } }}';
    var $template_cwbb='{{ for(var i=0;i<it.length;i++) { }}'+
    ' <li  name="li{{=it[i].code}}" class="subli">'+
                             '<a href="#" class="desc">'+
                                 '<p class="pleft">{{=it[i].Name}}</p><div class="list_next list_topright list_right_content">'+
                                  '<p class="pred">{{=it[i].State}}</p>'+
                                  '<p class="p12">{{=it[i].ReportType}} {{=it[i].Year}}</p>'+
                             '</div></a>'+
                         '</li>'+
                         '{{ } }}';
	var codeinfo={
		//综合实力代码
		1:"综合实力分析--经营能力",2:"综合实力分析--偿债能力--短期偿还",3:"综合实力分析--偿债能力--长期偿还",
		4:"综合实力分析--获利能力",5:"综合实力分析--盈利质量--收入质量",6:"综合实力分析--盈利质量--利润质量",
		7:"综合实力--发展潜力",
		//资产质量代码
		8:"资产质量--资产利用效率",
		//现金流量代码
		9:"现金流量分析_流动性分析",10:"现金流量--获取现金能力",11:"现金流量--现金保障能力"
	};
	//通过父级获取子级相关可用项
	var _getsubitembycode=function(code,$this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Index_OtherFinancial_Data",code:code,ibdid:util.getsysinfo().GroupID},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				//此处开始检查业务逻辑
				//1.检查子项的数据是否为空，为空，则过滤掉
				//2.检查子项的数据最后一项是不是当前月减1,假如当前月是1月，则最后一月要是12
				//3.最后检查子项数据最后一项是不是比参考值小或者相等
				if(msg.length>1){
					if(msg[0].Data.table0.length){
						if(msg[0].Data.table0[0].InfoList.length){
							//开始过滤不符合条件的项
							result=_.filter(msg[0].Data.table0[0].InfoList,function(v){
								//规则1
								if(!v.vals.length){
									return false;
								}
								//规则2
								//子项编号
								var id=v.id;
								var curmonth=(new Date()).getMonth()+1;
								if(curmonth!=1){
									curmonth=curmonth-1;
								}else{
									curmonth=12;
								}
								var argitem=_.where(v.vals,{cmonth:curmonth});
								if(!argitem.length) return false;
								//与参考值进行对比
								var argcode=_.where(msg[1].Data.table0,{"参考值说明__编号":id});
								if(!argcode.length) return false;
								if(parseFloat(argitem.cval)>parseFloat(argcode[0]["参考值说明__参考值"])) return false;
								return true;
							});
							//生成一个符合要求，并且增加参考值属性的数组
							result=_.map(result,function(v){
								//此处可以把参考值的相关信息加进去
								var argcode=_.where(msg[1].Data.table0,{"参考值说明__编号":v.id});
								v.codenumber=argcode[0]["参考值说明__参考值"];
								v.codegongshi=argcode[0]["参考值说明__计算公式"];
								v.codename=argcode[0]["参考值说明__名称"];
								v.codeinfo=argcode[0]["参考值说明__参考值含义"];
								v.codedesc=argcode[0]["参考值说明__参考值说明"];
								v.code=code;
								return v;
							});
							//更新或者保存到localstorage里去
							if("localStorage" in window){
								window.localStorage["fxyj_tb"]=JSON.stringify(result);
							}
						}
					}
				}
				if(result.length){
					//开始拼html
					var groupname = $this.attr("rel");
					$("[name=" + groupname + "]").remove();
					var dotobj=doT.template($template);
					$this.after(dotobj(result));
					$("[name=" + groupname + "]").show();
				}
				util.loadtip.hide();
			},
			error:function(){
				util.loadtip.hide();
			}
		});
	};
	//通过风险预警的财务报表父类，获取子类信息
	var _get_fxyj_cwbb=function(code,$this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Risk_Report_Data",flag:code,ibdid:util.getsysinfo().GroupID},
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						//开始加载子项
						var groupname = $this.attr("rel");
						$("[name=" + groupname + "]").remove();
						var dotobj=doT.template($template_cwbb);
						result=_.map(msg.Data.table0,function(v){
							v.code=code;
							if(!v.Name){
								v.Name=v.ReportType;
							}
							if(v.Month!=="--"){
								v.Year=v.Year+v.Month;
							}
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
	//获取风险预警统计相关信息
	var _get_fxyj_tjinfo=function(){
		$.ajax({
			url:"getdata.aspx",
			data:{action:"Risk_Count_Data",ibdid:util.getsysinfo().GroupID},
			type:"get",
			dataType:"json",
			async:false,
			success:function(msg){
				if(msg.Result){
					if(msg.Data.table0.length){
						if("localStorage" in window){
							window.localStorage["fxyj_index"]=JSON.stringify(msg.Data.table0[0]);
						}
					}
				}				
			    // console.log(msg);
			}
		});
	};
	return {
		//统一创建风险预警图表信息
		createchart_fxyj_tb:createchart_fxyj_tb,
		//通过父级获取下面可用的子级，需要跟参考值进行对比
		getsubitembycode:_getsubitembycode,
		//获取风险预警首页，统计数量信息
		get_fxyj_tjinfo:_get_fxyj_tjinfo,
		//获取风险预警，财务报表信息
		get_fxyj_cwbb:_get_fxyj_cwbb
	}
});
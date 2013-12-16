define(["zepto","util","underscore"],function($,util,_){

	var $template='{{ for(var i=0;i<it.length;i++) { }}'+
	 '<li rel="li{{=i}}"  class="hassub">'+
                            '<a href="#" class="desc">'+
                                '{{=it[i].title}}<div class="list_next list_topright">'+
                                '<img src="images/a_down.png" alt="" class="imgdown">'+
                                '<img src="images/a_top.png" alt="" class="imgtop">'+
                            '</div></a>'+
                        '</li>'+
                        '<li  name="li{{=i}}"  class="subli subli_desc">'+
                            '<a href="#" class="desc">'+
                               '<p class="pleft pleft_up">'+
                                   '项目发布时间:{{=it[i].time}}<br/>'+
                                   '项目所处状态:{{=it[i].status}}'+
                               '</p>'+
                               '<div class="list_next list_topright list_right_content">'+
                                '<p class="pred">'+
                                    '<button class="rzbutton normal">查看</button>'+
                                    '<button class="rzbutton disable">编辑</button>'+
                                '</p>'+
                            '</div>'+
                            '</a>'+
                        '</li>'+
                         '{{ } }}';
    var $template_enum='<li><a href="#" class="desc">所属行业</a></li>'+
    '{{ for(var i=0;i<it.length;i++) { }}'+
    ' <li rel="li{{=it[i].EnumID}}"  class="hassub">'+
                                    '<a href="#" class="desc">'+
                                      '<div class="enum_item enum_item80">'+
                                           '<div class="divwhite">'+
                                            '<img class="hide" src="images/select.png" alt=""/>'+
                                         '</div>'+
                                         '<p class="p_item">{{=it[i].EnumName}}</p>'+
                                      '</div>'+
                                      '{{ if(it[i].ischild) { }}'+
                                      '<div class="list_next list_topright">'+
                                         '<img src="images/a_down.png" alt="" class="imgdown">'+
                                         '<img src="images/a_top.png" alt="" class="imgtop">'+
                                       '</div>'+
                                       '{{  } }}'+
                                     '</a>'+
                                 '</li>'+
                                  '{{ if(it[i].ischild) { }}'+
                                 '<li name="li{{=it[i].EnumID}}" class="subli subli_desc">'+
                                    '<a href="#" class="desc">'+
                                     '{{ for(var j=0;j<it[i].childs.length;j++) { }}'+
                                        '<div class="enum_item">'+
                                             '<div class="divwhite">'+
                                              '<img class="hide" src="images/select.png" alt=""/>'+
                                           '</div>'+
                                           '<p class="p_item">{{=it[i].childs[j].EnumName}}</p>'+
                                       '</div>' +
                                        '{{ } }}'+
                                    '</a>'+
                                '</li>'+
                                 '{{  } }}'+
                                 '{{ } }}';
	//查询融资详细信息
	var _getrzgl_desc=function(projectid){
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Trading_Get",projectid:projectid},
			success:function(msg){
				console.log(msg);
			},
			error:function(){

			}
		});
	};

	//查询融资列表信息
	var _getrzgl_list=function($this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			dataType:"json",
			data:{action:"Trading_List"},
			async:false,
			success:function(msg){
				console.log(msg);
				if(msg.Result){
					if(msg.Data.table0.length){
							//开始过滤不符合条件的项
						result=_.map(msg.Data.table0,function(v){
								//此处可以把参考值的相关信息加进去
								v.time=v["项目信息__发布时间"];
								v.title=v["项目信息__标题"];
								v.status=v["项目信息__融资状态"];
								v.id=v["项目信息__项目编号"];
								return v;
						});
					}
				};
				console.log(result);
				if(result.length){
					//开始拼html
					var dotobj=doT.template($template);
					$this.append(dotobj(result));
				};
			},
			error:function(msg){
				console.log(msg);
			}
		});
	};

	var _getrzgl_enum=function(typeid,$this){
		var result=[];
		$.ajax({
			url:"getdata.aspx",
			type:"get",
			data:{action:"Trading_Enum_Data",typeid:typeid},
			dataType:"json",
			beforeSend:function(){
				util.loadtip.show();
			},
			success:function(msg){
				// console.log(msg);
				//对这些enum信息进行按父子进行分组行成这样的结构
				/*
				**{ id,childs:[{id,info....}]}
				*/
				result=msg.Data["table0"] || msg.Data["Table1"] ;
				//深度depth:2相对于typeid来说是子级，但是在结果里是父级
				var parenarg=_.where(result,{Depth:2});
				//假定depth只到3
				var childarg=_.filter(result, function(v){ 
					return v.Depth!==2; 
				});
				result=_.map(parenarg,function(v){
					v.childs=_.where(childarg,{ParentID:v.EnumID});
					if(v.childs.length){
						v.ischild=true;
					}
					return v;
				});
				if(result.length){
					//开始拼html
					var dotobj=doT.template($template_enum);
					$this.html(dotobj(result));
				};
				util.loadtip.hide();
				console.log(result);
				//开始拼html

			},error:function(){
				util.loadtip.hide();
			}
		});
	};
	return {
		//查看融资详细信息
		getrzgl_desc:_getrzgl_desc,
		//查看融资列表信息
		getrzgl_list:_getrzgl_list,
		//获取融资enum信息
		getrzgl_enum:_getrzgl_enum
	}
});
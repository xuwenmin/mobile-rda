//财务指标功能模块.by xuwm 
define(["zepto", "util"], function($, util) {
	//根据财务指表code获取相关信息
	var getDescByCode = function(code) {
		var codedesc = {
			2: "货币资金",
			4: "存款",
			8: "应收账款",
			19: "流动资产",
			44: "固定资产",
			63: "非流动资产",
			64: "总资产",
			66: "短期借款",
			69: "应付账款",
			83: "流动负债",
			86: "长期借款",
			98: "非流动负债",
			114: "所有者权益",
			118: "主营业务收入净额",
			126: "主营业务利润",
			146: "营业外收入",
			0: "三项费用",
			159: "利润总和",
			164: "净利润"
		}
		//分类，资产和向负债是一组，损益是一组
		var typearg = {
			"normal": [2, 4, 8, 19, 44, 63, 64, 66, 69, 83, 86, 98, 114],
			"other": [118, 126, 146, 0, 159, 164]
		}

		code = parseInt(code);
		var _type;
		for (var k in typearg) {
			if (_.contains(typearg[k], code)) {
				_type = k;
				break;
			}
		}
		return {
			desc: codedesc[code],
			type: _type
		};
	};
	//财务指标--货币资金 图表
	var createchart_cwzb = function(_data, hash) {
		console.log(_data);
		//如果数据为空，则退出
		if (!_data.Result) return;
		if (_data.Data.table0.length < 12) {
			alert("亲，暂时无数据！");
			return;
		}
		var monthvalue = [];
		var codeinfo = getDescByCode(hash.para.code);
		//构造月份值
		for (var i = 0; i < 12; i++) {
			if (codeinfo.type == "normal") {
				monthvalue.push(_data.Data.table0[i].MonthEnd);
			} else {
				monthvalue.push(_data.Data.table0[i].money);
			}
		}
		var data = [{
			name: '北京',
			value: monthvalue,
			color: '#00ac82',
			line_width: 3
		}];
		var chart = new iChart.LineBasic2D({
			render: 'cwzb_hbzj',
			data: data,
			title: {
				//text: '参考值:20',
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
						fontsize: 12,
						fontweight: 600
					},
					scale_enable: false,
					labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
				}]
			},
			border: {
				enable: false
			},
			sub_option: {
				hollow_inside: false, //设置一个点的亮色在外环的效果
				point_size: 10,
				hollow: false,
				smooth: true,
				label: {
					color: "white",
					fontsize: 0
				}
			}
		});
		chart.draw();

		//本期结余=当月数值,本年累计=当年12月数值,年度期初=当年1月数值
		//赋值当前图表类型
		var curmonth = parseInt((new Date()).getMonth());
		$("#cwzb_hbzj_type").html(codeinfo.desc);
		if (codeinfo.type == "normal") {
			$("#cwzb_hbzj_m1").html(util.getFloat2(_data.Data.table0[curmonth].MonthEnd));
			$("#cwzb_hbzj_m2").html(util.getFloat2(_data.Data.table0[11].MonthEnd));
			$("#cwzb_hbzj_m3").html(util.getFloat2(_data.Data.table0[0].MonthBegin));
		} else {
			$("#cwzb_hbzj_m1").html(util.getFloat2(_data.Data.table0[curmonth].money));
			$("#cwzb_hbzj_m2").html(util.getFloat2(_data.Data.table0[11].money));
			$("#cwzb_hbzj_m3").html(util.getFloat2(_data.Data.table0[0].money));
		}
	};
	return {
		getDescByCode: getDescByCode,
		createchart_cwzb: createchart_cwzb
	}
});
/**
 * Created with JetBrains PhpStorm.
 * User: xuwenmin
 * Date: 13-10-22
 * Time: 上午11:37
 * To change this template use File | Settings | File Templates.
 */
require.config({
    baseUrl: "js",
    paths:{
        "zepto":"zepto.min",
        "underscore":"underscore.min",
        "iscroll":"iscroll",
        "ichart":"ichart.1.2.min",
        "base":"base",
        //子模块JS
        "cwzb":"module/cwzb",//财务指标
        "fxyj":"module/fxyj",//风险预警
        "index":"module/index",//首页
        "cwbb":"module/cwbb",
        "util":"module/util"    //公共
    },
    shim:{
        "iscroll":{
            exports:"iScroll"
        },
        "ichart":{
            exports:"iChart"
        },
        "zepto":{
            exports:"$"
        },
        "underscore":{
            exports:"_"
        },
        "base":{
           deps:["underscore","zepto","iscroll","ichart"] 
        }
    },
    // 处理js cache问题
    urlArgs:"r=" + (+new Date()) 
});
require(['base'],function(base){
    base.init();
});


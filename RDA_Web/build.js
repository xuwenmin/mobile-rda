({
    appDir: './js',
    baseUrl: '.',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths:{
        "zepto":"zepto.min",
        "underscore":"underscore.min",
        "offset":"extend/offset",
        "position":"extend/position",
        "iscroll":"iscroll",
        "ichart":"ichart.1.2.min",
        "base":"base",
        //子模块JS
        "cwzb":"module/cwzb",//财务指标
        "fxyj":"module/fxyj",//风险预警
        "index":"module/index",//首页
        "util":"module/util"    //公共
    },
    shim:{
        "iscroll":{
            exports:"iScroll"
        },
        "ichart":{
            exports:"iChart"
        },
        "position":{
            deps:["offset"]
        },
        "offset":{
            deps:["zepto"]
        },
        "zepto":{
            exports:"$"
        },
        "underscore":{
            exports:"_"
        },
        "base":{
           deps:["underscore","position","iscroll","ichart"] 
        }
    }
})

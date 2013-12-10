require.config({
    baseUrl: "js",
    paths:{
       "test1":"test1",
       "test2":"test2",
       "jquery":"jquery-1.9.1.min"
    },
    shim:{
        "jquery":{
            exports:"$"
        }
    },
    // 处理js cache问题
    urlArgs:"bust=" + (new Date()).getTime() 
});

require(["test2"],function(test2){
    test2.init();
});



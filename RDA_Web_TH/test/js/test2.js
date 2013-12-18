define(["jquery"],function($){
	var _init=function(){
		$("#but1").click(function(){
			require(["test1"],function(){
				alert("111111");
			});
		});
	};
	return {
		init:function(){
			_init();
		}
	}
});
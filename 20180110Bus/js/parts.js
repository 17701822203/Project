
(function($){

	setInterval('AutoScroll(".my-scroll")',2000)
})(jQuery);
function AutoScroll(obj){
	$(obj).find("ul:first").animate({
		marginTop:"-1.475rem"
	},800,function(){
		$(this).css({marginTop:"0rem"}).find("li:first").appendTo(this);
	});
}
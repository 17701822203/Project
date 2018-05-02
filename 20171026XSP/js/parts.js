$(document).ready(function(){
	var tabs=$(".js_tab");
	tabs.each(function(){
		$(this).find(".jsTab_title li").first().addClass("on");
		$(this).find(".jsTab_con").first().show();
	});
	$(".box1").js_tab();
//            $(".box2").js_tab();
//            $(".box3").js_tab();
//            $(".box4").js_tab();
//            $(".box5").js_tab();
});
(function($){
	$.fn.extend({
		"js_tab":function(){
			$(this).find(".jsTab_title li").each(function(index){
				$(this).click(function(){
					$(this).siblings("li").removeClass("on");
					$(this).addClass("on");
					var tab_c=$(this).parents(".js_tab").find(".jsTab_con");
					tab_c.hide();
					tab_c.eq(index).show();
				});
				return $(this);
			});
		}
	});
	setInterval('AutoScroll(".my-scroll")',2000)
})(jQuery);
function AutoScroll(obj){
	$(obj).find("ul:first").animate({
		marginTop:"-1.55rem"
	},800,function(){
		$(this).css({marginTop:"0rem"}).find("li:first").appendTo(this);
	});
}
/*Created by huang.jun on 16-03-15*/
$(document).ready(function() {
	$(".canyuBtn").first().css("display","none")
	$(".mobLst").first().css("display","none")
	$(".bmcg").first().css("display","none")
	$("section").first().css("display","none")
	$(".ewm").first().css("display","none")
	$(".sjq,.clickme").click(function(){
		$(".cb").animate({width:"0",height:"0",left:"8rem",top:"13rem",opacity:"0"},1000);
		$(".clickme").animate({opacity:"0"},1000);
		$(".mobLst").first().css("display","block")
		$(".mobLst").animate({opacity:"1"},1000);
		$(".canyuBtn").first().css("display","block")
		$(".canyuBtn").animate({opacity:"1"},1000);
	})
	$(".canyuBtn").click(function(){
		$(".mobLst,.canyuBtn").animate({opacity:"0"},1000);
		$("section").first().css("display","block")
		$("section").animate({opacity:"1"},1000);
		//$(".clickme").animate({opacity:"1"},1000);
		//$(".bmcg").first().css("display","block")
		//$(".bmcg").animate({opacity:"1"},1000);
	})
});


















































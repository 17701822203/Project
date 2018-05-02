$(document).ready(function(){
	$(".shake-slow").click(function(){
		$('section').show();
		$(".Top_Btn").removeClass("shake-slow ");
	})
	$(".shadow").click(function(){
		$('section').hide();
	})
})
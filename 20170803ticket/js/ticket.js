/*Created by huang.jun on 17-08-03*/
$(document).ready(function(){

	$("#nav-wrap span").click(function(){
		$(".sNav").toggle();
	})
	$("#nav-wrap a").click(function(){
		$(".sNav").hide();
	});

	var obj = $('.list-box');
	obj.find('.bor-orange-js').on('click',function(){
		var thisSpan = $(this).children('span');
		if(!thisSpan.hasClass('on')){
			obj.find('.bor-orange-js').children('span').removeClass('on');
			obj.find('.lab').hide();
			thisSpan.addClass('on');
			//$("html,body").scrollTop(thisSpan.offset().top-10);
			$(this).siblings(".lab").show();
		}else{
			thisSpan.removeClass('on');
			$(this).siblings('.lab').hide();
		}
	});

	$(".LayBtn").click(function(){
		$("section").show();
	});
	$(".CloseBtn,.shadow").click(function(){
		$("section").hide();
	});

	$('#countdown').countDown({
		targetDate: {
			'day':17,
			'month':8,
			'year':2017,
			'hour':0,
			'min':0,
			'sec':0
		}
	});

});
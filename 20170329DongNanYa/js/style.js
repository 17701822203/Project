/*Created by huang.jun on 17-03-29*/
$(document).ready(function(){
    $("#TopNav li").first().addClass("on")
    var nav=$("#TopNav li");
    nav.click(function(){
        $(this).addClass("on").siblings().removeClass("on");
    })
    $('#TopNav li.nav1').click(function(){$('html,body').animate({scrollTop:$('.md1').offset().top}, 800);});
    $('#TopNav li.nav2').click(function(){$('html,body').animate({scrollTop:$('.md2').offset().top}, 800);});
    $('#TopNav li.nav3').click(function(){$('html,body').animate({scrollTop:$('.md3').offset().top}, 800);});
    $('#TopNav li.nav4').click(function(){$('html,body').animate({scrollTop:$('.md4').offset().top}, 800);});
})

















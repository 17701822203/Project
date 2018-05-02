$(document).ready(function(){
    $('.subNav_menu ul li').on("click",function(){
        $(this).addClass("subNav_curr").siblings().removeClass("subNav_curr");
    })
    var screenWidth = $(window).width();
    var liWidth=80;
    var numMin = parseInt ( screenWidth/liWidth/2 );
    var menuWidth = $('.subNav_menu ul').outerWidth();
    var liNum = $('.subNav_menu ul li').length ;
    var allLi = 0;
    for(var i = 0; i < liNum; i++){
        allLi += $('.subNav_menu ul li').eq(i).outerWidth();
    }
    for (var i = 0; i < numMin; i++) {
        $('.subNav_menu ul li').eq(i).click(function(){
            $('.subNav_menu').scrollLeft( 0 );
        });
    }
    for (var i = numMin; i < (liNum-numMin); i++) {
        $('.subNav_menu ul li').eq(i).click(function(){
            var index = $(this).index();
            var len=0;
            for (var i = numMin; i < index; i++) {
                var len1 =  $('.subNav_menu ul li').eq(i).outerWidth();
                len = len + len1;
            }
            $('.subNav_menu').scrollLeft( (liWidth+4)*(index-numMin)+len- liWidth*(index-numMin) );
        });
    }
    for (var i = (liNum-numMin) ; i < liNum ; i++) {
        $('.subNav_menu ul li').eq(i).click(function(){
            $('.subNav_menu').scrollLeft( allLi - menuWidth + liWidth  );
        });
    }

    $(".subNav_choose").on("click",function(){
        $(".subNav_chooseCont").css({"opacity":"1","visibility":"visible"});
    })
    $(".chooseCont_close").on("click",function(){
        $(".subNav_chooseCont").css({"opacity":"0","visibility":"hidden"});
    })
    $(".chooseCont_list li").on("click",function(){
        var currIndex=$(".chooseCont_list li").index(this);
        $(".subNav_chooseCont").css({"opacity":"0","visibility":"hidden"});
        $(".subNav_menu ul li").eq(currIndex).addClass("subNav_curr").siblings().removeClass("subNav_curr");
        $('.subNav_menu ul li').eq(currIndex).trigger("click");
    })
});

window.onload=function(){
    auto_data_size();
};
function auto_data_size(){
    var imgss= $("figure img");
    $("figure img").each(function() {
        var imgs = new Image();
        imgs.src=$(this).attr("src");
        var w = imgs.width,
            h =imgs.height;
        $(this).parent("a").attr("data-size","").attr("data-size",w+"x"+h);
    })
};
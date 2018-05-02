/*Created by huang.jun on 17-05-18*/
$(document).ready(function(){
    $(".tab-nav li").first().addClass("cur")
    $(".tab-box .tab-list").first().css("display","block");
    var tab=$(".tab-nav li");
    tab.click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        var index=tab.index(this);
        $(".tab-box > .tab-list")
            .eq(index).show()
            .siblings().hide()
    })
    $(".lay-btn").click(function(){
        $("section").show();
    })
    $(".close-btn,.shadow").click(function(){
        $("section").hide();
    })
})


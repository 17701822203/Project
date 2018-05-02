/*Created by huang.jun on 17-04-26*/
$(document).ready(function(){
    $(".tab-nav li").first().addClass("on")
    $(".tab-box .switch-list").first().css("display","block");
    var tab=$(".tab-nav li");
    tab.click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        var index=tab.index(this);
        $(".tab-box > .switch-list")
            .eq(index).show()
            .siblings().hide()
    })
    $(".lay-btn").click(function(){
        $("section").show();
    })
    $(".ok a,.shadow").click(function(){
        $("section").hide();
    })
})










































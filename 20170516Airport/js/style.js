/*Created by huang.jun on 17-05-17*/
$(document).ready(function(){
    $(".touch-nav-box ul li").first().addClass("on")
    $(".touch-tab-box .switch-list").first().css("display","block");
    var tab=$(".touch-nav-box ul li");
    tab.click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        var index=tab.index(this);
        $(".touch-tab-box > .switch-list")
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

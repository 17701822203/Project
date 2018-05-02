/*Created by huang.jun on 17-06-14*/
$(document).ready(function(){
    $(".map_tab li").first().addClass("cur")
    $(".map_content dl").first().css("display","block");
    var tab=$(".map_tab li");
    tab.click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        var index=tab.index(this);
        $(".map_content > dl")
            .eq(index).show()
            .siblings().hide()
    })

    $(".main").click(function(){
        $(".main-list").toggle();
        var show =  $("#show").html();
        if(show == "收起")
        {
            $("#show").html("展开");
        }
        else
        {
            $("#show").html("收起");
        }
    });
})

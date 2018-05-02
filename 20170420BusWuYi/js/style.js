/*Created by huang.jun on 17-04-20*/
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
    $(".lay-rule-button a,.shadow").click(function(){
        $("section").hide();
    })
    setInterval('AutoScroll(".my-scroll")',2000)
})
function AutoScroll(obj){
    $(obj).find("ul:first").animate({
        marginTop:"-1.5rem"
    },500,function(){
        $(this).css({marginTop:"0rem"}).find("li:first").appendTo(this);
    });
}

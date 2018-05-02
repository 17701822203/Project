/*Created by huang.jun on 17-03-29*/
$(document).ready(function(){
    var nav=$(".TabNav li");
    nav.click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        var index=nav.index(this);
        $("article #ListBox>ul")
            .eq(index).show()
            .siblings().hide()
    })
})



















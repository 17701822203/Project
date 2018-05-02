/*Created by huang.jun on 17-05-10*/
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



















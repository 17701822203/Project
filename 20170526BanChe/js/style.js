/*Created by huang.jun on 17-05-27*/
$(document).ready(function(){
    setInterval('AutoScroll(".my-scroll")',2000)
    $(".lay-btn").click(function(){
        $("section").show();
    })
    $(".shadow").click(function(){
        $("section").hide();
    })
})
function AutoScroll(obj){
    $(obj).find("ul:first").animate({
        marginTop:"-2.2rem"
    },800,function(){
        $(this).css({marginTop:"0rem"}).find("li:first").appendTo(this);
    });
}

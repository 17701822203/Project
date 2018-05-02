/*Created by huang.jun on 17-08-21*/
$(document).ready(function(){
    setInterval('AutoScroll(".my-scroll")',2000)
})
function AutoScroll(obj){
    $(obj).find("ul:first").animate({
        marginTop:"-1.25rem"
    },800,function(){
        $(this).css({marginTop:"0rem"}).find("li:first").appendTo(this);
    });
}















































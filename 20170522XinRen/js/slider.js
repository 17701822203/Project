/*Created by huang.jun on 17-05-22*/
    var oBtn = document.getElementById('btn');
    var oW,oLeft;
    var oSlider=document.getElementById('slider');
    var oTrack=document.getElementById('track');
    var oIcon=document.getElementById('icon');
    var oSpinner=document.getElementById('spinner');

    oBtn.addEventListener('touchstart',function(e){
        console.log(e);
        var touches = e.touches[0];
        oW = touches.clientX - oBtn.offsetLeft;
        oBtn.className="button";
        oTrack.className="track";
        document.addEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
    },false);

    oBtn.addEventListener("touchmove", function(e) {
        var touches = e.touches[0];
        oLeft = touches.clientX - oW;
        if(oLeft < 0) {
            oLeft = 0;
        }else if(oLeft > document.getElementById("slider").offsetWidth - oBtn.offsetWidth-0) {
            oLeft = (document.getElementById("slider").offsetWidth - oBtn.offsetWidth-0);
        }
        oBtn.style.left = oLeft + "px";
        oTrack.style.width=oLeft+ 'px';
    },false);

    oBtn.addEventListener("touchend",function() {
        if(oLeft>=(oSlider.clientWidth-oBtn.clientWidth)){
            oBtn.style.left = (document.getElementById("slider").offsetWidth - oBtn.offsetWidth-0);
            oTrack.style.width= (document.getElementById("slider").offsetWidth - oBtn.offsetWidth-0);
            oIcon.style.display='none';
            oSpinner.style.display='block';
        }else{
            oBtn.style.left = 0;
            oTrack.style.width= 0;
        }
        oBtn.className="button-on";
        oTrack.className="track-on";
        document.removeEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
    },false);

    function defaultEvent(e) {
        e.preventDefault();
    }

$(document).ready(function(){
    $(".input-box .button-y").click(function(){
        $("section,.lay-box").show();
    })
    $(".close-btn,.shadow").click(function(){
        $("section,.lay-box").hide();
    })
    $(".button-box .button-b").click(function(){
        $("section,.share").show();
    })
    $(".share,.shadow").click(function(){
        $("section,.share").hide();
    })

})
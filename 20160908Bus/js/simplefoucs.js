$(document).ready(function(){
 var i=0;
 var li = $(".imgTabBox li");
 var n=li.length-1;
 var speed = 500;
 li.not(":first").css({left:"934px"});
 li.eq(n).css({left:"-934px"});
 lxfNext=function (){
 if (!li.is(":animated")) {
  if (i>=n){i=0;li.eq(n).animate({left:"-934px"},speed);
  li.eq(i).animate({left:"0px"},speed);
  }else{i++;li.eq(i-1).animate({left:"-934px"},speed);li.eq(i).animate({left:"0px"},speed);};
  li.not("eq(i)").css({left:"934px"});
  $("i").text(i+1);
 }else{};
 };
 lxfLast=function (){
 if (!li.is(":animated")) {
  if (i<=0){i=n;li.eq(0).animate({left:"934px"},speed);li.eq(n).animate({left:"0px"},speed);
  }else{i--;li.eq(i+1).animate({left:"934px"},speed);li.eq(i).animate({left:"0px"},speed);}
  li.not("eq(i)").css({left:"-934px"});
  $("i").text(i+1);
 };
 };
})








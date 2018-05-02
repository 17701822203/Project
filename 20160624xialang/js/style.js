/*Created by huang.jun on 16-06-24*/
document.documentElement.style.fontSize=document.documentElement.clientWidth/6.4+'px';
window.addEventListener("resize",setRemSize,false);
function setRemSize(){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/6.4+'px';
}
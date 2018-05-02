/*Created by huang.jun on 16-01-29*/
(function (doc, win) {
  var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	recalc = function () {
	  var clientWidth = docEl.clientWidth;
	  if (!clientWidth) return;
	  docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	};
 
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

function AddListeners (){
	var elemToCheck = document.getElementById("slip");
	if (window.MutationObserver || window.webkitMutationObserver) {
		var callback = function (mutations) {
			mutations.forEach(function (mutation) {
				OnAttrModified();
			});
		};
		if (window.MutationObserver) {
			var observer = new MutationObserver(callback);
		} else {
			var observer = new webkitMutationObserver(callback);
		}
		observer.observe(elemToCheck, {
			attributes: true
		});
	} else if(elemToCheck.addEventListener){ // Fir
	// efox, Opera and Safari
		elemToCheck.addEventListener('DOMAttrModified', OnAttrModified, false);
	} else if(elemToCheck.attachEvent){  // Internet Explorer
		elemToCheck.attachEvent('onpropertychange', OnAttrModified);
	}
}

function OnAttrModified (event) {
	if(typeof event != 'undefined'){
		if('x' == event.attrName){
			var x = event.newValue;
			xVal(x);
		}
	}else{
		var x = document.getElementById("slip").attributes.x.value;
		xVal(x);
	}
}

function xVal(x){
	var width = $(window).width();

	switch (parseInt(x)){
		case width * -1:
			setTimeout(function () {
				$(".bk2").animate({opacity: "1"}, 500);
				return false;
			}, 400);   
			break;
		case width * -2:
			setTimeout(function () {
				$(".bk3").animate({opacity: "1"}, 500);
				return false;
			}, 400);        
		break;
		case width * -3:
			setTimeout(function () {
				$(".bk4").animate({opacity: "1"}, 500);
				return false;
			}, 400);       
		break;
		case width * -4:
			setTimeout(function () {
				$(".bk5").animate({opacity: "1"}, 500);
				return false;
			}, 400);   
		break;
		case width * -5:
			setTimeout(function () {
				$(".bk6").animate({opacity: "1"}, 500);
				return false;
			}, 400);   
		break;
		case width * -6:
			setTimeout(function () {
				$(".bk7").animate({opacity: "1"}, 500);
				return false;
			}, 400);   
		break;
		case width * -7:
			setTimeout(function () {
				$(".bk8").animate({opacity: "1"}, 500);
				return false;
			}, 400);   
		break;
		case width * -8:
			setTimeout(function () {
				$(".bk9").animate({opacity: "1"}, 500);
				return false;
			}, 400);   
		break;
		case width * -9:
			setTimeout(function () {
				$(".bk10").animate({opacity: "1"}, 500);
				return false;
			}, 400);
		break;
	}
}

/*Created by huang.jun on 17-01-20*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if( clientWidth > 400 & clientWidth<=500){
                clientWidth = 400;
            }
            if( clientWidth > 500){
                clientWidth = 500;
            }
            var fontSize = 20 * (clientWidth / 375);
            docEl.style.fontSize = fontSize + 'px';

            var dpi =  window.devicePixelRatio;
            var viewport = document.querySelector('meta[name="viewport"]');

            docEl.setAttribute('data-dpi',dpi);
            var scale = 1/dpi;
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
        if('y' == event.attrName){
            var y = event.newValue;
            yVal(y);
        }
    }else{
        var y = document.getElementById("slip").attributes.y.value;
        yVal(y);
    }
}

function yVal(y){
    var height = $(window).height();

    switch (parseInt(y)){
        case height * -1:
            setTimeout(function () {
                $(".box3").addClass("bg");
                return false;
            }, 300);
            break;
        case height * -2:
            break;
        case height * -3:
            $(".box5").addClass("bg");
            return false;
            break;
        case height * -4:
            break;
        case height * -5:
            break;
    }
}

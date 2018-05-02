/*Created by huang.jun on 17-02-21*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            var fontSize = 20 * (clientWidth / 375);
            fontSize = (fontSize > 50) ? 50: fontSize;

            //如果是pc访问
            if(!/windows phone|iphone|android/ig.test(window.navigator.userAgent)) {
                fontSize = 20;
            }
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

document.addEventListener('touchstart',function(){},false);




















(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(root 即 window)
        root.resLoader = factory(root);
    }
}(this, function () {
    var isFunc = function(f){
        return typeof f === 'function';
    }
    //构造器函数
    function resLoader(config){
        this.option = {
            resourceType : 'image', //资源类型，默认为图片
            baseUrl : './', //基准url
            resources : [], //资源路径数组
            onStart : null, //加载开始回调函数，传入参数total
            onProgress : null, //正在加载回调函数，传入参数currentIndex, total
            onComplete : null //加载完毕回调函数，传入参数total
        }
        if(config){
            for(i in config){
                this.option[i] = config[i];
            }
        }
        else{
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引
    };

    resLoader.prototype.start = function(){
        this.status = 1;
        var _this = this;
        var baseUrl = this.option.baseUrl;
        for(var i=0,l=this.option.resources.length; i<l; i++){
            var r = this.option.resources[i], url = '';
            if(r.indexOf('http://')===0 || r.indexOf('https://')===0){
                url = r;
            }
            else{
                url = baseUrl + r;
            }

            var image = new Image();
            image.onload = function(){_this.loaded();};
            image.onerror = function(){_this.loaded();};
            image.src = url;
        }
        if(isFunc(this.option.onStart)){
            this.option.onStart(this.total);
        }
    }

    resLoader.prototype.loaded = function(){
        if(isFunc(this.option.onProgress)){
            this.option.onProgress(++this.currentIndex, this.total);
        }
        //加载完毕
        if(this.currentIndex===this.total){
            if(isFunc(this.option.onComplete)){
                this.option.onComplete(this.total);
            }
        }
    }

    //暴露公共方法
    return resLoader;
}));

var loader = new resLoader({
     resources : [
          'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/btn.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/btn2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/btn3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/btn-icon.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/date-box.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/gaizi.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/hb-icon.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/hongbao1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/hongbao2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/hongbao3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/img1.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/img2.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/img3.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/img4.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/img5.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/input-bg1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/input-bg2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/input-bg3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/input-bg4.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/input-bg5.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/jiangpai-icon.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-4.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-5.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-6.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-7.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-8.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/laohuji-9.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/loading-bg.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/logo1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/logo2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/logo3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/logo4.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/lw2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/nav1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/nav2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/nav3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/nav4.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/paizi-box.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/piao-icon.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/q1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/q2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/q3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/q4.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/q5.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/q6.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/share.jpg',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/title1.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/title2.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/title3.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/title4.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/touch-btn.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/txtbox-icon.png',
		  'https://pages.ctrip.com/commerce/promote/201611/train/cy/img/yun-icon.png'
     ],
     onStart : function(total){
		document.addEventListener('touchmove', function(event) {
            //判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
            if(!$(".loading").is(":hidden")){
                event.preventDefault();
            }
        })
     },
     onProgress : function(current, total){
          var percent = parseInt((current / total) * 100);
		  $('.yun-icon span').html(percent + '%');
     },
     onComplete : function(total){
          $('.loading').hide();
		  //$('.main_div').show();
     }
});
$(function() {
	if (/msie (6.0|7.0|8.0)/i.test(navigator.userAgent)) {
		document.write('您的浏览器版本过低，此页面无法正常显示，请先升级浏览器！');
	}


	/****************************** 代码高亮 ******************************/
	try {
		hljs.configure({tabReplace: '	'});
		hljs.initHighlightingOnLoad();
		
		$('pre code').each(function() {
			$(this).text($(this).text().replace('\n', ''));
		});
	} catch (e) {}


	/****************************** 锚点滚动 ******************************/
	$.fn.anchorScroll = function(option) {
		return this.each(function() {
			var options = $.extend({
				fixed: 0,
				offset: 0
			}, {}, typeof option === 'object' && option);

			var $anchorMenu = $(this),
				$anchorItem = $anchorMenu.find('a'),
				pageIsScrolling = false;

			// 点击锚点时页面滚动
			$anchorItem.click(function(e) {
				e.preventDefault ? e.preventDefault() : e.returnValue = false;

				pageIsScrolling = true;

				try {
					var $target = $($(this).attr('href'));

					$('html, body').stop(true, false).animate({
						scrollTop: $target.offset().top + options.offset
					}, function() {
						pageIsScrolling = false;
					});

					$(this).addClass('active').siblings().removeClass('active');
				} catch (e) {}
			});

			$(window).on('scroll DOMContentLoaded load', function() {
				// 固定锚点菜单
				if ($(window).scrollTop() > options.fixed) {
					$anchorMenu.addClass('fixed').css({
						position: 'fixed',
						marginTop: 0,
						marginBottom: 0
					});
				} else {
					$anchorMenu.removeAttr('style').removeClass('fixed');
				}

				// 锚点菜单对应项添加高亮样式
				if (!pageIsScrolling) {
					$anchorItem.each(function() {
						try {
							var $target = $($(this).attr('href'));

							if ($(window).scrollTop() >= $target.offset().top + options.offset) {
								$(this).addClass('active').siblings().removeClass('active');
							} else {
								$(this).removeClass('active');
							}
						} catch (e) {}
					});
				}
			});
		});
	};


	/****************************** 判断元素是否在浏览器视口中 ******************************/
	$.fn.isInViewport = function(callback) {
	    var $this = $(this);
	 
	    $(window).on('scroll DOMContentLoaded load', function() {
	        $this.each(function() {
	            var elemTopToWindowTop = $(this).offset().top - $(window).scrollTop(),
	                elembottomToWindowTop = $(this).offset().top + $(this).outerHeight(true) - $(window).scrollTop();
	 
	            if (
	                (0 < elemTopToWindowTop && elemTopToWindowTop < $(window).height()) ||
	                (0 < elembottomToWindowTop && elembottomToWindowTop < $(window).height())
	            ) {
	                if ($(this).attr('in-viewport') === undefined) {
	                    callback.call(this);
	                    $(this).attr('in-viewport', '');
	                }
	            }
	        });
	    });
	};
});

$(function() {
	$('.side .anchor').anchorScroll({
		fixed: 0,
		offset: -10
	});

	$('#top').terseBanner();

	$('.container').isInViewport(function() {
		$(this).fadeTo('300', 1);
	});

	
	// 自定义样式
	$('#custom').terseBanner({ arrow: true });

	// 动画
	$('.animation .select').on({
		'mouseenter': function() {
			$(this).addClass('active');
		},
		'mouseleave': function() {
			$(this).removeClass('active');
		}
	});



	// 缩略图
	$('#thumbnail').terseBanner({
		btn: false,
		thumb: {
			width: 150,
			height: 84,
			gap: 4,
			visible: 3
		}
	});


	// 自适应
	$('#adaptive').terseBanner({ adaptive: true });
	var minWidth = 560,
		maxWidth = 960,
		step = 100;

	$('.adaptive .scale a').click(function() {
		var bannerWidth = $(this).hasClass('larger') ? Math.min(maxWidth, $('#adaptive').width() + step) :
		Math.max(minWidth, $('#adaptive').width() - step);

		$('#adaptive').stop(true, false).animate({ width: bannerWidth }, 300);
	});

	var newWindowHtml =
		'<!DOCTYPE html>' +
		'<html>' +
		'<head>' +
			'<title>terseBanner - 宽屏自适应演示</title>' +
			'<link rel="stylesheet" type="text/css" href="css/style.css">' +
			'<style>p{margin: 10px 0 0 10px;font-weight: bold;font-size: 14px;color: #333;}</style>' +
		'</head>' +
		'<body>' +
			'<div class="widescreen">' +
				'<ul>' +
					'<li><img src="img/1.png"></li>' +
					'<li><img src="img/2.png"></li>' +
					'<li><img src="img/3.png"></li>' +
					'<li><img src="img/4.png"></li>' +
				'</ul>' +
			'</div>' +
			'<p>改变窗口的宽度可以查看自适应的效果</p>' +
		'</body>' +
		'<script type="text/javascript" src="http://www.jq22.com/jquery/jquery-1.10.2.js"><' + '/script>' +
		'<script type="text/javascript" src="dist/jquery.terseBanner.min.js"><' + '/script>' +
		'<script>' +
			'setTimeout(function() {' +
				'$(".widescreen").terseBanner({' +
					'adaptive: true,' +
					'arrow: true' +
				'});' +
			'}, 50);' +
		'<' + '/script>' +
		'</html>';

	$('.adaptive .widescreen').click(function() {
		var windowWidth = window.screen.width - 20 - 100,
			windowHeight = windowWidth / 1920 * 800 + 50;

		var newWindow = window.open('', '', 'width=' + windowWidth + ', height=' + windowHeight +
			', top=120, left=50, location=no, menubar=no, toolbar=no, status=no, directories=no');

		newWindow.document.write(newWindowHtml);
	});





	// 方法
	$('#switch').terseBanner();
	$('.switch .btn .prev').click(function() {
		$('#switch').terseBanner('prev');
	});

	$('.switch .btn .next').click(function() {
		$('#switch').terseBanner('next');
	});

	$('.switch .btn ul li').click(function() {
		$('#switch').terseBanner(parseInt($(this).text()));
	});


	// 回调函数
	$('#callback').terseBanner({
		arrow: true,
		init: function ($banner, $item) {
			$item.each(function(i) {
				$(this).append('<em>' + (i + 1) +'</em>');
			});
		},
		before: function ($banner, $item, currentIndex) {
			$item.eq(currentIndex).find('em').css({
				top: -120,
				opacity: 0
			});
		},
		after: function ($banner, $item, currentIndex) {
			$item.eq(currentIndex).find('em').css({
				top: 210,
				opacity: 1
			});
		}
	});
});

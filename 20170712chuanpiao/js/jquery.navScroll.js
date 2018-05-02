;(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'navScroll',
      defaults = {
        // 滚动到元素的时间（将此设置为0，因此很明显不会显示动画）。
        scrollTime: 500,
        // 调用滚动动画的项的类。所有的元素里面锚标签的值为空时点击。
        navItemClassName: '',
        // 设置导航的高度（用作偏移量）。自动地让插件自动决定高度，一个数字决定了PX的高度。
        navHeight: 'auto',
        // 如果您的导航隐藏并被用作小屏幕上的下拉框，将此设置为true，单击后隐藏下拉框。
        mobileDropdown: false,
        // 另外，你可以在这里插入移动导航的类名，当左空插件，搜索一个<ul>在相同的父元素。
        mobileDropdownClassName: '',
        // 窗口宽度，它作为桌面和移动之间的断点。
        mobileBreakpoint: 1024,
        // 设置为“true”，如果你想使scrollspy。
        scrollSpy: false
      };

  function NavScroll(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  NavScroll.prototype = {
    init: function() {
      var self, options, element, navItem, navOffset, scrollTime;
      self = this;
      options = self.options;
      element = self.element;

      if (options.navItemClassName === '') {
        navItem = $(element).find('a');
      } else {
        navItem = $(element).find('.' + options.navItemClassName);
      }

      if (options.navHeight === 'auto') {
        navOffset = $(element).height();
      } else if (isNaN(options.navHeight)) {
        throw new Error ('\'navHeight\' only accepts \'auto\' or a number as value.');
      } else {
        navOffset = options.navHeight;
      }

      navItem.on('click', function(e){
        var url, parts, target, targetOffset, targetTop;

        url = this.href;
        parts = url.split('#');
        target = parts[1];

        if (target !== undefined) {
          e.preventDefault();
          targetOffset = $('#' + target).offset();
          targetTop = targetOffset.top;
        }

        if ($(this).data('scrolltime') !== undefined) {
          scrollTime = $(this).data('scrolltime');
        } else {
          scrollTime = options.scrollTime;
        }

        if (options.mobileDropdown && $(window).width() >= 0 && $(window).width() <= options.mobileBreakpoint) {
          if (options.mobileDropdownClassName === '') {
            $(element).find('ul').slideUp('fast');
          } else {
            $('.' + options.mobileDropdownClassName).slideUp('fast');
          }
        }

        $('html, body').stop().animate({
          scrollTop: targetTop - navOffset
        }, scrollTime);
      });

      if (options.scrollSpy) {
        var scrollItems;
        scrollItems = [];

        navItem.each(function() {
          var scrollItemId = $(this).attr('href');
          scrollItems.push($(scrollItemId));
        });

        $(window).on('scroll', function () {
          self.scrollspy(navItem, scrollItems);
        });
        self.scrollspy(navItem, scrollItems);
      }
    },

    scrollspy: function(navItem, scrollItems){
      var scrollPos, changeBounds, i, l;
      scrollPos = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      changeBounds = window.innerHeight / 2 || document.documentElement.clientHeight / 2;
      l = navItem.length;

      for (i = 0; l > i; i++) {
        var item = scrollItems[i];
        if (scrollPos > (item.offset().top - changeBounds)) {
          navItem.removeClass('active');
          $(navItem[i]).addClass('active');
        }
      }

    }

  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
        new NavScroll(this, options));
      }
    });
  };

})(jQuery, window, document);
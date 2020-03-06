/**
 * jQuery.fancybox.animateCSS
 * Version: 1.0.1
 * Repo: https://github.com/WahaWaher/fancybox-animate-css
 * Author: Sergey Kravchenko
 * Contacts: wahawaher@gmail.com
 * License: MIT
 */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function(root, jQuery) {
      if (jQuery === undefined) {
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function($) {
  var document = window.document;

  /**
   * Extends default options
   */
  $.extend(true, $.fancybox.defaults, {
    animation: {
      open: {
        name: '',
        duration: 366,
        delay: 0,
        ease: '',
        start: $.noop,
        complete: $.noop
      },
      close: {
        name: '',
        duration: 366,
        delay: 0,
        ease: '',
        start: $.noop,
        complete: $.noop
      }
    }
  });

  /**
   * Adds "open" and "close" events
   */
  $(document)
    .on('afterLoad.fb', function(e, inst, slide) {
      if (inst.firstRun && inst.currIndex === slide.index)
        $(this).trigger('onOpen.fb', [inst, slide]);
    })
    .on('beforeClose.fb', function(e, inst, slide) {
      $(this).trigger('onClose.fb', [inst, slide]);
    });

  /**
   * Extends slide options with data-options
   */
  $(document).on('onOpen.fb', function(e, inst, slide) {
    var $content = slide.$content;
    var dataAOpen = $content.data('animation-open');
    var dataAClose = $content.data('animation-close');

    if (typeof dataAOpen === 'string') {
      dataAOpen = getAnimOptsFromStr(dataAOpen);
    }

    if (typeof dataAClose === 'string') {
      dataAClose = getAnimOptsFromStr(dataAClose);
    }

    $.extend(true, slide.opts.animation, {
      open: dataAOpen,
      close: dataAClose
    });
  });

  /**
   * Animation on open/close
   */
  $(document)
    .on('onOpen.fb', function(e, inst, slide) {
      var opts = slide.opts;
      var open = opts.animation.open;

      if (!open || !open.name) return;

      opts.animationEffect = 'none';
      opts.animationDuration = open.duration;

      $(slide.$slide)
        .css('opacity', '')
        .animateCSS(open.name, {
          clear: true,
          duration: open.duration,
          delay: open.delay,
          ease: open.ease,
          start: close.start,
          complete: open.complete
        });
    })
    .on('onClose.fb', function(e, inst, slide) {
      var opts = slide.opts;
      var close = opts.animation.close;

      if (!close || !close.name) return;

      opts.animationEffect = 'none';
      opts.animationDuration = close.duration;

      $(slide.$slide).animateCSS(close.name, {
        clear: true,
        duration: close.duration,
        delay: close.delay,
        ease: open.ease,
        start: close.start,
        complete: function() {
          $(this).css('opacity', 0);
          close.complete.apply(this, arguments);
        }
      });
    });

  /**
   * Transforms options from stringto object
   */
  function getAnimOptsFromStr(str) {
    var array = str.split(':') || [];
    var options = {};

    $.each(['name', 'duration', 'delay', 'ease'], function(key, prop) {
      if (array[key] && array[key] !== '') {
        options[prop] = /duration|delay/.test(prop) ? +array[key] : array[key];
      }
    });
    return options;
  }
});

jQuery Fancybox AnimateCSS Plugin <sup>1.0.0</sup>
-------
Plugin that allows you easily control open/close animation of FancyBox3 popups.

- Compatible with libraries of CSS animations such as: animate.css, magic.css, etc.
- Added "onOpen.fb" and "onClose.fb" events
- Ability to edit/disable animation for any media type
- Competent integration with basic animation options
- Control via data-attributes of the modal html container (for inline media types)

## Install
```sh
# NPM
npm i @wahawaher/fancybox-animate-css @wahawaher/jquery-animate-css
```
## Include
```html
<!-- Animate.css Lib -->
<link rel="stylesheet" href="./node_modules/animate.css/animate.min.css">
<!-- Fancybox CSS Lib -->
<link rel="stylesheet" href="./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css">

<!-- jQuery -->
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
<!-- jQuery Fancybox JS -->
<script src="./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js"></script>
<!-- jQuery AnimateCSS Plugin -->
<script src="./node_modules/@wahawaher/jquery-animate-css/jquery.animate.css.min.js"></script>
<!-- jQuery Fancybox AnimateCSS Plugin -->
<script src="./node_modules/@wahawaher/fancybox-animate-css/jquery.fancybox.animate.css.js"></script>
```
## Usage
### Set default animation options for all types (it's enough)
```javascript
$.extend(true, $.fancybox.defaults, {
  animation: {
    open: {
      name: 'fadeInLeft',
      // optional:
      duration: 366,
      delay: 0,
      ease: '',
      start: function () {},
      complete: function () {}
    },
    close: {
      name: 'fadeOutRight',
      // optional:
      duration: 366,
      delay: 0,
      ease: '',
      start: function () {},
      complete: function () {}
    },
  }
});
```
### Disable or change option for specific media types (optional)
```javascript
$(document).on('beforeLoad.fb', function (e, inst, current) {
  if (current.type == 'image') {
    // Disable animation for "image" type
    // (will be used default fancybox animation)
    current.opts.animation = false;
    // or define specific options
    $.extend(true, current.opts.animation, {
      open: {
        name: 'zoomIn',
        duration: 250
      },
      close: {
        name: 'zoomOut',
        duration: 350
      }
    });
  }
});
```
### Inline media types and html data-attributes (optional)
Short pattern: "\<animation-name\>:\<duration\>:\<delay\>:\<timing-func\>"
```html
<div id="popup"
  data-animation-open="fadeInDown:350::ease-in-out"
  data-animation-close='{
    "name": "fadeOutDown",
    "duration": 350,
    "delay": 0,
    "ease": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }' style="display: none;">
  Popup content...
</div>

<button data-src="#popup" data-fancybox>Popup trigger...</button>
```
## License (MIT)
Copyright (c) 2020 Sergey Kravchenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
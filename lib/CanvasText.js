'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var THREE = require('three');

var fontHeightCache = {};

var CanvasText = function () {
  function CanvasText() {
    _classCallCheck(this, CanvasText);

    this.textWidth = null;
    this.textHeight = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(CanvasText, [{
    key: 'drawText',
    value: function drawText(text, ctxOptions) {
      var lines = text.split(/\r\n|\r|\n/);
      var nbLines = lines.length;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.font = ctxOptions.font;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;

          this.textWidth = Math.max(this.textWidth, Math.ceil(this.ctx.measureText(line).width));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.textHeight = getFontHeight(this.ctx.font);

      this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth + ctxOptions.paddingX * 2);
      this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight * nbLines);

      if (ctxOptions.backgroundColor) {
        this.ctx.fillStyle = ctxOptions.backgroundColor;
        this.ctx.fillRect(0, 0, this.textWidth + ctxOptions.paddingX * 2, this.textHeight * nbLines);
      }

      this.ctx.font = ctxOptions.font;
      this.ctx.fillStyle = ctxOptions.fillStyle;
      this.ctx.textAlign = 'left';
      this.ctx.textBaseline = 'top';

      var currentTop = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = lines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _line = _step2.value;

          this.ctx.fillText(_line, ctxOptions.paddingX, currentTop);
          currentTop += this.textHeight;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this.canvas;
    }
  }, {
    key: 'width',
    get: function get() {
      return this.canvas.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.canvas.height;
    }
  }]);

  return CanvasText;
}();

function getFontHeight(fontStyle) {
  var result = fontHeightCache[fontStyle];

  if (!result) {
    var body = document.getElementsByTagName('body')[0];
    var dummy = document.createElement('div');

    var dummyText = document.createTextNode('MÉq');
    dummy.appendChild(dummyText);
    dummy.setAttribute('style', 'font:' + fontStyle + ';position:absolute;top:0;left:0');
    body.appendChild(dummy);
    result = dummy.offsetHeight;

    fontHeightCache[fontStyle] = result;
    body.removeChild(dummy);
  }

  return result;
}

module.exports = CanvasText;
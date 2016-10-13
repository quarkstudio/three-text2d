(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.THREE_Text = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var THREE = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THREE = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var textAlign = require('./textAlign'),
    CanvasText = require('./CanvasText');

var SpriteText2D = function (_THREE$Object3D) {
  _inherits(SpriteText2D, _THREE$Object3D);

  function SpriteText2D() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SpriteText2D);

    var _this = _possibleConstructorReturn(this, (SpriteText2D.__proto__ || Object.getPrototypeOf(SpriteText2D)).call(this));

    _this._font = options.font || '30px Arial';
    _this._fillStyle = options.fillStyle || '#FFFFFF';
    _this._backgroundColor = options.backgroundColor || null;
    _this._paddingX = options.paddingX || null;

    _this.canvas = new CanvasText();

    _this.align = options.align || textAlign.center;

    // this._textAlign = options.align || "center"
    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    _this.antialias = _typeof(options.antialias === 'undefined') ? true : options.antialias;
    _this.text = text;
    return _this;
  }

  // delegate raycast method to mesh instance


  _createClass(SpriteText2D, [{
    key: 'raycast',
    value: function raycast() {
      return this.sprite.raycast.apply(this.sprite, arguments);
    }
  }, {
    key: 'updateText',
    value: function updateText() {
      this.canvas.drawText(this._text, {
        font: this._font,
        fillStyle: this._fillStyle,
        backgroundColor: this._backgroundColor,
        paddingX: this._paddingX
      });

      // cleanup previous texture
      this.cleanUp();

      this.texture = new THREE.Texture(this.canvas.canvas);
      this.texture.needsUpdate = true;
      this.applyAntiAlias();

      if (!this.material) {
        this.material = new THREE.SpriteMaterial({ map: this.texture });
      } else {
        this.material.map = this.texture;
      }

      if (!this.sprite) {
        this.sprite = new THREE.Sprite(this.material);
        this.geometry = this.sprite.geometry;
        this.add(this.sprite);
      }

      this.sprite.scale.set(this.canvas.width, this.canvas.height, 1);

      this.sprite.position.x = this.canvas.width / 2 - this.canvas.textWidth / 2 + this.canvas.textWidth / 2 * this.align.x;
      this.sprite.position.y = -this.canvas.height / 2 + this.canvas.textHeight / 2 * this.align.y;
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp() {
      if (this.texture) {
        this.texture.dispose();
      }
    }
  }, {
    key: 'applyAntiAlias',
    value: function applyAntiAlias() {
      if (this.antialias === false) {
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.LinearMipMapLinearFilter;
      }
    }
  }, {
    key: 'width',
    get: function get() {
      return this.canvas.textWidth;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.canvas.textHeight;
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (this._text !== value) {
        this._text = value;
        this.updateText();
      }
    }
  }, {
    key: 'font',
    get: function get() {
      return this._font;
    },
    set: function set(value) {
      if (this._font !== value) {
        this._font = value;
        this.updateText();
      }
    }
  }, {
    key: 'fillStyle',
    get: function get() {
      return this._fillStyle;
    },
    set: function set(value) {
      if (this._fillStyle !== value) {
        this._fillStyle = value;
        this.updateText();
      }
    }
  }]);

  return SpriteText2D;
}(THREE.Object3D);

module.exports = SpriteText2D;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./CanvasText":1,"./textAlign":4}],3:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THREE = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

var textAlign = require('./textAlign'),
    CanvasText = require('./CanvasText');

var Text2D = function (_THREE$Object3D) {
  _inherits(Text2D, _THREE$Object3D);

  function Text2D() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Text2D);

    var _this = _possibleConstructorReturn(this, (Text2D.__proto__ || Object.getPrototypeOf(Text2D)).call(this));

    _this._font = options.font || '30px Arial';
    _this._fillStyle = options.fillStyle || '#FFFFFF';
    _this._paddingX = options.paddingX || 0.0;
    _this._paddingY = options.paddingX || 0.0;

    _this.canvas = new CanvasText();

    _this.align = options.align || textAlign.center;
    _this.side = options.side || THREE.DoubleSide;

    // this._textAlign = options.align || "center"
    // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
    _this.antialias = _typeof(options.antialias === "undefined") ? true : options.antialias;
    _this.text = text;
    return _this;
  }

  // delegate raycast method to mesh instance


  _createClass(Text2D, [{
    key: 'raycast',
    value: function raycast() {
      return this.mesh.raycast.apply(this.mesh, arguments);
    }
  }, {
    key: 'updateText',
    value: function updateText() {
      this.cleanUp(); // cleanup previous texture

      this.canvas.drawText(this._text, {
        font: this._font,
        fillStyle: this._fillStyle,
        paddingX: this._paddingX,
        paddingY: this._paddingY
      });

      this.texture = new THREE.Texture(this.canvas.canvas);
      this.texture.needsUpdate = true;
      this.applyAntiAlias();

      if (!this.material) {
        this.material = new THREE.MeshBasicMaterial({ map: this.texture, side: this.side });
        this.material.transparent = true;
      } else {
        this.material.map = this.texture;
      }

      if (!this.mesh) {
        this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height), this.material);
        this.geometry = this.mesh.geometry;
        this.add(this.mesh);
      }

      this.mesh.position.x = this.canvas.width / 2 - this.canvas.textWidth / 2 + this.canvas.textWidth / 2 * this.align.x;
      this.mesh.position.y = -this.canvas.height / 2 + this.canvas.textHeight / 2 * this.align.y;

      // manually update geometry vertices
      this.geometry.vertices[0].x = this.geometry.vertices[2].x = -this.canvas.width / 2;
      this.geometry.vertices[1].x = this.geometry.vertices[3].x = this.canvas.width / 2;
      this.geometry.vertices[0].y = this.geometry.vertices[1].y = this.canvas.height / 2;
      this.geometry.vertices[2].y = this.geometry.vertices[3].y = -this.canvas.height / 2;
      this.geometry.verticesNeedUpdate = true;
    }
  }, {
    key: 'cleanUp',
    value: function cleanUp() {
      if (this.texture) {
        this.texture.dispose();
      }
    }
  }, {
    key: 'applyAntiAlias',
    value: function applyAntiAlias() {
      if (this.antialias === false) {
        this.texture.magFilter = THREE.NearestFilter;
        this.texture.minFilter = THREE.LinearMipMapLinearFilter;
      }
    }
  }, {
    key: 'width',
    get: function get() {
      return this.canvas.textWidth;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.canvas.textHeight;
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (this._text !== value) {
        this._text = value;
        this.updateText();
      }
    }
  }, {
    key: 'font',
    get: function get() {
      return this._font;
    },
    set: function set(value) {
      if (this._font !== value) {
        this._font = value;
        this.updateText();
      }
    }
  }, {
    key: 'fillStyle',
    get: function get() {
      return this._fillStyle;
    },
    set: function set(value) {
      if (this._fillStyle !== value) {
        this._fillStyle = value;
        this.updateText();
      }
    }
  }]);

  return Text2D;
}(THREE.Object3D);

module.exports = Text2D;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./CanvasText":1,"./textAlign":4}],4:[function(require,module,exports){
(function (global){
'use strict';

var THREE = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);

module.exports = {
  center: new THREE.Vector2(0, 0),
  left: new THREE.Vector2(1, 0),
  topLeft: new THREE.Vector2(1, -1),
  topRight: new THREE.Vector2(-1, -1),
  right: new THREE.Vector2(-1, 0),
  bottomLeft: new THREE.Vector2(1, 1),
  bottomRight: new THREE.Vector2(-1, 1)
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
'use strict';

module.exports.SpriteText2D = require('./SpriteText2D');
module.exports.Text2D = require('./Text2D');
module.exports.textAlign = require('./textAlign');

},{"./SpriteText2D":2,"./Text2D":3,"./textAlign":4}]},{},[5])(5)
});
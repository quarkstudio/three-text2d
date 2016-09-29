const THREE = require('three');

var fontHeightCache = {};

class CanvasText {

  constructor() {
    this.textWidth = null;
    this.textHeight = null;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  get width() { return this.canvas.width; }
  get height() { return this.canvas.height; }

  drawText(text, ctxOptions) {
    let lines = text.split(/\r\n|\r|\n/);
    let nbLines = lines.length;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = ctxOptions.font;

    for (let line of lines) {
      this.textWidth = Math.max(this.textWidth, Math.ceil(this.ctx.measureText(line).width));
    }
    this.textHeight = getFontHeight(this.ctx.font);

    this.canvas.width = THREE.Math.nextPowerOfTwo(this.textWidth + (ctxOptions.paddingX * 2));
    this.canvas.height = THREE.Math.nextPowerOfTwo(this.textHeight * nbLines);

    if (ctxOptions.backgroundColor) {
      this.ctx.fillStyle = ctxOptions.backgroundColor;
      this.ctx.fillRect(0, 0, this.textWidth + (ctxOptions.paddingX * 2), this.textHeight * nbLines);
    }

    this.ctx.font = ctxOptions.font;
    this.ctx.fillStyle = ctxOptions.fillStyle;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    let currentTop = 0;
    for (let line of lines) {
      this.ctx.fillText(line, ctxOptions.paddingX, currentTop);
      currentTop += this.textHeight;
    }

    return this.canvas;
  }

}

function getFontHeight(fontStyle) {
  var result = fontHeightCache[fontStyle];

  if (!result)
  {
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

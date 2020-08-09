var img = document.getElementsByClassName("img")[0];
var canvas_top = document.getElementsByClassName("canvas_top")[0];
var width = img.width;
var height = img.height;
img.height = height * 0.8;

console.log(width);
console.log(height);

img.addEventListener("load", setCanvasSize());

function setCanvasSize() {
  canvas_top.width = width * 0.8;
  canvas_top.height = height * 0.8;
  drawHalfImage();
}

function drawHalfImage() {
  var ctx = canvas_top.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height, 0, 0, width * 0.8, height * 0.8);
}

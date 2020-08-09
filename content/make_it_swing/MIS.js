var img = document.getElementsByClassName("img")[0];
var canvas = document.getElementById("canvas");
var userimg = document.getElementById("userimg");
var width = img.width;
var height = img.height;

img.addEventListener("load", setimage());
canvas.addEventListener("click", split);
canvas.myParam = event;

function setimage() {
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function split(event) {
  console.log(event.clientY);
  createSplitCanvas(event.clientY);
  splitImage(event.clientY);
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, event.clientY);
  removeAndAddEventListener();
}

function createSplitCanvas(Y) {
  var split_canvas = document.createElement("canvas");
  split_canvas.style.position = "absolute";
  split_canvas.style.top = "9px";
  split_canvas.setAttribute("id", "split_canvas");
  split_canvas.setAttribute("width", width);
  split_canvas.setAttribute("height", Y);
  split_canvas.style.zIndex = "10";
  var parent = document.getElementsByClassName("container")[0];
  parent.appendChild(split_canvas);
}

function splitImage(Y) {
  var ctx = canvas.getContext("2d");
  var img_data = ctx.getImageData(0, 0, width, Y);
  var split_ctx = split_canvas.getContext("2d");
  split_ctx.putImageData(img_data, 0, 0);
}

function removeAndAddEventListener() {
  canvas.removeEventListener("click", split);
  split_canvas.addEventListener("mousemove", swing);
  split_canvas.myParam = event;
  split_canvas.addEventListener("mousedown", down);
  split_canvas.myParam = event;
  split_canvas.addEventListener("mouseup", up);
  split_canvas.myParam = event;
  split_canvas.addEventListener("mouseout", out);
  split_canvas.myParam = event;
}

var startX = 0;
var startY = 0;
var dragging = false;

function down(e) {
  startX = e.clientX;
  startY = e.clientY;
  dragging = true;
}
function up(e) {
  dragging = false;
}
function out(e) {
  dragging = false;
}

function swing(e) {
  var split_canvas = document.getElementById("split_canvas");
  split_canvas;

  if (dragging) {
    var Xdeg = Math.round(startX - e.clientX) / 5;
    if (Xdeg <= 70 && Xdeg >= -70) {
      split_canvas.style.transform =
        "skewX(" + Xdeg + "deg) translateX(" + -Xdeg * 2 + "px)";
    }
  }
}

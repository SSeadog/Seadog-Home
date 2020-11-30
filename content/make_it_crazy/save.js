var img = document.getElementsByClassName("img")[0];
var canvas_top = document.getElementsByClassName("canvas_top")[0];
var canvas_bottom = document.getElementsByClassName("canvas_bottom")[0];
var width = img.width;
var height = img.height;
img.height = height * 0.8;

console.log(width);
console.log(height);

img.addEventListener("load", setCanvas());

// 한번씩 모바일에서 그림이 보이지 않을 때가 있음(새로고침하면 보임)
function setCanvas() {
  canvas_top.width = width * 0.8;
  canvas_top.height = height * 0.8 * 0.5;
  drawTopImage();
  canvas_bottom.width = width * 0.8;
  canvas_bottom.height = height * 0.8;
  drawBottomImage();
  addEventListeners();
}

function drawTopImage() {
  var ctx = canvas_top.getContext("2d");
  ctx.drawImage(
    img,
    0,
    0,
    width,
    height * 0.5,
    0,
    0,
    width * 0.8,
    height * 0.8 * 0.5
  );
}

function drawBottomImage() {
  var ctx = canvas_bottom.getContext("2d");
  ctx.drawImage(
    img,
    0,
    height * 0.5 - 2,
    width,
    height * 0.5 + 2,
    0,
    height * 0.8 * 0.5 - 2,
    width * 0.8,
    height * 0.8 * 0.5 + 2
  );
}

function addEventListeners() {
  if (isMobile()) {
    canvas_top.addEventListener("touchmove", swingByTouch);
    canvas_top.myParam = event;
  } else {
    canvas_top.addEventListener("mousemove", swing);
    canvas_top.myParam = event;
    canvas_top.addEventListener("mouseup", up);
    canvas_top.myParam = event;
    canvas_top.addEventListener("mousedown", down);
    canvas_top.myParam = event;
    canvas_top.addEventListener("mouseout", out);
    canvas_top.myParam = event;
  }
}

function isMobile() {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    return true;
  }
  return false;
}

var startX = 0;
var dragging = false;

function down(e) {
  console.log(e);
  startX = e.clientX;
  dragging = true;
}
function up(e) {
  dragging = false;
}
function out(e) {
  dragging = false;
}

function swing(e) {
  if (dragging) {
    var Xdeg = Math.round(startX - e.clientX) / 5;

    canvas_top.style.transform =
      "skewX(" + Xdeg + "deg) translateX(" + -Xdeg * 2 + "px)";
    canvas_bottom.style.transform =
      "skewX(" + -Xdeg + "deg) translateX(" + Xdeg + "px)";
  }
}

// 이미지 변경으로 인해 스크린 너비가 바뀌어서 원치않은 스크롤이 발생함
function swingByTouch(e) {
  console.log(e.touches[0].clientX / 2);
  if (startX == 0) {
    startX = e.touches[0].clientX;
  }
  var Xdeg = Math.round(startX - e.touches[0].clientX) / 5;

  canvas_top.style.transform =
    "skewX(" + Xdeg + "deg) translateX(" + -Xdeg * 2 + "px)";
  canvas_bottom.style.transform =
    "skewX(" + -Xdeg + "deg) translateX(" + Xdeg + "px)";
}
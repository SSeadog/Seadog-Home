var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballColor = "skyblue";
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = parseInt(Math.random() * 5) + 2;
var dy = dx - 10;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleColor = "#0095DD";
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var itemX = canvas.width;
var itemY = canvas.height;

var lives = 1;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function KeyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function KeyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// 벽돌과 충돌 검사
function collisionDetection() {
  cnt = 0;
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        cnt++;
        if (
          x > b.x - ballRadius / 2 &&
          x < b.x + brickWidth + ballRadius / 2 &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == 2 || score % 7 == 0) {
            itemX = b.x + (brickWidth - 25) / 2;
            itemY = b.y;
          }
        }
      }
    }
  }
  // 그릴 때 status가 모두 0 이어서 cnt가 증가하지 않았다면
  if (cnt == 0) {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r].status = parseInt(Math.random() * 2);
      }
    }
  }
}

// 아이템 획득
function getItem() {
  switch (parseInt(Math.random() * 4)) {
    case 0:
      if (paddleWidth < 300) {
        paddleWidth = paddleWidth * 1.5;
        paddleColor = "#0095DD";
      }
      break;
    case 1:
      paddleWidth = paddleWidth / 1.5;
      paddleColor = "red";
      break;
    case 2:
      if (ballRadius < 30) {
        ballRadius = ballRadius * 1.5;
        ballColor = "skyblue";
      }
      break;
    case 3:
      ballRadius = ballRadius / 1.5;
      ballColor = "red";
      break;
  }
  itemY = canvas.height;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawItem() {
  ctx.font = "50px Arial";
  ctx.strokeStyle = "skyblue";
  ctx.fillStyle = "#0095DD";
  ctx.strokeText("?", itemX, itemY);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ball이 양쪽 벽에 부딪히면 방향 바꾸기
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // ball이 윗 벽에 닿으면 방향 바꾸기
  if (y + dy < ballRadius) {
    dy = -dy;
    // ball이 아래벽에서 패들의 높이만큼 있을때
  } else if (y + ballRadius / 2 > canvas.height - paddleHeight) {
    // ball이 paddle에 닿았는지 확인
    if (
      x + (ballRadius + 5) / 2 > paddleX &&
      x - (ballRadius + 5) / 2 < paddleX + paddleWidth
    ) {
      dy = -dy;
      if (dy > -9) {
        dy -= 1;
      }
      if (rightPressed && dx < 10) {
        dx += 1.5;
      } else if (leftPressed && dx > -10) {
        dx -= 1.5;
      }
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = parseInt(Math.random() * 5) + 1;
        dy = -5;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 10;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 10;
  }

  if (
    itemX > paddleX &&
    itemX < paddleX + paddleWidth &&
    itemY < canvas.height &&
    itemY > canvas.height - paddleHeight - 40
  ) {
    console.log("got");
    getItem();
  }

  x += dx;
  y += dy;

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  if (itemY != canvas.height) {
    if (itemY > canvas.height - 20) {
      itemY += 0.5;
    } else {
      itemY += 3;
    }
    if (itemY > canvas.height) {
      itemY = canvas.height;
    }
    drawItem();
  }

  requestAnimationFrame(draw);
}
draw();

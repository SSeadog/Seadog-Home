const targetElement = document.querySelector("body");
bodyScrollLock.disableBodyScroll(targetElement);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballColor = "skyblue";
var ballRadius = 20;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = parseInt(Math.random() * 10) + 2;
var dy = dx - 20;
var paddleHeight = 10;
var paddleWidth = 200;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleColor = "#0095DD";
var lastPaddleX = 0;

var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 150;
var brickHeight = 40;
var brickPadding = 20;
var brickOffsetTop = 60;
var brickOffsetLeft = 60;

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

document.addEventListener("touchmove", touchMove, false);

function touchMove(e) {
  lastPaddleX = paddleX;
  var relativeX = e.touches[0].clientX - canvas.offsetLeft;
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
          y > b.y - ballRadius &&
          y < b.y + brickHeight + ballRadius
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
  // 그릴 때 모두 status가 0 이어서 cnt가 증가하지 않았다면
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
      if (paddleWidth < 600) {
        paddleWidth = paddleWidth * 1.5;
        paddleColor = "#0095DD";
      }
      break;
    case 1:
      paddleWidth = paddleWidth / 1.5;
      paddleColor = "red";
      break;
    case 2:
      if (ballRadius < 60) {
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
  ctx.font = "32px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 16, 40);
}

function drawLives() {
  ctx.font = "32px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 130, 40);
}

function drawItem() {
  ctx.font = "100px Arial";
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
      x + (ballRadius + 15) / 2 > paddleX &&
      x - (ballRadius + 15) / 2 < paddleX + paddleWidth
    ) {
      dy = -dy;
      if (dy > -18) {
        dy -= 2;
      }
      // paddleX 방향에 따라 공속도 조절
      if (paddleX - lastPaddleX > 8) {
        if (paddleX - lastPaddleX > 25) {
          if (dx < 20) {
            dx += 10;
          }
        } else {
          if (dx < 5) {
            dx += 5;
          }
        }
      } else if (paddleX - lastPaddleX < -8) {
        if (paddleX - lastPaddleX < -20) {
          if (dx > -20) {
            dx -= 10;
          }
        } else {
          if (dx > -20) {
            dx -= 5;
          }
        }
      } else {
      }
    } else {
      lives--;
      if (!lives) {
        // 죽으면 모달 띄우기
        var scoreText = document.getElementById("score");
        var retryBtn = document.getElementsByClassName("retry")[0];
        scoreText.innerHTML = score;
        chkLowRank();
        retryBtn.style.visibility = "visible";
        modal.style.display = "block";
        // 죽으면 멈추게 하고 싶은데 방법을 모르겠음 일단 정의되지 않은 함수를 불러서 에러가 발생해서 멈추게 했고
        // 새로고침해서 재시작 가능하게 했음
        finish();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = parseInt(Math.random() * 10) + 1;
        dy = -10;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (
    itemX > paddleX &&
    itemX < paddleX + paddleWidth &&
    itemY < canvas.height &&
    itemY > canvas.height - paddleHeight - 80
  ) {
    getItem();
  }

  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  if (itemY != canvas.height) {
    if (itemY > canvas.height - 40) {
      itemY += 1;
    } else {
      itemY += 6;
    }
    if (itemY > canvas.height) {
      itemY = canvas.height;
    }
    drawItem();
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

var modal = document.getElementById("modal");
var addBtn = document.getElementsByClassName("add")[0];
var retryBtn = document.getElementsByClassName("retry")[0];

var addModal = document.getElementsByClassName("add_rank")[0];
var addRankBtn = document.getElementsByClassName("add")[1];

addBtn.addEventListener("click", add);
retryBtn.addEventListener("click", retry);
addRankBtn.addEventListener("click", registerRank);

function add() {
  modal.style.display = "none";
  addModal.style.display = "block";
}

function retry() {
  modal.style.display = "none";
  document.location.reload();
}

function registerRank() {
  var userName = document.getElementById("user_name").value;
  if (userName.length == 3) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText) {
          // php안에서 db에 등록하고 나옴
        }
      }
    };
    xhttp.open(
      "GET",
      "php/register_rank.php?username=" + userName + "&score=" + score,
      false
    );
    xhttp.send();
    document.location.replace("rank.html");
  } else {
    var text = document.getElementsByClassName("text")[1];
    text.style.color = "red";
    text.style.fontWeight = "bold";
    document.getElementById("user_name").value = "";
  }
}

function chkLowRank() {
  var message = document.getElementById("message");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText) {
        var result = this.responseText.split(",");
        result[0].replace("'", "").replace("'", "");
        result[1].replace("'", "").replace("'", "");
        result[0] = parseInt(result[0]);
        result[1] = parseInt(result[1]);
        if (result[0] < 50) {
          message.innerHTML = "You Can Add Your Records!";
          addBtn.style.visibility = "visible";
        } else if (score > result[1]) {
          message.innerHTML = "You Can Add Your Records!";
          addBtn.style.visibility = "visible";
        } else {
          message.innerHTML = "Break More Blocks!";
          addBtn.style.visibility = "hidden";
        }
      }
    }
  };
  xhttp.open("GET", "php/get_lowest_rank.php", true);
  xhttp.send();
}

draw();

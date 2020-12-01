class App {
  constructor() {
    this.upperCan = document.createElement('canvas');
    this.upperCan.style.zIndex = 3;
    this.upperCtx = this.upperCan.getContext('2d');

    document.body.appendChild(this.upperCan);

    this.underCan = document.createElement('canvas');
    this.underCan.style.position = 'relative';
    this.underCan.style.bottom = '6px';
    this.underCtx = this.underCan.getContext('2d');

    document.body.appendChild(this.underCan);

    this.btn = document.createElement('button');
    this.btn.innerText = "사진 변경";

    document.body.appendChild(this.btn);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.img = document.createElement('img');
    this.img.src = "../../public/default.png";

    this.skew = 0;
    this.speed = 0.01; // 각도에 따라 값을 달리 줘야할 듯

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.upperCan.width = this.stageWidth * 2;
    this.upperCan.height = this.stageHeight;
    this.upperCtx.scale(2, 2);
    this.underCan.width = this.stageWidth * 2;
    this.underCan.height = this.stageHeight;
    this.underCtx.scale(2, 2);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.skew += this.speed;
    if(this.skew >= .7 || this.skew <= -.7) {
      this.speed *= -1;
    }

    this.upperCtx.clearRect(0, 0, this.stageWidth, this.stageHeight / 2);
    // 3번째 값이랑 5번째 값을 계속 변경시켜야함
    this.upperCtx.setTransform(2, 0, this.skew, 2, -this.stageWidth * this.skew * .85, 0);
    this.upperCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height / 2, 0, 0, this.stageWidth, this.stageHeight / 2);

    this.underCtx.clearRect(0, 0, this.stageWidth, this.stageHeight / 2);
    this.underCtx.setTransform(2, 0, -this.skew, 2, 0, 0);
    this.underCtx.drawImage(this.img, 0, this.img.height / 2, this.img.width, this.img.height / 2, 0, 0, this.stageWidth, this.stageHeight / 2);
  }
}

window.onload = () => {
  new App();
}

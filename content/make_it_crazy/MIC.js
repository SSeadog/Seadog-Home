class App {
  constructor() {
    this.upperCan = document.createElement('canvas');
    this.upperCtx = this.upperCan.getContext('2d');

    document.body.appendChild(this.upperCan);

    this.underCan = document.createElement('canvas');
    this.underCtx = this.underCan.getContext('2d');

    document.body.appendChild(this.underCan);

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.img = document.createElement('img');
    this.img.src = "../../public/default.png";

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

    this.upperCtx.clearRect(0, 0, this.stageWidth, this.stageHeight / 2);
    // this.upperCtx.setTransform(2, 0, .8, 2, -this.stageWidth * .26, 0);
    this.upperCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height / 2, 0, 0, this.stageWidth, this.stageHeight / 2);

    this.underCtx.clearRect(0, 0, this.stageWidth, this.stageHeight / 2);
    this.underCtx.drawImage(this.img, 0, this.img.height / 2, this.img.width, this.img.height / 2, 0, 0, this.stageWidth, this.stageHeight / 2);
  }
}

window.onload = () => {
  new App();
}

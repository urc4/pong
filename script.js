const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

class Paddle {
  constructor({ position }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 10;
    this.height = 100;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const paddleOne = new Paddle({
  position: {
    x: 10,
    y: 100,
  },
});

const paddleTwo = new Paddle({
  position: {
    x: canvas.width - 10 * 2,
    y: 100,
  },
});

paddleOne.draw();
paddleTwo.draw();

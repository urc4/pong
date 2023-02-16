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
  update() {
    this.draw();
    this.position.y += this.velocity.y;
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

//  animate is called recursively ensuring it is updated before each animation cycle
// this is a callback function
function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  paddleOne.update();
  paddleTwo.update();
  requestAnimationFrame(animate);
}

animate();

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      paddleOne.velocity.y = -1;
      break;
    case "s":
      paddleOne.velocity.y = 1;
      break;
  }
});
document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      paddleOne.velocity.y = 0;
      break;
    case "s":
      paddleOne.velocity.y = 0;
      break;
  }
});

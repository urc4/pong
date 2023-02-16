// how about an inverse pong where the goal is to get scored on

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
    if (
      this.position.y + this.velocity.y > 0 &&
      this.position.y + this.height + this.velocity.y < canvas.height
    )
      this.position.y += this.velocity.y;
  }
}

class Ball {
  constructor({ position }) {
    this.position = position;
    const speed = 3;
    const direction = {
      x: Math.random() - 0.5 > 0 ? speed : -speed,
      y: Math.random() - 0.5 > 0 ? speed : -speed,
    };
    this.velocity = {
      x: direction.x,
      y: direction.y,
    };
    this.height = 10;
    this.width = 10;
  }
  draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
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

const ball = new Ball({
  position: {
    x: canvas.width / 2,
    y: canvas.height / 2,
  },
});

//  animate is called recursively ensuring it is updated before each animation cycle
// this is a callback function
function animate() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  paddleOne.update();
  paddleTwo.update();
  ball.update();
  requestAnimationFrame(animate);
}

animate();

document.addEventListener("keydown", (event) => {
  const speed = 3;
  switch (event.key) {
    case "w":
      // go up
      paddleOne.velocity.y = -speed;
      break;
    case "s":
      // go down
      paddleOne.velocity.y = speed;
      break;
    case "ArrowUp":
      // go up
      paddleTwo.velocity.y = -speed;
      break;
    case "ArrowDown":
      // go down
      paddleTwo.velocity.y = speed;
      break;
  }
});
// document.addEventListener("keyup", (event) => {
//   switch (event.key) {
//     case "w":
//       paddleOne.velocity.y = 0;
//       break;
//     case "s":
//       paddleOne.velocity.y = 0;
//       break;
//   }
// });

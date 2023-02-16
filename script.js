// how about an inverse pong where the goal is to get scored on

const canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 500;
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
    const speed = 2;
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

    const leftSide = this.position.x + this.velocity.x;
    const rightSide = this.position.x + this.width + this.velocity.x;

    const bottomSide = this.position.y + this.height;
    const topSide = this.position.y;
    // paddle one collision
    if (
      leftSide < paddleOne.position.x + paddleOne.width &&
      bottomSide >= paddleOne.position.y &&
      topSide <= paddleOne.position.y + paddleOne.height
    ) {
      this.velocity.x = -this.velocity.x;
    }

    // paddle two collision
    if (
      rightSide >= paddleTwo.position.x &&
      bottomSide >= paddleTwo.position.y &&
      topSide <= paddleTwo.position.y + paddleTwo.height
    ) {
      this.velocity.x = -this.velocity.x;
    }

    // reverse y direction change this later
    if (
      bottomSide + this.velocity.y >= canvas.height ||
      topSide + this.velocity.y <= 0
    )
      this.velocity.y = -this.velocity.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const paddleOne = new Paddle({
  position: {
    x: 10,
    y: canvas.height / 2 - 50,
  },
});

const paddleTwo = new Paddle({
  position: {
    x: canvas.width - 10 * 2,
    y: canvas.height / 2 - 50,
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

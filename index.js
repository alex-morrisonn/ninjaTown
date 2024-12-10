const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set canvas width and height
canvas.width = 1920;
canvas.height = 1080;

// Load the collisions map
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 160) {
  collisionsMap.push(collisions.slice(i, 160 + i));
}

// Boundary class creation
class Boundary {
  static width = 88;
  static height = 88;
  constructor({ position }) {
    this.position = position;
    this.width = 88;
    this.height = 88;
  }

  // Draw the boundary on the canvas
  draw() {
    c.fillStyle = "rgba(255,0,0,0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = []; // Create an array to store the boundaries
const offset = {
  x: 0,
  y: -850,
};

// Create boundaries based on the collisions map
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2316)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// Load images
const image = new Image();
image.src = "./maps/mainOutdoor.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

// Sprite class creation
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, scale = 1 }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.scale = scale;

    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * this.scale;
      this.height = this.image.height * this.scale;
    };
  }

  // Draw the image on the canvas
  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames.max) * this.scale,
      this.image.height * this.scale
    );
  }
}

const scaleFactor = 1.4; // Adjust this value to scale the sprite

const player = new Sprite({
  position: {
    x: canvas.width / 2 - (192 / 4) * scaleFactor,
    y: canvas.height / 2 - (68 / 4) * scaleFactor,
  },
  image: playerImage,
  frames: { max: 4 },
  scale: scaleFactor,
});

// Create a new Sprite object
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
  scale: 1, // No scaling for the background
});

// Set a default of false for each key
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

const movables = [background, ...boundaries];

function rectangularCollision({ rect1, rect2 }) {
  return (
    rect1.position.x + rect1.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y <= rect2.position.y + rect2.height &&
    rect1.position.y + rect1.height >= rect2.position.y
  );
}

// Animation loop
function animate() {
  requestAnimationFrame(animate); // Call the function recursively
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  player.draw();

  let moving = true;

  // Move the background (player movement)
  if (keys.w && lastKey === "w") {
    moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x, y: player.position.y - 3 },
          },
          rect2: boundary,
        })
      ) {
        console.log("Collision");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a && lastKey === "a") {
    moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x - 3, y: player.position.y },
          },
          rect2: boundary,
        })
      ) {
        console.log("Collision");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s && lastKey === "s") {
    moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x, y: player.position.y + 3 },
          },
          rect2: boundary,
        })
      ) {
        console.log("Collision");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d && lastKey === "d") {
    moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x + 3, y: player.position.y },
          },
          rect2: boundary,
        })
      ) {
        console.log("Collision");
        moving = false;
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
animate();

// Event listeners for keydown and keyup
let lastKey = ""; // Store the last key pressed
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w = true;
      lastKey = "w";
      break;
    case "a":
      keys.a = true;
      lastKey = "a";
      break;
    case "s":
      keys.s = true;
      lastKey = "s";
      break;
    case "d":
      keys.d = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w = false;
      break;
    case "a":
      keys.a = false;
      break;
    case "s":
      keys.s = false;
      break;
    case "d":
      keys.d = false;
      break;
  }
});

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
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = []; // Create an array to store the boundaries
const offset = {
  x: 0,
  y: -800,
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

const scaleFactor = 1.5;

// Sprite class creation
class Sprite {
  constructor({ position, velocity, image }) {
    this.position = position;
    this.image = image;
  }
  // Draw the image on the canvas
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

// Create a new Sprite object
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

// Set a default of false for each key
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

// Animation loop
function animate() {
  requestAnimationFrame(animate); // Call the function recursively
  background.draw();
  boundaries.forEach((boundary) => boundary.draw());
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4, // Divide width by 4 (4 frames)
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4,
    canvas.height / 2 - playerImage.height / 4,
    (playerImage.width / 4) * scaleFactor, // Scale image to a larger size
    playerImage.height * scaleFactor
  );

  // Move the background (player movement)
  if (keys.w && lastKey === "w") {
    background.position.y += 3;
  } else if (keys.a && lastKey === "a") {
    background.position.x += 3;
  } else if (keys.s && lastKey === "s") {
    background.position.y -= 3;
  } else if (keys.d && lastKey === "d") {
    background.position.x -= 3;
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

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Set canvas width and height
canvas.width = 1920;
canvas.height = 1080;
c.fillRect(0, 0, canvas.width, canvas.height);

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
    x: 0,
    y: -800,
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
  if (keys.w) {
    background.position.y += 3;
  } else if (keys.a) {
    background.position.x += 3;
  } else if (keys.s) {
    background.position.y -= 3;
  } else if (keys.d) {
    background.position.x -= 3;
  }
}
animate();

// Event listeners for keydown and keyup
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w = true;
      break;
    case "a":
      keys.a = true;
      break;
    case "s":
      keys.s = true;
      break;
    case "d":
      keys.d = true;
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

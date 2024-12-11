import { preloadBackgrounds, createBackground, preloadForegrounds, createForeground } from "./assets/backgrounds.js";
import { updateBackground } from "./assets/interior.js";
import { setupInputHandlers, handlePlayerMovement } from "./logic/input.js";
import { createBoundaries, createEntryZones } from "./logic/boundary.js";
import { Sprite } from "./assets/sprites.js"; // Import the Sprite class
import collisions from "../data/collisionsMainOutdoor.js";
import entryZonesData from "../data/entryZones.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

const offset = { x: -1400, y: -650 };

const mapWidth = 100;
const boundaries = createBoundaries(collisions, mapWidth, offset);
const entryZones = createEntryZones(entryZonesData, mapWidth, offset);

const entry = { initiated: false };

// Preload background and foreground images
const backgroundImages = preloadBackgrounds();
const foregroundImages = preloadForegrounds();

// Create background and foreground sprites
const background = createBackground(offset);
const foreground = createForeground(offset);

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 48,
    y: canvas.height / 2 - 48,
  },
  image: new Image(),
  frames: { max: 4 },
  sprites: {
    up: { x: 48, y: 0 },
    down: { x: 0, y: 0 },
    left: { x: 96, y: 0 },
    right: { x: 144, y: 0 },
  },
});
player.image.src = "./img/mainCharWalk.png";

const movables = [background, ...boundaries, ...entryZones, foreground];

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  updateBackground(entry, background, backgroundImages); // Update background based on entry state
  handlePlayerMovement(player, movables, boundaries, entryZones, entry);

  background.draw(c); // Draw background
  movables.forEach((movable) => {
    if (movable !== foreground) movable.draw(c); // Draw everything except the foreground
  });
  player.draw(c); // Draw player
  foreground.draw(c); // Draw foreground on top
}

animate();
setupInputHandlers();

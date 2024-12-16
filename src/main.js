import {
  preloadBackgrounds,
  createBackground,
  preloadForegrounds,
  createForeground,
} from "./assets/backgrounds.js";
import { updateBackground, updateForeground } from "./scenes/mainOutdoor.js";
import { setupInputHandlers, handlePlayerMovement } from "./logic/input.js";
import { Sprite } from "./assets/sprites.js";
import { offset, mapWidth } from "./scenes/mainOutdoor.js";
import collisions from "../data/collisionsMainOutdoor.js";
import entryZonesData from "../data/entryZones.js";
import { createBoundaries, createEntryZones } from "./logic/boundary.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1920;
canvas.height = 1080;

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

let activeScene = "mainOutdoor"; // Default to the outdoor scene
const movables = [background, ...boundaries, ...entryZones, foreground];

function updateScene(background, foreground) {
  switch (activeScene) {
    case "mainOutdoor":
      updateBackground(background, backgroundImages);
      updateForeground(foreground, foregroundImages);
      break;
    case "interiorDoubleDoorRedRoof":
      updateBackground(background, backgroundImages);
      break;
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Update background and handle player movement
  handlePlayerMovement(player, movables, boundaries, entryZones, entry);

  background.draw(c); // Draw background first
  movables.forEach((movable) => {
    if (movable !== foreground) movable.draw(c); // Draw other elements except the foreground
  });
  player.draw(c); // Draw player
  if (!entry.initiated) {
    foreground.draw(c); // Draw foreground only for the outdoor scene
  }
}

animate();
updateScene(background, foreground);
setupInputHandlers();

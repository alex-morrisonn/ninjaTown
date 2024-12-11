import { createBackgrounds } from "./backgrounds.js";
import { keys, setupInputHandlers, handleMovement } from "./input.js";
import { Sprite } from "./sprites.js";
import { createBoundaries, createEntryZones } from "./boundary.js";
import { rectangularCollision } from "./collision.js";
import collisions from "../data/collisionsMainOutdoor.js";
import entryZonesData from "../data/entryZones.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const offset = { x: 0, y: -900 };

// Create boundaries and entry zones
const mapWidth = 160; // Adjust this value to the width of your map
const boundaries = createBoundaries(collisions, mapWidth, offset);
const entryZones = createEntryZones(entryZonesData, mapWidth, offset);

// Load backgrounds
const entry = { initiated: false };
const { background, foreground, updateBackground } = createBackgrounds(
  offset,
  entry
);

const playerImage = new Image();
playerImage.src = "./img/walk.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 88,
    y: canvas.height / 2 - 88,
  },
  image: playerImage,
  frames: { max: 4 },
  sprites: {
    up: { x: 88, y: 0 },
    down: { x: 0, y: 0 },
    left: { x: 176, y: 0 },
    right: { x: 264, y: 0 },
  },
});

const movables = [background, foreground, ...boundaries, ...entryZones];

function moveMovables(deltaX, deltaY) {
  let moving = true;

  // Check collisions with boundaries
  for (const boundary of boundaries) {
    if (
      rectangularCollision({
        rect1: {
          ...player,
          position: {
            x: player.position.x + deltaX,
            y: player.position.y + deltaY,
          },
        },
        rect2: boundary,
      })
    ) {
      moving = false;
      break;
    }
  }

  // Check collisions with entry zones
  for (const entryZone of entryZones) {
    if (
      rectangularCollision({
        rect1: {
          ...player,
          position: {
            x: player.position.x + deltaX,
            y: player.position.y + deltaY,
          },
        },
        rect2: entryZone,
      })
    ) {
      entry.initiated = true;
      moving = false;
      break;
    }
  }

  // Move movables if no collision
  if (moving) {
    movables.forEach((movable) => {
      movable.position.x -= deltaX;
      movable.position.y -= deltaY;
    });
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Update background if needed
  updateBackground();

  // Handle movement
  handleMovement(player, moveMovables);

  // Draw elements
  movables.forEach((movable) => movable.draw(c));
  player.draw(c);
}

animate();
setupInputHandlers();

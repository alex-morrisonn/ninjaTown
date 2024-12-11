import { createBackgrounds } from "./backgrounds.js";
import { setupInputHandlers, handlePlayerMovement } from "./input.js";
import { Sprite } from "./sprites.js";
import { createBoundaries, createEntryZones } from "./boundary.js";
import collisions from "../data/collisionsMainOutdoor.js";
import entryZonesData from "../data/entryZones.js";

const canvas = document.querySelector("canvas"); // Select the canvas element
const c = canvas.getContext("2d"); // Get the 2D rendering context for drawing

// Set canvas dimensions to match the desired resolution
canvas.width = 1920;
canvas.height = 1080;

const offset = { x: 0, y: -900 }; // Offset for map positioning

// Create boundaries for obstacles and entry zones for special areas
const mapWidth = 160; // Width of the map in grid units
const boundaries = createBoundaries(collisions, mapWidth, offset);
const entryZones = createEntryZones(entryZonesData, mapWidth, offset);

// Load background images and prepare the initial environment
const entry = { initiated: false }; // Track if the entry zone is activated
const { background, foreground, updateBackground } = createBackgrounds(
  offset,
  entry
);

// Load player sprite
const playerImage = new Image();
playerImage.src = "./img/walk.png";

// Initialize the player sprite with position and animations
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 88, // Center the player on the canvas
    y: canvas.height / 2 - 88,
  },
  image: playerImage,
  frames: { max: 4 }, // Maximum frames for animation
  sprites: {
    up: { x: 88, y: 0 },
    down: { x: 0, y: 0 },
    left: { x: 176, y: 0 },
    right: { x: 264, y: 0 },
  },
});

// List of all objects that move with the player (parallax effect)
const movables = [background, foreground, ...boundaries, ...entryZones];

function animate() {
  // Recursive function to create an animation loop
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for redrawing

  updateBackground(); // Update the background image if necessary

  handlePlayerMovement(player, movables, boundaries, entryZones, entry); // Process player movement

  // Draw all movable objects (background, obstacles, etc.)
  movables.forEach((movable) => movable.draw(c));
  player.draw(c); // Draw the player sprite
}

animate(); // Start the animation loop
setupInputHandlers(); // Set up keyboard input listeners

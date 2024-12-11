import { checkCollisions } from "./collision.js";
export const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

export function setupInputHandlers() {
  // Listen for keydown events to set movement flags
  window.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = true;
    }
  });

  // Listen for keyup events to reset movement flags
  window.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = false;
    }
  });
}

export function handlePlayerMovement(
  player,
  movables,
  boundaries,
  entryZones,
  entry
) {
  // Define movement deltas and corresponding sprites for each key
  const movement = {
    w: { deltaX: 0, deltaY: -3, sprite: player.sprites.up },
    a: { deltaX: -3, deltaY: 0, sprite: player.sprites.left },
    s: { deltaX: 0, deltaY: 3, sprite: player.sprites.down },
    d: { deltaX: 3, deltaY: 0, sprite: player.sprites.right },
  };

  let moved = false; // Track whether any movement occurred

  // Check for active keys and process movement
  for (const key in movement) {
    if (keys[key]) {
      const { deltaX, deltaY, sprite } = movement[key];
      player.moving = true; // Set player movement flag
      player.currentSprite = sprite; // Update player sprite direction

      // Check collisions and move if possible
      checkCollisions(
        player,
        movables,
        boundaries,
        entryZones,
        entry,
        deltaX,
        deltaY
      );
      moved = true; // Indicate that movement occurred
      break; // Exit after processing the first valid movement
    }
  }

  // Reset movement flag if no keys were active
  if (!moved) player.moving = false;
}

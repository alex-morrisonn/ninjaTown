export function rectangularCollision({ rect1, rect2 }) {
  // Check if two rectangles are colliding by comparing their boundaries
  return (
    rect1.position.x + rect1.width >= rect2.position.x && // Right edge of rect1 >= left edge of rect2
    rect1.position.x <= rect2.position.x + rect2.width && // Left edge of rect1 <= right edge of rect2
    rect1.position.y <= rect2.position.y + rect2.height && // Top edge of rect1 <= bottom edge of rect2
    rect1.position.y + rect1.height >= rect2.position.y // Bottom edge of rect1 >= top edge of rect2
  );
}

export function checkCollisions(
  player,
  movables,
  boundaries,
  entryZones,
  entry,
  deltaX,
  deltaY
) {
  let moving = true; // Track if the player can move

  // Check collisions with boundaries
  for (const boundary of boundaries) {
    if (
      rectangularCollision({
        rect1: {
          ...player,
          position: {
            x: player.position.x + deltaX, // Predict new x position
            y: player.position.y + deltaY, // Predict new y position
          },
        },
        rect2: boundary,
      })
    ) {
      moving = false; // Stop movement if collision detected
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
            x: player.position.x + deltaX, // Predict new x position
            y: player.position.y + deltaY, // Predict new y position
          },
        },
        rect2: entryZone,
      })
    ) {
      entry.initiated = true; // Trigger entry zone action
      moving = false; // Stop movement in entry zone
      break;
    }
  }

  // Move all movables if no collision occurred
  if (moving) {
    movables.forEach((movable) => {
      movable.position.x -= deltaX; // Adjust x position
      movable.position.y -= deltaY; // Adjust y position
    });
  }
}

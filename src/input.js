export const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

export function setupInputHandlers() {
  window.addEventListener("keydown", (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (keys.hasOwnProperty(e.key)) {
      keys[e.key] = false;
    }
  });
}

export function handleMovement(player, moveMovables) {
  if (keys.w) {
    moveMovables(0, -3);
    player.moving = true;
    player.currentSprite = player.sprites.up;
  } else if (keys.a) {
    moveMovables(-3, 0);
    player.moving = true;
    player.currentSprite = player.sprites.left;
  } else if (keys.s) {
    moveMovables(0, 3);
    player.moving = true;
    player.currentSprite = player.sprites.down;
  } else if (keys.d) {
    moveMovables(3, 0);
    player.moving = true;
    player.currentSprite = player.sprites.right;
  } else {
    player.moving = false;
  }
}

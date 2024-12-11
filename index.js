const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 160) {
  collisionsMap.push(collisions.slice(i, 160 + i));
}

const entryZonesMap = [];
for (let i = 0; i < entryZonesData.length; i += 160) {
  entryZonesMap.push(entryZonesData.slice(i, 160 + i));
}

const boundaries = [];
const offset = {
  x: 0,
  y: -900,
};

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

const entryZones = [];

entryZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2312)
      entryZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

console.log(entryZones);

const image = new Image();
image.src = "./maps/mainOutdoor.png";

const foregroundImage = new Image();
foregroundImage.src = "./maps/foregroundObjectsOutdoor.png";

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
    up: { x: 88, y: 0 }, // 2nd quarter (pixels 88-176)
    down: { x: 0, y: 0 }, // 1st quarter (pixels 0-88)
    left: { x: 176, y: 0 }, // 3rd quarter (pixels 176-264)
    right: { x: 264, y: 0 }, // 4th quarter (pixels 264-352)
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

const movables = [background, ...boundaries, foreground, ...entryZones];

function rectangularCollision({ rect1, rect2 }) {
  return (
    rect1.position.x + rect1.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y <= rect2.position.y + rect2.height &&
    rect1.position.y + rect1.height >= rect2.position.y
  );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  entryZones.forEach((entryZone) => {
    entryZone.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;

  player.moving = false;
  if (keys.w && lastKey === "w") {
    player.moving = true;
    player.currentSprite = player.sprites.up;
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
        moving = false;
        break;
      }
    }

    for (let i = 0; i < entryZones.length; i++) {
      const entryZone = entryZones[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x, y: player.position.y - 3 },
          },
          rect2: entryZone,
        })
      ) {
        moving = false;
        console.log("entry zone");
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a && lastKey === "a") {
    player.moving = true;
    player.currentSprite = player.sprites.left;
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
        moving = false;
        break;
      }
    }

    for (let i = 0; i < entryZones.length; i++) {
      const entryZone = entryZones[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x - 3, y: player.position.y },
          },
          rect2: entryZone,
        })
      ) {
        moving = false;
        console.log("entry zone");
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s && lastKey === "s") {
    player.moving = true;
    player.currentSprite = player.sprites.down;
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
        moving = false;
        break;
      }
    }

    for (let i = 0; i < entryZones.length; i++) {
      const entryZone = entryZones[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x, y: player.position.y + 3 },
          },
          rect2: entryZone,
        })
      ) {
        moving = false;
        console.log("entry zone");
        break;
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d && lastKey === "d") {
    player.moving = true;
    player.currentSprite = player.sprites.right;
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
        moving = false;
        break;
      }
    }

    for (let i = 0; i < entryZones.length; i++) {
      const entryZone = entryZones[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: { x: player.position.x + 3, y: player.position.y },
          },
          rect2: entryZone,
        })
      ) {
        moving = false;
        console.log("entry zone");
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

let lastKey = "";
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

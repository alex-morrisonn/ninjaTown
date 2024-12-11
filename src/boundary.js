export class Boundary {
  static width = 88;
  static height = 88;

  constructor({ position }) {
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw(c) {
    c.fillStyle = "rgba(255,0,0,0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export function createBoundaries(collisions, mapWidth, offset) {
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, i + mapWidth));
  }

  const boundaries = [];
  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 2316) {
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y,
            },
          })
        );
      }
    });
  });

  return boundaries;
}

export function createEntryZones(collisions, mapWidth, offset) {
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, i + mapWidth));
  }

  const entryZones = [];
  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 2312) {
        entryZones.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x,
              y: i * Boundary.height + offset.y,
            },
          })
        );
      }
    });
  });

  return entryZones;
}

export class Boundary {
  static width = 64; // Default boundary width
  static height = 64; // Default boundary height

  constructor({ position }) {
    // Initialize boundary with position and dimensions
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw(c) {
    // Render the boundary as an invisible rectangle
    c.fillStyle = "rgba(255,0,0,0)"; // Transparent color for testing or debugging
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export function createBoundaries(collisions, mapWidth, offset) {
  // Generate boundary objects based on collision data
  return generateZones(collisions, mapWidth, offset, 2316);
}

export function createEntryZones(collisions, mapWidth, offset) {
  // Generate entry zone objects based on collision data
  return generateZones(collisions, mapWidth, offset, 2312);
}

function generateZones(collisions, mapWidth, offset, code) {
  // Transform flat collision array into a 2D map
  const collisionsMap = [];
  for (let i = 0; i < collisions.length; i += mapWidth) {
    collisionsMap.push(collisions.slice(i, i + mapWidth));
  }

  const zones = []; // Store generated zones

  collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === code) {
        // Create a zone object if the symbol matches the specified code
        zones.push(
          new Boundary({
            position: {
              x: j * Boundary.width + offset.x, // Calculate x position with offset
              y: i * Boundary.height + offset.y, // Calculate y position with offset
            },
          })
        );
      }
    });
  });

  return zones; // Return the generated zones
}

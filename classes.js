// Sprite class creation
class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, scale = 1 }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.scale = scale;

    this.image.onload = () => {
      this.width = (this.image.width / this.frames.max) * this.scale;
      this.height = this.image.height * this.scale;
    };
  }

  // Draw the image on the canvas
  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames.max) * this.scale,
      this.image.height * this.scale
    );
  }
}

// Boundary class creation
class Boundary {
  static width = 88;
  static height = 88;
  constructor({ position }) {
    this.position = position;
    this.width = 88;
    this.height = 88;
  }

  // Draw the boundary on the canvas
  draw() {
    c.fillStyle = "rgba(255,0,0,0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

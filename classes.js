class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };

    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height / this.frames.max;
    };
    this.moving = false;
    this.sprites = sprites;
  }

  draw() {
    c.drawImage(
      this.image,
      0,
      this.frames.val * this.height,
      this.image.width,
      this.image.height / this.frames.max,
      this.position.x,
      this.position.y,
      this.image.width,
      this.image.height / this.frames.max
    );

    if (!this.moving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 40 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}

class Boundary {
  static width = 88;
  static height = 88;
  constructor({ position }) {
    this.position = position;
    this.width = 88;
    this.height = 88;
  }

  draw() {
    c.fillStyle = "rgba(255,0,0,0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

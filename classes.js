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
    this.currentSprite = { x: 0, y: 0 };
  }

  draw() {
    c.drawImage(
      this.image,
      this.currentSprite.x,
      this.currentSprite.y + this.frames.val * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  
    if (!this.moving) return;
  
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 35 === 0) {
      this.frames.val = (this.frames.val + 1) % this.frames.max;
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
    c.fillStyle = "rgba(255,0,0,0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

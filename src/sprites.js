export class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites }) {
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

  draw(c) {
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

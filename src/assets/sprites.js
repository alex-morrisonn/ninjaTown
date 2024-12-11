export class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites }) {
    // Initialize sprite position, image, frame data, and additional properties
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 }; // Frames control animation timing and state

    // Set sprite dimensions after the image loads
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max; // Divide image width by the number of frames
      this.height = this.image.height / this.frames.max; // Same logic for height if needed
    };
    this.moving = false; // Movement state indicator
    this.sprites = sprites; // Object holding directional sprite data
    this.currentSprite = { x: 0, y: 0 }; // Default sprite starting point
  }

  draw(c) {
    // Draw the current frame of the sprite on the canvas
    c.drawImage(
      this.image, // Source image
      this.currentSprite.x, // X-coordinate for the current frame
      this.currentSprite.y + this.frames.val * this.height, // Y-coordinate adjusted by frame index
      this.width, // Width of one frame
      this.height, // Height of one frame
      this.position.x, // X position on the canvas
      this.position.y, // Y position on the canvas
      this.width, // Rendered width on canvas
      this.height // Rendered height on canvas
    );

    // Exit early if the sprite is not moving
    if (!this.moving) return;

    // Increment frame counter if multiple frames exist
    if (this.frames.max > 1) {
      this.frames.elapsed++; // Increment elapsed frame count
    }

    // Update frame index periodically for animation
    if (this.frames.elapsed % 35 === 0) {
      this.frames.val = (this.frames.val + 1) % this.frames.max; // Loop back to first frame
    }
  }
}

export const offset = { x: -1400, y: -650 }; // Offset specific to outdoorMain scene
export const mapWidth = 100;

export function updateBackground(background, images) {
  // Set the outdoor scene's background image and apply the offset
  background.image = images.mainOutdoor;
  background.position.x = offset.x;
  background.position.y = offset.y;
}

export function updateForeground(foreground, images) {
  // Set the outdoor scene's foreground image and apply the offset
  foreground.image = images.outdoor;
  foreground.position.x = offset.x;
  foreground.position.y = offset.y;
}

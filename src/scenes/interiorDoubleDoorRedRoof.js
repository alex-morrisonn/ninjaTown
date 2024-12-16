export const offset = { x: 0, y: 0 }; // Offset specific to outdoorMain scene
export const mapWidth = 11;

export function updateBackground(background, images) {
  // Set the outdoor scene's background image and apply the offset
  background.image = images.interiorDoubleDoorRedRoof;
  background.position.x = offset.x;
  background.position.y = offset.y;
}
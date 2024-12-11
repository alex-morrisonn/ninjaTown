import { Sprite } from "./sprites.js";

export function createBackgrounds(offset, entry) {
  // Load main and secondary background images
  const mainBackgroundImage = new Image();
  mainBackgroundImage.src = "./maps/mainOutdoor.png";

  const newBackgroundImage = new Image();
  newBackgroundImage.src = "./maps/outdoorNew.png";

  // Create background sprite with initial position
  const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: mainBackgroundImage,
  });

  // Create foreground sprite with the same position as background
  const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: newBackgroundImage,
  });

  return {
    background,
    foreground,
    // Function to update the background image dynamically
    updateBackground: () => {
      background.image = entry.initiated
        ? newBackgroundImage // Switch to new image if entry is initiated
        : mainBackgroundImage; // Default to the main image otherwise
    },
  };
}

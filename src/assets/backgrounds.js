import { Sprite } from "./sprites.js";

const backgroundImages = {
  mainOutdoor: new Image(),
  outdoorNew: new Image(),
};

backgroundImages.mainOutdoor.src = "./maps/backgroundMainOutdoor.png";
backgroundImages.outdoorNew.src = "./maps/interiorStrawHouse.png";

const foregroundImages = {
  outdoor: new Image(),
};

foregroundImages.outdoor.src = "./maps/foregroundMainOutdoor.png";

export function preloadBackgrounds() {
  // Return preloaded background images
  return backgroundImages;
}

export function preloadForegrounds() {
  // Return preloaded foreground images
  return foregroundImages;
}

export function createBackground(offset) {
  // Create background sprite with initial image
  return new Sprite({
    position: { x: offset.x, y: offset.y },
    image: backgroundImages.mainOutdoor, // Default to mainOutdoor
  });
}

export function createForeground(offset) {
  // Create foreground sprite
  return new Sprite({
    position: { x: offset.x, y: offset.y },
    image: foregroundImages.outdoor,
  });
}

import { Sprite } from "./sprites.js";

export function createBackgrounds(offset, entry) {
  const mainBackgroundImage = new Image();
  mainBackgroundImage.src = "./maps/mainOutdoor.png";

  const newBackgroundImage = new Image();
  newBackgroundImage.src = "./maps/outdoorNew.png";

  const background = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: mainBackgroundImage,
  });

  const foreground = new Sprite({
    position: { x: offset.x, y: offset.y },
    image: newBackgroundImage,
  });

  return {
    background,
    foreground,
    updateBackground: () => {
      background.image = entry.initiated
        ? newBackgroundImage
        : mainBackgroundImage;
    },
  };
}

export function updateBackground(entry, background, images, player, canvas) {
  if (entry.initiated) {
    background.image = images.interiorDoubleDoorRedRoof;
  } else {
    background.image = images.mainOutdoor;
  }
}

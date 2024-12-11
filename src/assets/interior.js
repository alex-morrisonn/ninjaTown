export function updateBackground(entry, background, images) {
    // Update background image based on entry state
    background.image = entry.initiated
      ? images.outdoorNew // Switch to outdoorNew if entry is activated
      : images.mainOutdoor; // Default to mainOutdoor otherwise
  }
  
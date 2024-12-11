# Game Title: 2D Adventure Exploration Game

## Overview
This is a 2D adventure exploration game built using JavaScript and HTML5 Canvas. The game features a player character navigating through an interactive environment with collision detection, dynamic backgrounds, and animations. The primary goal is to explore the environment while interacting with different zones and objects.

## Features
1. **Dynamic Backgrounds**: The game includes layered backgrounds for a visually appealing experience.
2. **Collision Detection**: Boundaries and entry zones are implemented to restrict movement and trigger events.
3. **Keyboard Controls**: Smooth player movement is controlled via keyboard inputs.
4. **Sprite Animations**: The player character features directional animations for a realistic feel.
5. **Interactive Zones**: Entry zones trigger special actions or changes in the environment.

## Gameplay
- **Move**: Use the `W`, `A`, `S`, and `D` keys to navigate the player character.
- **Explore**: Traverse the environment while avoiding invisible boundaries.
- **Interact**: Entry zones alter the gameplay, such as changing the background or triggering events.

## Project Structure
- **`backgrounds.js`**: Manages the creation and dynamic updates of background layers.
- **`boundary.js`**: Defines boundaries and entry zones to enforce collision rules.
- **`collision.js`**: Implements collision logic to restrict or enable player movement.
- **`input.js`**: Handles keyboard input and processes player movement.
- **`main.js`**: Initializes the game environment, including canvas setup and animation loop.
- **`sprites.js`**: Defines the Sprite class for rendering and animating game characters and objects.

## Setup
1. Clone the repository or download the files.
2. Ensure all necessary assets (images, maps, data files) are in the correct directories.
3. Open `index.html` in a web browser to start the game.

## How It Works
1. **Canvas Initialization**: The game uses an HTML5 Canvas to render the environment and sprites.
2. **Game Loop**: The `animate` function is a recursive loop that continuously redraws the canvas.
3. **Player Movement**: Keyboard inputs update the player’s position and trigger sprite animations.
4. **Collision Checks**: Movement is validated against boundaries and entry zones to ensure smooth gameplay.

## Controls
- **W**: Move Up
- **A**: Move Left
- **S**: Move Down
- **D**: Move Right

## Requirements
- A modern web browser with JavaScript enabled.

## Future Improvements
- Add interactive NPCs or collectibles.
- Expand the map with additional zones.
- Enhance visual effects and sound integration.

Feel free to explore and enjoy this interactive adventure!
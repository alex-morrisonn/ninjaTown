const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./maps/mainOutdoor.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

const scaleFactor = 1.5;

image.onload = () => {
  c.drawImage(image, 0, -800);
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4,
    canvas.height / 2 - playerImage.height / 4,
    (playerImage.width / 4) * scaleFactor,
    playerImage.height * scaleFactor
  );
};

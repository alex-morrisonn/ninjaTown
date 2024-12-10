const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./maps/mainOutdoor.png";

image.onload = () => {
  c.drawImage(image, 0, 0);
};

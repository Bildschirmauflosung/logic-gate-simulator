import "./css/main.scss";

const nav: HTMLElement = document.querySelector(".navbar")!;
const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
const ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

function resizeCanvas() {
  cv.width = window.innerWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cv.width, cv.height);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

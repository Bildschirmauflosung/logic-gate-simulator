import "./css/main.scss";
import { Gate } from "./render/Gate";

const nav: HTMLElement = document.querySelector(".navbar")!;
const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

function resizeCanvas() {
  cv.width = window.innerWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
}

resizeCanvas();

const gate: Gate = new Gate(64, 64, 100, 50, "AA");

function render() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  gate.render(ctx);
  requestAnimationFrame(render);
}

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("resize", resizeCanvas);

cv.addEventListener("mousemove", (e) => gate.handleEvent(e));
cv.addEventListener("mousedown", (e) => gate.handleEvent(e));
cv.addEventListener("mouseup", (e) => gate.handleEvent(e));

requestAnimationFrame(render);
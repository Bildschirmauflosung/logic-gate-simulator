import "./css/main.scss";
import { Gate } from "./render/Gate";

const nav: HTMLElement = document.querySelector(".navbar")!;
const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
export const gates: Gate[] = [];
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

let maxId = 0;

function resizeCanvas() {
  cv.width = window.innerWidth - sidebar.offsetWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
}

resizeCanvas();

function render() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const i of gates) {
    i.render(ctx);
  }
  requestAnimationFrame(render);
}

function handle(e: MouseEvent) {
  for (const i of gates) {
    i.handleEvent(e);
  }
}

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("resize", resizeCanvas);

sidebarBtn.forEach((v) => {
  v.addEventListener("click", () => {
    const g: Gate = new Gate(64, 64, 200, 100, maxId++, v.innerText);
    gates.push(g);
  });
});

cv.addEventListener("mousemove", (e) => handle(e));
cv.addEventListener("mousedown", (e) => handle(e));
cv.addEventListener("mouseup", (e) => handle(e));

requestAnimationFrame(render);
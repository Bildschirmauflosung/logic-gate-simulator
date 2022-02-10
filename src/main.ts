import "./css/main.scss";
import { Gate } from "./render/Gate";
import { IOButton, IOType } from "./render/IOButton";
import { IRenderable } from "./render/IRenderable";
import { Toolbar, ToolbarSide } from "./render/Toolbar";

const nav: HTMLElement = document.querySelector(".navbar")!;
const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
const renderable: IRenderable[] = [];
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
  for (const i of renderable) {
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
    renderable.push(g);
  });
});

const toolbar: Toolbar = new Toolbar(32, ToolbarSide.LEFT);
toolbar.items.push(new IOButton(48, "ABC", IOType.INPUT));
renderable.push(toolbar);

cv.addEventListener("mousemove", (e) => handle(e));
cv.addEventListener("mousedown", (e) => handle(e));
cv.addEventListener("mouseup", (e) => handle(e));
cv.addEventListener("contextmenu", (e) => handle(e));

requestAnimationFrame(render);
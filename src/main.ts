import "./css/main.scss";
import { Gate } from "./render/Gate";
import { IOButton, IOType } from "./render/IOButton";
import { IRenderable } from "./render/IRenderable";
import { IWithMouseEvent } from "./render/IWithMouseEvent";
import { Toolbar, ToolbarSide } from "./render/Toolbar";

const nav: HTMLElement = document.querySelector(".navbar")!;
const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

export const withMouseEvent: IWithMouseEvent[] = [];
export const renderable: IRenderable[] = [];
export const gates: Gate[] = [];

function resizeCanvas() {
  cv.width = window.innerWidth - sidebar.offsetWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
}

resizeCanvas();

function render() {
  ctx.fillStyle = "#fff";
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const i of renderable) {
    i.render(ctx);
  }
  requestAnimationFrame(render);
}

function handleMouseDown(e: MouseEvent) {
  for (const i of withMouseEvent) {
    i.handleMouseDown(e);
  }
}

function handleMouseUp(e: MouseEvent) {
  for (const i of withMouseEvent) {
    i.handleMouseUp(e);
  }
}

function handleMouseMove(e: MouseEvent) {
  for (const i of withMouseEvent) {
    i.handleMouseMove(e);
  }
}

function handleMouseContextMenu(e: MouseEvent) {
  for (const i of withMouseEvent) {
    i.handleMouseContextMenu(e);
  }
}

function handleMouseEnter(e: MouseEvent) {
  for (const i of withMouseEvent) {
    i.handleMouseEnter(e);
  }
}

function handleMouseLeave(e: MouseEvent) {
  for (const i of withMouseEvent) {
    i.handleMouseLeave(e);
  }
}

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("resize", resizeCanvas);

sidebarBtn.forEach((v) => {
  v.addEventListener("click", () => {
    const g: Gate = new Gate(64, 64, 200, 100, gates.length, v.innerText);
    gates.push(g);
    renderable.push(g);
    withMouseEvent.push(g);
  });
});

const toolbar: Toolbar = new Toolbar(32, ToolbarSide.LEFT);
const test = new IOButton(48, "ABC", IOType.INPUT, toolbar)
withMouseEvent.push(test);
toolbar.items.push(test);
renderable.push(toolbar);

cv.addEventListener("mousemove", (e) => handleMouseMove(e));
cv.addEventListener("mousedown", (e) => handleMouseDown(e));
cv.addEventListener("mouseup", (e) => handleMouseUp(e));
cv.addEventListener("contextmenu", (e) => handleMouseContextMenu(e));
cv.addEventListener("mouseenter", (e) => handleMouseEnter(e));
cv.addEventListener("mouseleave", (e) => handleMouseLeave(e));

requestAnimationFrame(render);
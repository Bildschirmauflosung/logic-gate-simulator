import "./css/main.scss";
import { IConnectionMap } from "./logic/IConnectionMap";
import { LogicGate } from "./logic/LogicGate";
import { Simulator } from "./logic/Simulator";
import { Gate } from "./render/Gate";
import { IOAddButton } from "./render/IOAddButton";
import { IOButton } from "./render/IOButton";
import { IOType } from "./render/IOType";
import { IRenderable } from "./render/IRenderable";
import { IWithMouseEvent } from "./render/IWithMouseEvent";
import { Deserialiser } from './logic/Deserialiser'

export const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
const nav: HTMLElement = document.querySelector(".navbar")!;
const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;
let maxId: number = 0;

export const withMouseEvent: IWithMouseEvent[] = [];
export const renderable: IRenderable[] = [];
export const gates: Gate[] = [];
export const ioButtons: IOButton[] = [];
const connections: IConnectionMap[] = [];

export const simulator: Simulator = new Simulator(connections);

const test1 = new IOButton("I", IOType.INPUT)
const test2 = new IOButton("O", IOType.OUTPUT)
const addInput = new IOAddButton(IOType.INPUT)
const addOutput = new IOAddButton(IOType.OUTPUT)
withMouseEvent.push(test1);
renderable.push(test1);
ioButtons.push(test1);
withMouseEvent.push(test2);
renderable.push(test2);
ioButtons.push(test2);
withMouseEvent.push(addInput);
renderable.push(addInput);
withMouseEvent.push(addOutput);
renderable.push(addOutput);

function resizeCanvas() {
  cv.width = window.innerWidth - sidebar.offsetWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  for (const i of ioButtons) {
    i.align();
  }
  addInput.align();
  addOutput.align();
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

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("resize", resizeCanvas);

sidebarBtn.forEach((v) => {
  const gateName = v.innerText.toLowerCase();
  let inputNum: number;
  if (gateName.toUpperCase() === "AND") {
    inputNum = 2;
  } else {
    inputNum = 1;
  }
  v.addEventListener("click", () => {
    const lg: LogicGate = new LogicGate([], inputNum, 1, Deserialiser.basicResolutionFuncs.get(gateName)!);
    const g: Gate = new Gate(64, 64, maxId++, gateName, lg);
    gates.push(g);
    renderable.push(g);
    withMouseEvent.push(g);
  });
});

cv.addEventListener("mousemove", (e) => handleMouseMove(e));
cv.addEventListener("mousedown", (e) => handleMouseDown(e));
cv.addEventListener("mouseup", (e) => handleMouseUp(e));
cv.addEventListener("contextmenu", (e) => handleMouseContextMenu(e));

requestAnimationFrame(render);
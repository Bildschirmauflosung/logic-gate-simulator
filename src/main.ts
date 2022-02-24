import "./css/main.scss";
import { IConnectionMap } from "./logic/IConnectionMap";
import { LogicGate } from "./logic/LogicGate";
// import { Simulator } from "./logic/Simulator";
import { Gate } from "./render/Gate";
import { IOAddButton } from "./render/IOAddButton";
import { Deserialiser } from './logic/Deserialiser'
import { ConnectionData } from "./render/ConnectionData";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { Theme } from "./render/theme/Theme";
import { IWidget } from "./render/IWidget";
import { MouseEventType } from "./render/MouseEventType";
import { GateType } from "./render/GateType";
import { ProjectsDialog } from "./dialogs/ProjectsDialog";

export const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
const nav: HTMLElement = document.querySelector(".navbar")!;
export const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

export const widgets: IWidget[] = [];
export const gates: Gate[] = [];
export const connectedPoints: ConnectionData[] = [];
export const connections: IConnectionMap[] = [];

// export const simulator: Simulator = new Simulator(gates, ioButtons, connections);

const addInput = new IOAddButton(true);
const addOutput = new IOAddButton(false);
widgets.push(addInput);
widgets.push(addOutput);

function resizeCanvas() {
  cv.width = window.innerWidth - sidebar.offsetWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  addInput.align();
  addOutput.align();
}

resizeCanvas();

document.querySelector("#settings-btn")!.addEventListener("click", () => {
  SettingsDialog.build();
  SettingsDialog.show();
});
document.querySelector("#projects-btn")!.addEventListener("click", () => {
  ProjectsDialog.build();
  ProjectsDialog.show();
});

Theme.setSystemTheme();

ProjectsDialog.build();
ProjectsDialog.show();

function render() {
  // ctx.fillStyle = Theme.bgColour;
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const i of connectedPoints) {
    i.render(ctx);
  }
  for (const i of widgets) {
    i.render(ctx);
  }
  requestAnimationFrame(render);
}

function handle(type: MouseEventType, event: MouseEvent) {
  for (const i of widgets) {
    i.handleEvent(type, event);
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
    const lg: LogicGate = new LogicGate([], [], inputNum, 1, Deserialiser.basicResolutionFuncs.get(gateName)!);
    const g: Gate = new Gate(64, 4, gates.length, gateName, GateType.GATE, lg);
    gates.push(g);
    widgets.push(g);
  });
});

cv.addEventListener("mousemove", (e) => handle(MouseEventType.MOVE, e));
cv.addEventListener("mousedown", (e) => handle(MouseEventType.DOWN, e));
cv.addEventListener("mouseup", (e) => handle(MouseEventType.UP, e));
cv.addEventListener("contextmenu", (e) => handle(MouseEventType.CONTEXTMENU, e));

requestAnimationFrame(render);
import "./css/main.scss";
import { Gate } from "./render/Gate";
import { IOAddButton } from "./render/IOAddButton";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { Theme } from "./render/theme/Theme";
import { MouseEventType } from "./render/MouseEventType";
import { GateType } from "./render/GateType";
import { ProjectsDialog } from "./dialogs/ProjectsDialog";
import { SaveDialog } from "./dialogs/SaveDialog";
import { Project } from "./Project";

export const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
export const nav: HTMLElement = document.querySelector(".navbar")!;
export const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

export const projects = new Map<string, Project>();
export const currentProject = new Project("New Project");
export const rs = currentProject.simulators.get("New Gate")?.[0]!;
export const ls = currentProject.simulators.get("New Gate")?.[1]!;

const addInput = new IOAddButton(true);
const addOutput = new IOAddButton(false);
rs.widgets.push(addInput);
rs.widgets.push(addOutput);

function resizeCanvas() {
  cv.width = window.innerWidth - sidebar.offsetWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  addInput.align();
  addOutput.align();
  for (const i of rs.gates) {
    i.align();
  }
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
document.querySelector("#save-btn")!.addEventListener("click", () => {
  SaveDialog.build();
  SaveDialog.show();
});

Theme.setSystemTheme();

ProjectsDialog.build();
ProjectsDialog.show();

function render() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const i of rs.gates) {
    i.updateInputs();
  }
  ls.tick();
  for (const i of rs.gates) {
    i.updateOutputs();
  }

  rs.render(ctx);
  rs.renderWires(ctx);
  requestAnimationFrame(render);
}

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("resize", resizeCanvas);

sidebarBtn.forEach((v) => {
  const gateName = v.innerText.toLowerCase();
  v.addEventListener("click", () => {
    const g: Gate = new Gate(64, 4, rs.gates.length, gateName, GateType.GATE);
    rs.gates.push(g);
    rs.widgets.push(g);
  });
});

cv.addEventListener("mousemove", (e) => rs.handleEvents(MouseEventType.MOVE, e));
cv.addEventListener("mousedown", (e) => rs.handleEvents(MouseEventType.DOWN, e));
cv.addEventListener("mouseup", (e) => rs.handleEvents(MouseEventType.UP, e));
cv.addEventListener("contextmenu", (e) => rs.handleEvents(MouseEventType.CONTEXTMENU, e));

requestAnimationFrame(render);

import "./css/main.scss";
import { Gate } from "./render/Gate";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { Theme } from "./render/theme/Theme";
import { MouseEventType } from "./render/MouseEventType";
import { GateType } from "./render/GateType";
import { ProjectsDialog } from "./dialogs/ProjectsDialog";
import { SaveDialog } from "./dialogs/SaveDialog";
import { Menu } from "./render/menu/Menu";
import { ItemType, MenuItem } from "./render/menu/MenuItem";
import { Dialog } from "./render/dialog/Dialog";
import { ButtonType, DialogButton } from "./render/dialog/DialogButton";
import { DialogTextField } from "./render/dialog/DialogTextField";
import { WorkingAreaData } from "./WorkingAreaData";
import { Project } from "./Project";
import { buildWorkArea } from "./utils/Helpers";
import { BitsNumber } from "./render/BitsNumber";
import { ErrorDialog } from "./dialogs/ErrorDialog";
import { RenderSimulator } from "./render/RenderSimulator";
import { Simulator } from "./logic/Simulator";

export const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
export const nav: HTMLElement = document.querySelector(".navbar")!;
export const title: HTMLElement = document.querySelector(".navbar__title")!;
export const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

buildWorkArea();

WorkingAreaData.projects.set("New Project", new Project("New Project"));

function createElement(name: string) {
  const btn = document.createElement("div");
  btn.className = "content__sidebar-btn";
  btn.innerText = name.toUpperCase();
  btn.addEventListener("click", () => {
    const g: Gate = new Gate(64, 4, WorkingAreaData.rs.gates.length, name, GateType.GATE);
    WorkingAreaData.rs.gates.push(g);
    WorkingAreaData.rs.widgets.push(g);
  });
  btn.addEventListener("contextmenu", (e) => {
    if (name !== "and" && name !== "not") {
      const menu = new Menu();
      menu.addItem(new MenuItem("Close", () => menu.hide()));
      menu.addItem(new MenuItem("Edit", () => {
        menu.hide();
        WorkingAreaData.rs = WorkingAreaData.currentProject.simulators.get(name)?.[0]!;
        WorkingAreaData.ls = WorkingAreaData.currentProject.simulators.get(name)?.[1]!;
        title.innerText = name.toUpperCase();
        buildWorkArea();
      }));
      menu.addItem(new MenuItem("Delete", () => {
        menu.hide();
        const dialog = new Dialog(`Delete Gate`);
        dialog.addField(new DialogTextField("text", `Are you sure you want to delete ${ name.toUpperCase() } gate? \nThis action is irreversible.`));
        dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
          dialog.close();
        }));
        dialog.addButton(new DialogButton("Delete", ButtonType.DANGER, () => {
          dialog.close();
          WorkingAreaData.currentProject.registry.delete(name);
          updateSidebar();
        }));
        dialog.show();
      }, ItemType.DANGER));
      menu.show(e.clientX, e.clientY);
    }
  });
  sidebar.appendChild(btn);
}

export function updateSidebar() {
  sidebar.replaceChildren();
  [...WorkingAreaData.currentProject.registry].filter((v) => v[1].gType === GateType.GATE).forEach((v) => {
    createElement(v[0]);
  });
}

function resizeCanvas() {
  cv.width = window.innerWidth - sidebar.offsetWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, cv.width, cv.height);
  for (const i of WorkingAreaData.rs.gates) {
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
  if (WorkingAreaData.rs.gates.filter((v) => v.type !== GateType.GATE && v.bits !== BitsNumber.ONE).length > 0) {
    ErrorDialog.show("Cannot save gates with multiple-bit I/O ports.\nMultiple-bit I/O ports are intended only for testing puropses.", "Save Error");
    return;
  }
  SaveDialog.build();
  SaveDialog.show();
});
document.querySelector("#clear-btn")!.addEventListener("click", () => {
  const dialog = new Dialog("Clear");
  dialog.addField(new DialogTextField("text", "This will clear your work area.\nAll unsaved changes will be lost."));
  dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => dialog.close()));
  dialog.addButton(new DialogButton("Clear", ButtonType.DANGER, () => {
    dialog.close();
    WorkingAreaData.rs = new RenderSimulator("New Gate");
    WorkingAreaData.ls = Simulator.from(WorkingAreaData.rs);
    buildWorkArea();
  }));
  dialog.show();
});

Theme.setSystemTheme();

ProjectsDialog.build();
ProjectsDialog.show();

function render() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const i of WorkingAreaData.rs.gates) {
    i.updateInputs();
  }
  WorkingAreaData.rs.update(WorkingAreaData.ls);
  WorkingAreaData.ls.tick();
  for (const i of WorkingAreaData.rs.gates) {
    i.updateOutputs();
  }

  WorkingAreaData.rs.render(ctx);
  WorkingAreaData.rs.renderWires(ctx);
  requestAnimationFrame(render);
}

document.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("resize", resizeCanvas);

updateSidebar();

cv.addEventListener("mousemove", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.MOVE, e));
cv.addEventListener("mousedown", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.DOWN, e));
cv.addEventListener("mouseup", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.UP, e));
cv.addEventListener("contextmenu", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.CONTEXTMENU, e));

requestAnimationFrame(render);

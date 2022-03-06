import "./css/main.scss";
import { Gate } from "./render/Gate";
import { IOAddButton } from "./render/IOAddButton";
import { SettingsDialog } from "./dialogs/SettingsDialog";
import { Theme } from "./render/theme/Theme";
import { MouseEventType } from "./render/MouseEventType";
import { GateType } from "./render/GateType";
import { ProjectsDialog } from "./dialogs/ProjectsDialog";
import { SaveDialog } from "./dialogs/SaveDialog";
import { Menu } from "./render/menu/Menu";
import { ItemType, MenuItem } from "./render/menu/MenuItem";
import { Dialog } from "./render/dialog/Dialog";
import { DialogColourField } from "./render/dialog/DialogColourField";
import { DialogInputField } from "./render/dialog/DialogInputField";
import { ButtonType, DialogButton } from "./render/dialog/DialogButton";
import { DialogTextField } from "./render/dialog/DialogTextField";
import { WorkingAreaData } from "./WorkingAreaData";
import { Project } from "./Project";

export const cv : HTMLCanvasElement = document.querySelector(".content__canvas")!;
export const nav: HTMLElement = document.querySelector(".navbar")!;
export const sidebar: HTMLElement = document.querySelector(".content__sidebar")!;
const sidebarBtn: NodeListOf<HTMLElement> = document.querySelectorAll(".content__sidebar-btn")!;
let ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

const addInput = new IOAddButton(true);
const addOutput = new IOAddButton(false);
WorkingAreaData.rs.widgets.push(addInput);
WorkingAreaData.rs.widgets.push(addOutput);

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
  addInput.align();
  addOutput.align();
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
  SaveDialog.build();
  SaveDialog.show();
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

/*
sidebarBtn.forEach((v) => {
  const gateName = v.innerText.toLowerCase();
  const menu = new Menu();
  menu.addItem(new MenuItem("Edit", () => {
    menu.hide();
    // TODO: Go to editing mode
  }));
  menu.addItem(new MenuItem("Properties", () => {
    menu.hide();
    const dialog = new Dialog(`Properties - ${ gateName.toUpperCase() }`);
    dialog.addField(new DialogColourField("colour", "Colour"));
    dialog.addField(new DialogInputField("name", "Name (max. 8 chars)", 8));
    dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
      dialog.close();
    }));
    dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
      dialog.close();
      // TODO: Save changes
    }));
    dialog.show();
  }));
  menu.addItem(new MenuItem("Delete", () => {
    menu.hide();
    const dialog = new Dialog(`Delete Gate`);
    dialog.addField(new DialogTextField("text", `Are you sure you want to delete ${ gateName.toUpperCase() } gate? \nThis action is irreversible.`));
    dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
      dialog.close();
    }));
    dialog.addButton(new DialogButton("Delete", ButtonType.DANGER, () => {
      dialog.close();
      // TODO: Delete gate from project
    }));
    dialog.show();
  }, ItemType.DANGER));

  v.addEventListener("click", () => {
    const g: Gate = new Gate(64, 4, WorkingAreaData.rs.gates.length, gateName, GateType.GATE);
    WorkingAreaData.rs.gates.push(g);
    WorkingAreaData.rs.widgets.push(g);
    menu.hide();
  });
  v.addEventListener("contextmenu", (e) => {
    menu.show(e.clientX, e.clientY);
  });
});
*/

updateSidebar();

cv.addEventListener("mousemove", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.MOVE, e));
cv.addEventListener("mousedown", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.DOWN, e));
cv.addEventListener("mouseup", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.UP, e));
cv.addEventListener("contextmenu", (e) => WorkingAreaData.rs.handleEvents(MouseEventType.CONTEXTMENU, e));

requestAnimationFrame(render);

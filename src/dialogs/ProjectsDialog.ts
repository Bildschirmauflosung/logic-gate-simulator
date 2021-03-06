import { Simulator } from "../logic/Simulator";
import { title, updateSidebar } from "../main";
import { Project } from "../Project";
import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogFlexField } from "../render/dialog/DialogFlexField";
import { DialogInputField } from "../render/dialog/DialogInputField";
import { DialogListField } from "../render/dialog/DialogListField";
import { DialogListItem } from "../render/dialog/DialogListItem";
import { DialogTextField } from "../render/dialog/DialogTextField";
import { RenderSimulator } from "../render/RenderSimulator";
import { buildWorkArea } from "../utils/Helpers";
import { WorkingAreaData } from "../WorkingAreaData";

export class ProjectsDialog {
  private static dialog: Dialog;

  static build() {
    const newProj = new DialogFlexField("projectNew", true);
    newProj.addField(new DialogTextField("newText", "Create a New Project"));
    newProj.addField(new DialogInputField("name", "Project Name", 64));
    
    const openProj = new DialogFlexField("projectOpen", true);
    const list = new DialogListField("projects", "Projects");
    for (const i of WorkingAreaData.projects) {
      list.addItem(new DialogListItem(i[0], i[0], () => {
        this.dialog.close();
        WorkingAreaData.currentProject = i[1];
        WorkingAreaData.rs = new RenderSimulator(i[0]);
        WorkingAreaData.ls = Simulator.from(WorkingAreaData.rs);
        title.innerText = `${ WorkingAreaData.currentProject.name } / New Gate`;
        updateSidebar();
        buildWorkArea();
      }));
    }
    openProj.addField(new DialogTextField("openText", "Open Existing Project"));
    openProj.addField(list);

    const root = new DialogFlexField("root", false);
    root.addField(newProj);
    root.addField(openProj);
    
    this.dialog = new Dialog("Projects");
    this.dialog.addField(root);
    if (WorkingAreaData.projects.size > 0) {
      this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
        this.dialog.close();
        buildWorkArea();
      }));
    }
    this.dialog.addButton(new DialogButton("Create", ButtonType.NORMAL, () => {
      const name = newProj.getValue()[1].getValue() as string;
      if (name !== "") {
        this.dialog.close();
        WorkingAreaData.projects.set(name, new Project(name));
        WorkingAreaData.currentProject = WorkingAreaData.projects.get(name)!;
        WorkingAreaData.rs = WorkingAreaData.currentProject.simulators.get("New Gate")![0];
        WorkingAreaData.ls = WorkingAreaData.currentProject.simulators.get("New Gate")![1];
        title.innerText = `${ WorkingAreaData.currentProject.name } / New Gate`;
        updateSidebar();
        buildWorkArea();
      }
    }));
  }

  static show() {
    this.dialog.show();
  }
}
import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogFlexField } from "../render/dialog/DialogFlexField";
import { DialogInputField } from "../render/dialog/DialogInputField";
import { DialogTextField } from "../render/dialog/DialogTextField";

export class ProjectsDialog {
  private static dialog: Dialog;

  static build() {
    const newProj = new DialogFlexField("projectNew", true);
    newProj.addField(new DialogTextField("newText", "Create a New Project"));
    newProj.addField(new DialogInputField("name", "Project Name", 64));
    
    const openProj = new DialogFlexField("projectOpen", true);
    openProj.addField(new DialogTextField("openText", "Open Existing Project"));

    const root = new DialogFlexField("root", false);
    root.addField(newProj);
    root.addField(openProj);
    
    this.dialog = new Dialog("Projects");
    this.dialog.addField(root);
    this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
      this.dialog.close();
    }));
  }

  static show() {
    this.dialog.show();
  }
}
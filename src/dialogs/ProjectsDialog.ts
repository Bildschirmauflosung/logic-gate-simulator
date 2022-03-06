import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogFlexField } from "../render/dialog/DialogFlexField";
import { DialogInputField } from "../render/dialog/DialogInputField";
import { DialogListField } from "../render/dialog/DialogListField";
import { DialogListItem } from "../render/dialog/DialogListItem";
import { DialogTextField } from "../render/dialog/DialogTextField";

export class ProjectsDialog {
  private static dialog: Dialog;

  static build() {
    const newProj = new DialogFlexField("projectNew", true);
    newProj.addField(new DialogTextField("newText", "Create a New Project"));
    newProj.addField(new DialogInputField("name", "Project Name", 64));
    
    const openProj = new DialogFlexField("projectOpen", true);
    const list = new DialogListField("projects", "Projects");
    list.addItem(new DialogListItem("Test 1", "this is test1", "test1", () => {}));
    list.addItem(new DialogListItem("Test 2", "this is test2", "test2", () => {}));
    list.addItem(new DialogListItem("Test 3", "this is test3", "test3", () => {}));
    openProj.addField(new DialogTextField("openText", "Open Existing Project"));
    openProj.addField(list);

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
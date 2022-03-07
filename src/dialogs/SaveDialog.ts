import { IntrinsicGateData } from "../logic/IntrinsicGateData";
import { Simulator } from "../logic/Simulator";
import { updateSidebar } from "../main";
import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogColourField } from "../render/dialog/DialogColourField";
import { DialogInputField } from "../render/dialog/DialogInputField";
import { RenderSimulator } from "../render/RenderSimulator";
import { buildWorkArea } from "../utils/Helpers";
import { WorkingAreaData } from "../WorkingAreaData";

export class SaveDialog {
  private static dialog: Dialog;

  static build() {
    this.dialog = new Dialog("Save Gate");
    this.dialog.addField(new DialogColourField("colour", "Colour"));
    this.dialog.addField(new DialogInputField("name", "Name (max. 8 characters)", 8));
    this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => { this.dialog.close() }));
    this.dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
      const name = this.dialog.getValueFromField("name") as string;
      if ([...IntrinsicGateData].findIndex((v) => v[0].toLowerCase() === name.toLowerCase()) !== -1) {
        return;
      }
      this.dialog.close();
      WorkingAreaData.currentProject.updateRegistry(name, WorkingAreaData.rs);
      WorkingAreaData.rs.name = name;
      WorkingAreaData.currentProject.simulators.set(name, [WorkingAreaData.rs, WorkingAreaData.ls]);
      WorkingAreaData.rs = new RenderSimulator("New Gate");
      WorkingAreaData.ls = Simulator.from(WorkingAreaData.rs);
      updateSidebar();
      buildWorkArea();
    }));
  }

  static show() {
    this.dialog.show();
  }
}
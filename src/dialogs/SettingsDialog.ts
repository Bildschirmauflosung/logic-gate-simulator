import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogCheckField } from "../render/dialog/DialogCheckField";
import { DialogSelectField } from "../render/dialog/DialogSelectField";
import { Settings } from "../Settings";

export class SettingsDialog {
  private static dialog: Dialog;

  static build() {
    this.dialog = new Dialog("Settings");
    this.dialog.addField(new DialogCheckField("showFieldLabels", "Show Field Labels", Settings.showFieldNames));
    this.dialog.addField(new DialogSelectField("theme", "Theme", ["System", "Dark", "Light"], 0));
    this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => { this.dialog.close() }));
    this.dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
      this.dialog.close();
      Settings.showFieldNames = this.dialog.getValueFromField("showFieldLabels") as boolean;
      Settings.theme = this.dialog.getValueFromField("theme") as string;
    }));
  }

  static show() {
    this.dialog.show();
  }
}
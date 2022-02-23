import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogCheckField } from "../render/dialog/DialogCheckField";
import { DialogColourField } from "../render/dialog/DialogColourField";
import { Settings } from "../Settings";

export class SettingsDialog {
  private static dialog: Dialog;

  static build() {
    this.dialog = new Dialog("Settings");
    this.dialog.addField(new DialogCheckField("showFieldLabels", "Show Field Labels", Settings.showFieldNames));
    this.dialog.addField(new DialogColourField("colour", "Colour"));
    this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => { this.dialog.close() }));
    this.dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
      this.dialog.close();
      Settings.showFieldNames = this.dialog.getValueFromField("showFieldLabels") as boolean;
    }));
  }

  static show() {
    this.dialog.show();
  }
}
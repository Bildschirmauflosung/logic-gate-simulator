import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogColourField } from "../render/dialog/DialogColourField";
import { DialogInputField } from "../render/dialog/DialogInputField";

export class SaveDialog {
  private static dialog: Dialog;

  static build() {
    this.dialog = new Dialog("Save Gate");
    this.dialog.addField(new DialogColourField("colour", "Colour"));
    this.dialog.addField(new DialogInputField("name", "Name (max. 8 characters)", 8));
    this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => { this.dialog.close() }));
    this.dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
      this.dialog.close();
      // TODO: Store gate in storage
    }));
  }

  static show() {
    this.dialog.show();
  }
}
import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogTextField } from "../render/dialog/DialogTextField";

export class ErrorDialog {
  static show(msg: string, title: string) {
    const dialog = new Dialog(title);
    dialog.addField(new DialogTextField("text", msg));
    dialog.addButton(new DialogButton("OK", ButtonType.NORMAL, () => dialog.close()));
    dialog.show();
  }
}
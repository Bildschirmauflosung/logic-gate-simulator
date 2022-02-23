import { Dialog } from "../render/dialog/Dialog";
import { ButtonType, DialogButton } from "../render/dialog/DialogButton";
import { DialogCheckField } from "../render/dialog/DialogCheckField";
import { DialogSelectField } from "../render/dialog/DialogSelectField";
import { Theme } from "../render/theme/Theme";
import { Settings } from "../Settings";

export class SettingsDialog {
  private static dialog: Dialog;

  static build() {
    const themes = ["System", "Dark", "Light"];
    this.dialog = new Dialog("Settings");
    this.dialog.addField(new DialogCheckField("showFieldLabels", "Show Field Labels", Settings.showFieldNames));
    this.dialog.addField(new DialogSelectField("theme", "Theme", themes, themes.findIndex((v) => v === Settings.theme)));
    this.dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => { this.dialog.close() }));
    this.dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
      this.dialog.close();
      Settings.showFieldNames = this.dialog.getValueFromField("showFieldLabels") as boolean;
      Settings.theme = this.dialog.getValueFromField("theme") as string;
      switch (Settings.theme) {
        case "System":
          Theme.setSystemTheme();
          break;
        case "Dark":
          Theme.setDarkTheme();
          break;
        case "Light":
          Theme.setLightTheme();
          break;
      }
    }));
  }

  static show() {
    this.dialog.show();
  }
}
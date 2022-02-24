import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogTextField implements IDialogField {
  constructor(private name: string, private label: string) { }

  create(html: HTMLElement): void {
    const text = document.createElement("p");
    text.innerText = this.label;
    text.className = "modal-bg__dialog-text";

    html.appendChild(text);
  }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.TEXT;
  }

  getValue(): unknown {
    return "";
  }
}
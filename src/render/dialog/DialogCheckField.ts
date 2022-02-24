import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogCheckField implements IDialogField {
  constructor(private name: string, private label: string, public value: boolean) { }

  create(html: HTMLElement): void {
    const div = document.createElement("div");
    div.className = "modal-bg__dialog-check";
    const check = document.createElement("input");
    check.className = "modal-bg__dialog-check-box";
    check.id = this.getName() + "-check";
    check.type = "checkbox";
    check.checked = this.getValue() as boolean;
    check.addEventListener("change", () => {
      this.value = check.checked;
    });
    
    const label = document.createElement("label");
    label.className = "modal-bg__dialog-check-label";
    label.innerText = this.getLabel();
    label.htmlFor = check.id;
    div.appendChild(check);
    div.appendChild(label);
    html.appendChild(div);
  }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.CHECK;
  }

  getValue(): boolean {
    return this.value;
  }
}
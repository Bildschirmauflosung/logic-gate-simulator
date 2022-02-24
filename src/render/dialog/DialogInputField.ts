import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogInputField implements IDialogField {
  public value: string = "";

  constructor(private name: string, private label: string, public maxLength: number) { }

  create(html: HTMLElement): void {
    const input = document.createElement("input");
    input.className = "modal-bg__dialog-input";
    input.type = "text";
    input.maxLength = this.maxLength;
    input.addEventListener("change", () => {
      this.value = input.value;
    });
    html.appendChild(input);
  }
  
  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }
  
  getType(): DialogFieldType {
    return DialogFieldType.INPUT;
  }

  getValue(): string {
    return this.value;
  }
}
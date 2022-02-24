import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogFlexField implements IDialogField {
  private html = document.createElement("div");
  private fields: IDialogField[] = [];

  constructor(private name: string, isVertical: boolean = true) {
    if (isVertical) {
      this.html.className = "modal-bg__dialog-flex modal-bg__dialog-flex--vertical";
    } else {
      this.html.className = "modal-bg__dialog-flex modal-bg__dialog-flex--horizontal";
    }
  }

  addField(field: IDialogField) {
    field.create(this.html);

    this.fields.push(field);
  }

  create(html: HTMLElement): void {
    html.appendChild(this.html);
  }

  getLabel(): string {
    return "";
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.FLEX;
  }

  getValue(): IDialogField[] {
    return this.fields;
  }
}
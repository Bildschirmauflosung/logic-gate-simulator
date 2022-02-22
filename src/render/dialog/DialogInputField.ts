import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogInputField implements IDialogField {
  public value: string = "";

  constructor(private name: string, private label: string, public maxLength: number) { }
  
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
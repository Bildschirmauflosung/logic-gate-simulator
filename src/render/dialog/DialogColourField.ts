import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogColourField implements IDialogField {
  public value: string = "";

  constructor(private name: string, private label: string) { }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.COLOUR;
  }

  getValue(): unknown {
    return this.value;
  }
}
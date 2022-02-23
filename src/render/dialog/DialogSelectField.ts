import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogSelectField implements IDialogField {
  public value: string;

  constructor(private name: string, private label: string, public values: string[], defaultValue: number = 0) {
    this.value = values[defaultValue];
  }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.SELECT;
  }

  getValue(): string {
    return this.value;
  }
}
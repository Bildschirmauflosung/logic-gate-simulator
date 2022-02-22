import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogCheckField implements IDialogField {
  public value: boolean = false;

  constructor(private name: string, private label: string) { }

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
import { DialogFieldType } from "./DialogFieldType";

export interface IDialogField {
  getLabel(): string;
  getName(): string;
  getType(): DialogFieldType;
  getValue(): unknown;
}
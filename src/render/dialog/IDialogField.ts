import { DialogFieldType } from "./DialogFieldType";

export interface IDialogField {
  create(html: HTMLElement): void;
  getLabel(): string;
  getName(): string;
  getType(): DialogFieldType;
  getValue(): unknown;
}
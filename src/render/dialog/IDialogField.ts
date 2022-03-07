import { DialogFieldType } from "./DialogFieldType";

/**
 * An interface which represents generic dialog field.
 */
export interface IDialogField {
  create(html: HTMLElement): void;
  getLabel(): string;
  getName(): string;
  getType(): DialogFieldType;
  getValue(): unknown;
}
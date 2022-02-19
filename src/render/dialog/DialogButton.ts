export enum ButtonType {
  NORMAL = 0,
  DANGER,
}

export class DialogButton {
  constructor(public label: string, public type: ButtonType, public onClick: (e: Event) => void) { }
}
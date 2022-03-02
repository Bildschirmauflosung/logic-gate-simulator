export enum ItemType {
  NORMAL = 0,
  DANGER,
}

export class MenuItem {
  constructor(public text: string, public onClick: (e: MouseEvent) => any, public type: ItemType = 0) { }
}
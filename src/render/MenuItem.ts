export enum ItemType {
  DEFAULT = 0,
  RED,
}

export class MenuItem {
  constructor(public text: string, public onClick: (e: MouseEvent) => any, public type: ItemType = 0) { }
}
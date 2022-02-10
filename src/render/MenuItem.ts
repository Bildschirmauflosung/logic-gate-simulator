export enum ItemType {
  DEFAULT = 0,
  RED,
}

export class MenuItem {
  text: string;
  type: ItemType;
  onclick: (e: MouseEvent) => any = () => {};

  constructor(text: string, onClick: (e: MouseEvent) => any, type: ItemType = 0) {
    this.text = text;
    this.type = type;
    this.onclick = onClick;
  }
}
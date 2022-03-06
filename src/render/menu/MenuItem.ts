export enum ItemType {
  NORMAL = 0,
  DANGER,
}

export class MenuItem {
  private html = document.createElement("div");

  constructor(private text: string, public onClick: (e: MouseEvent) => any, public type: ItemType = 0) { }

  create(html: HTMLElement) {
    this.html.innerText = this.text;
    this.html.classList.add("context-menu__item");
    this.html.addEventListener("click", this.onClick);
    switch (this.type) {
      case ItemType.NORMAL:
        this.html.classList.add("context-menu__item--normal");
        break;
      case ItemType.DANGER:
        this.html.classList.add("context-menu__item--danger");
        break;
    }

    html.appendChild(this.html);
  }

  changeText(newText: string) {
    this.text = newText;
    this.html.innerText = this.text;
  }
}
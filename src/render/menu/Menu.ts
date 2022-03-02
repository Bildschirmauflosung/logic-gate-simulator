import { cv } from "../../main";
import { ItemType, MenuItem } from "./MenuItem";

export class Menu {
  private html = document.createElement("div");
  private items: MenuItem[] = [];

  constructor() {
    this.html.className = "context-menu";
  }

  addItem(item: MenuItem) {
    const out = document.createElement("div");
    out.textContent = item.text;
    out.classList.add("context-menu__item");
    out.addEventListener("click", item.onClick);
    switch (item.type) {
      case ItemType.NORMAL:
        out.classList.add("context-menu__item--normal");
        break;
      case ItemType.DANGER:
        out.classList.add("context-menu__item--danger");
        break;
    }
    this.html.appendChild(out);
    this.items.push(item);
    document.body.appendChild(this.html);
  }

  show(left: number, top: number) {
    this.html.style.display = "inline-flex";
    this.html.style.left = left > (cv.width - this.html.offsetWidth) ? left - this.html.offsetWidth + "px" : left + "px";
    this.html.style.top = top > (cv.height - this.html.offsetHeight) ? top - this.html.offsetHeight + "px" : top + "px";
  }

  hide() {
    this.html.style.display = "none";
  }

  destroy() {
    this.html.remove();
  }
}
import { cv } from "../../main";
import { MenuItem } from "./MenuItem";

export class Menu {
  private html = document.createElement("div");
  private items: MenuItem[] = [];

  constructor() {
    this.html.className = "context-menu";
    document.body.appendChild(this.html);
  }

  addItem(item: MenuItem) {
    item.create(this.html);
    this.items.push(item);
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
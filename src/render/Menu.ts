import { ItemType, MenuItem } from "./MenuItem";

export class Menu {
  private _html = document.createElement("div");
  private _items: MenuItem[] = [];

  constructor() {
    this._html.className = "context-menu";
  }

  addItem(item: MenuItem) {
    const out = document.createElement("div");
    out.textContent = item.text;
    out.classList.add("context-menu__item");
    out.addEventListener("click", item.onclick);
    if (item.type == ItemType.RED) {
      out.classList.add("context-menu__item--red");
    }
    this._html.appendChild(out);
    this._items.push(item);
    document.body.appendChild(this._html);
  }

  show(left: number, top: number) {
    this._html.style.display = "inline-flex";
    this._html.style.left = left + "px";
    this._html.style.top = top + "px";
    console.log("kurde");
  }

  hide() {
    this._html.style.display = "none";
  }
}
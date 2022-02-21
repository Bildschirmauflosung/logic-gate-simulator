import { ItemType, MenuItem } from "./MenuItem";

export class Menu {
  private _html = document.createElement("div");
  private _items: MenuItem[] = [];

  constructor() {
    this._html.className = "context-menu";
  }

  addItem(item: MenuItem) {
    let out;
    if (item.type === ItemType.SEPARATOR) {
      out = document.createElement("hr");
    } else {
      out = document.createElement("div");
      out.textContent = item.text;
    }
    out.classList.add("context-menu__item");
    out.addEventListener("click", item.onClick);
    switch (item.type) {
      case ItemType.NORMAL:
        out.classList.add("context-menu__item--normal");
        break;
      case ItemType.DANGER:
        out.classList.add("context-menu__item--danger");
        break;
      case ItemType.DISABLED:
        out.classList.add("context-menu__item--disabled");
        break;
      case ItemType.SEPARATOR:
        out.classList.add("context-menu__item--separator");
        break;
    }
    this._html.appendChild(out);
    this._items.push(item);
    document.body.appendChild(this._html);
  }

  show(left: number, top: number) {
    this._html.style.display = "inline-flex";
    this._html.style.left = left + "px";
    this._html.style.top = top + "px";
  }

  hide() {
    this._html.style.display = "none";
  }

  destroy() {
    this._html.remove();
  }
}
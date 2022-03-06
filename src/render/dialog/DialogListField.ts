import { DialogFieldType } from "./DialogFieldType";
import { DialogListItem } from "./DialogListItem";
import { IDialogField } from "./IDialogField";

export class DialogListField implements IDialogField {
  private items: DialogListItem[] = [];

  public value: number = -1;

  constructor(private name: string, private label: string) {}

  addItem(item: DialogListItem) {
    this.items.push(item);
  }

  create(html: HTMLElement): void {
    const list = document.createElement("div");
    list.className = "modal-bg__dialog-list";

    for (const i of this.items) {
      const itemTitle = document.createElement("p");
      itemTitle.className = "modal-bg__dialog-list-item-title";
      itemTitle.innerText = i.getName();
      
      const itemDescription = document.createElement("p");
      itemDescription.className = "modal-bg__dialog-list-item-desc";
      itemDescription.innerText = i.getDescription();
      
      const item = document.createElement("div");
      item.className = "modal-bg__dialog-list-item";
      item.appendChild(itemTitle);
      item.appendChild(itemDescription);
      item.addEventListener("click", () => i.onClick);

      list.appendChild(item);
    }

    html.appendChild(list);
  }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.LIST;
  }

  getValue(): unknown {
    return this.value;
  }
}
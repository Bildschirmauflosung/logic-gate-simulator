import { DialogButton } from "./DialogButton";
import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class Dialog {
  private modalBg: HTMLDivElement = document.querySelector(".modal-bg")!;
  private html = document.createElement("div");
  private fields: IDialogField[] = [];
  private buttons: DialogButton[] = [];
  private areBtnsCreated: boolean = false;
  
  constructor(title: string) {
    const hTitle = document.createElement("p");
    hTitle.className = "modal-bg__dialog-title";
    hTitle.innerText = title;
    this.html.appendChild(hTitle);
    this.html.className = "modal-bg__dialog";
    this.modalBg.appendChild(this.html);
  }

  private createButtons() {
    const btns = document.createElement("div");
    btns.className = "modal-bg__dialog-btns";
    this.html.appendChild(btns);
    for (const i of this.buttons) {
      const btn = document.createElement("div");
      btn.className = "modal-bg__dialog-btns-btn";
      btn.innerText = i.label;
      btn.addEventListener("click", i.onClick);
      btns.appendChild(btn);
    }
  }

  addButton(button: DialogButton) {
    this.buttons.push(button);
  }

  addField(field: IDialogField) {
    if (field.getType() !== DialogFieldType.CHECK) {
      const label = document.createElement("p");
      label.className = "modal-bg__dialog-label";
      label.innerText = field.getLabel();
      this.html.appendChild(label);
    }

    field.create(this.html);
    
    this.fields.push(field);
  }

  getValueFromField(name: string): unknown {
    const field = this.fields.find((v) => v.getName() == name);
    return field?.getValue();
  }

  show() {
    this.modalBg.style.display = "flex";
    this.html.style.display = "flex";
    if (!this.areBtnsCreated) {
      this.createButtons();
      this.areBtnsCreated = true;
    }
  }
  
  close() {
    this.modalBg.style.display = "none";
    this.html.remove();
  }
}
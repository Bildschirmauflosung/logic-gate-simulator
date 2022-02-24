import { DialogButton } from "./DialogButton";
import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class Dialog {
  private _modalBg: HTMLDivElement = document.querySelector(".modal-bg")!;
  private _html = document.createElement("div");
  private _fields: IDialogField[] = [];
  private _buttons: DialogButton[] = [];
  private _areBtnsCreated: boolean = false;
  
  constructor(title: string) {
    const hTitle = document.createElement("p");
    hTitle.className = "modal-bg__dialog-title";
    hTitle.innerText = title;
    this._html.appendChild(hTitle);
    this._html.className = "modal-bg__dialog";
    this._modalBg.appendChild(this._html);
  }

  private createButtons() {
    const btns = document.createElement("div");
    btns.className = "modal-bg__dialog-btns";
    this._html.appendChild(btns);
    for (const i of this._buttons) {
      const btn = document.createElement("div");
      btn.className = "modal-bg__dialog-btns-btn";
      btn.innerText = i.label;
      btn.addEventListener("click", i.onClick);
      btns.appendChild(btn);
    }
  }

  addButton(button: DialogButton) {
    this._buttons.push(button);
  }

  addField(field: IDialogField) {
    if (field.getType() !== DialogFieldType.CHECK) {
      const label = document.createElement("p");
      label.className = "modal-bg__dialog-label";
      label.innerText = field.getLabel();
      this._html.appendChild(label);
    }

    field.create(this._html);
    
    this._fields.push(field);
  }

  getValueFromField(name: string): unknown {
    const field = this._fields.find((v) => v.getName() == name);
    return field?.getValue();
  }

  show() {
    this._modalBg.style.display = "flex";
    this._html.style.display = "flex";
    if (!this._areBtnsCreated) {
      this.createButtons();
      this._areBtnsCreated = true;
    }
  }
  
  close() {
    this._modalBg.style.display = "none";
    this._html.remove();
  }
}
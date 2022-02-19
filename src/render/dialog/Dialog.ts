import { DialogButton } from "./DialogButton";
import { DialogField, FieldType } from "./DialogField";

export class Dialog {
  private _modalBg: HTMLDivElement = document.querySelector(".modal-bg")!;
  private _html = document.createElement("div");
  private _fields: DialogField[] = [];
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

  addField(field: DialogField) {
    const label = document.createElement("p");
    label.className = "modal-bg__dialog-label";
    label.innerText = field.label;
    this._html.appendChild(label);

    switch (field.type) {
      case FieldType.INPUT:
        const input = document.createElement("input");
        input.className = "modal-bg__dialog-input";
        input.type = "text";
        input.addEventListener("change", () => {
          field.value = input.value;
        });
        this._html.appendChild(input);
        break;
      case FieldType.COLOUR:
        // TODO
        break;
    }
    this._fields.push(field);
  }

  getValueFromField(label: string): string | undefined {
    const field = this._fields.find((v) => v.label == label);
    return field?.value;
  }

  show() {
    this._modalBg.style.display = "block";
    this._html.style.display = "flex";
    if (!this._areBtnsCreated) {
      this.createButtons();
      this._areBtnsCreated = true;
    }
    this._html.style.top = document.body.offsetHeight / 2 - this._html.offsetHeight / 2 + "px";
    this._html.style.left = document.body.offsetWidth / 2 - this._html.offsetWidth / 2 + "px";
  }
  
  close() {
    this._modalBg.style.display = "none";
    this._html.remove();
  }
}
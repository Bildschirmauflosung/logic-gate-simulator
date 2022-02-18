import { DialogButtons } from "./DialogButtons";
import { DialogField, FieldType } from "./DialogField";

export class Dialog {
  private _modalBg: HTMLDivElement = document.querySelector(".modal-bg")!;
  private _html = document.createElement("div");
  private _fields: DialogField[] = [];
  private _areBtnsCreated: boolean = false;
  private _handlers: {type: DialogButtons, handler: (e: Event) => void}[];
  
  constructor(title: string, private _buttons: DialogButtons, ...handlers: {type: DialogButtons, handler: (e: Event) => void}[]) {
    this._handlers = handlers;
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
    if (this._buttons & DialogButtons.BTN_CANCEL) {
      const btn = document.createElement("div");
      btn.className = "modal-bg__dialog-btns-btn";
      btn.innerText = "Cancel";
      this._handlers.filter((v) => v.type & DialogButtons.BTN_CANCEL).forEach(({handler}) => {
        btn.addEventListener("click", handler);
      });
      btns.appendChild(btn);
    }
    if (this._buttons & DialogButtons.BTN_NO) {
      const btn = document.createElement("div");
      btn.className = "modal-bg__dialog-btns-btn";
      btn.innerText = "No";
      this._handlers.filter((v) => v.type & DialogButtons.BTN_NO).forEach(({handler}) => {
        btn.addEventListener("click", handler);
      });
      btns.appendChild(btn);
    }
    if (this._buttons & DialogButtons.BTN_OK) {
      const btn = document.createElement("div");
      btn.className = "modal-bg__dialog-btns-btn";
      btn.innerText = "OK";
      this._handlers.filter((v) => v.type & DialogButtons.BTN_OK).forEach(({handler}) => {
        btn.addEventListener("click", handler);
      });
      btns.appendChild(btn);
    }
    if (this._buttons & DialogButtons.BTN_YES) {
      const btn = document.createElement("div");
      btn.className = "modal-bg__dialog-btns-btn";
      btn.innerText = "Yes";
      this._handlers.filter((v) => v.type & DialogButtons.BTN_YES).forEach(({handler}) => {
        btn.addEventListener("click", handler);
      });
      btns.appendChild(btn);
    }
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
        this._html.appendChild(input);
        break;
      case FieldType.COLOUR:
        // TODO
        break;
    }
    this._fields.push(field);
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
  
  hide() {
    this._modalBg.style.display = "none";
    this._html.style.display = "none";
  }
}
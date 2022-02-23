import { DialogButton } from "./DialogButton";
import { DialogCheckField } from "./DialogCheckField";
import { DialogColourField } from "./DialogColourField";
import { DialogFieldType } from "./DialogFieldType";
import { DialogInputField } from "./DialogInputField";
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

    switch (field.getType()) {
      case DialogFieldType.CHECK:
        const div = document.createElement("div");
        div.className = "modal-bg__dialog-check";
        const check = document.createElement("input");
        check.className = "modal-bg__dialog-check-box";
        check.id = field.getName() + "-check";
        check.type = "checkbox";
        check.checked = field.getValue() as boolean;
        check.addEventListener("change", () => {
          (field as DialogCheckField).value = check.checked;
        });
        
        const label = document.createElement("label");
        label.className = "modal-bg__dialog-check-label";
        label.innerText = field.getLabel();
        label.htmlFor = check.id;
        div.appendChild(check);
        div.appendChild(label);
        this._html.appendChild(div);
        break;
      case DialogFieldType.COLOUR:
        const flex = document.createElement("div");
        flex.className = "modal-bg__dialog-colour";
        const colourBox = document.createElement("div");
        colourBox.className = "modal-bg__dialog-colour-box";
        colourBox.style.backgroundColor = `hsl(${ field.getValue() }, 50%, 70%)`;
        const sliderBase = document.createElement("div");
        sliderBase.className = "modal-bg__dialog-colour-slider";
        const sliderHandle = document.createElement("div");
        sliderHandle.className = "modal-bg__dialog-colour-slider-handle";

        sliderHandle.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          (field as DialogColourField).pressed = true;
        });
        sliderHandle.addEventListener("mouseup", () => {
          (field as DialogColourField).pressed = false;
        });
        sliderHandle.addEventListener("mousemove", (e) => {
          if ((field as DialogColourField).pressed) {
            sliderHandle.style.left = e.offsetX + "px";
            (field as DialogColourField).value = Math.round((sliderHandle.offsetLeft - sliderBase.offsetLeft + sliderHandle.offsetWidth / 2) * (360 / 200));
            colourBox.style.backgroundColor = `hsl(${ field.getValue() }, 50%, 70%)`;
          }
        });

        sliderBase.addEventListener("mousedown", (e) => {
          sliderHandle.style.left = e.offsetX - sliderHandle.offsetWidth / 2 + "px";
          (field as DialogColourField).value = Math.round((sliderHandle.offsetLeft - sliderBase.offsetLeft + sliderHandle.offsetWidth / 2) * (360 / 200));
          colourBox.style.backgroundColor = `hsl(${ field.getValue() }, 50%, 70%)`;
        });

        flex.appendChild(colourBox);
        sliderBase.appendChild(sliderHandle);
        flex.appendChild(sliderBase);

        this._html.appendChild(flex);
        break;
      case DialogFieldType.INPUT:
        const input = document.createElement("input");
        input.className = "modal-bg__dialog-input";
        input.type = "text";
        input.maxLength = (field as DialogInputField).maxLength;
        input.addEventListener("change", () => {
          (field as DialogInputField).value = input.value;
        });
        this._html.appendChild(input);
        break;
    }
    
    this._fields.push(field);
  }

  getValueFromField(name: string): unknown {
    const field = this._fields.find((v) => v.getName() == name);
    return field?.getValue();
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
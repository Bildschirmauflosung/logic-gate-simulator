import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogSelectField implements IDialogField {
  public value: string;

  constructor(private name: string, private label: string, public values: string[], defaultValue: number = 0) {
    this.value = values[defaultValue];
  }

  create(html: HTMLElement): void {
    const select = document.createElement("div");
    select.className = "modal-bg__dialog-select";
    select.innerText = this.value;
    const selectBase = document.createElement("div");
    selectBase.className = "modal-bg__dialog-select-base";

    for (const i of this.values) {
      const selectBtn = document.createElement("div");
      selectBtn.className = "modal-bg__dialog-select-base-btn";
      selectBtn.innerText = i;
      selectBtn.addEventListener("click", () => {
        this.value = selectBtn.innerText;
        select.innerText = this.value;
        selectBase.style.display = "none";
      });
      selectBase.appendChild(selectBtn);
    }

    select.addEventListener("click", () => {
      if (selectBase.style.display !== "flex") {
        selectBase.style.display = "flex";
      } else {
        selectBase.style.display = "none";
      }
      selectBase.style.top = select.offsetTop - select.clientHeight * this.values.findIndex((v) => v === this.value) + "px";
    });

    html.appendChild(select);
    html.appendChild(selectBase);
  }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.SELECT;
  }

  getValue(): string {
    return this.value;
  }
}
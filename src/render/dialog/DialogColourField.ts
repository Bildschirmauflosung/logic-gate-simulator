import { DialogFieldType } from "./DialogFieldType";
import { IDialogField } from "./IDialogField";

export class DialogColourField implements IDialogField {
  public value: number = 0;
  public pressed: boolean = false;

  constructor(private name: string, private label: string) { }

  create(html: HTMLElement): void {
    const flex = document.createElement("div");
    flex.className = "modal-bg__dialog-colour";
    const colourBox = document.createElement("div");
    colourBox.className = "modal-bg__dialog-colour-box";
    colourBox.style.backgroundColor = `hsl(${ this.getValue() }, 50%, 70%)`;
    const sliderBase = document.createElement("div");
    sliderBase.className = "modal-bg__dialog-colour-slider";
    const sliderHandle = document.createElement("div");
    sliderHandle.className = "modal-bg__dialog-colour-slider-handle";

    sliderHandle.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      this.pressed = true;
    });
    sliderHandle.addEventListener("mouseup", () => {
      this.pressed = false;
    });
    sliderHandle.addEventListener("mousemove", (e) => {
      if (this.pressed) {
        sliderHandle.style.left = e.offsetX + "px";
        this.value = Math.round((sliderHandle.offsetLeft - sliderBase.offsetLeft + sliderHandle.offsetWidth / 2) * (360 / 200));
        colourBox.style.backgroundColor = `hsl(${ this.getValue() }, 50%, 70%)`;
      }
    });

    sliderBase.addEventListener("mousedown", (e) => {
      sliderHandle.style.left = e.offsetX - sliderHandle.offsetWidth / 2 + "px";
      this.value = Math.round((sliderHandle.offsetLeft - sliderBase.offsetLeft + sliderHandle.offsetWidth / 2) * (360 / 200));
      colourBox.style.backgroundColor = `hsl(${ this.getValue() }, 50%, 70%)`;
    });

    flex.appendChild(colourBox);
    sliderBase.appendChild(sliderHandle);
    flex.appendChild(sliderBase);

    html.appendChild(flex);
  }

  getLabel(): string {
    return this.label;
  }

  getName(): string {
    return this.name;
  }

  getType(): DialogFieldType {
    return DialogFieldType.COLOUR;
  }

  getValue(): unknown {
    return this.value;
  }
}
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
    const sliderInput = document.createElement("input");
    sliderInput.className = "modal-bg__dialog-colour-slider-input";
    sliderInput.type = "range";
    sliderInput.value = "0";
    sliderInput.min = "0";
    sliderInput.max = "360";
    sliderInput.addEventListener("input", () => {
      colourBox.style.backgroundColor = `hsl(${ sliderInput.value }, 50%, 75%)`;
      this.value = sliderInput.valueAsNumber;
    });

    flex.appendChild(colourBox);
    sliderBase.appendChild(sliderInput);
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
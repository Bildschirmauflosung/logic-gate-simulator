import { cv, ioButtons, renderable, withMouseEvent } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { IOButton } from "./IOButton";
import { IOType } from "./IOType";
import { IRenderable } from "./IRenderable";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Theme } from "./theme/Theme";

export class IOAddButton implements IRenderable, IWithMouseEvent {
  private _left: number;
  private _top: number;
  private _hovered: boolean = false;
  private _pressed: boolean = false;

  width: number = 48;
  height: number = 48;
  type: IOType;
  
  constructor(type: IOType) {
    this.type = type;
    
    if (type == IOType.INPUT) {
      this._left = 8;
      this._top = cv.height - this.height - 8;
    } else {
      this._left = cv.width - this.width - 8;
      this._top = cv.height - this.height - 8;
    }
  }

  handleMouseMove(e: MouseEvent): void {
    this._hovered = (isMouseOver(e, this.width, this.height, this._left, this._top));
  }

  handleMouseDown(e: MouseEvent): void {
    if (e.button == 0) {
      if (isMouseOver(e, this.width, this.height, this._left, this._top)) {
        this._pressed = true;
      }
    }
  }

  handleMouseUp(e: MouseEvent): void {
    if (this._hovered && this._pressed && e.button == 0) {
      const io = new IOButton(ioButtons.length, "x", this.type);
      ioButtons.push(io);
      withMouseEvent.push(io);
      renderable.push(io);
    }
    this._hovered = false;
    this._pressed = false;
  }

  handleMouseContextMenu(_e: MouseEvent): void { }

  updateId() {

  }

  align(): void {
    if (this.type == IOType.OUTPUT) {
      this._left = cv.width - this.width - 8;
    }
    this._top = cv.height - this.height - 8;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = Theme.fgColour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this._left + this.width / 2, this._top);
    ctx.arcTo(this._left + this.width, this._top, this._left + this.width, this._top + this.width / 2, this.width / 2);
    ctx.arcTo(this._left + this.width, this._top + this.height, this._left + this.width - this.width / 2, this._top + this.height, this.width / 2);
    ctx.arcTo(this._left, this._top + this.height, this._left, this._top + this.height - this.width / 2, this.width / 2);
    ctx.arcTo(this._left, this._top, this._left + this.width / 2, this._top, this.width / 2);
    ctx.stroke();
    if (this._pressed) {
      ctx.fillStyle = Theme.activeBgColour;
    } else if (this._hovered) {
      ctx.fillStyle = Theme.hoverBgColour;
    } else {
      ctx.fillStyle = Theme.bgColour;
    }
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this._left + this.width / 4, this._top + this.height / 2);
    ctx.lineTo(this._left + this.width / 2 + this.width / 4, this._top + this.height / 2);
    ctx.moveTo(this._left + this.width / 2, this._top + this.height / 4);
    ctx.lineTo(this._left + this.width / 2, this._top + this.height / 2 + this.height / 4);
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}
import { LogicGate } from "../logic/LogicGate";
import { cv, gates, widgets } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { Gate } from "./Gate";
import { GateType } from "./GateType";
import { IWidget } from "./IWidget";
import { MouseEventType } from "./MouseEventType";
import { Theme } from "./theme/Theme";

export class IOAddButton implements IWidget {
  private _left: number;
  private _top: number;
  private _hovered: boolean = false;
  private _pressed: boolean = false;

  public width: number = 48;
  public height: number = 48;
  
  constructor(public readonly isInput: boolean) {    
    if (isInput) {
      this._left = 8;
      this._top = cv.height - this.height - 8;
    } else {
      this._left = cv.width - this.width - 8;
      this._top = cv.height - this.height - 8;
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    this._hovered = (isMouseOver(e, this.width, this.height, this._left, this._top));
  }

  private handleMouseDown(e: MouseEvent): void {
    if (e.button == 0) {
      if (isMouseOver(e, this.width, this.height, this._left, this._top)) {
        this._pressed = true;
      }
    }
  }

  private handleMouseUp(e: MouseEvent): void {
    if (this._hovered && this._pressed && e.button == 0) {
      const lg = new LogicGate([], [], this.isInput ? 0 : 1, this.isInput ? 1 : 0, ([]) => []);
      const io = new Gate(this.isInput ? 4 : cv.width - this.width - 4, 4, gates.length, "X", this.isInput ? GateType.INPUT : GateType.OUTPUT, lg);
      gates.push(io);
      widgets.push(io);
    }
    this._hovered = false;
    this._pressed = false;
  }

  align(): void {
    if (!this.isInput) {
      this._left = cv.width - this.width - 8;
    }
    this._top = cv.height - this.height - 8;
  }

  handleEvent(type: MouseEventType, event: MouseEvent): void {
    switch (type) {
      case MouseEventType.MOVE:
        this.handleMouseMove(event);
        break;
      case MouseEventType.UP:
        this.handleMouseUp(event);
        break;
      case MouseEventType.DOWN:
        this.handleMouseDown(event);
        break;
      case MouseEventType.CONTEXTMENU:
        break;
    }
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
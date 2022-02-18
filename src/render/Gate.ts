import { LogicGate } from "../logic/LogicGate";
import { cv, gates, renderable, withMouseEvent } from "../main";
import { clamp, isMouseOver } from "../utils/Helpers";
import { IRenderable } from "./IRenderable";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";

export class Gate implements IRenderable, IWithMouseEvent {
  private _grabbed: boolean = false;
  private _enterred: boolean = false;
  private _menu: Menu;
  private _width: number;
  private _height: number;

  private _xOffset: number = 0;
  private _yOffset: number = 0;

  public readonly name: string;

  constructor(public left: number, public top: number, public readonly id: number, name: string, public readonly gate: LogicGate) {
    const max = gate.arity > gate.outputCount ? gate.arity : gate.outputCount;
    this._width = 64;
    this._height = 64 + (max - 1) * 32;
    this.name = name.toUpperCase();
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Edit", () => {console.log("edit on", id)}));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.hide();
      renderable.splice(renderable.findIndex((v) => v === this), 1);
      withMouseEvent.splice(withMouseEvent.findIndex((v) => v === this), 1);
      gates.splice(gates.findIndex((v) => v === this), 1);
    }, ItemType.RED));
  }

  private isMaxId(onEnter: boolean = false): boolean {
    let max = -1;
    for (const i of gates) {
      if (onEnter) {
        if (i._enterred) {
          if (i.id > max) {
            max = i.id;
          }
        }
      } else {
        if (i._grabbed) {
          if (i.id > max) {
            max = i.id;
          }
        }
      }
    }
    if (max === -1) {
      return true;
    }
    return this.id === max;
  }

  handleMouseMove(e: MouseEvent) {
    if (this._grabbed) {
      if (this.isMaxId()) {
        console.log(this._xOffset, this._yOffset);
        this.left = clamp(Math.round((e.offsetX - this._xOffset) / 16) * 16, 64, cv.width - 64 - this._width);
        this.top = clamp(Math.round((e.offsetY - this._yOffset) / 16) * 16 + 4, 4, cv.height - 64 - this._height);
      }
    }

    this._enterred = isMouseOver(e, this._width, this._height, this.left, this.top);
  }

  handleMouseDown(e: MouseEvent) {
    this._menu.hide();
    if (e.button == 0) {
      this._grabbed = isMouseOver(e, this._width, this._height, this.left, this.top);
      if (this._grabbed) {
        this._xOffset = e.offsetX - this.left;
        this._yOffset = e.offsetY - this.top;
      }
    }
  }

  handleMouseUp(_e: MouseEvent) {
    this._grabbed = false;
  }

  handleMouseContextMenu(e: MouseEvent) {
    if (isMouseOver(e, this._width, this._height, this.left, this.top) && this.isMaxId(true)) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const rad: number = 8;
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#fff";
    ctx.moveTo(this.left + rad, this.top);
    ctx.lineTo(this.left + this._width - rad, this.top);
    ctx.arcTo(this.left + this._width, this.top, this.left + this._width, this.top + rad, rad);
    ctx.lineTo(this.left + this._width, this.top + this._height - rad);
    ctx.arcTo(this.left + this._width, this.top + this._height, this.left + this._width - rad, this.top + this._height, rad);
    ctx.lineTo(this.left + rad, this.top + this._height);
    ctx.arcTo(this.left, this.top + this._height, this.left, this.top + this._height - rad, rad);
    ctx.lineTo(this.left, this.top + rad);
    ctx.arcTo(this.left, this.top, this.left + rad, this.top, rad);
    ctx.stroke();
    ctx.fill();
    for (let i = 0; i < this.gate.arity; i++) {
      const a = this._height / (this.gate.arity + 1);
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.moveTo(this.left, this.top + a * (i + 1) - 4);
      ctx.arcTo(this.left + 4, this.top + a * (i + 1) - 4, this.left + 4, this.top + a * (i + 1), 4);
      ctx.arcTo(this.left + 4, this.top + a * (i + 1) + 4, this.left, this.top + a * (i + 1) + 4, 4);
      ctx.arcTo(this.left - 4, this.top + a * (i + 1) + 4, this.left - 4, this.top + a * (i + 1), 4);
      ctx.arcTo(this.left - 4, this.top + a * (i + 1) - 4, this.left, this.top + a * (i + 1) - 4, 4);
      ctx.stroke();
      ctx.fill();
    }
    for (let i = 0; i < this.gate.outputCount; i++) {
      const a = this._height / (this.gate.outputCount + 1);
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.moveTo(this.left + this._width, this.top + a * (i + 1) - 4);
      ctx.arcTo(this.left + this._width + 4, this.top + a * (i + 1) - 4, this.left + this._width + 4, this.top + a * (i + 1), 4);
      ctx.arcTo(this.left + this._width + 4, this.top + a * (i + 1) + 4, this.left + this._width, this.top + a * (i + 1) + 4, 4);
      ctx.arcTo(this.left + this._width - 4, this.top + a * (i + 1) + 4, this.left + this._width - 4, this.top + a * (i + 1), 4);
      ctx.arcTo(this.left + this._width - 4, this.top + a * (i + 1) - 4, this.left + this._width, this.top + a * (i + 1) - 4, 4);
      ctx.stroke();
      ctx.fill();
    }
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.left + this._width / 2, this.top + this._height / 2);
  }
}

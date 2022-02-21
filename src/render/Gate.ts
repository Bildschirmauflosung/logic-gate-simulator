import { LogicGate } from "../logic/LogicGate";
import { cv, gates, renderable, withMouseEvent } from "../main";
import { clamp, isMouseOver, updateConnectionData } from "../utils/Helpers";
import { ConnectionPoint } from "./ConnectionPoint";
import { IOType } from "./IOType";
import { IRenderable } from "./IRenderable";
import { IWithID } from "./IWithID";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";

export class Gate implements IRenderable, IWithMouseEvent, IWithID {
  private _grabbed: boolean = false;
  private _enterred: boolean = false;
  private _menu: Menu;
  private _width: number;
  private _height: number;
  private _points: ConnectionPoint[] = [];

  private _xOffset: number = 0;
  private _yOffset: number = 0;

  public readonly name: string;

  constructor(public left: number, public top: number, public id: number, name: string, public readonly gate: LogicGate) {
    const max = gate.arity > gate.outputCount ? gate.arity : gate.outputCount;
    this._width = 64;
    this._height = 64 + (max - 1) * 32;
    this.name = name.toUpperCase();
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Edit", () => {console.log("edit on", id)}));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.destroy();
      for (const i of this._points) {
        i.destroyMenu();
      }
      renderable.splice(renderable.findIndex((v) => v === this), 1);
      withMouseEvent.splice(withMouseEvent.findIndex((v) => v === this), 1);
      gates.splice(gates.findIndex((v) => v === this), 1);
      for (const i of gates) {
        i.updateId();
      }
      updateConnectionData(this._points);
    }, ItemType.DANGER));

    for (let i = 0; i < gate.arity; i++) {
      const point = new ConnectionPoint(IOType.INPUT, this.left, this.top + this._height / (gate.arity + 1) * (i + 1));
      this._points.push(point);
      withMouseEvent.push(point);
    }
    for (let i = 0; i < gate.outputCount; i++) {
      const point = new ConnectionPoint(IOType.OUTPUT, this.left + this._width, this.top + this._height / (gate.outputCount + 1) * (i + 1));
      this._points.push(point);
      withMouseEvent.push(point);
    }
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
        this.left = clamp(Math.round((e.offsetX - this._xOffset) / 16) * 16, 64, cv.width - 64 - this._width);
        this.top = clamp(Math.round((e.offsetY - this._yOffset) / 16) * 16 + 4, 4, cv.height - 64 - this._height);

        for (let i = 0; i < this.gate.arity; i++) {
          this._points[i].left = this.left;
          this._points[i].top = this.top + this._height / (this.gate.arity + 1) * (i + 1);
        }
        for (let i = 0; i < this.gate.outputCount; i++) {
          this._points[i + this.gate.arity].left = this.left + this._width;
          this._points[i + this.gate.arity].top = this.top + this._height / (this.gate.outputCount + 1) * (i + 1);
        }
      }
    }

    this._enterred = isMouseOver(e, this._width, this._height, this.left, this.top);
  }

  handleMouseDown(e: MouseEvent) {
    this._menu.hide();
    if (e.button == 0) {
      for (const i of this._points) {
        if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
          return;
        }
      }

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
    for (const i of this._points) {
      if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
        return;
      }
    }

    if (isMouseOver(e, this._width, this._height, this.left, this.top) && this.isMaxId(true)) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  updateId(): void {
    this.id = gates.findIndex((v) => v === this);
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

    for (const i of this._points) {
      i.render(ctx);
    }
    
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.left + this._width / 2, this.top + this._height / 2);
  }
}

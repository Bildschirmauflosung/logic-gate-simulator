import { LogicGate } from "../logic/LogicGate";
import { cv, gates, widgets } from "../main";
import { clamp, isMouseOver, updateConnectionData } from "../utils/Helpers";
import { ConnectionPoint } from "./ConnectionPoint";
import { GateType } from "./GateType";
import { IWidget } from "./IWidget";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";
import { MouseEventType } from "./MouseEventType";
import { Theme } from "./theme/Theme";

export class Gate implements IWidget {
  private _grabbed: boolean = false;
  private _enterred: boolean = false;
  private _menu: Menu;
  private _width: number;
  private _height: number;
  private _ipoints: ConnectionPoint[] = [];
  private _opoints: ConnectionPoint[] = [];
  
  private _xOffset: number = 0;
  private _yOffset: number = 0;
  
  public inputValues: boolean[] = [];
  public outputValues: boolean[] = [];
  public enabled: boolean[] = [false];

  constructor(public left: number, public top: number, private id: number, public readonly name: string, public readonly type: GateType, public readonly gate: LogicGate) {
    const max = gate.arity > gate.outputCount ? gate.arity : gate.outputCount;
    if (type === GateType.GATE) {
      this._width = 64;
      this._height = 64 + (max - 1) * 32;
    } else {
      this._width = 48;
      this._height = 48;
    }
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Edit", () => {console.log("edit on", id)}));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.destroy();
      gates.splice(gates.findIndex((v) => v === this), 1);
      widgets.splice(widgets.findIndex((v) => v === this), 1);
      for (const i of gates) {
        i.updateId();
      }
      for (const i of this._ipoints) {
        widgets.splice(widgets.findIndex((v) => v === i), 1);
      }
      for (const i of this._opoints) {
        widgets.splice(widgets.findIndex((v) => v === i), 1);
      }
      updateConnectionData(this._ipoints);
      updateConnectionData(this._opoints);
    }, ItemType.DANGER));

    for (let i = 0; i < gate.arity; i++) {
      const point = new ConnectionPoint(true, this.left, this.top + this._height / (gate.arity + 1) * (i + 1), this);
      this._ipoints.push(point);
      widgets.push(point);
    }
    for (let i = 0; i < gate.outputCount; i++) {
      const point = new ConnectionPoint(false, this.left + this._width, this.top + this._height / (gate.outputCount + 1) * (i + 1), this);
      this._opoints.push(point);
      widgets.push(point);
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

  private handleMouseMove(e: MouseEvent) {
    if (this._grabbed) {
      if (this.isMaxId()) {
        this.left = clamp(Math.round((e.offsetX - this._xOffset) / 16) * 16, 64, cv.width - 64 - this._width);
        this.top = clamp(Math.round((e.offsetY - this._yOffset) / 16) * 16 + 4, 4, cv.height - 64 - this._height);

        for (let i = 0; i < this.gate.arity; i++) {
          this._ipoints[i].left = this.left;
          this._ipoints[i].top = this.top + this._height / (this.gate.arity + 1) * (i + 1);
        }
        for (let i = 0; i < this.gate.outputCount; i++) {
          this._opoints[i].left = this.left + this._width;
          this._opoints[i].top = this.top + this._height / (this.gate.outputCount + 1) * (i + 1);
        }
      }
    }

    this._enterred = isMouseOver(e, this._width, this._height, this.left, this.top);
  }

  private handleMouseDown(e: MouseEvent) {
    this._menu.hide();
    if (e.button == 0) {
      for (const i of this._ipoints) {
        if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
          return;
        }
      }
      for (const i of this._opoints) {
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

  private handleMouseUp(_e: MouseEvent) {
    this._grabbed = false;
  }

  private handleMouseContextMenu(e: MouseEvent) {
    for (const i of this._ipoints) {
      if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
        return;
      }
    }
    for (const i of this._opoints) {
      if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
        return;
      }
    }

    if (isMouseOver(e, this._width, this._height, this.left, this.top) && this.isMaxId(true)) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  getID(): number {
    return this.id;
  }

  updateId(): void {
    this.id = gates.findIndex((v) => v === this);
  }

  getPoints(): [ConnectionPoint[], ConnectionPoint[]] {
    return [this._ipoints, this._opoints];
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
        this.handleMouseContextMenu(event);
        break;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const rad: number = 8;
    ctx.beginPath();
    ctx.strokeStyle = Theme.fgColour;
    ctx.fillStyle = Theme.bgColour;
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

    for (const i of this._ipoints) {
      i.render(ctx);
    }
    for (const i of this._opoints) {
      i.render(ctx);
    }

    ctx.fillStyle = Theme.fgColour;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name.toUpperCase(), this.left + this._width / 2, this.top + this._height / 2);
  }
}

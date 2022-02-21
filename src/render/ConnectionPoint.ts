import { connectedPoints, sidebar } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { ConnectionData } from "./ConnectionData";
import { IOType } from "./IOType";
import { IRenderable } from "./IRenderable";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";
import { StaticConnectionData } from "./StaticConnectionData";

export class ConnectionPoint implements IRenderable, IWithMouseEvent {
  private _hovered: boolean = false;
  private _pressed: boolean = false;
  private _menu: Menu;

  private _xOffset: number = 0;
  private _yOffset: number = 0;
  private _xPos: number = 0;

  constructor(public type: IOType, public left: number, public top: number) {
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Type", () => {}, ItemType.DEFAULT));
  }

  handleMouseMove(e: MouseEvent): void {
    this._hovered = isMouseOver(e, 8, 8, this.left - 4, this.top - 4);
    this._xOffset = e.offsetX;
    this._yOffset = e.offsetY;
    this._xPos = e.clientX;
  }

  handleMouseDown(e: MouseEvent): void {
    this._menu.hide();
    if (this._hovered && e.button === 0) {
      this._pressed = true;
      StaticConnectionData.pointFrom = this;
    }
  }

  handleMouseUp(_e: MouseEvent): void {
    this._pressed = false;
    if (this._hovered && StaticConnectionData.pointFrom !== this && StaticConnectionData.pointFrom.type !== this.type) {
      StaticConnectionData.pointTo = this;
      if (StaticConnectionData.pointFrom.type === IOType.OUTPUT) {
        StaticConnectionData.swap();
      }
      
      const conn = new ConnectionData(StaticConnectionData.pointFrom, StaticConnectionData.pointTo);
      const pos = connectedPoints.findIndex((v) => v.pointFrom === conn.pointFrom);
      if (pos !== -1) {
        return;
      }
      connectedPoints.push(conn);
    }
  }

  handleMouseContextMenu(e: MouseEvent): void {
    if (this._hovered) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if (this._hovered) {
      ctx.strokeStyle = "#7f7f7f";
      ctx.fillStyle = "#7f7f7f";
    } else {
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#000";
    }
    ctx.moveTo(this.left, this.top - 4);
    ctx.arcTo(this.left + 4, this.top - 4, this.left + 4, this.top, 4);
    ctx.arcTo(this.left + 4, this.top + 4, this.left, this.top + 4, 4);
    ctx.arcTo(this.left - 4, this.top + 4, this.left - 4, this.top, 4);
    ctx.arcTo(this.left - 4, this.top - 4, this.left, this.top - 4, 4);
    ctx.stroke();
    ctx.fill();

    if (this._pressed) {
      if (this.type === IOType.INPUT && this._xOffset < this.left || this.type === IOType.OUTPUT && this._xOffset > this.left) {
        ctx.beginPath();
        ctx.strokeStyle = "#000";
        ctx.moveTo(this.left, this.top);
        ctx.lineTo((this._xPos + this.left - sidebar.offsetWidth) / 2, this.top);
        ctx.lineTo((this._xPos + this.left - sidebar.offsetWidth) / 2, this._yOffset);
        ctx.lineTo(this._xOffset, this._yOffset);
        ctx.stroke();
      }
    }
  }
}
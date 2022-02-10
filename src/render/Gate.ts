import { gates, renderable, withMouseEvent } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { IRenderable } from "./IRenderable";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";

export class Gate implements IRenderable, IWithMouseEvent {
  private _grabbed: boolean = false;
  private _enterred: boolean = false;
  private _menu: Menu;

  width: number;
  height: number;
  top: number;
  left: number;
  id: number;
  name: string;

  constructor(width: number, height: number, left: number, top: number, id: number, name: string) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.id = id;
    this.name = name;
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Edit", () => {console.log("edit on", id)}));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.hide();
      gates.splice(gates.findIndex((v) => v == this), 1);
      renderable.splice(renderable.findIndex((v) => v == this), 1);
      withMouseEvent.splice(gates.findIndex((v) => v == this), 1);
    }, ItemType.RED));
  }

  private isMaxId(onEnter: boolean = false): boolean {
    let max = -1;
    for (let i = 0; i < gates.length; i++) {
      if (onEnter) {
        if (gates[i]._enterred) {
          if (i > max) {
            max = i;
          }
        }
      } else {
        if (gates[i]._grabbed) {
          if (i > max) {
            max = i;
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
        this.left += e.movementX;
        this.top += e.movementY;
      }
    }
  }

  handleMouseDown(e: MouseEvent) {
    if (e.button == 0) {
      this._menu.hide();
      this._grabbed = isMouseOver(e, this.width, this.height, this.left, this.top);
    }
  }

  handleMouseUp(_e: MouseEvent) {
    this._grabbed = false;
  }

  handleMouseContextMenu(e: MouseEvent) {
    if (isMouseOver(e, this.width, this.height, this.left, this.top) && this.isMaxId(true)) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  handleMouseEnter(_e: MouseEvent): void {
    this._enterred = true;
  }

  handleMouseLeave(_e: MouseEvent): void {
    this._enterred = false;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const rad: number = 8;
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.moveTo(this.left + rad, this.top);
    ctx.lineTo(this.left + this.width - rad, this.top);
    ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + rad, rad);
    ctx.lineTo(this.left + this.width, this.top + this.height - rad);
    ctx.arcTo(this.left + this.width, this.top + this.height, this.left + this.width - rad, this.top + this.height, rad);
    ctx.lineTo(this.left + rad, this.top + this.height);
    ctx.arcTo(this.left, this.top + this.height, this.left, this.top + this.height - rad, rad);
    ctx.lineTo(this.left, this.top + rad);
    ctx.arcTo(this.left, this.top, this.left + rad, this.top, rad);
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.left + this.width / 2, this.top + this.height / 2);
  }
}
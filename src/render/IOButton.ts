import { withMouseEvent } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { IRenderable } from "./IRenderable";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";
import { Toolbar } from "./Toolbar";

export enum IOType {
  INPUT = 0,
  OUTPUT,
}

export class IOButton implements IRenderable, IWithMouseEvent {
  private _left: number = 8;
  private _top: number = 8;
  private _menu: Menu;
  private _grabbed: boolean = false;
  private _entered: boolean = false;
  private _enteredDown: boolean = false;
  private _parent: Toolbar;

  width: number;
  height: number;
  name: string;
  type: IOType;
  enabled: boolean = false;

  constructor(width: number, name: string, type: IOType, parent: Toolbar) {
    this.width = width;
    this.height = width;
    this.name = name;
    this.type = type;
    this._parent = parent;
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Rename", () => {console.log("rename on", name)}));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.hide();
      this._parent.items.splice(this._parent.items.findIndex((v) => v == this), 1);
      withMouseEvent.splice(withMouseEvent.findIndex((v) => v == this), 1);
    }, ItemType.RED));
  }

  handleMouseMove(e: MouseEvent) {
    this._entered = isMouseOver(e, this.width, this.height, this._left, this._top);
    if (this._grabbed) {
      this._top = Math.floor(e.offsetY / 32) * 32 + 8;
    }
    if (!isMouseOver(e, this.width, this.height, this._left, this._top)) {
      this._enteredDown = false;
    }
  }

  handleMouseDown(e: MouseEvent) {
    this._menu.hide();
    if (e.button == 0) {
      this._enteredDown = true;
      this._grabbed = isMouseOver(e, this.width, this.height, this._left, this._top);
    }
  }
  
  handleMouseUp(e: MouseEvent) {
    if (this._entered && this._enteredDown && e.button == 0) {
      this.enabled = !this.enabled;
    }
    this._grabbed = false;
  }
  
  handleMouseContextMenu(e: MouseEvent) {
    if (isMouseOver(e, this.width, this.height, this._left, this._top)) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this._left + this.width / 2, this._top);
    ctx.arcTo(this._left + this.width, this._top, this._left + this.width, this._top + this.width / 2, this.width / 2);
    ctx.arcTo(this._left + this.width, this._top + this.height, this._left + this.width - this.width / 2, this._top + this.height, this.width / 2);
    ctx.arcTo(this._left, this._top + this.height, this._left, this._top + this.height - this.width / 2, this.width / 2);
    ctx.arcTo(this._left, this._top, this._left + this.width / 2, this._top, this.width / 2);
    ctx.stroke();
    if (this.enabled) {
      ctx.fillStyle = "#ff3f3f";
      ctx.fill();
    }
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this._left + this.width / 2, this._top + this.height / 2);
  }
}
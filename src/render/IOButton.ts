import { cv, ioButtons, renderable, withMouseEvent } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { IOType } from "./IOType";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";

export class IOButton implements IWithMouseEvent {
  private _left: number;
  private _top: number;
  private _menu: Menu;
  private _grabbed: boolean = false;
  private _hovered: boolean = false;
  private _pressed: boolean = false;

  width: number = 48;
  height: number = 48;
  name: string;
  type: IOType;
  enabled: boolean = false;

  constructor(name: string, type: IOType) {
    this.name = name;
    this.type = type;
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Rename", () => {console.log("rename on", name)}));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.hide();
      ioButtons.splice(ioButtons.findIndex((v) => v == this), 1);
      withMouseEvent.splice(withMouseEvent.findIndex((v) => v == this), 1);
      renderable.splice(renderable.findIndex((v) => v == this), 1);
    }, ItemType.RED));

    if (type == IOType.INPUT) {
      this._left = 8;
      this._top = 8;  
    } else {
      this._left = cv.width - this.width - 8;
      this._top = 8;
    }
  }

  handleMouseMove(e: MouseEvent) {
    this._hovered = isMouseOver(e, this.width, this.height, this._left, this._top);
    if (this._grabbed) {
      this._top = Math.floor(e.offsetY / 32) * 32 + 8;
    }
    if (!isMouseOver(e, this.width, this.height, this._left, this._top)) {
      this._pressed = false;
    }
  }

  handleMouseDown(e: MouseEvent) {
    this._menu.hide();
    if (e.button == 0) {
      this._pressed = true;
      this._grabbed = isMouseOver(e, this.width, this.height, this._left, this._top);
    }
  }
  
  handleMouseUp(e: MouseEvent) {
    if (this._hovered && this._pressed && e.button == 0) {
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
    } else {
      ctx.fillStyle = "#fff";
    }
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this._left + this.width / 2, this._top + this.height / 2);
  }
}
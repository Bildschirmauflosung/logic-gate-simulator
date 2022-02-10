import { isMouseOver } from "../utils/Helpers";
import { IRenderable } from "./IRenderable";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";
import { Toolbar } from "./Toolbar";

export enum IOType {
  INPUT = 0,
  OUTPUT,
}

export class IOButton implements IRenderable, EventListenerObject {
  readonly margin: number = 8;

  private _left: number = 0;
  private _top: number = 0;
  private _menu: Menu;
  private _grabbed: boolean = false;
  private _parent: Toolbar;

  width: number;
  height: number;
  name: string;
  type: IOType;

  constructor(width: number, name: string, type: IOType, parent: Toolbar) {
    this.width = width;
    this.height = width;
    this.name = name;
    this.type = type;
    this._parent = parent;
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Rename", () => {console.log("rename on", name)}));
    this._menu.addItem(new MenuItem("Delete", () => { this._parent.items.splice(this._parent.items.findIndex((v) => v == this), 1); this._menu.hide() }, ItemType.RED));
  }

  handleEvent(object: MouseEvent): void {
    switch (object.type) {
      case "mousemove":
        if (this._grabbed) {
          
        }
        break;
      case "mousedown":
        if (object.button == 0) {
          this._menu.hide();
          this._grabbed = isMouseOver(object, this.width, this.height, this._left, this._top);
        }
        break;
      case "mouseup":
        this._grabbed = false;
        break;
      case "contextmenu":
        if (isMouseOver(object, this.width, this.height, this._left, this._top)) {
          this._menu.show(object.clientX, object.clientY);
        }
      default:
        break;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#bfbfbf";
    ctx.beginPath();
    ctx.moveTo(this.margin + this.width / 2, this.margin);
    ctx.arcTo(this.margin + this.width, this.margin, this.margin + this.width, this.margin + this.height / 2, this.width / 2);
    ctx.arcTo(this.margin + this.width, this.margin + this.height, this.margin + this.width / 2, this.margin + this.height, this.width / 2);
    ctx.arcTo(this.margin, this.margin + this.height, this.margin, this.margin + this.height / 2, this.width / 2);
    ctx.arcTo(this.margin, this.margin, this.margin + this.width / 2, this.margin, this.width / 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.margin + this.width / 2, this.margin + this.height / 2);
  }
}
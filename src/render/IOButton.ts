import { cv, ioButtons, renderable, withMouseEvent } from "../main";
import { clamp, isMouseOver } from "../utils/Helpers";
import { Dialog } from "./dialog/Dialog";
import { DialogButtons } from "./dialog/DialogButtons";
import { DialogField, FieldType } from "./dialog/DialogField";
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

  private _yOffset: number = 0;

  width: number = 48;
  height: number = 48;
  name: string;
  type: IOType;
  enabled: boolean = false;

  constructor(name: string, type: IOType) {
    this.name = name;
    this.type = type;
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Rename", () => {
      this._menu.hide();
      const dialog: Dialog = new Dialog("Rename", DialogButtons.BTN_OK | DialogButtons.BTN_CANCEL,
        {
          type: DialogButtons.BTN_OK,
          handler: (_) => {
            // TODO: rename button
            console.log("ok");
            dialog.hide();
          }
        },
        {
          type: DialogButtons.BTN_CANCEL,
          handler: (_) => {
            console.log("cancel");
            dialog.hide();
          }
        });
      dialog.addField(new DialogField("Name", FieldType.INPUT));
      dialog.show();
    }));
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
      this._top = clamp(Math.round((e.offsetY + this._yOffset) / 32) * 32 + 8, 8, cv.height - 64 - this.height);
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
      if (this._grabbed) {
        this._yOffset = this._top - e.offsetY;
      }
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

  align(): void {
    if (this.type == IOType.OUTPUT) {
      this._left = cv.width - this.width - 8;
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
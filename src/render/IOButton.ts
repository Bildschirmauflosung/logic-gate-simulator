import { cv, ioButtons, renderable, withMouseEvent } from "../main";
import { clamp, isMouseOver, updateConnectionData } from "../utils/Helpers";
import { ConnectionPoint } from "./ConnectionPoint";
import { Dialog } from "./dialog/Dialog";
import { ButtonType, DialogButton } from "./dialog/DialogButton";
import { DialogField, FieldType } from "./dialog/DialogField";
import { IOType } from "./IOType";
import { IWithID } from "./IWithID";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { Menu } from "./Menu";
import { ItemType, MenuItem } from "./MenuItem";

export class IOButton implements IWithMouseEvent, IWithID {
  private _left: number;
  private _top: number;
  private _menu: Menu;
  private _grabbed: boolean = false;
  private _hovered: boolean = false;
  private _pressed: boolean = false;
  private _point: ConnectionPoint;

  private _yOffset: number = 0;

  width: number = 48;
  height: number = 48;
  name: string;
  type: IOType;
  enabled: boolean = false;

  constructor(public id: number, name: string, type: IOType) {
    this.name = name;
    this.type = type;
    this._menu = new Menu();
    this._menu.addItem(new MenuItem("Rename", () => {
      this._menu.hide();
      const dialog: Dialog = new Dialog("Rename");
      dialog.addField(new DialogField("Name", FieldType.INPUT));
      dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
        dialog.close();
      }));
      dialog.addButton(new DialogButton("Rename", ButtonType.NORMAL, () => {
        // TODO: Rename button
        console.log("rename", dialog.getValueFromField("Name"));
        dialog.close();
      }));
      dialog.show();
    }));
    this._menu.addItem(new MenuItem("Delete", () => {
      this._menu.hide();
      ioButtons.splice(ioButtons.findIndex((v) => v == this), 1);
      withMouseEvent.splice(withMouseEvent.findIndex((v) => v == this), 1);
      renderable.splice(renderable.findIndex((v) => v == this), 1);
      for (const i of ioButtons) {
        i.updateId();
      }
      updateConnectionData([this._point]);
    }, ItemType.RED));

    if (type == IOType.INPUT) {
      this._left = 8;
      this._top = 4;  
    } else {
      this._left = cv.width - this.width - 8;
      this._top = 4;
    }

    if (type === IOType.INPUT) {
      this._point = new ConnectionPoint(IOType.OUTPUT, this._left + this.width, this._top + this.height / 2);
    } else {
      this._point = new ConnectionPoint(IOType.INPUT, this._left, this._top + this.height / 2);
    }
    withMouseEvent.push(this._point);
  }

  handleMouseMove(e: MouseEvent) {
    this._hovered = isMouseOver(e, this.width, this.height, this._left, this._top);
    if (this._grabbed) {
      this._top = clamp(Math.round((e.offsetY + this._yOffset) / 32) * 32 + 4, 4, cv.height - 64 - this.height);
      this._point.top = this._top + this.height / 2;
    }
    if (!isMouseOver(e, this.width, this.height, this._left, this._top)) {
      this._pressed = false;
    }
  }

  handleMouseDown(e: MouseEvent) {
    this._menu.hide();
    if (e.button == 0) {
      if (isMouseOver(e, 8, 8, this._point.left - 4, this._point.top - 4)) {
        return;
      }

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
    if (isMouseOver(e, 8, 8, this._point.left - 4, this._point.top - 4)) {
      return;
    }

    if (isMouseOver(e, this.width, this.height, this._left, this._top)) {
      this._menu.show(e.clientX, e.clientY);
    }
  }

  align(): void {
    if (this.type == IOType.OUTPUT) {
      this._left = cv.width - this.width - 8;
    }
  }

  updateId(): void {
    this.id = ioButtons.findIndex((v) => v === this);
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

    this._point.render(ctx);
    
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this._left + this.width / 2, this._top + this.height / 2);
  }
}
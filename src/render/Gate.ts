import { LogicGate } from "../logic/LogicGate";
import { cv, gates, widgets } from "../main";
import { clamp, isMouseOver, updateConnectionData } from "../utils/Helpers";
import { BitsNumber } from "./BitsNumber";
import { ConnectionPoint } from "./ConnectionPoint";
import { Dialog } from "./dialog/Dialog";
import { ButtonType, DialogButton } from "./dialog/DialogButton";
import { DialogColourField } from "./dialog/DialogColourField";
import { DialogInputField } from "./dialog/DialogInputField";
import { GateType } from "./GateType";
import { IWidget } from "./IWidget";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";
import { MouseEventType } from "./MouseEventType";
import { Theme } from "./theme/Theme";

export class Gate implements IWidget {
  private grabbed: boolean = false;
  private enterred: boolean = false;
  private moving: boolean = false;
  private menu: Menu;
  private width: number;
  private height: number;
  private ipoints: ConnectionPoint[] = [];
  private opoints: ConnectionPoint[] = [];

  private expanded: boolean = false;
  private expandHeight: number = 0;
  
  private xOffset: number = 0;
  private yOffset: number = 0;
  
  public inputValues: boolean[] = [];
  public outputValues: boolean[] = [];
  public enabled: boolean = false;

  constructor(public left: number, public top: number, private id: number, public name: string, public readonly type: GateType, public readonly gate: LogicGate, public readonly bits: BitsNumber = BitsNumber.ONE) {
    const max = gate.arity > gate.outputCount ? gate.arity : gate.outputCount;
    if (type === GateType.GATE) {
      this.width = 96;
      this.height = 64 + (max - 1) * 32;
    } else {
      this.width = 48;
      this.height = 48;
      this.expandHeight = this.height + (bits) * 48;
    }
    this.menu = new Menu();
    if (type === GateType.GATE) {
      this.menu.addItem(new MenuItem("Edit", () => {
        this.menu.hide();
        const dialog = new Dialog("Edit Gate");
        dialog.addField(new DialogColourField("colour", "Gate Colour"));
        dialog.addField(new DialogInputField("name", "Gate Name", 8));
        dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
          dialog.close();
        }));
        dialog.addButton(new DialogButton("Save", ButtonType.NORMAL, () => {
          dialog.close();
          // TODO
        }));
        dialog.show();
      }));
    } else {
      this.menu.addItem(new MenuItem("Rename", () => {
        this.menu.hide();
        const dialog = new Dialog("Rename");
        dialog.addField(new DialogInputField("name", "Name (max. 2 chars)", 2));
        dialog.addButton(new DialogButton("Cancel", ButtonType.NORMAL, () => {
          dialog.close();
        }));
        dialog.addButton(new DialogButton("Rename", ButtonType.NORMAL, () => {
          if ((dialog.getValueFromField("name") as string).length > 0) {
            dialog.close();
            this.name = dialog.getValueFromField("name") as string;
          }
        }));
        dialog.show();
      }));
    }
    this.menu.addItem(new MenuItem("Delete", () => {
      this.menu.destroy();
      gates.splice(gates.findIndex((v) => v === this), 1);
      widgets.splice(widgets.findIndex((v) => v === this), 1);
      for (const i of gates) {
        i.updateId();
      }
      for (const i of this.ipoints) {
        widgets.splice(widgets.findIndex((v) => v === i), 1);
      }
      for (const i of this.opoints) {
        widgets.splice(widgets.findIndex((v) => v === i), 1);
      }
      updateConnectionData(this.ipoints);
      updateConnectionData(this.opoints);
    }, ItemType.DANGER));

    for (let i = 0; i < gate.arity; i++) {
      const point = new ConnectionPoint(true, this.left, this.top + this.height / (gate.arity + 1) * (i + 1), this);
      this.ipoints.push(point);
      widgets.push(point);
    }
    for (let i = 0; i < gate.outputCount; i++) {
      const point = new ConnectionPoint(false, this.left + this.width, this.top + this.height / (gate.outputCount + 1) * (i + 1), this);
      this.opoints.push(point);
      widgets.push(point);
    }
  }

  private isMaxId(onEnter: boolean = false): boolean {
    let max = -1;
    for (const i of gates) {
      if (onEnter) {
        if (i.enterred) {
          if (i.id > max) {
            max = i.id;
          }
        }
      } else {
        if (i.grabbed) {
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
    if (this.grabbed) {
      if (this.isMaxId()) {
        this.moving = true;
        if (this.type === GateType.GATE) {
          this.left = clamp(Math.round((e.offsetX - this.xOffset) / 16) * 16, 64, cv.width - 64 - this.width);
        }
        this.top = clamp(Math.round((e.offsetY - this.yOffset) / 16) * 16 + 4, 4, cv.height - 64 - this.height);

        for (let i = 0; i < this.gate.arity; i++) {
          this.ipoints[i].left = this.left;
          this.ipoints[i].top = this.top + this.height / (this.gate.arity + 1) * (i + 1);
        }
        for (let i = 0; i < this.gate.outputCount; i++) {
          this.opoints[i].left = this.left + this.width;
          this.opoints[i].top = this.top + this.height / (this.gate.outputCount + 1) * (i + 1);
        }
      }
    }

    this.enterred = isMouseOver(e, this.width, this.height, this.left, this.top);
  }

  private handleMouseDown(e: MouseEvent) {
    this.menu.hide();
    if (e.button == 0) {
      for (const i of this.ipoints) {
        if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
          return;
        }
      }
      for (const i of this.opoints) {
        if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
          return;
        }
      }

      this.grabbed = isMouseOver(e, this.width, this.height, this.left, this.top);
      if (this.grabbed) {
        this.xOffset = e.offsetX - this.left;
        this.yOffset = e.offsetY - this.top;
      }
    }
  }

  private handleMouseUp(e: MouseEvent) {
    this.grabbed = false;

    if (this.type === GateType.INPUT && this.enterred && !this.moving && e.button === 0) {
      if (this.bits === BitsNumber.ONE) {
        this.enabled = !this.enabled;
      } else {
        this.expanded = !this.expanded;
      }
    }

    this.moving = false;
  }

  private handleMouseContextMenu(e: MouseEvent) {
    for (const i of this.ipoints) {
      if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
        return;
      }
    }
    for (const i of this.opoints) {
      if (isMouseOver(e, 8, 8, i.left - 4, i.top - 4)) {
        return;
      }
    }

    if (isMouseOver(e, this.width, this.height, this.left, this.top) && this.isMaxId(true)) {
      this.menu.show(e.clientX, e.clientY);
    }
  }

  getID(): number {
    return this.id;
  }

  updateId(): void {
    this.id = gates.findIndex((v) => v === this);
  }

  getPoints(): [ConnectionPoint[], ConnectionPoint[]] {
    return [this.ipoints, this.opoints];
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
    if (this.enabled) {
      ctx.fillStyle = Theme.enabledBgColour;
    } else {
      ctx.fillStyle = Theme.bgColour;
    }

    if (this.expanded) {
      ctx.moveTo(this.left + rad, this.top);
      ctx.lineTo(this.left + this.width - rad, this.top);
      ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + rad, rad);
      ctx.lineTo(this.left + this.width, this.top + this.expandHeight - rad);
      ctx.arcTo(this.left + this.width, this.top + this.expandHeight, this.left + this.width - rad, this.top + this.expandHeight, rad);
      ctx.lineTo(this.left + rad, this.top + this.expandHeight);
      ctx.arcTo(this.left, this.top + this.expandHeight, this.left, this.top + this.expandHeight - rad, rad);
      ctx.lineTo(this.left, this.top + rad);
      ctx.arcTo(this.left, this.top, this.left + rad, this.top, rad);
      ctx.stroke();
      ctx.fill();
      for (let i = 0; i < this.bits; i++) {
        const h = (i + 1) * 48;
        ctx.beginPath();
        ctx.fillStyle = Theme.bgColour;
        ctx.moveTo(this.left + 2 * rad, this.top + h);
        ctx.lineTo(this.left + 32, this.top + h);
        ctx.arcTo(this.left + 32 + rad, this.top + h, this.left + 32 + rad, this.top + h + rad, rad);
        ctx.lineTo(this.left + 32 + rad, this.top + h + 32 - rad);
        ctx.arcTo(this.left + 32 + rad, this.top + h + 32, this.left + 32, this.top + h + 32, rad);
        ctx.lineTo(this.left + 2 * rad, this.top + h + 32);
        ctx.arcTo(this.left + rad, this.top + h + 32, this.left + rad, this.top + h + 32 - rad, rad);
        ctx.lineTo(this.left + rad, this.top + h + rad);
        ctx.arcTo(this.left + rad, this.top + h, this.left + 2 * rad, this.top + h, rad);
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = Theme.fgColour;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "normal 1.4rem 'Lato', sans-serif";
        ctx.fillText((this.bits - i - 1).toString(), this.left + this.width / 2, this.top + this.height / 2 + h - rad);
      }
    } else {
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
      ctx.fill();
      
      for (const i of this.ipoints) {
        i.render(ctx);
      }
      for (const i of this.opoints) {
        i.render(ctx);
      }  
    }

    ctx.fillStyle = Theme.fgColour;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 1.4rem 'Lato', sans-serif";
    ctx.fillText(this.name.toUpperCase(), this.left + this.width / 2, this.top + this.height / 2);
  }
}

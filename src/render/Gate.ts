import { IGateData } from "../logic/IGateData";
import { IntrinsicGateData } from "../logic/IntrinsicGateData";
import { cv, nav, sidebar } from "../main";
import { assert } from "../utils/Assert";
import { clamp, getNumberFromBits, isMouseOver, updateConnectionData } from "../utils/Helpers";
import { WorkingAreaData } from "../WorkingAreaData";
import { BitButton } from "./BitButton";
import { BitsNumber } from "./BitsNumber";
import { ConnectionPoint } from "./ConnectionPoint";
import { Dialog } from "./dialog/Dialog";
import { ButtonType, DialogButton } from "./dialog/DialogButton";
import { DialogInputField } from "./dialog/DialogInputField";
import { GateType } from "./GateType";
import { IWidget } from "./IWidget";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";
import { MouseEventType } from "./MouseEventType";
import { fgColour } from "./theme/DarkTheme";
import { Theme } from "./theme/Theme";
import { WidgetData } from "./WidgetData";
import { WidgetType } from "./WidgetType";

/**
 * Class for rendering gate.
 */
export class Gate implements IWidget {
  private grabbed: boolean = false;
  private entered: boolean = false;
  private moving: boolean = false;
  private menu: Menu;
  private width: number;
  private height: number;
  private ipoints: ConnectionPoint[] = [];
  private opoints: ConnectionPoint[] = [];

  private expanded: boolean = false;
  private expandHeight: number = 0;
  private buttons: BitButton[] = [];

  private numberValue: number = 0;
  private isSigned: boolean = false;
  
  readonly arity: number = -1;
  readonly outputCount: number = -1;

  private xOffset: number = 0;
  private yOffset: number = 0;

  public inputValues: boolean[] = [];
  public outputValues: boolean[] = [];
  public enabled: boolean = false;

  constructor(public left: number, public top: number, private id: number, public name: string, public readonly type: GateType, public readonly bits: BitsNumber = BitsNumber.ONE, public colour: string  = "#d98c8c") {
    let gateData: IGateData;
    if((gateData = WorkingAreaData.currentProject.registry.get(name)!) === undefined) {
      switch (type) {
        case GateType.OUTPUT:
          gateData = {...IntrinsicGateData.get('output')!, arity: bits};
          break;
        case GateType.INPUT:
          gateData = {...IntrinsicGateData.get('input')!, outputCount: bits};
          break;
        default:
          assert(false, `Unknown Gate ${ name }`);
          throw new Error();
      }
    }

    this.arity = gateData.arity;
    this.outputCount = gateData.outputCount;
    const max = Math.max(this.arity, this.outputCount);
    if (type === GateType.GATE) {
      this.width = 96;
      this.height = 64 + (max - 1) * 32;
    } else {
      this.width = 48;
      this.height = 48;
      this.expandHeight = this.height + (bits) * 48;
    }
    this.menu = new Menu();
    if (type !== GateType.GATE) {
      if (bits !== BitsNumber.ONE) {
        const item = new MenuItem("Signed Mode", () => {});
          item.onClick = () => {
            this.menu.hide();
            this.isSigned = !this.isSigned;
            item.changeText(this.isSigned ? "Normal Mode" : "Signed Mode");
          };
        this.menu.addItem(item);
      }
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
    this.menu.addItem(new MenuItem("Remove", () => {
      this.menu.destroy();
      for (const i of this.ipoints) {
        i.destroyMenu();
        const index = WorkingAreaData.rs.widgets.findIndex((v) => v === i);
        WorkingAreaData.rs.widgets.splice(index, index === -1 ? 0 : 1);
      }
      for (const i of this.opoints) {
        i.destroyMenu();
        const index = WorkingAreaData.rs.widgets.findIndex((v) => v === i);
        WorkingAreaData.rs.widgets.splice(index, index === -1 ? 0 : 1);
      }
      for (const i of this.buttons) {
        i.destroyMenu();
        const index = WorkingAreaData.rs.widgets.findIndex((v) => v === i);
        WorkingAreaData.rs.widgets.splice(index, index === -1 ? 0 : 1);
      }
      WorkingAreaData.rs.gates.splice(WorkingAreaData.rs.gates.findIndex((v) => v === this), 1);
      WorkingAreaData.rs.widgets.splice(WorkingAreaData.rs.widgets.findIndex((v) => v === this), 1);
      
      updateConnectionData(this.ipoints);
      updateConnectionData(this.opoints);
      
      WorkingAreaData.rs.connectionMap = WorkingAreaData.rs.connectionMap.filter((v) => !(id === v.inputGateIndex || id === v.outputGateIndex) );
      WorkingAreaData.ls.updateConMap(WorkingAreaData.rs.connectionMap);

      for (const i of WorkingAreaData.rs.gates) {
        i.updateId();
      }
    }, ItemType.DANGER));

    if (type === GateType.GATE) {
      for (let i = 0; i < this.arity; i++) {
        const point = new ConnectionPoint(true, this.left, this.top + this.height / (this.arity + 1) * (i + 1), this, "X");
        this.ipoints.push(point);
        WorkingAreaData.rs.widgets.push(point);
      }
      for (let i = 0; i < this.outputCount; i++) {
        const point = new ConnectionPoint(false, this.left + this.width, this.top + this.height / (this.outputCount + 1) * (i + 1), this, "X");
        this.opoints.push(point);
        WorkingAreaData.rs.widgets.push(point);
      }
    } else {
      if (type === GateType.OUTPUT) {
        for (let i = 0; i < bits; i++) {
          const point = new ConnectionPoint(true, this.left, this.top + this.height / 2, this, "X", bits === BitsNumber.ONE);
          this.ipoints.push(point);
          WorkingAreaData.rs.widgets.push(point);
        }
      } else {
        for (let i = 0; i < bits; i++) {
          const point = new ConnectionPoint(false, this.left + this.width, this.top + this.height / 2, this, "X", bits === BitsNumber.ONE);
          this.opoints.push(point);
          WorkingAreaData.rs.widgets.push(point);
        }
      }
      for (let i = 0; i < bits; i++) {
        this.buttons.push(new BitButton(left + 8, top + (i + 1) * 48, i, "X", type === GateType.INPUT));
      }
    }
  }

  private isMaxId(onEnter: boolean = false): boolean {
    let max = -1;
    for (const i of WorkingAreaData.rs.gates) {
      if (onEnter) {
        if (i.entered) {
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
  
  private modifyPoint(point: ConnectionPoint, index: number) {
    point.enabled = !point.enabled;
    if (point.enabled) {
      point.top = this.top + (index + 1) * 48 + 16;
    } else {
      point.top = this.top + this.height / 2;
    }
  }

  private togglePoints() {
    this.ipoints.forEach((v, i) => this.modifyPoint(v, i));
    this.opoints.forEach((v, i) => this.modifyPoint(v, i));
  }

  private handleMouseMove(e: MouseEvent) {
    if (this.grabbed) {
      if (this.isMaxId()) {
        this.moving = true;
        if (this.type === GateType.GATE) {
          this.left = clamp(Math.round((e.offsetX - this.xOffset) / 16) * 16, 64, cv.width - 64 - this.width);
        }
        if (this.expanded) {
          this.top = clamp(Math.round((e.offsetY - this.yOffset) / 16) * 16 + 4, 4, cv.height - 64 - this.expandHeight);
        } else {
          this.top = clamp(Math.round((e.offsetY - this.yOffset) / 16) * 16 + 4, 4, cv.height - 64 - this.height);
        }

        if (this.type === GateType.GATE) {
          for (let i = 0; i < this.arity; i++) {
            this.ipoints[i].left = this.left;
            this.ipoints[i].top = this.top + this.height / (this.arity + 1) * (i + 1);
          }
          for (let i = 0; i < this.outputCount; i++) {
            this.opoints[i].left = this.left + this.width;
            this.opoints[i].top = this.top + this.height / (this.outputCount + 1) * (i + 1);
          }
        } else {
          this.ipoints.forEach((v, i) => {
            if (v.enabled && this.bits !== BitsNumber.ONE) {
              v.top = this.top + (i + 1) * 48 + 16;
            } else {
              v.top = this.top + this.height / 2;
            }
          });
          this.opoints.forEach((v, i) => {
            if (v.enabled && this.bits !== BitsNumber.ONE) {
              v.top = this.top + (i + 1) * 48 + 16;
            } else {
              v.top = this.top + this.height / 2;
            }
          });
          this.buttons.forEach((v, i) => {
            v.top = this.top + (i + 1) * 48;
          });
        }
      }
    }

    this.entered = isMouseOver(e, this.width, this.height, this.left, this.top);
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

    if (this.entered && !this.moving && e.button === 0) {
      if (this.bits === BitsNumber.ONE && this.type === GateType.INPUT) {
        this.enabled = !this.enabled;
        this.outputValues[0] = this.enabled;
        WorkingAreaData.rs.update(WorkingAreaData.ls);
      } else if (this.type !== GateType.GATE && this.bits !== BitsNumber.ONE) {
        this.expanded = !this.expanded;
        this.togglePoints();
        for (const i of this.buttons) {
          i.visible = this.expanded;
        }
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
    this.id = WorkingAreaData.rs.gates.findIndex((v) => v === this);
  }

  getPoints(): [ConnectionPoint[], ConnectionPoint[]] {
    return [this.ipoints, this.opoints];
  }

  align(): void {
    if (this.type === GateType.GATE && this.left + this.width + sidebar.offsetWidth >= cv.clientWidth) {
      this.left = Math.round((cv.clientWidth - this.width - sidebar.offsetWidth) / 16) * 16;
    }

    if (this.expanded) {
      if (this.top + this.expandHeight + 64 >= cv.clientHeight) {
        this.top = Math.round((cv.clientHeight - this.expandHeight - nav.clientHeight) / 16) * 16 - 16;
      }
    } else {
      if (this.top + this.height + 64 >= cv.clientHeight) {
        this.top = Math.round((cv.clientHeight - this.height - nav.clientHeight) / 16) * 16 - 16;
      }
    }
    
    if (this.type === GateType.OUTPUT) {
      this.left = cv.clientWidth - this.width - 4;
    }

    this.buttons.forEach((v, i) => {
      v.left = this.left + 8;
      v.top = this.top + (i + 1) * 48;
    });

    this.ipoints.forEach((v, i) => {
      if (this.type === GateType.GATE || this.bits === BitsNumber.ONE) {
        v.top = this.top + this.height / (this.arity + 1) * (i + 1);
      } else {
        if (this.expanded) {
          v.top = this.top + (i + 1) * 48 + 16;
        } else {
          v.top = this.top + this.height / 2;
        }
      }
      v.left = this.left;
    });
    this.opoints.forEach((v, i) => {
      if (this.type === GateType.GATE || this.bits === BitsNumber.ONE) {
        v.top = this.top + this.height / (this.outputCount + 1) * (i + 1);
      } else {
        if (this.expanded) {
          v.top = this.top + (i + 1) * 48 + 16;
        } else {
          v.top = this.top + this.height / 2;
        }
      }
      v.left = this.left + this.width;
    });
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
    if (this.type !== GateType.GATE) {
      for (const i of this.buttons) {
        i.handleEvent(type, event);
      }
    }
  }

  updateInputs() {
    if (this.type === GateType.INPUT && this.bits !== BitsNumber.ONE) {
      this.buttons.forEach((v, i) => {
        this.outputValues[i] = v.enabled;
        this.numberValue = getNumberFromBits(this.outputValues, this.isSigned);
      });
    }
  }
  
  updateOutputs() {
    if (this.type === GateType.OUTPUT) {
      if (this.bits === BitsNumber.ONE){
        this.enabled = this.inputValues[0];
      } else {
        this.buttons.forEach((v, i) => {
          v.enabled = this.inputValues[i];
          this.numberValue = getNumberFromBits(this.outputValues, this.isSigned);
        });
      }
    }
  }

  createWidgetData(): WidgetData {
    return {
      type: WidgetType.GATE,
      gateRef: this,
      bitIndex: null,
      isInput: null,
    };
  }

  render(ctx: CanvasRenderingContext2D): void {
    const rad: number = 8;
    ctx.beginPath();
    ctx.strokeStyle = Theme.fgColour;
    ctx.fillStyle = Theme.bgColour;

    if (this.type === GateType.INPUT) {
      if (this.enabled) {
        ctx.fillStyle = Theme.enabledBgColour;
      }
    } else if (this.type === GateType.OUTPUT) {
      if (this.bits === BitsNumber.ONE && this.inputValues[0]) {
        ctx.fillStyle = Theme.enabledBgColour;
      }
    }

    const h = this.expanded ? this.expandHeight : this.height;
    ctx.moveTo(this.left + rad, this.top);
    ctx.lineTo(this.left + this.width - rad, this.top);
    ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + rad, rad);
    ctx.lineTo(this.left + this.width, this.top + h - rad);
    ctx.arcTo(this.left + this.width, this.top + h, this.left + this.width - rad, this.top + h, rad);
    ctx.lineTo(this.left + rad, this.top + h);
    ctx.arcTo(this.left, this.top + h, this.left, this.top + h - rad, rad);
    ctx.lineTo(this.left, this.top + rad);
    ctx.arcTo(this.left, this.top, this.left + rad, this.top, rad);
    ctx.stroke();
    ctx.fill();

    if (this.type === GateType.GATE) {
      ctx.beginPath();
      ctx.strokeStyle = this.colour;
      ctx.fillStyle = this.colour;
      ctx.arc(this.left + this.width - 12, this.top + 12, 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    } else {
      if (this.isSigned) {
        ctx.beginPath();
        ctx.strokeStyle = fgColour;
        ctx.fillStyle = fgColour;
        ctx.arc(this.left + this.width / 3, this.top + this.height * 3 / 4, 2, Math.PI / 2, -Math.PI / 2);
        ctx.rect(this.left + this.width / 3, this.top + this.height * 3 / 4 - 2, this.left + this.width / 3 - 4, 4);
        ctx.arc(this.left + this.width * 2 / 3, this.top + this.height * 3 / 4, 2, -Math.PI / 2, Math.PI / 2);
        ctx.fill();
      }
    }

    if (this.expanded) {
      for (const i of this.buttons) {
        i.render(ctx);
      }
    }
    
    ctx.beginPath();
    ctx.fillStyle = Theme.fgColour;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 1.4rem 'Lato', sans-serif";
    if (this.type === GateType.GATE) {
      ctx.fillText(this.name.toUpperCase(), this.left + this.width / 2, this.top + this.height / 2);
    } else if (this.bits !== BitsNumber.ONE) {
      ctx.fillText(this.numberValue.toString(), this.left + this.width / 2, this.top + this.height / 2);
    }

    for (const i of this.ipoints) {
      i.render(ctx);
    }
    for (const i of this.opoints) {
      i.render(ctx);
    }
  }
}

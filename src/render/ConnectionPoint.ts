import { isMouseOver } from "../utils/Helpers";
import { ConnectionData } from "./ConnectionData";
import { StaticConnectionData } from "./StaticConnectionData";
import { StaticMap } from "./StaticMap";
import { IConnectionMap } from "../logic/IConnectionMap";
import { Theme } from "./theme/Theme";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";
import { IWidget } from "./IWidget";
import { MouseEventType } from "./MouseEventType";
import { Gate } from "./Gate";
import { GateType } from "./GateType";
import { Settings } from "../Settings";
import { WorkingAreaData } from "../WorkingAreaData";
import { WidgetType } from "./WidgetType";

export class ConnectionPoint implements IWidget {
  private hovered: boolean = false;
  private pressed: boolean = false;
  private menu: Menu;

  private xOffset: number = 0;
  private yOffset: number = 0;

  constructor(public isInput: boolean, public left: number, public top: number, private _parent: Gate, public name: string, public enabled: boolean = true) {
    this.menu = new Menu();
    this.menu.addItem(new MenuItem("Disconnect", () => {
      this.menu.hide();
      const pointIndices: number[] = [];
      WorkingAreaData.rs.connectionData.forEach((v, i) => {
        if (v.pointFrom === this || v.pointTo === this) {
          pointIndices.push(i);
        }
      });
      pointIndices.sort((a, b) => a - b).reverse();
      for (const j of pointIndices) {
        WorkingAreaData.rs.connectionData.splice(j, 1);
      }
      
      WorkingAreaData.rs.connectionMap = WorkingAreaData.rs.connectionMap.filter((v) => !(_parent.getID() === v.inputGateIndex || _parent.getID() === v.outputGateIndex) );
      WorkingAreaData.ls.updateConMap(WorkingAreaData.rs.connectionMap);
    }, ItemType.DANGER));
  }

  private handleMouseMove(e: MouseEvent): void {
    this.hovered = isMouseOver(e, 8, 8, this.left - 4, this.top - 4);
    this.xOffset = e.offsetX;
    this.yOffset = e.offsetY;
  }

  private handleMouseDown(e: MouseEvent): void {
    this.menu.hide();
    if (this.hovered && e.button === 0) {
      this.pressed = true;
      StaticConnectionData.pointFrom = this;
      if (this.isInput) {
        StaticMap.outputIndex = this._parent.getPoints()[0].findIndex((v) => v === this);
        StaticMap.outputGateIndex = this._parent.getPoints()[0].find((v) => v === this)?._parent.getID()!;
      } else {
        StaticMap.outputIndex = this._parent.getPoints()[1].findIndex((v) => v === this);
        StaticMap.outputGateIndex = this._parent.getPoints()[1].find((v) => v === this)?._parent.getID()!;
      }
    }
  }
  
  private handleMouseUp(e: MouseEvent): void {
    this.pressed = false;
    if (e.button === 0) {
      if (this.hovered && StaticConnectionData.pointFrom !== this && StaticConnectionData.pointFrom.isInput !== this.isInput) {
        StaticConnectionData.pointTo = this;
        if (this.isInput) {
          StaticMap.inputIndex = this._parent.getPoints()[0].findIndex((v) => v === this);
          StaticMap.inputGateIndex = this._parent.getPoints()[0].find((v) => v === this)?._parent.getID()!;
        } else {
          StaticMap.inputIndex = this._parent.getPoints()[1].findIndex((v) => v === this);
          StaticMap.inputGateIndex = this._parent.getPoints()[1].find((v) => v === this)?._parent.getID()!;
        }

        if (StaticConnectionData.pointFrom.isInput) {
          StaticConnectionData.swap();
          StaticMap.swapIndices();
        }
        
        const map: IConnectionMap = {
          inputIndex: StaticMap.inputIndex,
          outputIndex: StaticMap.outputIndex,
          inputGateIndex: StaticMap.inputGateIndex,
          outputGateIndex: StaticMap.outputGateIndex,
        };

        const i = WorkingAreaData.rs.connectionData.findIndex((v) => v.pointFrom === StaticConnectionData.pointFrom && v.pointTo === StaticConnectionData.pointTo);
        if (i !== -1) {
          WorkingAreaData.rs.connectionData.splice(i, 1);
          const j = WorkingAreaData.rs.connectionMap.findIndex((v) => JSON.stringify(v) === JSON.stringify(map));
          if (j !== -1) {
            WorkingAreaData.rs.connectionMap.splice(j, 1);
            WorkingAreaData.ls.updateConMap(WorkingAreaData.rs.connectionMap);
          }
          return;
        }
        
        const conn = new ConnectionData(StaticConnectionData.pointFrom, StaticConnectionData.pointTo);
        const pos = WorkingAreaData.rs.connectionData.findIndex((v) => v.pointTo === conn.pointTo);
        if (pos !== -1) {
          return;
        }

        WorkingAreaData.rs.connectionData.push(conn);
        WorkingAreaData.rs.connectionMap.push(map);
      }
    }
  }

  private handleMouseContextMenu(e: MouseEvent): void {
    if (this.hovered) {
      this.menu.show(e.clientX, e.clientY);
    }
  }

  destroyMenu() {
    this.menu.destroy();
  }

  handleEvent(type: MouseEventType, event: MouseEvent): void {
    switch (type) {
      case MouseEventType.MOVE:
        if (this.enabled) {
          this.handleMouseMove(event);
        }
        break;
      case MouseEventType.UP:
        if (this.enabled) {
          this.handleMouseUp(event);
        }
        break;
      case MouseEventType.DOWN:
        if (this.enabled) {
          this.handleMouseDown(event);
        }
        break;
      case MouseEventType.CONTEXTMENU:
        this.handleMouseContextMenu(event);
        break;
    }
  }

  getWidgetType(): WidgetType {
    return WidgetType.POINT;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if (this.hovered) {
      ctx.strokeStyle = Theme.hoverBgColour;
      ctx.fillStyle = Theme.hoverBgColour;
    } else {
      ctx.strokeStyle = Theme.fgColour;
      ctx.fillStyle = Theme.fgColour;
    }
    ctx.moveTo(this.left, this.top - 4);
    ctx.arcTo(this.left + 4, this.top - 4, this.left + 4, this.top, 4);
    ctx.arcTo(this.left + 4, this.top + 4, this.left, this.top + 4, 4);
    ctx.arcTo(this.left - 4, this.top + 4, this.left - 4, this.top, 4);
    ctx.arcTo(this.left - 4, this.top - 4, this.left, this.top - 4, 4);
    ctx.stroke();
    ctx.fill();

    if (this.pressed) {
      ctx.beginPath();
      ctx.strokeStyle = Theme.fgColour;
      if (this.xOffset > this.left && this.isInput || this.xOffset < this.left && !this.isInput) {
        const hy = Math.round((this.top + this.yOffset) / 2);
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left + 16 * (this.isInput ? -1 : 1), this.top);
        ctx.lineTo(this.left + 16 * (this.isInput ? -1 : 1), hy);
        ctx.lineTo(this.xOffset - 16 * (this.isInput ? -1 : 1), hy);
        ctx.lineTo(this.xOffset - 16 * (this.isInput ? -1 : 1), this.yOffset);
        ctx.lineTo(this.xOffset, this.yOffset);
        ctx.stroke();
      } else {
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(Math.round((this.xOffset + this.left) / 2), this.top);
        ctx.lineTo(Math.round((this.xOffset + this.left) / 2), this.yOffset);
        ctx.lineTo(this.xOffset, this.yOffset);
        ctx.stroke();
      }
    }

    if (Settings.showFieldNames && this.hovered && this._parent.type === GateType.GATE) {
      ctx.beginPath();
      const x = this.isInput ? this.left - 16 : this.left + 24;
      ctx.fillStyle = Theme.fgColour;
      ctx.textAlign = "right";
      ctx.fillText(this.name, x, this.top);
    }
  }
}
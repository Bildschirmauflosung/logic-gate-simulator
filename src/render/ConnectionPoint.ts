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
import { rs } from "../main";

export class ConnectionPoint implements IWidget {
  private hovered: boolean = false;
  private pressed: boolean = false;
  private menu: Menu;

  private xOffset: number = 0;
  private yOffset: number = 0;

  constructor(public isInput: boolean, public left: number, public top: number, private _parent: Gate, public enabled: boolean = true) {
    this.menu = new Menu();
    this.menu.addItem(new MenuItem("Disconnect", () => {
      this.menu.hide();
      const pointIndices: number[] = [];
      rs.connectionData.forEach((v, i) => {
        if (v.pointFrom === this || v.pointTo === this) {
          pointIndices.push(i);
        }
      });
      pointIndices.sort((a, b) => a - b).reverse();
      for (const j of pointIndices) {
        rs.connectionData.splice(j, 1);
      }
      
      const indices: number[] = [];
      rs.connectionMap.forEach((v, i) => {
        if (_parent.getID() === v.inputGateIndex && _parent.getPoints()[1].findIndex((v) => v === this) !== -1) {
          indices.push(i);
        }
      });
      indices.sort((a, b) => a - b).reverse();
      for (const j of indices) {
        rs.connectionMap.splice(j, 1);
      }
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

      if (this._parent.type !== GateType.GATE) {
        StaticMap.outputIndex = 0;
        StaticMap.outputGateIndex = -(rs.gates.findIndex((v) => v === this._parent) + 1);
      } else {
        StaticMap.outputIndex = this._parent.getPoints()[0].findIndex((v) => v === this);
      }
    }
  }
  
  private handleMouseUp(e: MouseEvent): void {
    this.pressed = false;
    if (e.button === 0) {
      if (this.hovered && StaticConnectionData.pointFrom !== this && StaticConnectionData.pointFrom.isInput !== this.isInput) {
        StaticConnectionData.pointTo = this;
        if (this._parent.type !== GateType.GATE) {
          StaticMap.inputIndex = 0;
          StaticMap.inputGateIndex = -(rs.gates.findIndex((v) => v === this._parent) + 1);
        } else {
          StaticMap.inputIndex = this._parent.getPoints()[1].findIndex((v) => v === this);
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
        if (rs.connectionMap.findIndex((v) => v === map) !== -1) {
          return;
        }

        const i = rs.connectionData.findIndex((v) => v.pointFrom === StaticConnectionData.pointFrom && v.pointTo === StaticConnectionData.pointTo);
        if (i !== -1) {
          rs.connectionData.splice(i, 1);
          const j = rs.connectionMap.findIndex((v) => v === map);
          if (j !== -1) {
            rs.connectionMap.splice(j, 1);
          }
          return;
        }
        
        const conn = new ConnectionData(StaticConnectionData.pointFrom, StaticConnectionData.pointTo);
        const pos = rs.connectionData.findIndex((v) => v.pointTo === conn.pointTo);
        if (pos !== -1) {
          return;
        }

        rs.connectionData.push(conn);
        rs.connectionMap.push(map);
        // simulator.rebuild();
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
  }
}
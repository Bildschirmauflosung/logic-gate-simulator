import { connectedPoints, connections, ioButtons, sidebar, simulator } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { ConnectionData } from "./ConnectionData";
import { IOButton } from "./IOButton";
import { IOType } from "./IOType";
import { IRenderable } from "./IRenderable";
import { IConnectable } from "./IConnectable";
import { IWithMouseEvent } from "./IWithMouseEvent";
import { StaticConnectionData } from "./StaticConnectionData";
import { StaticMap } from "./StaticMap";
import { IConnectionMap } from "../logic/IConnectionMap";

export class ConnectionPoint implements IRenderable, IWithMouseEvent {
  private _hovered: boolean = false;
  private _pressed: boolean = false;

  private _xOffset: number = 0;
  private _yOffset: number = 0;
  private _xPos: number = 0;

  constructor(public type: IOType, public left: number, public top: number, private _parent: IConnectable) { }

  handleMouseMove(e: MouseEvent): void {
    this._hovered = isMouseOver(e, 8, 8, this.left - 4, this.top - 4);
    this._xOffset = e.offsetX;
    this._yOffset = e.offsetY;
    this._xPos = e.clientX;
  }

  handleMouseDown(e: MouseEvent): void {
    if (this._hovered && e.button === 0) {
      this._pressed = true;
      StaticConnectionData.pointFrom = this;

      if (typeof(this._parent) === typeof(IOButton)) {
        StaticMap.outputIndex = 0;
        StaticMap.outputGateIndex = -(ioButtons.findIndex((v) => v === this._parent as unknown as IOButton) + 1);
      } else {
        StaticMap.outputIndex = this._parent.getPoints()[0].findIndex((v) => v === this);
      }
    }
  }
  
  handleMouseUp(e: MouseEvent): void {
    this._pressed = false;
    if (e.button === 0) {
      if (this._hovered && StaticConnectionData.pointFrom !== this && StaticConnectionData.pointFrom.type !== this.type) {
        StaticConnectionData.pointTo = this;
        if (typeof(this._parent) === typeof(IOButton)) {
          StaticMap.inputIndex = 0;
          StaticMap.inputGateIndex = -(ioButtons.findIndex((v) => v === this._parent as unknown as IOButton) + 1);
        } else {
          StaticMap.inputIndex = this._parent.getPoints()[1].findIndex((v) => v === this);
        }

        if (StaticConnectionData.pointFrom.type === IOType.INPUT) {
          StaticConnectionData.swap();
          StaticMap.swapIndices();
        }
        
        const map: IConnectionMap = {
          inputIndex: StaticMap.inputIndex,
          outputIndex: StaticMap.outputIndex,
          inputGateIndex: StaticMap.inputGateIndex,
          outputGateIndex: StaticMap.outputGateIndex,
        };
        if (connections.findIndex((v) => v === map) !== -1) {
          return;
        }

        const i = connectedPoints.findIndex((v) => v.pointFrom === StaticConnectionData.pointFrom && v.pointTo === StaticConnectionData.pointTo);
        if (i !== -1) {
          connectedPoints.splice(i, 1);
          const j = connections.findIndex((v) => v === map);
          if (j !== -1) {
            connections.splice(j, 1);
          }
          return;
        }
        
        const conn = new ConnectionData(StaticConnectionData.pointFrom, StaticConnectionData.pointTo);
        const pos = connectedPoints.findIndex((v) => v.pointFrom === conn.pointFrom);
        if (pos !== -1) {
          return;
        }

        connectedPoints.push(conn);
        connections.push(map);
        simulator.rebuild();
      }
    }
  }

  handleMouseContextMenu(_e: MouseEvent): void { }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if (this._hovered) {
      ctx.strokeStyle = "#7f7f7f";
      ctx.fillStyle = "#7f7f7f";
    } else {
      ctx.strokeStyle = "#000";
      ctx.fillStyle = "#000";
    }
    ctx.moveTo(this.left, this.top - 4);
    ctx.arcTo(this.left + 4, this.top - 4, this.left + 4, this.top, 4);
    ctx.arcTo(this.left + 4, this.top + 4, this.left, this.top + 4, 4);
    ctx.arcTo(this.left - 4, this.top + 4, this.left - 4, this.top, 4);
    ctx.arcTo(this.left - 4, this.top - 4, this.left, this.top - 4, 4);
    ctx.stroke();
    ctx.fill();

    if (this._pressed) {
      ctx.beginPath();
      ctx.strokeStyle = "#000";
      ctx.moveTo(this.left, this.top);
      ctx.lineTo((this._xPos + this.left - sidebar.offsetWidth) / 2, this.top);
      ctx.lineTo((this._xPos + this.left - sidebar.offsetWidth) / 2, this._yOffset);
      ctx.lineTo(this._xOffset, this._yOffset);
      ctx.stroke();
    }
  }
}
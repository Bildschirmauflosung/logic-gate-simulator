import { ConnectionPoint } from "./ConnectionPoint";
import { IRenderable } from "./IRenderable";

export class ConnectionData implements IRenderable {
  constructor(public pointFrom: ConnectionPoint, public pointTo: ConnectionPoint) { }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.moveTo(this.pointFrom.left, this.pointFrom.top);
    ctx.lineTo(Math.round((this.pointTo.left + this.pointFrom.left) / 2), this.pointFrom.top);
    ctx.lineTo(Math.round((this.pointTo.left + this.pointFrom.left) / 2), this.pointTo.top);
    ctx.lineTo(this.pointTo.left, this.pointTo.top);
    ctx.stroke();
  }
}
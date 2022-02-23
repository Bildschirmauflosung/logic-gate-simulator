import { ConnectionPoint } from "./ConnectionPoint";
import { IRenderable } from "./IRenderable";
import { Theme } from "./theme/Theme";

export class ConnectionData implements IRenderable {
  constructor(public pointFrom: ConnectionPoint, public pointTo: ConnectionPoint) { }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = Theme.fgColour;
    if (this.pointFrom.left + 16 >= this.pointTo.left) {
      const hy = Math.round(Math.max(this.pointFrom.top, this.pointTo.top) + Math.min(this.pointFrom.top, this.pointTo.top)) / 2;
      ctx.moveTo(this.pointFrom.left, this.pointFrom.top);
      ctx.lineTo(this.pointFrom.left + 16, this.pointFrom.top);
      ctx.lineTo(this.pointFrom.left + 16, hy);
      ctx.lineTo(this.pointTo.left - 16, hy);
      ctx.lineTo(this.pointTo.left - 16, this.pointTo.top);
      ctx.lineTo(this.pointTo.left, this.pointTo.top);
      ctx.stroke();
    } else {
      ctx.moveTo(this.pointFrom.left, this.pointFrom.top);
      ctx.lineTo(Math.round((this.pointTo.left + this.pointFrom.left) / 2), this.pointFrom.top);
      ctx.lineTo(Math.round((this.pointTo.left + this.pointFrom.left) / 2), this.pointTo.top);
      ctx.lineTo(this.pointTo.left, this.pointTo.top);
      ctx.stroke();
    }
  }
}
import { ConnectionPoint } from "./ConnectionPoint";
import { Theme } from "./theme/Theme";

export class ConnectionData {
  constructor(public pointFrom: ConnectionPoint, public pointTo: ConnectionPoint) { }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = Theme.fgColour;
    const dr = this.pointFrom.top < this.pointTo.top ? 4 : this.pointFrom.top > this.pointTo.top ? -4 : 0;
    if (this.pointFrom.left + 16 >= this.pointTo.left) {
      const hy = Math.round((this.pointTo.top + this.pointFrom.top) / 2);
      ctx.moveTo(this.pointFrom.left, this.pointFrom.top);
      ctx.lineTo(this.pointFrom.left + 12, this.pointFrom.top);
      ctx.arcTo(this.pointFrom.left + 16, this.pointFrom.top, this.pointFrom.left + 16, this.pointFrom.top + dr, 4);
      ctx.lineTo(this.pointFrom.left + 16, hy - dr);
      ctx.arcTo(this.pointFrom.left + 16, hy, this.pointFrom.left + 12, hy, 4);
      ctx.lineTo(this.pointTo.left - 12, hy);
      ctx.arcTo(this.pointTo.left - 16, hy, this.pointTo.left - 16, hy + dr, 4);
      ctx.lineTo(this.pointTo.left - 16, this.pointTo.top - dr);
      ctx.arcTo(this.pointTo.left - 16, this.pointTo.top, this.pointTo.left - 12, this.pointTo.top, 4);
      ctx.lineTo(this.pointTo.left, this.pointTo.top);
      ctx.stroke();
    } else {
      const hx = Math.round((this.pointTo.left + this.pointFrom.left) / 2);
      ctx.moveTo(this.pointFrom.left, this.pointFrom.top);
      ctx.lineTo(hx - 4, this.pointFrom.top);
      ctx.arcTo(hx, this.pointFrom.top, hx, this.pointFrom.top + dr, 4);
      ctx.lineTo(hx, this.pointTo.top - dr);
      ctx.arcTo(hx, this.pointTo.top, hx + 4, this.pointTo.top, 4);
      ctx.lineTo(this.pointTo.left, this.pointTo.top);
      ctx.stroke();
    }
  }
}
import { IRenderable } from "./IRenderable";

export enum IOType {
  INPUT = 0,
  OUTPUT,
}

export class IOButton implements IRenderable {
  width: number;
  height: number;
  left: number;
  top: number;
  name: string;
  type: IOType;

  constructor(width: number, top: number, name: string, type: IOType) {
    this.width = width;
    this.height = width;
    this.left = 0;
    this.top = top;
    this.name = name;
    this.type = type;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#bfbfbf";
    ctx.beginPath();
    ctx.moveTo(this.left + this.width / 2, this.top);
    ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + this.height / 2, this.width / 2);
    ctx.arcTo(this.left + this.width, this.top + this.height, this.left + this.width / 2, this.top + this.height, this.width / 2);
    ctx.arcTo(this.left, this.top + this.height, this.left, this.top + this.height / 2, this.width / 2);
    ctx.arcTo(this.left, this.top, this.left + this.width / 2, this.top, this.width / 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.left + this.width / 2, this.top + this.height / 2);
  }
}
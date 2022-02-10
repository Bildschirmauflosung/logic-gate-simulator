import { IRenderable } from "./IRenderable";

export enum IOType {
  INPUT = 0,
  OUTPUT,
}

export class IOButton implements IRenderable {
  readonly margin: number = 8;

  width: number;
  height: number;
  name: string;
  type: IOType;

  constructor(width: number, name: string, type: IOType) {
    this.width = width;
    this.height = width;
    this.name = name;
    this.type = type;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#bfbfbf";
    ctx.beginPath();
    ctx.moveTo(this.margin + this.width / 2, this.margin);
    ctx.arcTo(this.margin + this.width, this.margin, this.margin + this.width, this.margin + this.height / 2, this.width / 2);
    ctx.arcTo(this.margin + this.width, this.margin + this.height, this.margin + this.width / 2, this.margin + this.height, this.width / 2);
    ctx.arcTo(this.margin, this.margin + this.height, this.margin, this.margin + this.height / 2, this.width / 2);
    ctx.arcTo(this.margin, this.margin, this.margin + this.width / 2, this.margin, this.width / 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.margin + this.width / 2, this.margin + this.height / 2);
  }
}
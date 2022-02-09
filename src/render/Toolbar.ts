import { IRenderable } from "./IRenderable";

export class Toolbar implements IRenderable {
  width: number;
  height: number;
  left: number;
  top: number;

  constructor(width: number, height: number, left: number, top: number) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
  }

  render(ctx: CanvasRenderingContext2D): void {
    
  }
}
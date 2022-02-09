import { IOButton } from "./IOButton";
import { IRenderable } from "./IRenderable";

export enum ToolbarSide {
  LEFT = 0,
  RIGHT,
}

export class Toolbar implements IRenderable {
  width: number;
  height: number;
  left: number;
  top: number;

  side: ToolbarSide;
  items: IOButton[] = [];

  constructor(width: number, side: ToolbarSide) {
    this.width = width;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.side = side;
  }

  render(ctx: CanvasRenderingContext2D): void {
    switch (this.side) {
      case ToolbarSide.LEFT:
        for (const i of this.items) {
          i.render(ctx);
        }
        break;
    }
  }
}
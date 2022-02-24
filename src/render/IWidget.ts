import { MouseEventType } from "./MouseEventType";

export interface IWidget {
  handleEvent(type: MouseEventType, event: MouseEvent): void;
  render(ctx: CanvasRenderingContext2D): void;
}
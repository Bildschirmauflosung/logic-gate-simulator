import { MouseEventType } from "./MouseEventType";
import { WidgetData } from "./WidgetData";

export interface IWidget {
  createWidgetData(): WidgetData;
  handleEvent(type: MouseEventType, event: MouseEvent): void;
  render(ctx: CanvasRenderingContext2D): void;
}
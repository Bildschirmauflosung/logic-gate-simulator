import { MouseEventType } from "./MouseEventType";
import { WidgetType } from "./WidgetType";

export interface IWidget {
  getWidgetType(): WidgetType;
  handleEvent(type: MouseEventType, event: MouseEvent): void;
  render(ctx: CanvasRenderingContext2D): void;
}
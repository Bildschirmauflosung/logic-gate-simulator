import { MouseEventType } from "./MouseEventType";
import { WidgetData } from "./WidgetData";

/**
 * Interface for widgets rendered on canvas.
 */
export interface IWidget {
  /**
   * Creates `WidgetData` for serialisation.
   */
  createWidgetData(): WidgetData;

  /**
   * Handles specified event.
   * @param type Type of mouse event.
   * @param event Reference to `MouseEvent`.
   */
  handleEvent(type: MouseEventType, event: MouseEvent): void;
  render(ctx: CanvasRenderingContext2D): void;
}
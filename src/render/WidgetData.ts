import { Gate } from "./Gate";
import { WidgetType } from "./WidgetType";

/**
 * Class for serialising `IWidget.
 * 
 * Can be created by calling `IWidget.getWidgetData()`.
 */
export class WidgetData {
  /**
   * Widget type.
   */
  public type: WidgetType = -1;

  /**
   * Reference to gate.
   * 
   * Applies for every widget type except `WidgetType.ADD_BUTTON`.
   */
  public gateRef: Gate | null = null;

  /**
   * Defines if widget is input or output.
   * 
   * Applies for every widget type except `WidgetType.GATE`.
   */
  public isInput: boolean | null = null;

  /**
   * Index (position) of bit.
   * 
   * Applies only for `WidgetType.BIT_BUTTON`.
   */
  public bitIndex: number | null = null;
}
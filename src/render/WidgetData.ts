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
   * Applies only for `WidgetType.GATE` and `WidgetType.POINT`.
   */
  public gateRef: Gate | null = null;

  /**
   * Name. Its usage depends of type of the widget.
   * 
   * Applies for every widget type except `WidgetType.ADD_BUTTON`.
   */
  public name: string | null = null;

  /**
   * X coordinate of widget.
   * 
   * Applies only for `WidgetType.POINT` and `WidgetType.BIT_BUTTON`.
   */
  public left: number | null = null;

  /**
   * Y coordinate of widget.
   * 
   * Applies only for `WidgetType.POINT` and `WidgetType.BIT_BUTTON`.
   */
  public top: number | null = null;

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
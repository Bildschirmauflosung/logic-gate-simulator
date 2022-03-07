import { IConnectionMap } from "../logic/IConnectionMap";
import { Simulator } from "../logic/Simulator";
import { BitButton } from "./BitButton";
import { ConnectionData } from "./ConnectionData";
import { ConnectionPoint } from "./ConnectionPoint";
import { Gate } from "./Gate";
import { IOAddButton } from "./IOAddButton";
import { IWidget } from "./IWidget";
import { MouseEventType } from "./MouseEventType";
import { WidgetData } from "./WidgetData";
import { WidgetType } from "./WidgetType";

/**
 * Simulator responsible for rendering project.
 */
export class RenderSimulator {
  public readonly widgets: IWidget[] = [];
  public readonly gates: Gate[] = [];
  public readonly connectionData: ConnectionData[] = [];
  public connectionMap: IConnectionMap[] = [];

  constructor(public name: string) {}

  widgetsFromData(data: WidgetData[]) {
    this.widgets.splice(0);
    for (const i of data) {
      switch (i.type) {
        case WidgetType.GATE:
          this.widgets.push(i.gateRef!);
          break;
        case WidgetType.POINT:
          this.widgets.push(new ConnectionPoint(i.isInput!, i.left!, i.top!, i.gateRef!, i.name!, true));
          break;
        case WidgetType.BIT_BUTTON:
          this.widgets.push(new BitButton(i.left!, i.top!, i.bitIndex!, i.name!, i.isInput!));
          break;
        case WidgetType.ADD_BUTTON:
          this.widgets.push(new IOAddButton(i.isInput!));
          break;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const i of this.widgets) {
      i.render(ctx);
    }
  }
  
  renderWires(ctx: CanvasRenderingContext2D) {
    for (const i of this.connectionData) {
      i.render(ctx);
    }
  }

  handleEvents(type: MouseEventType, event: MouseEvent) {
    for (const i of this.widgets) {
      i.handleEvent(type, event);
    }
  }

  update(sim: Simulator) {
    sim.rebuild();
  }
}
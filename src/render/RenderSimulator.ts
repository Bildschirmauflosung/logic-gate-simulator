import { IConnectionMap } from "../logic/IConnectionMap";
import { Simulator } from "../logic/Simulator";
import { ConnectionData } from "./ConnectionData";
import { Gate } from "./Gate";
import { IWidget } from "./IWidget";
import { MouseEventType } from "./MouseEventType";

/**
 * Simulator responsible for rendering project.
 */
export class RenderSimulator {
  public readonly widgets: IWidget[] = [];
  public readonly gates: Gate[] = [];
  public readonly connectionData: ConnectionData[] = [];
  public connectionMap: IConnectionMap[] = [];

  constructor(public name: string) {}

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
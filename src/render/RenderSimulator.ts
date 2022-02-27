import { IConnectionMap } from "../logic/IConnectionMap";
import { ConnectionData } from "./ConnectionData";
import { Gate } from "./Gate";
import { IWidget } from "./IWidget";

export class RenderSimulator {
  public readonly widgets: IWidget[] = [];
  public readonly gates: Gate[] = [];
  public readonly connectionData: ConnectionData[] = [];
  public readonly connectionMap: IConnectionMap[] = [];

  constructor() {}
}
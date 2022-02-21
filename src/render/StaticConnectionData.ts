import { ConnectionPoint } from "./ConnectionPoint";

export class StaticConnectionData {
  static pointFrom: ConnectionPoint;
  static pointTo: ConnectionPoint;

  static swap() {
    const temp = this.pointFrom;
    this.pointFrom = this.pointTo;
    this.pointTo = temp;
  }
}
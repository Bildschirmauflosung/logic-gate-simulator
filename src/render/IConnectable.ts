import { ConnectionPoint } from "./ConnectionPoint";

export interface IConnectable {
  getID(): number;
  updateId(): void;

  getPoints(): [ConnectionPoint[], ConnectionPoint[]];
}
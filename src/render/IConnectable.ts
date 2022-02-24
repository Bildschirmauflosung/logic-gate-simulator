import { ConnectionPoint } from "./ConnectionPoint";

export enum ConnectableType {
  GATE = 0,
  INPUT,
  OUTPUT,
}

export interface IConnectable {
  inputValues: boolean[];
  outputValues: boolean[];

  getID(): number;
  getName(): string;
  getType(): ConnectableType;
  updateId(): void;

  getPoints(): [ConnectionPoint[], ConnectionPoint[]];
}
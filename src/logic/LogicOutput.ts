import {LogicGate} from "./LogicGate";
import {IOButton} from "../render/IOButton";
import {IValueRequestable} from "./IValueRequestable";

export class LogicOutput extends LogicGate {
  constructor(connection: IValueRequestable, iIndexes: number[], readonly frontendButton: IOButton) {
    super([connection], iIndexes, 1, 0, a => a);
  }
}

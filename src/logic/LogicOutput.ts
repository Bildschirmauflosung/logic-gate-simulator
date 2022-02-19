import {LogicGate} from "./LogicGate";
import {IOButton} from "../render/IOButton";

export class LogicOutput extends LogicGate {
  constructor(connection: LogicGate, readonly frontendButton: IOButton) {
    super([connection], 1, 0, a => a);
  }
}

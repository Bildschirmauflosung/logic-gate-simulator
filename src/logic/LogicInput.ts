import {Gate} from "../render/Gate";
import {assertEqual} from "../utils/Assert";
import {GateType} from "../render/GateType";
import {LogicGate} from "./LogicGate";
import {GateRegistry} from "./GateRegistry";

export class LogicInput extends LogicGate {
  constructor(gate: Gate) {
    assertEqual(gate.type, GateType.INPUT);
    super(gate, GateRegistry.get("input")!);
  }

  override requestValue(): boolean[] {
    return [this.gate.enabled];
  }
}

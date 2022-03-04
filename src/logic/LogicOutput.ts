import {LogicGate} from "./LogicGate";
import {assertEqual} from "../utils/Assert";
import {GateType} from "../render/GateType";
import {Gate} from "../render/Gate";
import {GateRegistry} from "./GateRegistry";

export class LogicOutput extends LogicGate {
  constructor(gate: Gate) {
    assertEqual(gate.type, GateType.OUTPUT);
    super(gate, GateRegistry.get('output')!);
  }

  override requestValue(): boolean[] {
    return this.gate.inputValues = super.requestValue();
  }
}

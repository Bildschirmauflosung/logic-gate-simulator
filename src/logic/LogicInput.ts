import {Gate} from "../render/Gate";
import {assertEqual} from "../utils/Assert";
import {GateType} from "../render/GateType";
import {LogicGate} from "./LogicGate";
import {IntrinsicGateData} from "./IntrinsicGateData";

export class LogicInput extends LogicGate {
  constructor(gate: Gate) {
    assertEqual(gate.type, GateType.INPUT);
    super(gate, IntrinsicGateData.get("input")!);
  }

  override requestValue(): boolean[] {
    return this.gate.outputValues;
  }
}

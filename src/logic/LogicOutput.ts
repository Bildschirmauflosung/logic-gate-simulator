import {LogicGate} from "./LogicGate";
import {assertEqual} from "../utils/Assert";
import {GateType} from "../render/GateType";
import {Gate} from "../render/Gate";

export class LogicOutput extends LogicGate {
  constructor(gate: Gate) {
    assertEqual(gate.type, GateType.INPUT);
    super(gate, {
      arity: 1,
      customStructure: null,
      intrinsic: true,
      outputCount: 0,
      resolutionFunc: (_: boolean[]) => [this.gate.enabled]
    });
  }

  requestValue(): boolean[] {
    this.gate.enabled = super.requestValue()[0];
    return super.requestValue();
  }
}

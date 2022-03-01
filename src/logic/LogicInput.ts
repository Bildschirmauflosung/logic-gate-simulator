import {Gate} from "../render/Gate";
import {assertEqual} from "../utils/Assert";
import {GateType} from "../render/GateType";
import {LogicGate} from "./LogicGate";

export class LogicInput extends LogicGate {
  constructor(gate: Gate) {
    assertEqual(gate.type, GateType.INPUT);
    super(gate, {
      arity: 0,
      customStructure: null,
      intrinsic: true,
      outputCount: 1,
      resolutionFunc: (_: boolean[]) => [this.gate.enabled]
    });
  }

}

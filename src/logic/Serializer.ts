import {CustomLogicGate} from "./CustomLogicGate";
import {CustomGateDesc} from "./CustomGateDesc";

export class Serializer {
  private constructor() {  }
  static serializeCustomGate(gate: CustomLogicGate) {
    return JSON.stringify(gate.gate);
  }

  static serializeCustomGateDesc(cgd: CustomGateDesc) {
    return JSON.stringify(cgd);
  }

}

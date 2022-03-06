import {LogicGate} from "./LogicGate";
import {Simulator} from "./Simulator";
import {Gate} from "../render/Gate";
import {IGateData} from "./IGateData";
import {assertNotNull} from "../utils/Assert";
import {GateType} from "../render/GateType";

export class CustomLogicGate extends LogicGate {
  internalSim!: Simulator;

  constructor(gate: Gate, gateData: IGateData) {
    super(gate, {...gateData, resolutionFunc: (_) => []});
    // this.internalSim = Simulator.forCustomGate()
  }

  override requestValue(): boolean[] {
    if(!this.visited) {
      this.visited = true;

      assertNotNull(this.gate);

      this.gate.inputValues = this.children.map((gate: LogicGate | null, idx: number) => gate?.requestValue()[this.iIndexes[idx]]).flat() as boolean[]

      this.internalSim.gates
        .filter(gate => gate.gate.type === GateType.INPUT)
        .forEach((gate, idx) => gate.gate.enabled = this.gate.inputValues[idx]);

      this.internalSim.tick()
      this.gate.outputValues = this.value = this.internalSim.gates
        .filter(gate => gate.gate.type === GateType.OUTPUT)
        .map(gate => gate.requestValue()).flat();
    }
    return this.value;
  }
}

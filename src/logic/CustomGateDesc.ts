import {IConnectionMap} from "./IConnectionMap";
import {Simulator} from "./Simulator";
import {Gate} from "../render/Gate";

export class CustomGateDesc {
  conections: IConnectionMap[];
  gates: Gate[];
  prereqs: Set<string>;

  constructor(sim: Simulator) {
    this.conections = sim.conMap;
    this.gates = sim.gates
      .map(gate => gate.gate);
    this.prereqs = new Set(this.gates.map(gate => gate.name))
  }
}

import {IConnectionMap} from "./IConnectionMap";
import {Gate} from "../render/Gate";
import {RenderSimulator} from "../render/RenderSimulator";

export class CustomGateDesc {
  conections: IConnectionMap[];
  gates: Gate[];
  prereqs: Set<string>;

  constructor(sim: RenderSimulator) {
    this.conections = sim.connectionMap;
    this.gates = sim.gates;
    this.prereqs = new Set(this.gates.map(gate => gate.name))
  }
}

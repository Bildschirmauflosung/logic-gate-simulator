import {IConnectionMap} from "./IConnectionMap";
import {Gate} from "../render/Gate";
import {RenderSimulator} from "../render/RenderSimulator";

export class CustomGateDesc {
  conections: IConnectionMap[];
  gates: Gate[];
  colour: string;
  prereqs: Set<string>;

  constructor(sim: RenderSimulator, colour: string) {
    this.conections = sim.connectionMap;
    this.gates = sim.gates;
    this.colour = colour;
    this.prereqs = new Set(this.gates.map(gate => gate.name))
  }
}

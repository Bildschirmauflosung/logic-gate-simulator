import { CustomGateDesc } from "./logic/CustomGateDesc";
import { IntrinsicGateData } from "./logic/IntrinsicGateData";
import { Simulator } from "./logic/Simulator";
import { GateRegistryT } from "./logic/Types";
import { GateType } from "./render/GateType";
import { RenderSimulator } from "./render/RenderSimulator";
import { WorkingAreaData } from "./WorkingAreaData";

export class Project {
  public simulators: Map<string, [RenderSimulator, Simulator]> = new Map();
  readonly gates: Map<string, CustomGateDesc> = new Map();
  readonly registry: GateRegistryT = new Map([...IntrinsicGateData]);

  constructor(public name: string) {
    const sim = new RenderSimulator("New Gate");
    this.simulators.set("New Gate", [sim, Simulator.from(sim)]);
    WorkingAreaData.projects.set(name, this);
  }

  updateRegistry(name: string, simulator: RenderSimulator) {
    const inputs = simulator.gates.filter((v) => v.type === GateType.INPUT).length;
    const outputs = simulator.gates.filter((v) => v.type === GateType.OUTPUT).length;
    this.registry.set(name, {
      arity: inputs,
      outputCount: outputs,
      customStructureRef: name,
      gType: GateType.GATE,
      prereqs: new Set(),
      resolutionFunc: null,
    });

    this.gates.set(name, {
      conections: simulator.connectionMap,
      gates: simulator.gates,
      prereqs: new Set(),
    });
  }
}
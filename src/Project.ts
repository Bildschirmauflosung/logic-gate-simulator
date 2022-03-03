import { Simulator } from "./logic/Simulator";
import { projects } from "./main";
import { RenderSimulator } from "./render/RenderSimulator";

export class Project {
  public simulators: Map<string, [RenderSimulator, Simulator]> = new Map();

  constructor(public name: string) {
    const sim = new RenderSimulator();
    this.simulators.set("New Gate", [sim, Simulator.from(sim)]);
    projects.set(name, this);
  }
}
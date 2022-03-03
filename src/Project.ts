import { Simulator } from "./logic/Simulator";

export class Project {
  public simulators: Map<string, Simulator> = new Map();

  constructor() {}
}
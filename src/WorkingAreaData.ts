import { Project } from "./Project";

export class WorkingAreaData {
  static readonly projects = new Map<string, Project>();
  static currentProject = new Project("New Project");
  static rs = this.currentProject.simulators.get("New Gate")?.[0]!;
  static ls = this.currentProject.simulators.get("New Gate")?.[1]!;
}
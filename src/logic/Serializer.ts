import {CustomGateDesc} from "./CustomGateDesc";
import {Project} from "../Project";
import {RenderSimulator} from "../render/RenderSimulator";

export class Serializer {
  private constructor() {  }
  static serializeCustomGateDescs(cgds: {name: string, cgd: CustomGateDesc}[]) {
    return JSON.stringify(cgds);
  }

  static saveProject(proj: Project) {
    const ls = window.localStorage;

    const sims: Map<string, RenderSimulator> = [...proj.simulators]
      .map(pair => [pair[0], pair[1][0]]);
    ls.setItem(`p:${proj.name}`, JSON.stringify(sims));
  }
}

import {CustomGateDesc} from "./CustomGateDesc";

export class Serializer {
  private constructor() {  }
  static serializeCustomGateDesc(cgds: {name: string, cgd: CustomGateDesc}[]) {
    return JSON.stringify(cgds);
  }

  // static saveProject(proj: Project) {
  //   const ls = window.localStorage;
  //
    // const sims: Map<string, RenderSimulator> = [...proj.simulators.entries()]
    //   .map(pair => [pair[0], pair[1][0]]);
    // ls.setItem(`p:${proj.name}`, JSON.stringify(sims));
  // }
}

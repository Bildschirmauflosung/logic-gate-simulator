import {Project} from "../Project";
import {Gate} from "../render/Gate";
import {ConnectionData} from "../render/ConnectionData";
import {IConnectionMap} from "./IConnectionMap";
import {WidgetType} from "../render/WidgetType";

export class Serializer {
  private constructor() {  }
  static saveProject(proj: Project) {
    const ls = window.localStorage;

    const sims: [string, {
      widgets: WidgetType[],
      gates: Gate[],
      connectionData: ConnectionData[],
      connectionMap: IConnectionMap[],
      name: string
    }][] = [...proj.simulators]
      .map(pair => {
        const cpy = {...pair[1][0], widgets: pair[1][0].widgets.map(widget => widget.getWidgetType())};
        return [pair[0], cpy];
      });

    let projs = new Set(JSON.parse(ls.getItem("projects") || "[]") as string[]);

    projs.add(proj.name);

    ls.setItem("projects", JSON.stringify([...projs]));

    ls.setItem(`p:${proj.name}`, JSON.stringify({
      name: proj.name,
      simulators: sims,
      gates: [...proj.gates],
      registry: [...proj.registry]
    }));
  }
}

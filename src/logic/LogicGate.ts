import { IValueRequestable } from "./IValueRequestable";
import {ResolutionFunction} from "./Types";

export class LogicGate implements IValueRequestable {
  private visited: boolean = false;
  private value: boolean[] = [false];

  constructor(public inputs: IValueRequestable[], public iIndexes: number[], public arity: number, public outputCount: number, public resolutionFunc: ResolutionFunction) { }

  requestValue(): boolean[] {
    if(!this.visited) {
      this.visited = true;

      this.value = this.resolutionFunc(
        this.inputs.map((gate: IValueRequestable, idx: number) => gate.requestValue()[this.iIndexes[idx]]).flat()
      )
    }

    return this.value;
  }
}

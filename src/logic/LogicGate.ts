import { IValueRequestable } from "./IValueRequestable";
import {assert} from "../utils/Assert";
import {ResolutionFunction} from "./Types";

export class LogicGate implements IValueRequestable {
  private defined: boolean = false;
  private visited: boolean = false;
  private value: boolean[] = [false];

  constructor(public inputs: IValueRequestable[], public arity: number, public outputCount: number, public resolutionFunc: ResolutionFunction) { }

  requestValue(): boolean[] {
    if(!this.visited) {
      assert(!this.defined /* !== true*/, "Unreachable: Gate cannot have a defined state before being visited");

      this.visited = true;
      this.value = this.resolutionFunc(
        this.inputs.map((gate: IValueRequestable) => gate.requestValue()).flat()
      )
    } else {
      this.defined = true;
    }
    return this.value;
  }
}

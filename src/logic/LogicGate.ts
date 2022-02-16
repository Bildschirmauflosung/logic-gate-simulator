import { IValueRequestable } from "./IValueRequestable";
import {assert} from "../utils/Assert";

export class LogicGate implements IValueRequestable {
  private defined: boolean = false;
  private visited: boolean = false;
  private value:   boolean = false;

  inputs: IValueRequestable[];
  arity: number;
  resolutionFunc: (arity: number, values: boolean[]) => boolean;

  constructor(inputs: IValueRequestable[], arity: number, resolutionFunc: (arity: number, values: boolean[]) => boolean) {
    this.inputs = inputs;
    this.arity = arity;
    this.resolutionFunc = resolutionFunc;
  }

  requestValue(): boolean {
    if(!this.visited) {
      assert(!this.defined /* !== true*/, "Unreachable: Gate cannot have a defined state before being visited");

      this.visited = true;
      this.value = this.resolutionFunc(
        this.arity, // this is optional, non-me made functions may just ignore this
        this.inputs.map((gate: IValueRequestable) => gate.requestValue())
      )
    } else {
      this.defined = true;
    }
    return this.value;
  }
}

import {IValueRequestable} from "./IValueRequestable";
import {ResolutionFunction} from "./Types";
import {Gate} from "../render/Gate";
import {IGateData} from "./IGateData";
import {assert} from "../utils/Assert";

export class LogicGate implements IValueRequestable {
  private visited: boolean = false;
  private value: boolean[] = [false];
  readonly resolutionFunc: ResolutionFunction;
  readonly arity: number = 2;
  readonly outputCount: number = 1;
  readonly gate: Gate;
  readonly children: LogicGate[];
  readonly iIndexes: number[];

  constructor(gate: Gate, gateData: IGateData) {
    this.gate = gate;
    this.arity = gateData.arity;
    this.outputCount = gateData.outputCount;
    this.resolutionFunc = gateData.resolutionFunc;
    this.value = Array(this.outputCount).fill(false);
    this.children = Array(this.arity).fill(null);
    this.iIndexes = Array(this.arity).fill(-1);
  }

  connect(idx: number, lGate: LogicGate, iIdx: number) {
    assert(idx < this.children.length);
    this.children[idx] = lGate;
    this.iIndexes[idx] = iIdx;
  }

  requestValue(): boolean[] {
    if(!this.visited) {
      this.visited = true;

      this.value = this.resolutionFunc(
        this.gate.inputValues = this.children.map((gate: LogicGate, idx: number) => gate.requestValue()[this.iIndexes[idx]]).flat()
      )
    }
    return this.gate.outputValues = this.value;
  }
}

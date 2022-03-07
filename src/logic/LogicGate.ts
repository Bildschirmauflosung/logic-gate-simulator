import {ResolutionFunction} from "./Types";
import {Gate} from "../render/Gate";
import {IGateData} from "./IGateData";
import {assert, assertNotNull} from "../utils/Assert";

export class LogicGate {
  protected visited: boolean = false;
  protected value: boolean[] = [false];
  readonly resolutionFunc: ResolutionFunction | null;
  readonly arity: number = 2;
  readonly outputCount: number = 1;
  readonly gate: Gate;
  readonly children: (LogicGate | null)[] = [];
  readonly iIndexes: number[];

  constructor(gate: Gate, gateData: IGateData) {
    this.gate = gate;
    this.arity = gate.arity;
    this.outputCount = gate.outputCount;
    this.resolutionFunc = gateData.resolutionFunc;
    this.value = Array(this.outputCount).fill(false);
    this.children = Array(this.arity).fill(null);
    this.iIndexes = Array(this.arity).fill(-1);
  }

  connect(idx: number, lGate: LogicGate, iIdx: number) {
    assert(idx < this.children.length, `${ idx }, ${ this.children.length }`);
    this.children[idx] = lGate;
    this.iIndexes[idx] = iIdx;
  }

  reset() {
    this.children.fill(null);
    this.iIndexes.fill(-1);
  }

  requestValue(): boolean[] {
    if(!this.visited) {
      this.visited = true;

      assertNotNull(this.gate);

      this.value = this.resolutionFunc!(
        this.gate.inputValues = this.children.map((gate: LogicGate | null, idx: number) => gate?.requestValue()[this.iIndexes[idx]]).flat() as boolean[]
      );
    }
    return this.gate.outputValues = this.value;
  }


}

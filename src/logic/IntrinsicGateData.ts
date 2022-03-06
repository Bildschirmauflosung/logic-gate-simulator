import {IGateData} from "./IGateData";
import {GateType} from "../render/GateType";

export const IntrinsicGateData: Map<string, IGateData> = new Map([
  ['and', {
    arity: 2,
    outputCount: 1,
    resolutionFunc: ([lhs, rhs, ..._]: boolean[]) => [lhs && rhs],
    customStructureRef: null,
    prereqs: new Set(),
    gType: GateType.GATE,
  }],
  ['or',  {
    arity: 2,
    outputCount: 1,
    resolutionFunc: ([lhs, rhs, ..._]: boolean[]) => [lhs || rhs],
    customStructureRef: null,
    prereqs: new Set(),
    gType: GateType.GATE,
  }],
  ['not', {
    arity:1,
    outputCount: 1,
    resolutionFunc: ([v, ..._]: boolean[]) => [!v],
    customStructureRef: null,
    prereqs: new Set(),
    gType: GateType.GATE,
  }],
  ['input', {
    arity: 0,
    customStructureRef: null,
    outputCount: 1,
    resolutionFunc: (_: boolean[]) => [],
    prereqs: new Set(),
    gType: GateType.INPUT,
  }],
  ['output', {
    arity: 1,
    customStructureRef: null,
    outputCount: 0,
    resolutionFunc: (a: boolean[]) => a,
    prereqs: new Set(),
    gType: GateType.OUTPUT,
  }]
])

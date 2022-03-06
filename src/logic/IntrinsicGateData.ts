import {IGateData} from "./IGateData";

export const IntrinsicGateData: Map<string, IGateData> = new Map([
  ['and', {
    arity: 2,
    outputCount: 1,
    resolutionFunc: ([lhs, rhs, ..._]: boolean[]) => [lhs && rhs],
    customStructureRef: null,
    prereqs: new Set(),
  }],
  ['or',  {
    arity: 2,
    outputCount: 1,
    resolutionFunc: ([lhs, rhs, ..._]: boolean[]) => [lhs || rhs],
    customStructureRef: null,
    prereqs: new Set(),
  }],
  ['not', {
    arity:1,
    outputCount: 1,
    resolutionFunc: ([v, ..._]: boolean[]) => [!v],
    customStructureRef: null,
    prereqs: new Set(),
  }],
  ['input', {
    arity: 0,
    customStructureRef: null,
    outputCount: 1,
    resolutionFunc: (_: boolean[]) => [],
    prereqs: new Set(),
  }],
  ['output', {
    arity: 1,
    customStructureRef: null,
    outputCount: 0,
    resolutionFunc: (a: boolean[]) => a,
    prereqs: new Set(),
  }]
])

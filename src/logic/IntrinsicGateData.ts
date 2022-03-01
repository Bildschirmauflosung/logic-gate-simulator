import {IGateData} from "./IGateData";

export const IntrinsicGateData: Map<string, IGateData> = new Map([
  ['and', {
    arity: 2,
    intrinsic: true,
    outputCount: 1,
    resolutionFunc: ([lhs, rhs, ..._]: boolean[]) => [lhs && rhs],
    customStructure: null,
  }],
  ['or',  {
    arity: 2,
    intrinsic: true,
    outputCount: 1,
    resolutionFunc: ([lhs, rhs, ..._]: boolean[]) => [lhs || rhs],
    customStructure: null,
  }],
  ['not', {
    arity:1,
    intrinsic: true,
    outputCount: 1,
    resolutionFunc: ([v, ..._]: boolean[]) => [!v],
    customStructure: null,
  }],
])

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
    colour: "#dfae9f",
  }],
  ['not', {
    arity:1,
    outputCount: 1,
    resolutionFunc: ([v, ..._]: boolean[]) => [!v],
    customStructureRef: null,
    prereqs: new Set(),
    gType: GateType.GATE,
    colour: "#b5df9f",
  }],
  ['input', {
    arity: 0,
    customStructureRef: null,
    outputCount: 1,
    resolutionFunc: (_: boolean[]) => [],
    prereqs: new Set(),
    gType: GateType.INPUT,
    colour: "#000000",
  }],
  ['output', {
    arity: 1,
    customStructureRef: null,
    outputCount: 0,
    resolutionFunc: (a: boolean[]) => a,
    prereqs: new Set(),
    gType: GateType.OUTPUT,
    colour: "#000000",
  }]
])

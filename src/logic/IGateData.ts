import {ResolutionFunction} from "./Types";
import {GateType} from "../render/GateType";

export interface IGateData {
  readonly arity: number,
  readonly outputCount: number,
  readonly customStructureRef: string | null,
  readonly gType: GateType,
  readonly resolutionFunc: ResolutionFunction | null,
  readonly prereqs: Set<string>,
}

import {ResolutionFunction} from "./Types";

export interface IGateData {
  readonly arity: number,
  readonly intrinsic: boolean,
  readonly outputCount: number,
  readonly customStructure: unknown | null,
  readonly resolutionFunc: ResolutionFunction
}

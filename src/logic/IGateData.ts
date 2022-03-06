import {ResolutionFunction} from "./Types";

export interface IGateData {
  readonly arity: number,
  readonly outputCount: number,
  readonly customStructureRef: string | null,
  readonly resolutionFunc: ResolutionFunction | null,
  readonly prereqs: Set<string>,
}

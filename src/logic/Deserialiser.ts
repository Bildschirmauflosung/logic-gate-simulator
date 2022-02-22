import {ResolutionFunction} from "./Types";
import {assertEqual} from "../utils/Assert";

export class Deserialiser {
  public static readonly basicResolutionFuncs: Map<string, ResolutionFunction> = new Map([
    [
      "and",
      (values: boolean[]) => {
        assertEqual(2, values.length);
        return [values[0] && values[1]];
      }
    ],
    [
      "or",
      (values: boolean[]) => {
        assertEqual(2, values.length);
        return [values[0] || values[1]];
      }
    ],
    [
      "not",
      (values: boolean[]) => {
        assertEqual(1, values.length);
        return [!values[0]];
      }
    ]
  ]);

  /* static deserializeCircuit(partialGate: {type: string}[], connectionMap: Map<unknown, unknown>): LogicGate {
    return new LogicGate()
  } */
}

import {ResolutionFunction} from "./Types";
import {assertArity} from "../utils/Assert";
import {LogicGate} from "./LogicGate";

export class Deserialier {
  public static readonly basicResolutionFuncs: Map<string, ResolutionFunction> = new Map([
    [
      "and",
      (values: boolean[]) => {
        assertArity(2, values.length);
        return [values[0] && values[1]];
      }
    ],
    [
      "or",
      (values: boolean[]) => {
        assertArity(2, values.length);
        return [values[0] || values[1]];
      }
    ],
    [
      "not",
      (values: boolean[]) => {
        assertArity(1, values.length);
        return [!values[0]];
      }
    ]
  ]);

  /* static deserializeCircuit(partialGate: {type: string}[], connectionMap: Map<unknown, unknown>): LogicGate {
    return new LogicGate()
  } */
}

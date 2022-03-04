import {Gate} from "../render/Gate";
import {GateType} from "../render/GateType";
import {tap} from "../utils/Helpers";
import {GateRegistry} from "./GateRegistry";
import {assertNotNull} from "../utils/Assert";
import {LogicInput} from "./LogicInput";
import {LogicOutput} from "./LogicOutput";
import {LogicGate} from "./LogicGate";

export function LogicGateFrom(gate: Gate): LogicGate {
  switch(gate.type) {
    case GateType.GATE:
      return new LogicGate(gate, tap(
        GateRegistry.get(gate.name)!,
        obj => assertNotNull(obj)
      ));
    case GateType.INPUT:
      return new LogicInput(gate);
    case GateType.OUTPUT:
      return new LogicOutput(gate)
  }
}

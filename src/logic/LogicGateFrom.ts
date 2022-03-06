import {Gate} from "../render/Gate";
import {GateType} from "../render/GateType";
import {assert} from "../utils/Assert";
import {LogicInput} from "./LogicInput";
import {LogicOutput} from "./LogicOutput";
import {LogicGate} from "./LogicGate";
import {IntrinsicGateData} from "./IntrinsicGateData";
import { WorkingAreaData } from "../WorkingAreaData";
import {CustomLogicGate} from "./CustomLogicGate";

// @ts-ignore
export function LogicGateFrom(gate: Gate): LogicGate {
  switch(gate.type) {
    case GateType.GATE: // this will be messier than I wish it would be
      // return new LogicGate(gate, tap(
      //   GateRegistry.get(gate.name)!,
      //   obj => assertNotNull(obj)
      // ));
      if(IntrinsicGateData.has(gate.name)) {
        return new LogicGate(gate, IntrinsicGateData.get(gate.name)!);
      } else {
        assert(WorkingAreaData.currentProject.registry.has(gate.name), `Gate "${gate.name}" does not exist, this should be unreachable`);
       return new CustomLogicGate(gate, WorkingAreaData.currentProject.registry.get(gate.name)!, WorkingAreaData.currentProject.gates.get(gate.name)!);
      }
      break;
    case GateType.INPUT:
      return new LogicInput(gate);
    case GateType.OUTPUT:
      return new LogicOutput(gate)
  }
}

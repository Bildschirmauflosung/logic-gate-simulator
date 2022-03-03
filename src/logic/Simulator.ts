import {RenderSimulator} from "../render/RenderSimulator";
import {Gate} from "../render/Gate";
import {IConnectionMap} from "./IConnectionMap";
import {LogicGate} from "./LogicGate";
import {GateType} from "../render/GateType";
import { logicGateFrom } from "./LogicGateFrom";

export class Simulator {
  private gates: LogicGate[] = [];
  private outputs: LogicGate[] = [];

  rebuild() {
    this.gates = this.fGates.map(logicGateFrom);
    this.conMap.forEach((con) => {
      this.gates[con.inputGateIndex].connect(
        con.inputIndex,
        this.gates[con.outputGateIndex],
        con.outputIndex
      );
    });

    this.outputs = this.gates.filter((gate) => gate.gate.type === GateType.OUTPUT);
  }

  private constructor(
    private readonly fGates: Gate[],
    readonly conMap: IConnectionMap[]
  ) {
      this.rebuild();
  }

  static from(sim: RenderSimulator): Simulator {
    return new Simulator(
      sim.gates,
      sim.connectionMap
    );
  }

  tick(): void {
    this.outputs.forEach((out) => {
      out.requestValue();
    });
  }
}

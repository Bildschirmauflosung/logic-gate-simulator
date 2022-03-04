import {RenderSimulator} from "../render/RenderSimulator";
import {Gate} from "../render/Gate";
import {IConnectionMap} from "./IConnectionMap";
import {LogicGate} from "./LogicGate";
import {GateType} from "../render/GateType";
import {LogicGateFrom} from "./LogicGateFrom";

export class Simulator {
  public gates: LogicGate[] = [];
  private outputs: LogicGate[] = [];

  rebuild() {
    this.gates = this.fGates.map(LogicGateFrom);
    this.gates.forEach((v) => {
      v.reset();
    });
    this.conMap.forEach((con) => {
      if(this.gates[con.inputGateIndex] !== undefined)
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
    public conMap: IConnectionMap[]
  ) {
      this.rebuild();
  }

  static from(sim: RenderSimulator): Simulator {
    return new Simulator(
      sim.gates,
      sim.connectionMap
    );
  }

  updateConMap(connectionMap: IConnectionMap[]): void {
    this.conMap = connectionMap;
  }

  tick(): void {
    this.outputs.forEach((out) => {
      out.requestValue();
    });
  }
}

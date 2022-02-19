import {IConnectionMap} from "./IConnectionMap";
import {IOButton} from "../render/IOButton";
import {Gate} from "../render/Gate";
import {LogicInput} from "./LogicInput";
import {LogicOutput} from "./LogicOutput";
import {IOType} from "../render/IOType";
import {LogicGate} from "./LogicGate";

export class Simulator {
  // @ts-ignore
  private inputs!:  LogicInput[];
  // @ts-ignore
  private outputs!: LogicOutput[];
  // @ts-ignore
  private gates!:   LogicGate[];

  rebuild() {
    this.inputs = this.ioPorts.filter(value => value.type === IOType.INPUT).map(value => new LogicInput(value));
    // @ts-ignore
    const outputConnections: IConnectionMap[] = this.connections.filter(value  => value.outputGateIndex < 0);
    this.outputs = this.ioPorts
      .map((value, index) => [value, index])
      .filter(value => (value[0] as IOButton).type === IOType.OUTPUT)
      .map(value => new LogicOutput(new LogicGate([], 1, 1, (a => a)) ,value[0] as IOButton)); // TODOOOO: change this line, to work
  }

  // @ts-ignore
  constructor(private fGates: Gate[], private ioPorts: IOButton[], private connections: IConnectionMap[]): void {
    this.rebuild();
  }

  tick(): void {
    this.outputs.forEach(output => {
      output.frontendButton.enabled = output.requestValue()[0];
    })
  }
}

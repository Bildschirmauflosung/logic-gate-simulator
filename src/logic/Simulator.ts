import {IConnectionMap} from "./IConnectionMap";
import {Gate} from "../render/Gate";
import {LogicInput} from "./LogicInput";
import {LogicOutput} from "./LogicOutput";
import {LogicGate} from "./LogicGate";

export class Simulator {
  // @ts-ignore
  private inputs!:  LogicInput[];
  // @ts-ignore
  private outputs!: LogicOutput[];
  // @ts-ignore
  private gates!:   LogicGate[];

  rebuild() {
/*    this.inputs = this.ioPorts.filter(value => value.type === IOType.INPUT).map(value => new LogicInput(value));
    // @ts-ignore
    const outputConnections: IConnectionMap[] = this.connections.filter(value  => value.inputGateIndex < 0);
    this.outputs = this.ioPorts
      .map((value, index) => [value, index] as [IOButton, number])
      .filter(value => value[0].type === IOType.OUTPUT)
      .map(value =>  {
        const btn = value[0];
        const idx = value[1];

        // outputConnections ->

        btn.enabled = btn.enabled && (btn.enabled || true);
        previoousIdx.requestValue();

        // new LogicOutput( , btn as IOButton)
        return new LogicOutput({requestValue(): boolean[] {return []}}, [], btn)
      }); // TODOOOO: change this line, to work */
  }

  // @ts-ignore
  constructor(private fall: Gate[], private connections: IConnectionMap[]): void {
    this.rebuild();
  }

  tick(): void {
  }
}

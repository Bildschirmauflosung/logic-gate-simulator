import {IConnectionMap} from "./IConnectionMap";
import {IOButton} from "../render/IOButton";
import {Gate} from "../render/Gate";
import {LogicInput} from "./LogicInput";
import {LogicOutput} from "./LogicOutput";
import {IOType} from "../render/IOType";
import {LogicGate} from "./LogicGate";
import {IValueRequestable} from "./IValueRequestable";
import {tap} from "../utils/Helpers";
import {assertEqual} from "../utils/Assert";

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
    const outputConnections: IConnectionMap[] = this.connections.filter(value  => value.inputGateIndex < 0);
    this.outputs = this.ioPorts
      .map((value, index) => [value, index])
      .filter(value => (value[0] as IOButton).type === IOType.OUTPUT)
      .map(value =>  {
        const btn = value[0] as IOButton;
        const idx = value[1] as number;

        const previoousIdx: IValueRequestable = tap(
          outputConnections.filter(val => idx === val.inputGateIndex),
          obj => assertEqual(1, obj.length)
        )[0];



        // new LogicOutput( , btn as IOButton)
      }); // TODOOOO: change this line, to work
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

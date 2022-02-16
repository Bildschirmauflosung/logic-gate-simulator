import { Gate } from "../render/Gate";
import { IOButton } from "../render/IOButton";

export class Simulator {
  gates: Gate[] = [];
  ioButtons: IOButton[] = [];

  constructor(gates: Gate[], ioButtons: IOButton[]) {
    this.gates = gates;
    this.ioButtons = ioButtons;
  }
}
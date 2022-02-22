export class StaticMap {
  static inputIndex: number;
  static outputIndex: number;
  static inputGateIndex: number;
  static outputGateIndex: number;

  static swapIndices() {
    const temp = this.inputGateIndex;
    this.inputGateIndex = this.outputGateIndex;
    this.outputGateIndex = temp;
    const temp1 = this.inputIndex;
    this.inputIndex = this.outputIndex;
    this.outputIndex = temp1;
  }
}
import {IValueRequestable} from "./IValueRequestable";
import {IOButton} from "../render/IOButton";

export class LogicInput implements IValueRequestable {
  constructor(private ioButton: IOButton) { }

  requestValue(): boolean[] {
    return [this.ioButton.enabled];
  }
}

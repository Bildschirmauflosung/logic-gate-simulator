export enum FieldType {
  INPUT = 0,
  COLOUR,
}

export class DialogField {
  public value: string = "";

  constructor(public label: string, public type: FieldType) { }
}
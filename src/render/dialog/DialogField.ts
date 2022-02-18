export enum FieldType {
  INPUT = 0,
  COLOUR,
}

export class DialogField {
  constructor(public label: string, public type: FieldType) { }
}
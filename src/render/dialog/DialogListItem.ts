export class DialogListItem {
  constructor(private name: string, private value: string, readonly onClick: (e: MouseEvent) => void) {}

  getName(): string {
    return this.name;
  }

  getValue(): string {
    return this.value;
  }
}
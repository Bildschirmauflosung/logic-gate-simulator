export class DialogListItem {
  constructor(private name: string, private description: string, private value: string, readonly onClick: (e: MouseEvent) => void) {}

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getValue(): string {
    return this.value;
  }
}
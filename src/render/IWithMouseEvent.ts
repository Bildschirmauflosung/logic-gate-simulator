export interface IWithMouseEvent {
  handleMouseMove(e: MouseEvent): void;
  handleMouseDown(e: MouseEvent): void;
  handleMouseUp(e: MouseEvent): void;
  handleMouseContextMenu(e: MouseEvent): void;
}
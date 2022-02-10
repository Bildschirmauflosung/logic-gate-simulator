export function isMouseOver(e: MouseEvent, width: number, height: number, left: number, top: number): boolean {
  return e.offsetX > left && e.offsetX < left + width && e.offsetY > top && e.offsetY < top + height;
}
export function isMouseOver(e: MouseEvent, width: number, height: number, left: number, top: number): boolean {
  return e.offsetX > left && e.offsetX < left + width && e.offsetY > top && e.offsetY < top + height;
}

export function clamp(a: number, b: number, c: number): number {
  return Math.min(Math.max(a, b), c);
}

export function tap<T>(obj: T, fn: (obj: T) => unknown): T {
  fn(obj);
  return obj;
}

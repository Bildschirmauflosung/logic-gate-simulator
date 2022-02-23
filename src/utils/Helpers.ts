import { connectedPoints } from "../main";
import { ConnectionPoint } from "../render/ConnectionPoint";

export function isMouseOver(e: MouseEvent, width: number, height: number, left: number, top: number): boolean {
  return e.offsetX > left && e.offsetX < left + width && e.offsetY > top && e.offsetY < top + height;
}

export function clamp(a: number, b: number, c: number): number {
  return Math.min(Math.max(a, b), c);
}

export function updateConnectionData(points: ConnectionPoint[]) {
  const removing: number[] = [];
  connectedPoints.forEach((v, i) => {
    for (const p of points) {
      if (v.pointFrom === p || v.pointTo === p) {
        removing.push(i);
      }
    }
  });

  removing.sort((a, b) => a - b).reverse();

  for (const i of removing) {
    connectedPoints.splice(i, 1);
  }
}

export function tap<T>(obj: T, fn: (obj: T) => unknown): T {
  fn(obj);
  return obj;
}

export interface IRenderable {
  width: number;
  height: number;
  top: number;
  left: number;

  render(ctx: CanvasRenderingContext2D): void;
}
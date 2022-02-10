export interface IRenderable {
  width: number;
  height: number;

  render(ctx: CanvasRenderingContext2D): void;
}
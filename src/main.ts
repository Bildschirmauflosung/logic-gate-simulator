const nav: HTMLElement = document.querySelector(".navbar")!;
const cv : HTMLCanvasElement = document.querySelector("#canvas")!;
const ctx : CanvasRenderingContext2D = cv.getContext("2d")!;

cv.width = document.body.clientWidth;
cv.height = window.innerHeight - nav.offsetHeight;
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, cv.width, cv.height);

window.addEventListener("resize", () => {
  cv.width = window.innerWidth;
  cv.height = window.innerHeight - nav.offsetHeight;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cv.width, cv.height);
});
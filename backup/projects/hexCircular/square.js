export default class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  render(ctx) {
    ctx.strokeRect(this.x, this.y, this.x + this.w, this.y + this.h);
    ctx.stroke();
  }
}
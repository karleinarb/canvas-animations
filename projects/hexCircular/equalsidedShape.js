export default class Hexagon {
  constructor(x, y, w, sides, options = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.options = options;
    this.sides = sides;
  }

  render(ctx) {
    // Make some calculation
    const sideAngle = 360 / this.sides;
    const sideRads = sideAngle * Math.PI / 180;
    // Special case for squares
    let startAngle = 0;
    if(this.sides !== 4) startAngle = Math.PI;
    else startAngle = Math.PI + (Math.PI / 4);

    // Draw a center circle
    // ctx.beginPath();
    // this.options.strokeStyle ? ctx.strokeStyle = this.options.strokeStyle : ctx.strokeStyle = 'red'
    
    // ctx.arc(this.x, this.y, 20, (Math.PI * 2), 100);
    // ctx.stroke();
    // ctx.closePath();
    // ctx.strokeStyle = 'black'

    // Draw first point
    ctx.beginPath();
    // Calculate and move to the starting position
    let drawAngleRads = startAngle;
    let newX = this.x + Math.sin(drawAngleRads) * this.w;
    let newY = this.y + Math.cos(drawAngleRads) * this.w;
    ctx.moveTo(newX, newY);

    // Draw each of the sides
    for(let i = 0; i < this.sides; i++) {
      // Calculate the next position
      drawAngleRads += sideRads;
      newX = this.x + Math.sin(drawAngleRads) * this.w;
      newY = this.y + Math.cos(drawAngleRads) * this.w;
      ctx.lineTo(newX, newY);
    }

    ctx.stroke();
    ctx.closePath();
  }
}
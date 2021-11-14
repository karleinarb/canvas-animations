import Point from "../types/point.js";
import Vector2 from "../types/vector2.js";

export default class Walker {
  constructor(x, y, speed = 10, options = {}) {
    this.speed = speed;
    this.options = options;
    
    this.x = x;
    this.y = y;
    this.nextSteeringChangeTime = null;
    this.turnLeft = true;

    this.nextSpeedChangeTime = null;
    this.speed = 5;

    // Create segments
    this.segments = [];
    this.segments[0] = {
      position: new Vector2(100,100),
      velocity: new Vector2(1, 1)
    }
    for(let i = 1; i < 50; i++) {
      this.segments[i] = {
        position: this.segments[i - 1].position,
      }
    }
    console.log(this.segments);
  }

  update(scene, canvas, context, time) {
    if(!this.nextSteeringChangeTime || (time.totalTime >= this.nextSteeringChangeTime)) {
      this.nextSteeringChangeTime = time.totalTime + (Math.random() * 500 + 250);
      this.turnLeft = Math.random() > 0.5 ? true : false;
      this.turnLeft ? console.log('Turning left') : console.log('Turning right');
    }

    let head = this.segments[0];

    // Determine to steer right or left
    let angle = head.velocity.getAngle();
    let angleChange = (Math.random() * (0.10 - 0.00005) + 0.00005);
    if(this.turnLeft) {
      head.velocity.setAngle(angle - angleChange);
    } else {
      head.velocity.setAngle(angle + angleChange);
    }

    if(!this.nextSpeedChangeTime || (time.totalTime >= this.nextSpeedChangeTime)) {
      this.nextSpeedChangeTime = time.totalTime + (Math.random() * 500 + 250);
      this.speed = (Math.random() * (17 - 2) + 2);
    }

    
    head.velocity.mag(this.speed);
    
    // head.velocity.minimum(3)
    // head.velocity.limit(12)
    const newPosition = Vector2.add(head.position, head.velocity);

    if(newPosition.x < 0 || newPosition.x > canvas.width) {head.velocity.reverseX(); }
    if(newPosition.y < 0 || newPosition.y > canvas.height) {head.velocity.reverseY(); }

    // Update the new position
    let lastPosition = head.position.copy();
    head.position.add(head.velocity);

    for(let i = 1; i < this.segments.length; i++) {
      let tmpPos = this.segments[i].position.copy();
      this.segments[i].position = lastPosition;
      lastPosition = tmpPos;
    }
  }

  render(ctx) {
    this.segments.forEach((s) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "orange"
      ctx.shadowBlur = 20;
      ctx.shadowColor = "orange";
      ctx.arc(s.position.x, s.position.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    })
    // console.log(this.segments);
  }
}
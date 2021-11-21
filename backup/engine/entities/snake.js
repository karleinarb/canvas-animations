import Vector2 from "../types/vector2.js";
import Partice from '../entities/particle.js';
import ParticleEmitter from "../particles/particleemitter.js";

export default class Walker {
  constructor(x, y, speed = 10, options = {}) {
    // Options, not implemented
    this.options = options;

    // Positioning
    this.x = x;
    this.y = y;
    
    // Speed
    this.speed = speed || 5;
    this.minSpeed = 3;
    this.maxSpeed = 12;
    this.minMsBetweenSpeedChange = 250;
    this.maxMsBetweenSpeedChange = 500;
    this.nextSpeedChangeTime = null;

    // Steering
    this.turnLeft = true;
    this.minMsUntilNextSteering = 250;
    this.maxMsUntilNewSteering  = 500;
    this.nextSteeringChangeTime = null;
    
    // Steering angle
    this.minAngleChange = 0.00005;
    this.maxAngleChange = 0.10;
    this.beforeCollisionAngleMultiplier = 5;

    // Particles
    this.maxParticles = 100;
    this.maxParticlesAddPrFrame = 1;
    this.particles = [];

    // Debug
    this.renderHeadingVector = false;

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
  }

  update(scene, canvas, context, time) {
    // Determine what direction to steer
    if(!this.nextSteeringChangeTime || (time.totalTime >= this.nextSteeringChangeTime)) {
      this.nextSteeringChangeTime = time.totalTime + (Math.random() * this.maxMsUntilNewSteering + this.minMsUntilNextSteering);
      this.turnLeft = Math.random() > 0.5 ? true : false;
    }

    // Get the first segment
    let head = this.segments[0];

    // Calculate a vector to a point in front of where the snake is heading
    let heading = head.velocity.copy().mag(250);
    head.heading = Vector2.add(head.position, heading);

    // Determine what angle changes to apply
    let angle = head.velocity.getAngle();
    let angleChange = (Math.random() * (this.maxAngleChange - this.minAngleChange) + this.minAngleChange);

    // If heading for one of the screen edges, make the angle steeper
    if(head.heading.x < 0 || head.heading.x > canvas.width || head.heading.y < 0 || head.heading.y > canvas.height) {
      angleChange *= this.beforeCollisionAngleMultiplier;
    }

    // Adjust the velocity angle
    if(this.turnLeft) head.velocity.setAngle(angle + angleChange);
    else head.velocity.setAngle(angle - angleChange);

    // Change the speed if applicable
    if(!this.nextSpeedChangeTime || (time.totalTime >= this.nextSpeedChangeTime)) {
      this.nextSpeedChangeTime = time.totalTime + (Math.random() * (this.maxMsBetweenSpeedChange - this.minMsBetweenSpeedChange) + this.minMsBetweenSpeedChange);
      this.speed = (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);
    }
    head.velocity.mag(this.speed);
    
    // Get what the new position will be and flip direction if it is off the screen
    const newPosition = Vector2.add(head.position, head.velocity);
    if(newPosition.x < 0 || newPosition.x > canvas.width) {head.velocity.reverseX(); }
    if(newPosition.y < 0 || newPosition.y > canvas.height) {head.velocity.reverseY(); }

    // Update the new position
    let lastPosition = head.position.copy();
    head.position.add(head.velocity);

    // Update all segments after the head
    for(let i = 1; i < this.segments.length; i++) {
      let tmpPos = this.segments[i].position.copy();
      this.segments[i].position = lastPosition;
      lastPosition = tmpPos;
    }

    // Add new particles if applicable
    // if(this.particles.length < this.maxParticles) {
    //   for(let i = 0; i < this.maxParticlesAddPrFrame; i++) {
    //     this.particles.push(new Partice(
    //       new Vector2(head.position.x, head.position.y),
    //       Vector2.random(-5, 5),
    //       undefined,
    //       undefined,
    //       undefined,
    //       0.5
    //     ))
    //   }
    // }

    // Update any particles
    let particleIdsToRemove = [];
    this.particles.forEach((p) => {
      p.update();
      if(p.size === 0) particleIdsToRemove.push(p.id);
    })
    this.particles = this.particles.filter((p) => !particleIdsToRemove.includes(p.id));
  }

  render(ctx) {
    // Render the heading vector if applicable
    if(this.renderHeadingVector) {
      let head = this.segments[0];
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#FF00FF'
      ctx.moveTo(head.position.x, head.position.y);
      ctx.lineTo(head.heading.x, head.heading.y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    // Render the segments
    this.segments.forEach((s, i) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "orange"
      ctx.shadowBlur = 20;
      ctx.shadowColor = "orange";
      ctx.arc(s.position.x, s.position.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    })

    // Render any particles
    this.particles.forEach((p) => p.render(ctx) )
  }
}
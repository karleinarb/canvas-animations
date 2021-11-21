import Vector2 from '../types/vector2';


export interface particleStyle {
  strokeStyle?: string,
  fillStyle?: string,
  shadowColor?: string,
  shadowBlur?: number,
  shadowOffsetX?: number,
  shadowOffsetY?: number
}

export interface ParticleOptions {
  position?: Vector2
  velocity: Vector2
  acceleration?: Vector2
  gravity?: Vector2
  size: number
  shrinkRate: number
  style: particleStyle
}


export default class Particle {
  /*
    Type declarations
  */
  id: number;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
  gravity: Vector2;
  size: number;
  shrinkRate: number;
  style: particleStyle;
  emittedTime: Date;

  /*
    Constructor
  */
  constructor(
    position = new Vector2(200, 200),
    velocity = new Vector2(0,0),
    acceleration = new Vector2(0,0),
    gravity = new Vector2(0,0),
    size = 25,
    shrinkSpeed = 0.1,
    style: particleStyle = {}
  ) {
    // Id
    this.id = Math.random() * 100000000;
    // Vectors
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.gravity = gravity;
    // Other variables
    this.size = size;
    this.shrinkRate = shrinkSpeed;
    this.style = style || {};
    this.emittedTime = new Date();
  }

  update() {
    /*
      Calculate forces
    */
    // Object to store what forces should be applied to the velocity
    let forces = new Vector2();
    // Add acceleration
    forces.add(this.acceleration);
    // Add gravity
    forces.add(this.gravity);
    // Add the force to the current velocity
    this.velocity.add(forces);
    // Apply the velocity to the
    this.position.add(this.velocity);
    /*
      Other
    */
    // Shrink if applicable
    if(this.shrinkRate && this.size !== 0){
      this.size -= this.shrinkRate;
      if(this.size < 0) this.size = 0;
    }
  }

  render(ctx:CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    // Move to the posisitoon
    ctx.moveTo(this.position.x, this.position.y);
    // Set styling options
    ctx.strokeStyle = this.style.strokeStyle || 'red';
    ctx.fillStyle = this.style.fillStyle || 'red';
    ctx.shadowBlur = this.style.shadowBlur || 0;
    ctx.shadowColor = this.style.shadowColor || '#000000';
    ctx.shadowOffsetX = this.style.shadowOffsetX || 0;
    ctx.shadowOffsetY = this.style.shadowOffsetY || 0;
    // Draw the particle
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    // ctx.stroke();
    ctx.fill();
    // Restore the context to default
    ctx.closePath();
    ctx.restore();
  }
}
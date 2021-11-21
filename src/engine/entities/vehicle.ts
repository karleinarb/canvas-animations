import Entity from "./_entity.js";
import Vector2 from "../types/vector2.js";
import { CustomConstructor, CustomUpdate, CustomRender } from './_entity';
import Scene from "../types/scene.js";
import Time from "../types/time.js";

export default class Veichle extends Entity {
  /*
    Type declaration
  */
  // Position
  lastPosition: Vector2;

  // Heading
  heading: Vector2

  // Speed
  speed: number
  minSpeed: number
  maxSpeed: number
  minMsBetweenSpeedChange: number
  maxMsBetweenSpeedChange: number
  nextSpeedChangeTime: number | null

  // Steering
  turnLeft: boolean
  minMsUntilNextSteering: number
  maxMsUntilNewSteering: number
  nextSteeringChangeTime: number | null

  // Steering angle
  minAngleChange: number
  maxAngleChange: number
  beforeCollisionAngleMultiplier: number

  // Debug
  renderHeadingVector: boolean

  /*
    Constructor
  */
  constructor(
    position: Vector2,
    velocity: Vector2,
    speed: number,
    customConstructor?: CustomConstructor,
    customUpdate?: CustomUpdate,
    customRender?: CustomRender
  ){
    super(position, velocity, customConstructor, customUpdate, customRender);

    this.velocity = Vector2.random(-1, 1);
    this.lastPosition = this.velocity;
    
    // Speed
    this.speed = speed || 5;
    this.minSpeed = 3;
    this.maxSpeed = 12;
    this.minMsBetweenSpeedChange = 250;
    this.maxMsBetweenSpeedChange = 500;
    this.nextSpeedChangeTime = null;

    // Heading
    this.heading = new Vector2(0,0);

    // Steering
    this.turnLeft = true;
    this.minMsUntilNextSteering = 250;
    this.maxMsUntilNewSteering  = 500;
    this.nextSteeringChangeTime = null;
    
    // Steering angle
    this.minAngleChange = 0.00005;
    this.maxAngleChange = 0.10;
    this.beforeCollisionAngleMultiplier = 5;

    // Debug
    this.renderHeadingVector = false;
  }

  update(
    scene: Scene,
    context: CanvasRenderingContext2D
  ) {
    const time = scene.time;
    // Determine what direction to steer
    if(!this.nextSteeringChangeTime || (time.totalTime >= this.nextSteeringChangeTime)) {
      this.nextSteeringChangeTime = time.totalTime + (Math.random() * this.maxMsUntilNewSteering + this.minMsUntilNextSteering);
      this.turnLeft = Math.random() > 0.5 ? true : false;
    }

    // Calculate a vector to a point in front of where the snake is heading
    this.heading = this.velocity.copy().mag(250);
    this.heading = Vector2.add(this.position, this.heading);

    // Determine what angle changes to apply
    let angle = this.velocity.getAngle();
    let angleChange = (Math.random() * (this.maxAngleChange - this.minAngleChange) + this.minAngleChange);

    // If heading for one of the screen edges, make the angle steeper
    if(this.heading.x < 0 || this.heading.x > context.canvas.width || this.heading.y < 0 || this.heading.y > context.canvas.height) {
      angleChange *= this.beforeCollisionAngleMultiplier;
    }

    // Adjust the velocity angle
    if(this.turnLeft) this.velocity.setAngle(angle + angleChange);
    else this.velocity.setAngle(angle - angleChange);

    // Change the speed if applicable
    if(!this.nextSpeedChangeTime || (time.totalTime >= this.nextSpeedChangeTime)) {
      this.nextSpeedChangeTime = time.totalTime + (Math.random() * (this.maxMsBetweenSpeedChange - this.minMsBetweenSpeedChange) + this.minMsBetweenSpeedChange);
      this.speed = (Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed);
    }
    this.velocity.mag(this.speed);
    
    // Get what the new position will be and flip direction if it is off the screen
    const newPosition = Vector2.add(this.position, this.velocity);
    if(newPosition.x < 0 || newPosition.x > context.canvas.width) {this.velocity.reverseX(); }
    if(newPosition.y < 0 || newPosition.y > context.canvas.height) {this.velocity.reverseY(); }

    // Update the new position
    this.lastPosition = this.position.copy();
    this.position.add(this.velocity);
    super.update(scene, context);
  }

  render(
    scene: Scene,
    ctx: CanvasRenderingContext2D
  ) {
    // Render the heading vector if applicable
    if(this.renderHeadingVector) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#FF00FF'
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.heading.x, this.heading.y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }

    // Render the vehicle
    // ctx.save();
    // ctx.beginPath();
    // ctx.fillStyle = "orange"
    // ctx.shadowBlur = 25;
    // ctx.shadowColor = "orange";
    // ctx.arc(this.position.x, this.position.y, 20, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
    // ctx.restore();

    // Render any particles
    // this.particles.forEach((p) => p.render(ctx) )
    super.render(scene, ctx);
  }
}
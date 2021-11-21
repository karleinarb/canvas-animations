import Vector2 from "../types/vector2";
import Scene from '../types/scene';
import Time from "../types/time";

export default class Entity {
  /*
    Type declaration
  */
  // Positioning
  position: Vector2;
  // Velocity
  velocity: Vector2;
  // Heading
  heading: Vector2 | undefined;
  // Mass
  mass: number;

  /*
    Constructor
  */
  constructor(
    position: Vector2,
    velocity: Vector2
  ) {
    this.position = position;
    this.velocity = velocity;
    this.heading = undefined;
    this.mass = 10;
  }

  update(
    scene: Scene,
    time: Time,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {

  }

  render(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {

  }
}
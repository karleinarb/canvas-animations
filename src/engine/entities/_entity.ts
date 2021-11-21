import Vector2 from "../types/vector2.js";
import Scene from '../types/scene.js';

export type CustomConstructor = (entity: Entity) => void;
export type CustomUpdate = (entity: Entity, scene: Scene, context: CanvasRenderingContext2D) => void;
export type CustomRender = (entity: Entity, scene: Scene, context: CanvasRenderingContext2D) => void;
  
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
  // Custom constructor
  CustomConstructor: CustomConstructor | undefined
  // Custom update
  CustomUpdate: CustomUpdate | undefined
  // Custom render
  CustomRender: CustomRender | undefined

  /*
    Constructor
  */
  constructor(
    position: Vector2,
    velocity: Vector2,
    CustomConstructor?: CustomConstructor | undefined,
    CustomUpdate?: CustomUpdate | undefined,
    CustomRender?: CustomRender | undefined
  ) {
    this.position = position;
    this.velocity = velocity;
    this.heading = undefined;
    this.mass = 10;
    this.CustomConstructor = CustomConstructor;
    this.CustomUpdate = CustomUpdate;
    this.CustomRender = CustomRender;
    if(this.CustomConstructor) this.CustomConstructor(this);
  }

  update(
    scene: Scene,
    context: CanvasRenderingContext2D
  ) {
    if(this.CustomUpdate) this.CustomUpdate(this, scene, context);
  }

  render(
    scene: Scene,
    context: CanvasRenderingContext2D
  ) {
    if(this.CustomRender) this.CustomRender(this, scene, context);
  }
}
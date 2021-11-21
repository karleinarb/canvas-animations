/*
  Interfaces
*/
import Entity from '../entities/_entity.js';
import Time from './time.js'

class Scene {
  /*
    Type definitions
  */
  time: Time
  context: CanvasRenderingContext2D;
  entities: Entity[]

  /*
    Constructor
  */
  constructor(
    time: Time,
    context: CanvasRenderingContext2D,
  ) {
    this.entities = [];
    this.context = context;
    this.time = time;
  }

  update(
    scene: Scene,
    context: CanvasRenderingContext2D
    ) {
    this.entities.forEach((entry: Entity) => {
      try { entry.update(this, this.context); } catch (err) { console.error(err); }
    })
  }

  render(
    scene: Scene,
    context: CanvasRenderingContext2D
  ) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.entities.forEach((entry: Entity) => {
      try { entry.render(this, context); } catch (err) { console.error(err); }
    })
  }
}

export default Scene;
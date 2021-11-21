/*
  Interfaces
*/
import Time from './time'

class Scene {
  /*
    Type definitions
  */
  time: Time
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D;
  entities: any

  /*
    Constructor
  */
  constructor(
    time: Time,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ) {
    this.entities = [];
    this.canvas = canvas;
    this.context = context;
    this.time = time;
  }

  update(
    scene: Scene,
    time: Time,
    context: CanvasRenderingContext2D
    ) {
    this.entities.forEach((entry: any) => {
      try { entry.update(this, this.time, this.canvas, this.context); } catch (err) { console.error(err); }
    })
  }

  render(
    context: CanvasRenderingContext2D
  ) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.entities.forEach((entry: any) => {
      try { entry.render(context, this.time); } catch (err) { console.error(err); }
    })
  }
}

export default Scene;
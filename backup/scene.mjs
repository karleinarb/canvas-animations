class Scene {
  constructor(canvas, context, time) {
    this.entities = [];
    this.canvas = canvas;
    this.context = context;
    this.time = time;
  }

  update(canvas, context) {
    this.entities.forEach((entry) => {
      try { entry.update(this, this.canvas, this.context, this.time); } catch (err) { console.error(err); }
    })
  }

  render(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    this.entities.forEach((entry) => {
      try { entry.render(context, this.time); } catch (err) { console.error(err); }
    })
  }
}

export default Scene;
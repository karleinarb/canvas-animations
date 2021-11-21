import Scene from '../../engine/types/scene.js'
import Veichle from '../../engine/entities/vehicle.js';
import Time from '../../engine/types/time.js';
import Vector2 from '../../engine/types/vector2.js';
import Particle from '../../engine/particles/particle.js';

export default class Hex extends Scene {
  constructor(
      time: Time,
      context: CanvasRenderingContext2D
    ) {
    super(time, context);

    const shapeSides = 6;
    const sideAngle = 360 / shapeSides;
    const sideRads = sideAngle * Math.PI / 180
    const shapeWidth = 75;
    const spacing = 7;

    // Calculate the big and small side of the hexagon
    let adjecant = Math.abs((shapeWidth / 2) * Math.tan(Math.PI - sideRads));
    let opposite = shapeWidth;
    let hypotenuse = Math.sqrt(Math.pow(adjecant, adjecant) + Math.pow(opposite, opposite));

    // Calculate the necessary rows and columns to fill the screen
    const rows = Math.ceil(context.canvas.height / opposite) + 1;
    const columns = Math.ceil(context.canvas.width / adjecant) + 1;
    
    //For each layer of the pattern
    for(let r = 0; r < rows; r++) {
      // Define start positions
      let positionX = r % 2 == 0 ? -(adjecant * 2) : -adjecant + spacing / 2;
      let positionY = r !== 0 ? r * (shapeWidth * 1.5) + (r * spacing) : r * (shapeWidth * 1.5)

      for(let c = 0; c < columns; c++) {
        positionX += c === 0 ? adjecant * 2 : adjecant * 2 + spacing;
        // this.entities.push(new EqualShape(positionX, positionY, shapeWidth, shapeSides));
      }
    }
    // Create a new vehicle
    let vehicle = new Veichle(
      new Vector2(255, 255),
      new Vector2(0, 0),
      10,
      (obj: any) => {
        obj.segments = [];
        for(let i = 0; i < 50; i++) {
          obj.segments.push(new Particle(new Vector2(obj.position.x, obj.position.y), new Vector2(0, 0), undefined, undefined, 10));
        }
      }, (obj: any, scene: Scene, ctx: CanvasRenderingContext2D) => {
        let lastPosition: any = undefined;
        obj.segments.forEach((s: Particle, i: number) => {
          let tmpPosition = s.position.copy();
          if(i === 0) s.position = obj.lastPosition.copy();
          else {
            s.position = lastPosition;
          }
          lastPosition = tmpPosition;
        })
      },
      (obj: any, scene: Scene, ctx: CanvasRenderingContext2D) => {
        obj.segments.forEach((s: Particle) => {
          context.save();
          context.beginPath();
          ctx.fillStyle = "orange"
          ctx.shadowBlur = 25;
          ctx.shadowColor = "orange";
          context.arc(s.position.x, s.position.y, s.size, 0, Math.PI * 2);
          context.fill();
          context.closePath();
          context.restore();
        })
      }
    )

    // Add the vehicle
    this.entities.unshift(vehicle);

  }
}
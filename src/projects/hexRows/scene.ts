import Scene from '../../engine/types/scene'
import Veichle from '../../engine/entities/vehicle';
import Time from '../../engine/types/time';
import Vector2 from '../../engine/types/vector2';

export default class Hex extends Scene {
  constructor(
      time: Time,
      canvas: HTMLCanvasElement,
      context: CanvasRenderingContext2D
    ) {
    super(time, canvas, context);

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
    const rows = Math.ceil(canvas.height / opposite) + 1;
    const columns = Math.ceil(canvas.width / adjecant) + 1;
    
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

    // Add the walker
    this.entities.unshift(new Veichle(new Vector2(250, 250), new Vector2(0, 0), 100, () => {}));

  }
}
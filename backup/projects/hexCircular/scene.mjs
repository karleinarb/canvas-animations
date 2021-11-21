import Scene from "../../scene.mjs";
import EqualShape from './equalsidedShape.js';

class Hex extends Scene {
  constructor(canvas, context) {
    super();

    this.canvas = canvas;
    this.context = context;

    const shapeSides = 6;
    const sideAngle = 360 / shapeSides;
    const sideRads = sideAngle * Math.PI / 180
    const shapeWidth = 75;
    const spacing = 10;
    const layers = 4;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Add the walker
    his.entities.push(new EqualShape(centerX, centerY, shapeWidth, shapeSides));
    
    // Add the first object
    this.entities.push(new EqualShape(centerX, centerY, shapeWidth, shapeSides));

    // For each layer of the pattern
    for(let i = 1; i < layers + 1; i++) {
      let currentRads = 0;
      for(let j = 1; j < (shapeSides + 1) * i; j++) {
        let options = {};
        j == 1 ? currentRads = currentRads : currentRads += sideRads / i;
        let distance = 0;
        if(i == 1) distance = ((i * shapeWidth) * 1.80)
        else {
          if(j % (i) == 1) {
            console.log(j + ': mod');
            distance = ((i * shapeWidth) * 1.80)
          }
          else {
            options.strokeStyle = 'lightgreen';
            distance = ((i * shapeWidth) * 1.55 + (i * 1.4))
          }
        }

        let newX = centerX + Math.cos(currentRads) * distance;
        let newY = centerY + Math.sin(currentRads) * distance;
        
        if(j == 1) options.strokeStyle = 'blue';
        this.entities.push(new EqualShape(newX, newY, shapeWidth, shapeSides, options));
      }
    }

    // console.log(sideRads);
    // let currentRads = sideRads
    // // Start by moving up from and to the right by half the side angle
    // let newX = centerX + Math.cos(currentRads) * (shapeWidth * 1.85);
    // let newY = centerY + Math.sin(currentRads) * (shapeWidth * 1.85);

    

    // currentRads += sideRads
    // newX = centerX + Math.cos(currentRads) * (shapeWidth * 1.85);
    // newY = centerY + Math.sin(currentRads) * (shapeWidth * 1.85);
    // this.entities.push(new EqualShape(newX, newY, shapeWidth, shapeSides));
  }
}

export default Hex;
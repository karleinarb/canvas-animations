import Hex from './projects/hexRows/scene.js';

// Get the canvas
let canvas = <HTMLCanvasElement> document.getElementById('canvas');
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');
ctx.translate(0.5, 0.5);

// Define resize handler
let resizeHandler = () => {
  // Set sizes
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  // Set scaling
  // ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resizeHandler();
addEventListener('resize', resizeHandler);

/*
  Time variables
*/
let time = {
  startTime: 0,
  totalTime: 0,
  lastTime: 0,
  deltaTime: 0
}

// Choose a scene
let scene = new Hex(time, ctx);
let renderId = requestAnimationFrame(update);

function update(currentTime: number) {
  // Update timeing
  if(!time.startTime) {
    time.startTime = currentTime;
    time.lastTime = currentTime;
  }
  time.totalTime = time.lastTime - time.startTime;
  time.deltaTime = time.lastTime - currentTime;
  time.lastTime = currentTime;

  // Attempt to update the scene
  try { if(scene && scene.update) scene.update(scene, ctx)}
  catch(err) { console.error(err); }
  
  render();
}

function render() {
  try { if(scene && scene.render) scene.render(scene, ctx)}
  catch(err) { console.error(err); }

  renderId = requestAnimationFrame(update);
}
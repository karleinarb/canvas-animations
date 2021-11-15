import LocalTest from '/local.js';
const test = new LocalTest('test');
console.log(test);

import Hex from '/projects/HexRows/scene.mjs';

// Get the canvas
let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

// Define resize handler
let resizeHandler = () => {
  // Set sizes
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = canvas.width + 'px';
  canvas.style.height = canvas.height + 'px';
  // Set scaling
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resizeHandler();
addEventListener('resize', resizeHandler);

/*
  Time variables
*/
let time = {
  startTime: null,
  totalTime: null,
  lastTime: null,
  deltaTime: null
}

// Choose a scene
let scene = new Hex(canvas, ctx, time);
let renderId = requestAnimationFrame(update);

function update(currentTime) {
  // Update timeing
  if(!time.startTime) {
    time.startTime = currentTime;
    time.lastTime = currentTime;
  }
  time.totalTime = time.lastTime - time.startTime;
  time.deltaTime = time.lastTime - currentTime;
  time.lastTime = currentTime;

  // Attempt to update the scene
  try { if(scene && scene.update) scene.update()}
  catch(err) { console.error(err); }
  
  render();
}

function render() {
  try { if(scene && scene.render) scene.render(ctx)}
  catch(err) { console.error(err); }

  renderId = requestAnimationFrame(update);
}
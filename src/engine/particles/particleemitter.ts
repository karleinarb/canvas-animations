/*
  Dependencies
*/
import Vector2 from "../types/vector2.js";
import { particleStyle } from "./particle.js";
import Particle from './particle.js';

/*
  Classes
*/
class RandomVector2 {
  from:number
  to:number
  constructor(from: number, to: number) {
    this.from = from;
    this.to = to;
  }
}

type ParticleOptions = {
  position?: Vector2
  velocity: Vector2|RandomVector2
  acceleration?: Vector2
  gravity?: Vector2
  size: number
  shrinkRate: number
  style: particleStyle
}

/**
 * An emitter that can emit particles
 */
export default class ParticleEmitter {
  id: number;
  particles: Particle[]
  particleOptions: ParticleOptions  = {
    velocity: new Vector2(0,0),
    acceleration: new Vector2(0,0),
    gravity: new Vector2(0,0),
    size: 25,
    shrinkRate: 0.1,
    style: {}
  }
  maxParticles: number
  maxPerFrame: number
  position: Vector2
  velocity: Vector2
  acceleration: Vector2
  gravity: Vector2

  constructor(
    maxParticles:number = 10,
    maxPerFrame:number = 1,
    position = new Vector2(0,0),
    velocity: Vector2,
    acceleration: Vector2,
    gravity: Vector2,
    particleOptions: ParticleOptions
  ) {
    new Particle()
    // Id
    this.id = Math.random() * 100000000;
    // Particles array
    this.particles = [];
    // Emitting options
    this.maxParticles = maxParticles;
    this.maxPerFrame = maxPerFrame;
    // Particle options
    this.particleOptions = particleOptions;
    // Vectors
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.gravity = gravity;
  }

  update() {
    // Remove particles if applicable
    const toRemove : Array<number> = [];
    this.particles.forEach((p) => {
      if(p.size === 0) toRemove.push(p.id);
    })
    this.particles = this.particles.filter((p) => !toRemove.includes(p.id));

    // Add particles if applicable
    if(this.particles.length < this.maxParticles){
      // Create the new particle
      const p = new Particle(
        new Vector2(this.position.x, this.position.y),
        Vector2.random(-5, 5),
        new Vector2(0, 0),
        new Vector2(0, 0),
        20,
        0.01,
        {

        }
      )
      // Add it to the array
      this.particles.push(p);
    }

    // Update particles
    this.particles.forEach((p) => p.update() )
  }

  render(ctx: CanvasRenderingContext2D) {
    // Render the particles
    this.particles.forEach((p) => p.render(ctx) );
  }
}
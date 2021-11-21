/*
  Dependencies
*/
import Vector2 from "../types/vector2.js";
import Particle from "../entities/particle.js";

/*
  Classes
*/
class RandomVector2 {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

/**
 * An emitter that can emit particles
 */
export default class ParticleEmitter {
  /**
   * 
   * @param {*} maxParticles 
   * @param {*} maxPerFrame 
   * @param {Vector2} position 
   * @param {Vector2|RandomVector2} particleOptions.velocity The velocity of the particle 
   * @param {Vector2|RandomVector2} particleOptions.acceleration The acceleration of the particle
   * @param {Vector2|RandomVector2} particleOptions.gravity The gravitation vector of the particle
   * @param {Number} particleOptions.size The size/radius of the particle
   * @param {Number} particleOptions.shrinkRate The speed of which the particle shrinks
   * @param {Object} particleOptions.style 2D Canvas Context style
   */
  constructor(
    maxParticles = 10,
    maxPerFrame = 1,
    position = new Vector2(0,0),
    particleOptions = {
      velocity: new Vector2(0,0),
      acceleration: new Vector2(0,0),
      gravity: new Vector2(0,0),
      size: 25,
      shrinkRate: 0.1,
      style: {}
    }
  ) {
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
    // Other variables
    this.size = size;
    this.shrinkRate = shrinkSpeed;
    this.style = style || {};
    this.emittedTime = new Date();
  }

  update() {
    // Remove particles if applicable
    const toRemove = [];
    this.particles.forEach((p) => {
      if(p.size === 0) toRemove.push(p.id);
    })
    this.particles = this.particles.filter((p) => !toRemove.includes(p.id));

    // Add particles if applicable
    if(this.particles.length < this.maxParticles){
      if(this.particleOptions.velocity === 'random')
      this.Particle.push(new particle(...this.particleOptions))
    }

    // Update particles
    this.particles.forEach((p) => p.update() )
  }

  render() {
    // Render the particles
    this.particles.forEach((p) => p.render() );
  }
}
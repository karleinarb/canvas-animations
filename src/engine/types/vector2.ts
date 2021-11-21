export default class Vector2 {
  x: number
  y: number
  minMagnitude: number
  maxMagnitude: number | null | undefined


  constructor(x:number = 0, y:number = 0) {
    this.x = x;
    this.y = y;
    this.minMagnitude = 0;
    this.maxMagnitude = 0;
  }

  /*
    Addition
  */
  static add(v1:Vector2, v2:Vector2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  add(v1:Vector2) {
    const v = Vector2.add(this, v1);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Subtraction
  */
  static sub(v1:Vector2, v2:Vector2) {
    return new Vector2(v1.x - v1.y, v2.x - v2.y);
  }

  sub(v1:Vector2) {
    const v = Vector2.sub(this, v1);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Multiply
  */
  static mult(v1:Vector2, v2:Vector2) {
    return new Vector2(v1.x * v2.x, v1.y * v2.y);
  }

  mult(v1:Vector2) {
    const v = Vector2.mult(this, v1);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  static multAll(v1:Vector2, number:number) {
    return new Vector2(v1.x * number, v1.y * number);
  }

  multAll(number:number) {
    const v = Vector2.multAll(this, number);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Division
  */
  static div(v1:Vector2, v2:Vector2) {
    return new Vector2(v1.x / v2.x, v1.y / v2.y);
  }

  div(v1:Vector2) {
    const v = Vector2.div(this, v1);
    this.x = v.x;
    this.y = v.y;

    if(this.maxMagnitude)

    return this;
  }

  /*
    Disance
  */
  static radsBetween(v1:Vector2, v2:Vector2) {
    const deltaX = v2.x - v1.x;
    const deltaY = v2.y - v1.y;
    return Math.atan2(deltaY, deltaX);
  }

  radsBetween(v1:Vector2) {
    return Vector2.radsBetween(this, v1);
  }

  /*
    Magnitude
  */
  /**
   * Gets the magnitude of a vector
   * @param {*} v Vector
   * @returns {Number} The magnitude of the vector
   */
  static getMagnitude(v:Vector2) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  /**
   * 
   * @param mag Magnitude
   * @returns {Vector2}
   */
  mag(mag:number) : Vector2 {
    this.normalize().multAll(mag);
    return this;
  }

  /**
   * Sets the magnitude of this vector
   * @param {number} mag 
   */
  limit(max:number) {
    const magnitude = Vector2.getMagnitude(this);
    if(magnitude > max) {
      if(this.maxMagnitude) max = Math.min(max, this.maxMagnitude)
      let limited = Vector2.normalize(this).multAll(max);
      this.x /= limited.x;
      this.y /= limited.y;
    }
    return this;
  }

  /**
   * Sets the maximum magnitude for this vector
   * @param {number} max 
   */
  setLimit(max:number) {
    this.maxMagnitude = max;
    this.limit(max);
    return this;
  }

  minimum(min:number) {
    const magnitude = Vector2.getMagnitude(this);
    if(magnitude < min) {
      if(this.maxMagnitude) min = Math.max(min, this.minMagnitude);
      let minimum = Vector2.normalize(this).multAll(min);
      this.x = minimum.x;
      this.y = minimum.y;
    }
    return this;
  }

  setMinimum(min:number) {
    this.minMagnitude = min;
    this.minimum(min);
    return this;
  }

  /*
    Normalize
  */
  static normalize(v:Vector2) {
    const mag = Vector2.getMagnitude(v);
    return new Vector2(v.x / mag, v.y / mag);
  }

  normalize() {
    const v = Vector2.normalize(this);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Angle
  */
  static getAngle(v:Vector2) {
    return Math.atan2(v.y, v.x);
  }

  getAngle() {
    return Vector2.getAngle(this);
  }

  static setAngle(v:Vector2, rads:number) {
    let m = Vector2.getMagnitude(v);
    return new Vector2(m * Math.cos(rads), m * Math.sin(rads));
  }

  setAngle(rads:number) {
    const v = Vector2.setAngle(this, rads);
    this.x = v.x;
    this.y = v.y;
  }

  /*
    Copy
  */
  copy() {
    return new Vector2(this.x, this.y);
  }

  /*
    Create random vector
  */
  static random(min:number=-1, max:number=1) {
    const x = Math.random() * (max - min) + min;
    const y = Math.random() * (max - min) + min;
    return new Vector2(x, y);
  }

  /*
    Reversing
  */
  static reverse(v:Vector2) {
    return new Vector2(v.x * -1, v.y * -1);
  }

  reverse() {
    const v = Vector2.reverse(this);
    this.x = v.x;
    this.y = v.y;
  }

  static reverseX(v:Vector2) {
    return new Vector2(v.x * -1, v.y);
  }

  reverseX() {
    const v = Vector2.reverseX(this);
    this.x = v.x;
    this.y = v.y;
  }

  static reverseY(v:Vector2) {
    return new Vector2(v.x, v.y * -1);
  }

  reverseY() {
    const v = Vector2.reverseY(this);
    this.x = v.x;
    this.y = v.y;
  }
}
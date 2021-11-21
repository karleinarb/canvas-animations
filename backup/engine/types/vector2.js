export default class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.maxMagnitude = undefined;
    this.minMagnitude = undefined;
  }

  /*
    Addition
  */
  static add(v1, v2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  add(v1) {
    const v = Vector2.add(this, v1);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Subtraction
  */
  static sub(v1, v2) {
    return new Vector2(v1.x - v1.y, v2.x - v2.y);
  }

  sub(v1) {
    const v = Vector2.sub(this, v1);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Multiply
  */
  static mult(v1, v2) {
    return new Vector2(v1.x * v2.x, v1.y * v2.y);
  }

  mult(v1) {
    const v = Vector2.mult(this, v1);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  static multAll(v1, number) {
    return new Vector2(v1.x * number, v1.y * number);
  }

  multAll(number) {
    const v = Vector2.multAll(this, number);
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /*
    Division
  */
  static div(v1, v2) {
    return new Vector2(v1.x / v2.x, v1.y / v2.y);
  }

  div(v1) {
    const v = Vector2.div(this, v1);
    this.x = v.x;
    this.y = v.y;

    if(this.maxMagnitude)

    return this;
  }

  /*
    Disance
  */
  static radsBetween(v1, v2) {
    const deltaX = v2.x - v1.x;
    const deltaY = v2.y - v1.y;
    return Math.atan2(deltaY, deltaX);
  }

  radsBetween(v) {
    return Vector2.radsBetween(this, v);
  }

  /*
    Magnitude
  */
  /**
   * Gets the magnitude of a vector
   * @param {*} v Vector
   * @returns {Number} The magnitude of the vector
   */
  static mag(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  mag(mag) {
    if(!mag) return Vector2.mag(this);
    this.normalize().multAll(mag);
    return this;
  }

  /**
   * Sets the magnitude of this vector
   * @param {Number} mag 
   */
  limit(max) {
    const magnitude = Vector2.mag(this);
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
  setLimit(max) {
    this.maxMagnitude = max;
    this.limit();
    return this;
  }

  minimum(min) {
    const magnitude = Vector2.mag(this);
    if(magnitude < min) {
      if(this.maxMagnitude) min = Math.max(max, this.minMagnitude);
      let minimum = Vector2.normalize(this).multAll(min);
      this.x = minimum.x;
      this.y = minimum.y;
    }
    return this;
  }

  setMinimum(min) {
    this.minMagnitude = min;
    this.minimum(min);
    return this;
  }

  /*
    Normalize
  */
  static normalize(v) {
    const mag = Vector2.mag(v);
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
  static getAngle(v) {
    return Math.atan2(v.y, v.x);
  }

  getAngle() {
    return Vector2.getAngle(this);
  }

  static setAngle(v, rads) {
    let m = Vector2.mag(v);
    return new Vector2(m * Math.cos(rads), m * Math.sin(rads));
  }

  setAngle(rads) {
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
  static random(min = -1, max = 1) {
    const x = Math.random() * (max - min) + min;
    const y = Math.random() * (max - min) + min;
    return new Vector2(x, y);
  }

  /*
    Reversing
  */
  static reverse(vector) {
    return new Vector2(vector.x * -1, vector.y * -1);
  }

  reverse() {
    const v = Vector2.reverse(this);
    this.x = v.x;
    this.y = v.y;
  }

  static reverseX(vector) {
    return new Vector2(vector.x * -1, vector.y);
  }

  reverseX() {
    const v = Vector2.reverseX(this);
    this.x = v.x;
    this.y = v.y;
  }

  static reverseY(vector) {
    return new Vector2(vector.x, vector.y * -1);
  }

  reverseY() {
    const v = Vector2.reverseY(this);
    this.x = v.x;
    this.y = v.y;
  }
}
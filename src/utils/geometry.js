import { atan2, pow, sqrt } from "./math";

// Converts radians to degrees.
function angleToDegrees(angle){
  return angle * 180 / Math.PI;
}

// Converts degrees to radians.
function angleToRadians(angle){
  return angle / 180 * Math.PI;
}

// Calculates the angle of a line, in degrees.
export function lineAngle(line){
  return angleToDegrees(atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
}

// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
export function lineInterpolate(line){
  return t => t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
}

// Calculates the distance between the endpoints of a line segment.
export function lineLength(line){
  return sqrt(pow(line[1][0] - line[0][0], 2) + pow(line[1][1] - line[0][1], 2));
}

// Calculates the midpoint of a line segment.
export function lineMidpoint(line){
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}

// Translates a point by an angle in degrees and distance.
export function pointTranslate(point, angle, distance){
  const r = angleToRadians(angle);
  return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
}
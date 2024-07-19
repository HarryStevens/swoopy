import { atan2, cos, pi, pow, sin, sqrt } from "./math";

// Converts radians to degrees.
function angleToDegrees(angle){
  return angle * 180 / pi;
}

// Converts degrees to radians.
function angleToRadians(angle){
  return angle / 180 * pi;
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
  const [[x1, y1], [x2, y2]] = line;
  const x = v => (x2 - x1) * v + x1;
  const y = v => (y2 - y1) * v + y1;
  return t => {
    return [x(t), y(t)];
  }
}

// Calculates the distance between the endpoints of a line segment.
export function lineLength(line){
  return sqrt(pow(line[1][0] - line[0][0], 2) + pow(line[1][1] - line[0][1], 2));
}

// Calculates the midpoint of a line segment.
export function lineMidpoint(line){
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}

// Rotate a point about an origin by an angle in degrees
export function pointRotate(point, angle, origin){
  const r = angleToRadians(angle || 0);

  if (!origin || (origin[0] === 0 && origin[1] === 0)){
    return rotate(point, r);
  }
  else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    const p0 = point.map((c, i) => c - origin[i]);
    const rotated = rotate(p0, r);
    return rotated.map((c, i) => c + origin[i]);
  }
}

// Translates a point by an angle in degrees and distance.
export function pointTranslate(point, angle, distance){
  const r = angleToRadians(angle);
  return [point[0] + distance * cos(r), point[1] + distance * sin(r)];
}

function rotate(point, angle){
  // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
  return [(point[0] * cos(angle)) - point[1] * sin(angle), (point[0] * sin(angle)) + point[1] * cos(angle)];
}
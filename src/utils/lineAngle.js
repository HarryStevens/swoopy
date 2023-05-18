import { angleToDegrees } from "./angleToDegrees";
import { atan2 } from "./math";

// Calculates the angle of a line, in degrees.
export function lineAngle(line){
  return angleToDegrees(atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
}
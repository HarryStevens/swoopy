import { pow, sqrt } from "./math";

// Calculates the distance between the endpoints of a line segment.
export function lineLength(line){
  return sqrt(pow(line[1][0] - line[0][0], 2) + pow(line[1][1] - line[0][1], 2));
}
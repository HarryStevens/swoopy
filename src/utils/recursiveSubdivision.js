import { lineLength } from "./lineLength";
import { lineMidpoint } from "./lineMidpoint";

class Node {
  constructor(value, point, next = null) {
    this.value = value; // t value
    this.point = point; // corresponding interpolator(t)
    this.next = next;
  }
}

  // Recursive subdivision using perpendicular distance threshold
export function recursiveSubdivision(interpolator, precision = 0.1, maxIters = 1e3){
  let start = new Node(0, interpolator(0));
  let mid = new Node(0.5, interpolator(0.5));
  let end = new Node(1, interpolator(1));
  start.next = mid;
  mid.next = end;

  let iters = 0;
  while (iters < maxIters) {
    let any = false;
    let current = start;
    
    while (current && current.next) {
      const t = 0.5 * (current.value + current.next.value);
      const p = interpolator(t);
      
      if (lineLength([ p, lineMidpoint([current.point, current.next.point]) ]) > precision) {
        // Insert the new point
        any = true;
        let newPoint = new Node(t, p, current.next);
        current.next = newPoint;
        current = newPoint.next;  // Skip the next pair since we've already checked it
      } else {
        current = current.next;  // Move to the next pair
      }
    }

    // If there are no more lengths exceeding the threshold, end the algorithm
    if (!any) {
      break;
    } else {
      iters++; 
    }
  }

  // Collect the points into an array
  let points = [];
  let current = start;
  while (current) {
    points.push(current.point);
    current = current.next;
  }
  return points;
}
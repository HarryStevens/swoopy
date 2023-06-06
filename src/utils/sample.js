import { lineLength, lineMidpoint } from "./geometry";

// Node for linked list
class Node {
  constructor(value, point, next = null) {
    this.value = value; // t value
    this.point = point; // corresponding interpolator(t)
    this.next = next;
  }
}

// Recursive subdivision using perpendicular distance threshold:
// An adaptive sampling strategy to discretize a path interpolator,
// ensuring that the sampled points are always within the given precision from the actual path.
// It does this by adding more points in the regions of the path where the curvature is higher
// and fewer points where it's lower, thus achieving an efficient and accurate sampling.
export function sample(interpolator, precision = 0.1, maxIters = 1e3){
  const start = new Node(0, interpolator(0));
  const mid = new Node(0.5, interpolator(0.5));
  const end = new Node(1, interpolator(1));
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
        const newPoint = new Node(t, p, current.next);
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
  const points = [];
  let current = start;
  while (current) {
    points.push(current.point);
    current = current.next;
  }
  return points;
}
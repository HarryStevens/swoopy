import { recursiveSubdivision } from "./recursiveSubdivision";

// See https://math.stackexchange.com/a/1361717/659913
export function quadBezier(a, b, c){
  const i = t => {
    const x = Math.pow((1 - t), 2) * a[0] + 2 * t * (1 - t) * b[0] + Math.pow(t, 2) * c[0];
    const y = Math.pow((1 - t), 2) * a[1] + 2 * t * (1 - t) * b[1] + Math.pow(t, 2) * c[1];
    return [x, y];
  }

  return recursiveSubdivision(i);
}

// See https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
export function cubicBezier(a, b, c, d){
  const i = t => {
    const x = Math.pow((1 - t), 3) * a[0] + 3 * t * Math.pow((1 - t), 2) * b[0] + 3 * Math.pow(t, 2) * (1 - t) * c[0] + Math.pow(t, 3) * d[0];
    const y = Math.pow((1 - t), 3) * a[1] + 3 * t * Math.pow((1 - t), 2) * b[1] + 3 * Math.pow(t, 2) * (1 - t) * c[1] + Math.pow(t, 3) * d[1];
    return [x, y];
  }

  return recursiveSubdivision(i);
}
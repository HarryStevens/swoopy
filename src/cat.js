import { lineAngle, lineLength, pointRotate, pointTranslate } from "./utils/geometry";
import { abs, cosh, pow, sign, sinh } from "./utils/math";
import { sample } from "./utils/sample";

export function cat(a, b, offset = 0.5, precision = 0.1) {
  return sample(
    interpolateCat(
      a,
      b,
      offset
    ),
    precision
  );
}

function interpolateCat(p0, p1, offset){
  // Compute the length of the chain given its span and height.
  // Except for small offsets, try to use the secant method
  // to find the parameter 𝑎 for the catenary and then compute the length.
  // If that fails, try a closed-form approximation I found through trial and error.
  const span = lineLength([p0, p1]);
  const height = span * offset / 2;
  let length = span + (2 * span * pow(offset, 2)) / (3 + pow(offset, 2));
  if (abs(offset) > 0.1) {
    const a0 = sm(a => a * (cosh(span / (2 * a)) - 1) - height, height);
    if (!isNaN(a0)) {
      length = 2 * a0 * sinh(span / (2 * a0));
    }
  }
  
  // The end point translated horizontally from the start
  const sx = p0[0];
  const hx = pointTranslate(p0, 0, span)[0];

  // Numerically compute the parameters
  const { a, x0, y0 } = parameters(sx, hx, length);
  
  return t => {
    // Scale t in < 0, 1 > to x
    const x = sx + t * (hx - sx);
    // Catenary function
    let y = (a * cosh((x - x0) / a) + y0) * -sign(offset) + p0[1];

    // Rotate the returned points to match the angle of the input points
    return pointRotate([ x, y ], lineAngle([p0, p1]), p0);
  }
}

// Function to compute parameter using the Secant method
// The Secant method is a numerical technique for finding the root of a function.
// It's similar to the Newton-Raphson method but does not require the calculation of derivatives.
// https://en.wikipedia.org/wiki/Secant_method
// https://en.wikipedia.org/wiki/Newton%27s_method
function sm(f, param, maxSteps = 100, tolerance = 1e-5) {
  let p1 = param + 1;
  let f0 = f(param);
  let f1 = f(p1);
  let steps = 0;

  while (abs(p1 - param) > tolerance && steps < maxSteps) {
    const g = param - f0 * (p1 - param) / (f1 - f0);
    f1 = f0;
    p1 = param;
    param = g;
    f0 = f(param);
    steps++;
  }

  return param;
}

// Function to compute the parameters a, x0, and y0 of the catenary
// Modified from Torben Jansen (https://observablehq.com/@toja/catenary)
// via https://www.mathematik.ch/anwendungenmath/kettenlinie/kettenlinie.php
function parameters(x1, x2, length, tolerance = 1e-5) {
  // Calculate the midpoint between x1 and x2
  const x = (x2 - x1) / 2;

  // Initialize b and k with starting values, and set the iteration limit
  let b = 0, k = 1, steps = 100;
  let _b, _k;

  // Iteratively refine the values of b and k
  while (steps > 0) {
    // Compute new values for b and k using the Secant method
    _b = sm((b) => fb(k, b), b, b + 1, tolerance);
    _k = sm((k) => fk(k, b, length / x), k, k + 1, tolerance);

    // Check for convergence within specified tolerance
    if (abs(b - _b) < tolerance && abs(k - _k) < tolerance) {
      break;
    }

    // Update b and k with new values
    b = _b;
    k = _k;
    --steps;
  }

  // Calculate the parameters a, x0, and y0 based on the refined b and k
  const a = x / _k;
  const x0 = (x1 + x2) / 2 + _b * x;
  const y0 = -a * cosh((x1 - x0) / a);

  return { a, x0, y0 };
}

// Function to compute the function value for b based on k and b
function fb(k, b) {
  const cosh1 = cosh(k * (1 - b));
  const cosh2 = cosh(k * (-1 - b));
  return (cosh1 - cosh2) / k;
}

// Function to compute the function value for k based on k, b, and x
function fk(k, b, x) {
  const sinh1 = sinh(k * (1 - b));
  const sinh2 = sinh(k * (-1 - b));
  return (sinh1 - sinh2) / k - x;
}
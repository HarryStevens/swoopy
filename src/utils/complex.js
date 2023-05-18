// See https://observablehq.com/@jrus/complex

// Calculates the multiplicative inverse (or reciprocal) of a complex number
function cinv([x, y]) {
  const s = 1 / (x * x + y * y);
  return [s * x, -s * y];
}

// Divides two complex numbers
export function cdiv(z0, z1) {
  return cmul(z0, cinv(z1));
}

// Linearly interpolates between two complex numbers
export function clerp([x0, y0], [x1, y1], t) {
  return [x0 * (1 - t) + x1 * t, y0 * (1 - t) + y1 * t];
}

// Multiplies two complex numbers
export function cmul([x0, y0], [x1, y1]) {
  return [x0 * x1 - y0 * y1, x0 * y1 + y0 * x1];
}

// Subtracts one complex number from another
export function csub([x0, y0], [x1, y1]) {
  return [x0 - x1, y0 - y1];
}


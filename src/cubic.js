import { lineAngle, lineInterpolate, lineLength, pointTranslate } from "./utils/geometry";
import { pow } from "./utils/math";
import { sample } from "./utils/sample";

// See https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
function interpolateCubic(a, b, c, d){
  return t => {
    const x = pow((1 - t), 3) * a[0] + 3 * t * pow((1 - t), 2) * b[0] + 3 * pow(t, 2) * (1 - t) * c[0] + pow(t, 3) * d[0];
    const y = pow((1 - t), 3) * a[1] + 3 * t * pow((1 - t), 2) * b[1] + 3 * pow(t, 2) * (1 - t) * c[1] + pow(t, 3) * d[1];
    return [x, y];
  }
}

export function cubic(a, b, offset = 0.5, precision = 0.1){
  const l = [a, b];
  const d = lineLength(l);
  const i = lineInterpolate(l);
  const theta = lineAngle(l);

  return sample(
    interpolateCubic(
      a,
      pointTranslate(i(.4), theta + 90, d * offset),
      pointTranslate(i(.6), theta - 90, d * offset),
      b
    ),
    precision
  );
}
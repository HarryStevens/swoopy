import { lineAngle } from "./utils/lineAngle";
import { lineInterpolate } from "./utils/lineInterpolate";
import { lineLength } from "./utils/lineLength";
import { pointTranslate } from "./utils/pointTranslate";

export function cubic(a, b, offset){
  offset = offset === 0 ? 0 : offset || .5;

  const l = [a, b],
        len = lineLength(l),
        i = lineInterpolate(l),
        m0 = i(.4),
        m1 = i(.6),
        g = lineAngle(l),
        c = pointTranslate(m0, g + 90, len * offset),
        d = pointTranslate(m1, g - 90, len * offset);

  return cubicBezier(a, c, d, b);
}

// See https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
function cubicBezier(a, b, c, d, p){
  const i = t => {
    const x = Math.pow((1 - t), 3) * a[0] + 3 * t * Math.pow((1 - t), 2) * b[0] + 3 * Math.pow(t, 2) * (1 - t) * c[0] + Math.pow(t, 3) * d[0];
    const y = Math.pow((1 - t), 3) * a[1] + 3 * t * Math.pow((1 - t), 2) * b[1] + 3 * Math.pow(t, 2) * (1 - t) * c[1] + Math.pow(t, 3) * d[1];
    return [x, y];
  }

  const l = lineLength([a, d]),
        n = Math.floor(l),
        o = [];

  for (let j = 0; j <= n; j +=  1){
    o.push(i(j / n));
  }

  if (l !== n) o.push(d);
  return o;
}
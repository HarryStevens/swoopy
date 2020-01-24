import { lineAngle } from "./utils/lineAngle";
import { lineLength } from "./utils/lineLength";
import { lineMidpoint } from "./utils/lineMidpoint";
import { pointTranslate } from "./utils/pointTranslate";

export function quad(a, b, offset){
  offset = offset === 0 ? 0 : offset || .5;
  
  const l = [a, b],
        d = lineLength(l),
        m = lineMidpoint(l),
        g = lineAngle(l),
        c = pointTranslate(m, g + 90, d * offset);

  return quadBezier(a, c, b);
}

// See https://math.stackexchange.com/a/1361717/659913
function quadBezier(a, b, c){
  const i = t => {
    const x = Math.pow((1 - t), 2) * a[0] + 2 * t * (1 - t) * b[0] + Math.pow(t, 2) * c[0];
    const y = Math.pow((1 - t), 2) * a[1] + 2 * t * (1 - t) * b[1] + Math.pow(t, 2) * c[1];
    return [x, y];
  }

  const l = lineLength([a, c]),
        n = Math.floor(l),
        o = [];

  for (let j = 0; j <= n; j += 1){
    o.push(i(j / n));
  }

  if (l !== n) o.push(c);
  return o;
}
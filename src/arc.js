import { cubicBezier } from "./utils/bezier";
import { lineAngle } from "./utils/lineAngle";
import { lineInterpolate } from "./utils/lineInterpolate";
import { lineLength } from "./utils/lineLength";
import { pointTranslate } from "./utils/pointTranslate";
import { scale } from "./utils/scale";

export function arc(a, b, offset){
  offset = offset === 0 ? 0 : offset || 1;
  
  const o = scale([0, 1.08], [.5, 0], Math.abs(offset)),
        s = offset < 0 ? -1 : 1,
        d = scale([0, 1], [0, .667], Math.abs(offset)) * s,
        ang = lineAngle([a, b]),
        len = lineLength([a, b]),
        int = lineInterpolate([a, b]),
        [p0, p1] = [int(o), int(1 - o)].map(p => pointTranslate(p, ang + 90, len * d));

  return cubicBezier(a, p0, p1, b);
}
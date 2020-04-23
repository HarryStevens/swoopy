import { cubicBezier } from "./utils/bezier";
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
import { lineAngle } from "./utils/lineAngle";
import { lineLength } from "./utils/lineLength";
import { lineMidpoint } from "./utils/lineMidpoint";
import { pointTranslate } from "./utils/pointTranslate";
import { quadBezier } from "./utils/bezier";

export function quad(a, b, offset = 0.5){
  const l = [a, b],
        d = lineLength(l),
        m = lineMidpoint(l),
        g = lineAngle(l),
        c = pointTranslate(m, g + 90, d * offset);

  return quadBezier(a, c, b);
}
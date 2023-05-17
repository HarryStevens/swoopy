import { lineAngle } from "./utils/lineAngle";
import { lineLength } from "./utils/lineLength";
import { lineMidpoint } from "./utils/lineMidpoint";
import { pointTranslate } from "./utils/pointTranslate";
import { sample } from "./utils/sample";
import { scale } from "./utils/scale";

// Much of this code was adapted from Jacon Rus
// For the original implementation, see:
// https://observablehq.com/@jrus/circle-arc-interpolation
// https://observablehq.com/@jrus/complex

function cdiv(z0, z1) {
  return cmul(z0, cinv(z1));
}

function cinv([x, y]) {
  const s = 1 / (x * x + y * y);
  return [s * x, -s * y];
}

function clerp([x0, y0], [x1, y1], t) {
  return [x0 * (1 - t) + x1 * t, y0 * (1 - t) + y1 * t];
}

function cmul([x0, y0], [x1, y1]) {
  return [x0 * x1 - y0 * y1, x0 * y1 + y0 * x1];
}

function csub([x0, y0], [x1, y1]) {
  return [x0 - x1, y0 - y1];
}

function interpolateArc(a, m, b){
  const b_m = csub(b, m); 
  const m_a = csub(m, a);
  const ab_m = cmul(a, b_m);
  const bm_a = cmul(b, m_a);
  
  return t => cdiv(
    clerp(ab_m, bm_a, t),
    clerp(b_m, m_a, t)
  );
}

export function arc(a, b, offset = 1){
  const r = lineLength([a, b]) / 2;
  const s = scale([-1, 1], [-r, r], offset);
  const mid = lineMidpoint([a, b]);
  const theta = lineAngle([a, b]);
  const m = pointTranslate(mid, theta - 90, s);
  const i = interpolateArc(a, m, b);
  return sample(i);
}
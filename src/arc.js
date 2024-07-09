import { cdiv, clerp, cmul, csub } from "./utils/complex";
import { lineAngle, lineLength, lineMidpoint, pointTranslate } from "./utils/geometry";
import { sample } from "./utils/sample";

// See https://observablehq.com/@jrus/circle-arc-interpolation
function interpolateArc(a, m, b){
  // Calculate two vectors: b_m and m_a,
  // which are the vectors from the midpoint to the end point
  // and from the start point to the midpoint, respectively
  const b_m = csub(b, m); 
  const m_a = csub(m, a);

  // Calculate two more values: ab_m and bm_a.
  // The first is the complex multiplication of the start point and b_m,
  // and the second is the complex multiplication of the end point and m_a
  const ab_m = cmul(a, b_m);
  const bm_a = cmul(b, m_a);
  
  // Perform a linear interpolation between ab_m and bm_a and between b_m and m_a,
  // and divide the first result by the second.
  // This results in a point on the circular arc between a and b
  // that corresponds to the input parameter t.
  return t => cdiv(
    clerp(ab_m, bm_a, t),
    clerp(b_m, m_a, t)
  );
}

export function arc(a, b, offset = 1, precision = 0.1){
  const l = [a, b];

  return sample(
    interpolateArc(
      a,
      pointTranslate(
        lineMidpoint(l),
        lineAngle(l) + 90,
        lineLength(l) / 2 * offset
      ),
      b
    ),
    precision
  );
}
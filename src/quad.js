import { lineAngle } from "./utils/lineAngle";
import { lineLength } from "./utils/lineLength";
import { lineMidpoint } from "./utils/lineMidpoint";
import { pow } from "./utils/math";
import { pointTranslate } from "./utils/pointTranslate";
import { sample } from "./utils/sample";

// See https://math.stackexchange.com/a/1361717/659913
function interpolateQuad(a, b, c){
  return t => {
    const x = pow((1 - t), 2) * a[0] + 2 * t * (1 - t) * b[0] + pow(t, 2) * c[0];
    const y = pow((1 - t), 2) * a[1] + 2 * t * (1 - t) * b[1] + pow(t, 2) * c[1];
    return [x, y];
  }
}

export function quad(a, b, offset = 0.5){
  return sample(
    interpolateQuad(
      a,
      pointTranslate(
        lineMidpoint([a, b]),
        lineAngle([a, b]) + 90,
        lineLength([a, b]) * offset
      ),
      b
    )
  );
}
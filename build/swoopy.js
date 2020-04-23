// https://github.com/HarryStevens/swoopy#readme Version 0.0.2. Copyright 2020 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.swoopy = {}));
}(this, (function (exports) { 'use strict';

  // Calculates the distance between the endpoints of a line segment.
  function lineLength(line) {
    return Math.sqrt(Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2));
  }

  function cubicBezier(a, b, c, d, p) {
    var i = function i(t) {
      var x = Math.pow(1 - t, 3) * a[0] + 3 * t * Math.pow(1 - t, 2) * b[0] + 3 * Math.pow(t, 2) * (1 - t) * c[0] + Math.pow(t, 3) * d[0];
      var y = Math.pow(1 - t, 3) * a[1] + 3 * t * Math.pow(1 - t, 2) * b[1] + 3 * Math.pow(t, 2) * (1 - t) * c[1] + Math.pow(t, 3) * d[1];
      return [x, y];
    };

    var l = lineLength([a, d]),
        n = Math.floor(l),
        o = [];

    for (var j = 0; j <= n; j += 1) {
      o.push(i(j / n));
    }

    if (l !== n) o.push(d);
    return o;
  }

  // Converts radians to degrees.
  function angleToDegrees(angle) {
    return angle * 180 / Math.PI;
  }

  function lineAngle(line) {
    return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
  }

  // Converts degrees to radians.
  function angleToRadians(angle) {
    return angle / 180 * Math.PI;
  }

  function pointTranslate(point, angle, distance) {
    var r = angleToRadians(angle);
    return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
  }

  // The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
  // a value of 0 returns a, while a value of 1 returns b.
  // Intermediate values interpolate from start to end along the line segment.

  function lineInterpolate(line) {
    return function (t) {
      return t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
    };
  }

  function cubic(a, b, offset) {
    offset = offset === 0 ? 0 : offset || .5;
    var l = [a, b],
        len = lineLength(l),
        i = lineInterpolate(l),
        m0 = i(.4),
        m1 = i(.6),
        g = lineAngle(l),
        c = pointTranslate(m0, g + 90, len * offset),
        d = pointTranslate(m1, g - 90, len * offset);
    return cubicBezier(a, c, d, b);
  }

  // Calculates the midpoint of a line segment.
  function lineMidpoint(line) {
    return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
  }

  function quad(a, b, offset) {
    offset = offset === 0 ? 0 : offset || .5;
    var l = [a, b],
        d = lineLength(l),
        m = lineMidpoint(l),
        g = lineAngle(l),
        c = pointTranslate(m, g + 90, d * offset);
    return quadBezier(a, c, b);
  } // See https://math.stackexchange.com/a/1361717/659913

  function quadBezier(a, b, c) {
    var i = function i(t) {
      var x = Math.pow(1 - t, 2) * a[0] + 2 * t * (1 - t) * b[0] + Math.pow(t, 2) * c[0];
      var y = Math.pow(1 - t, 2) * a[1] + 2 * t * (1 - t) * b[1] + Math.pow(t, 2) * c[1];
      return [x, y];
    };

    var l = lineLength([a, c]),
        n = Math.floor(l),
        o = [];

    for (var j = 0; j <= n; j += 1) {
      o.push(i(j / n));
    }

    if (l !== n) o.push(c);
    return o;
  }

  exports.cubic = cubic;
  exports.quad = quad;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

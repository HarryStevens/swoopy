// https://github.com/HarryStevens/swoopy#readme Version 0.0.1. Copyright 2020 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.swoopy = {}));
}(this, (function (exports) { 'use strict';

  // Converts radians to degrees.
  function angleToDegrees(angle) {
    return angle * 180 / Math.PI;
  }

  function lineAngle(line) {
    return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
  }

  // Calculates the distance between the endpoints of a line segment.
  function lineLength(line) {
    return Math.sqrt(Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2));
  }

  // Calculates the midpoint of a line segment.
  function lineMidpoint(line) {
    return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
  }

  // Converts degrees to radians.
  function angleToRadians(angle) {
    return angle / 180 * Math.PI;
  }

  function pointTranslate(point, angle, distance) {
    var r = angleToRadians(angle);
    return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
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

    var d = lineLength([a, c]),
        l = Math.floor(d),
        p = 1,
        o = [];

    for (var j = 0; j < l; j += p) {
      o.push(i(j / l));
    }

    if (l !== d) o.push(c);
    return o;
  }

  exports.quad = quad;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

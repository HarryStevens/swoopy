// https://github.com/HarryStevens/swoopy#readme Version 0.0.4. Copyright 2021 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.swoopy = {}));
}(this, (function (exports) { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // Calculates the distance between the endpoints of a line segment.
  function lineLength(line) {
    return Math.sqrt(Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2));
  }

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
  } // See https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves

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

  function scale(domain, range, value) {
    return range[0] + (range[1] - range[0]) * Math.abs(value - domain[0]) / Math.max.apply(Math, _toConsumableArray(domain)) - Math.min.apply(Math, _toConsumableArray(domain));
  }

  function arc(a, b, offset) {
    offset = offset === 0 ? 0 : offset || 1;

    var o = scale([0, 1.08], [.5, 0], Math.abs(offset)),
        s = offset < 0 ? -1 : 1,
        d = scale([0, 1], [0, .667], Math.abs(offset)) * s,
        ang = lineAngle([a, b]),
        len = lineLength([a, b]),
        _int = lineInterpolate([a, b]),
        _map = [_int(o), _int(1 - o)].map(function (p) {
      return pointTranslate(p, ang + 90, len * d);
    }),
        _map2 = _slicedToArray(_map, 2),
        p0 = _map2[0],
        p1 = _map2[1];

    return cubicBezier(a, p0, p1, b);
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
  }

  exports.arc = arc;
  exports.cubic = cubic;
  exports.quad = quad;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

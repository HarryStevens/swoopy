// https://github.com/HarryStevens/swoopy#readme Version 0.0.8. Copyright 2023 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.swoopy = {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

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

  var Node = function Node(value, point) {
    var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Node);

    this.value = value; // t value

    this.point = point; // corresponding interpolator(t)

    this.next = next;
  }; // Recursive subdivision using perpendicular distance threshold


  function sample(interpolator) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
    var maxIters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e3;
    var start = new Node(0, interpolator(0));
    var mid = new Node(0.5, interpolator(0.5));
    var end = new Node(1, interpolator(1));
    start.next = mid;
    mid.next = end;
    var iters = 0;

    while (iters < maxIters) {
      var any = false;
      var _current = start;

      while (_current && _current.next) {
        var t = 0.5 * (_current.value + _current.next.value);
        var p = interpolator(t);

        if (lineLength([p, lineMidpoint([_current.point, _current.next.point])]) > precision) {
          // Insert the new point
          any = true;
          var newPoint = new Node(t, p, _current.next);
          _current.next = newPoint;
          _current = newPoint.next; // Skip the next pair since we've already checked it
        } else {
          _current = _current.next; // Move to the next pair
        }
      } // If there are no more lengths exceeding the threshold, end the algorithm


      if (!any) {
        break;
      } else {
        iters++;
      }
    } // Collect the points into an array


    var points = [];
    var current = start;

    while (current) {
      points.push(current.point);
      current = current.next;
    }

    return points;
  }

  // A linear scale
  function scale(domain, range, value) {
    var _domain = _slicedToArray(domain, 2),
        d0 = _domain[0],
        d1 = _domain[1];

    var dx = d1 - d0;

    var _range = _slicedToArray(range, 2),
        r0 = _range[0],
        r1 = _range[1];

    var rx = r1 - r0;
    return rx * ((value - d0) / dx) + r0;
  }

  // For the original implementation, see:
  // https://observablehq.com/@jrus/circle-arc-interpolation
  // https://observablehq.com/@jrus/complex

  function cdiv(z0, z1) {
    return cmul(z0, cinv(z1));
  }

  function cinv(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    var s = 1 / (x * x + y * y);
    return [s * x, -s * y];
  }

  function clerp(_ref3, _ref4, t) {
    var _ref5 = _slicedToArray(_ref3, 2),
        x0 = _ref5[0],
        y0 = _ref5[1];

    var _ref6 = _slicedToArray(_ref4, 2),
        x1 = _ref6[0],
        y1 = _ref6[1];

    return [x0 * (1 - t) + x1 * t, y0 * (1 - t) + y1 * t];
  }

  function cmul(_ref7, _ref8) {
    var _ref9 = _slicedToArray(_ref7, 2),
        x0 = _ref9[0],
        y0 = _ref9[1];

    var _ref10 = _slicedToArray(_ref8, 2),
        x1 = _ref10[0],
        y1 = _ref10[1];

    return [x0 * x1 - y0 * y1, x0 * y1 + y0 * x1];
  }

  function csub(_ref11, _ref12) {
    var _ref13 = _slicedToArray(_ref11, 2),
        x0 = _ref13[0],
        y0 = _ref13[1];

    var _ref14 = _slicedToArray(_ref12, 2),
        x1 = _ref14[0],
        y1 = _ref14[1];

    return [x0 - x1, y0 - y1];
  }

  function interpolateArc(a, m, b) {
    var b_m = csub(b, m);
    var m_a = csub(m, a);
    var ab_m = cmul(a, b_m);
    var bm_a = cmul(b, m_a);
    return function (t) {
      return cdiv(clerp(ab_m, bm_a, t), clerp(b_m, m_a, t));
    };
  }

  function arc(a, b) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var r = lineLength([a, b]) / 2;
    var s = scale([-1, 1], [-r, r], offset);
    var mid = lineMidpoint([a, b]);
    var theta = lineAngle([a, b]);
    var m = pointTranslate(mid, theta + 90, s);
    var i = interpolateArc(a, m, b);
    return sample(i);
  }

  function quadBezier(a, b, c) {
    var i = function i(t) {
      var x = Math.pow(1 - t, 2) * a[0] + 2 * t * (1 - t) * b[0] + Math.pow(t, 2) * c[0];
      var y = Math.pow(1 - t, 2) * a[1] + 2 * t * (1 - t) * b[1] + Math.pow(t, 2) * c[1];
      return [x, y];
    };

    return sample(i);
  } // See https://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves

  function cubicBezier(a, b, c, d) {
    var i = function i(t) {
      var x = Math.pow(1 - t, 3) * a[0] + 3 * t * Math.pow(1 - t, 2) * b[0] + 3 * Math.pow(t, 2) * (1 - t) * c[0] + Math.pow(t, 3) * d[0];
      var y = Math.pow(1 - t, 3) * a[1] + 3 * t * Math.pow(1 - t, 2) * b[1] + 3 * Math.pow(t, 2) * (1 - t) * c[1] + Math.pow(t, 3) * d[1];
      return [x, y];
    };

    return sample(i);
  }

  // The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
  // a value of 0 returns a, while a value of 1 returns b.
  // Intermediate values interpolate from start to end along the line segment.

  function lineInterpolate(line) {
    return function (t) {
      return t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
    };
  }

  function cubic(a, b) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
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

  function quad(a, b) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
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

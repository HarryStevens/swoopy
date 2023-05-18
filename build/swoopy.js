// https://github.com/HarryStevens/swoopy#readme Version 0.0.9. Copyright 2023 Harry Stevens.
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

  function atan2(y, x) {
    return Math.atan2(y, x);
  }
  function pow(x, y) {
    return Math.pow(x, y);
  }
  function sqrt(x) {
    return Math.sqrt(x);
  }

  function lineAngle(line) {
    return angleToDegrees(atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
  }

  function lineLength(line) {
    return sqrt(pow(line[1][0] - line[0][0], 2) + pow(line[1][1] - line[0][1], 2));
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
  }; // Recursive subdivision using perpendicular distance threshold:
  // An adaptive sampling strategy to discretize a path interpolator,
  // ensuring that the sampled points are always within the given precision from the actual path.
  // It does this by adding more points in the regions of the path where the curvature is higher
  // and fewer points where it's lower, thus achieving an efficient and accurate sampling.


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
  function scale(_ref, _ref2, value) {
    var _ref3 = _slicedToArray(_ref, 2),
        d0 = _ref3[0],
        d1 = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        r0 = _ref4[0],
        r1 = _ref4[1];

    var dx = d1 - d0;
    var rx = r1 - r0;
    return rx * ((value - d0) / dx) + r0;
  }

  // For the original implementation, see:
  // https://observablehq.com/@jrus/circle-arc-interpolation
  // https://observablehq.com/@jrus/complex
  // Divides two complex numbers

  function cdiv(z0, z1) {
    return cmul(z0, cinv(z1));
  } // Calculates the multiplicative inverse (or reciprocal) of a complex number


  function cinv(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    var s = 1 / (x * x + y * y);
    return [s * x, -s * y];
  } // Linearly interpolates between two complex numbers


  function clerp(_ref3, _ref4, t) {
    var _ref5 = _slicedToArray(_ref3, 2),
        x0 = _ref5[0],
        y0 = _ref5[1];

    var _ref6 = _slicedToArray(_ref4, 2),
        x1 = _ref6[0],
        y1 = _ref6[1];

    return [x0 * (1 - t) + x1 * t, y0 * (1 - t) + y1 * t];
  } // Multiplies two complex numbers


  function cmul(_ref7, _ref8) {
    var _ref9 = _slicedToArray(_ref7, 2),
        x0 = _ref9[0],
        y0 = _ref9[1];

    var _ref10 = _slicedToArray(_ref8, 2),
        x1 = _ref10[0],
        y1 = _ref10[1];

    return [x0 * x1 - y0 * y1, x0 * y1 + y0 * x1];
  } // Subtracts one complex number from another


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
    // Calculate two vectors: b_m and m_a,
    // which are the vectors from the midpoint to the end point
    // and from the start point to the midpoint, respectively
    var b_m = csub(b, m);
    var m_a = csub(m, a); // Calculate two more values: ab_m and bm_a.
    // The first is the complex multiplication of the start point and b_m,
    // and the second is the complex multiplication of the end point and m_a

    var ab_m = cmul(a, b_m);
    var bm_a = cmul(b, m_a); // Perform a linear interpolation between ab_m and bm_a and between b_m and m_a,
    // and divide the first result by the second.
    // This results in a point on the circular arc between a and b
    // that corresponds to the input parameter t.

    return function (t) {
      return cdiv(clerp(ab_m, bm_a, t), clerp(b_m, m_a, t));
    };
  } // Returns an array of points representing a circular arc
  // running between point a and point b,
  // both of which must be passed as an array of two numbers
  // representing the x- and y-coordinates of the points. 
  // You may pass an optional offse representing how round you want your arc to be.
  // If an offset is not specified, it defaults to 1, which will return the points of a semicircle.
  // An offset of 0 returns the points of a straight line segment.


  function arc(a, b) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var r = lineLength([a, b]) / 2;
    return sample(interpolateArc(a, pointTranslate(lineMidpoint([a, b]), lineAngle([a, b]) + 90, scale([-1, 1], [-r, r], offset)), b));
  }

  // The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
  // a value of 0 returns a, while a value of 1 returns b.
  // Intermediate values interpolate from start to end along the line segment.

  function lineInterpolate(line) {
    return function (t) {
      return t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
    };
  }

  function interpolateCubic(a, b, c, d) {
    return function (t) {
      var x = pow(1 - t, 3) * a[0] + 3 * t * pow(1 - t, 2) * b[0] + 3 * pow(t, 2) * (1 - t) * c[0] + pow(t, 3) * d[0];
      var y = pow(1 - t, 3) * a[1] + 3 * t * pow(1 - t, 2) * b[1] + 3 * pow(t, 2) * (1 - t) * c[1] + pow(t, 3) * d[1];
      return [x, y];
    };
  }

  function cubic(a, b) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
    var d = lineLength([a, b]);
    var i = lineInterpolate([a, b]);
    var theta = lineAngle([a, b]);
    return sample(interpolateCubic(a, pointTranslate(i(.4), theta + 90, d * offset), pointTranslate(i(.6), theta - 90, d * offset), b));
  }

  function interpolateQuad(a, b, c) {
    return function (t) {
      var x = pow(1 - t, 2) * a[0] + 2 * t * (1 - t) * b[0] + pow(t, 2) * c[0];
      var y = pow(1 - t, 2) * a[1] + 2 * t * (1 - t) * b[1] + pow(t, 2) * c[1];
      return [x, y];
    };
  }

  function quad(a, b) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
    return sample(interpolateQuad(a, pointTranslate(lineMidpoint([a, b]), lineAngle([a, b]) + 90, lineLength([a, b]) * offset), b));
  }

  exports.arc = arc;
  exports.cubic = cubic;
  exports.quad = quad;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

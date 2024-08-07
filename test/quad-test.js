const tape = require("tape"),
      swoopy = require("../"),
      round = require("./utils/roundArray");

tape("quad(a, b) returns a quadratic Bezier curve from point a to b ", test => {
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0]), 3),
    round([ [ 0, 0 ], [ 1.25, 1.094 ], [ 2.5, 1.875 ], [ 3.75, 2.344 ], [ 5, 2.5 ], [ 6.25, 2.344 ], [ 7.5, 1.875 ], [ 8.75, 1.094 ], [ 10, 0 ] ], 3)
  );
  test.end();
});

tape("quad(a, b, offset) accepts offsets", test => {
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], -.5), 3),
    round([ [ 0, 0 ], [ 1.25, -1.094 ], [ 2.5, -1.875 ], [ 3.75, -2.344 ], [ 5, -2.5 ], [ 6.25, -2.344 ], [ 7.5, -1.875 ], [ 8.75, -1.094 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], 0), 3),
    round([ [ 0, 0 ], [ 5, 0 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], 1), 3),
    round([ [ 0, 0 ], [ 1.25, 2.188 ], [ 2.5, 3.75 ], [ 3.75, 4.688 ], [ 5, 5 ], [ 6.25, 4.688 ], [ 7.5, 3.75 ], [ 8.75, 2.188 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], -1), 3),
    round([ [ 0, 0 ], [ 1.25, -2.188 ], [ 2.5, -3.75 ], [ 3.75, -4.688 ], [ 5, -5 ], [ 6.25, -4.688 ], [ 7.5, -3.75 ], [ 8.75, -2.188 ], [ 10, 0 ] ], 3)
  );
  test.end();
});

tape("quad(a, b, ..., precision) accepts precision", test => {
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], 0.5, 0.1), 3),
    round([ [ 0, 0 ], [ 1.25, 1.094 ], [ 2.5, 1.875 ], [ 3.75, 2.344 ], [ 5, 2.5 ], [ 6.25, 2.344 ], [ 7.5, 1.875 ], [ 8.75, 1.094 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], 0.5, 0.01), 3),
    round([ [ 0, 0 ], [ 0.625, 0.586 ], [ 1.25, 1.094 ], [ 1.875, 1.523 ], [ 2.5, 1.875 ], [ 3.125, 2.148 ], [ 3.75, 2.344 ], [ 4.375, 2.461 ], [ 5, 2.5 ], [ 5.625, 2.461 ], [ 6.25, 2.344 ], [ 6.875, 2.148 ], [ 7.5, 1.875 ], [ 8.125, 1.523 ], [ 8.75, 1.094 ], [ 9.375, 0.586 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.quad([0, 0], [10, 0], 0.5, 1), 3),
    round([ [ 0, 0 ], [ 5, 2.5 ], [ 10, 0 ] ], 3)
  );
  test.end();
});
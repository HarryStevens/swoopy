const tape = require("tape"),
      swoopy = require("../"),
      round = require("./utils/roundArray");

tape("arc(a, b) returns a semicricle from a to b ", test => {
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0]), 3),
    round([ [ 0, 0 ], [ 0.2, 1.4 ], [ 1, 3 ], [ 1.712, 3.767 ], [ 2.647, 4.412 ], [ 3.769, 4.846 ], [ 5, 5 ], [ 6.231, 4.846 ], [ 7.353, 4.412 ], [ 8.288, 3.767 ], [ 9, 3 ], [ 9.8, 1.4 ], [ 10, 0 ] ], 3)
  );
  test.end();
});

tape("arc(a, b, offset) accepts offsets", test => {
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], -.5), 3),
    round([ [ 0, 0 ], [ 0.89, -0.959 ], [ 2.059, -1.765 ], [ 3.462, -2.308 ], [ 5, -2.5 ], [ 6.538, -2.308 ], [ 7.941, -1.765 ], [ 9.11, -0.959 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], 0), 3),
    round([ [ 0, 0 ], [ 5, 0 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], .5), 3),
    round([ [ 0, 0 ], [ 0.89, 0.959 ], [ 2.059, 1.765 ], [ 3.462, 2.308 ], [ 5, 2.5 ], [ 6.538, 2.308 ], [ 7.941, 1.765 ], [ 9.11, 0.959 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], -1), 3),
    round([ [ 0, 0 ], [ 0.2, -1.4 ], [ 1, -3 ], [ 1.712, -3.767 ], [ 2.647, -4.412 ], [ 3.769, -4.846 ], [ 5, -5 ], [ 6.231, -4.846 ], [ 7.353, -4.412 ], [ 8.288, -3.767 ], [ 9, -3 ], [ 9.8, -1.4 ], [ 10, 0 ] ], 3)
  );
  test.end();
});

tape("arc(a, b, ..., precision) accepts precision", test => {
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], 1, 0.1), 3),
    round([ [ 0, 0 ], [ 0.2, 1.4 ], [ 1, 3 ], [ 1.712, 3.767 ], [ 2.647, 4.412 ], [ 3.769, 4.846 ], [ 5, 5 ], [ 6.231, 4.846 ], [ 7.353, 4.412 ], [ 8.288, 3.767 ], [ 9, 3 ], [ 9.8, 1.4 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], 1, 0.01), 3),
    round([ [ 0, 0 ], [ 0.01, 0.322 ], [ 0.044, 0.664 ], [ 0.106, 1.024 ], [ 0.2, 1.4 ], [ 0.332, 1.79 ], [ 0.506, 2.191 ], [ 0.727, 2.596 ], [ 1, 3 ], [ 1.328, 3.393 ], [ 1.712, 3.767 ], [ 2.153, 4.11 ], [ 2.647, 4.412 ], [ 3.189, 4.66 ], [ 3.769, 4.846 ], [ 4.377, 4.961 ], [ 5, 5 ], [ 5.623, 4.961 ], [ 6.231, 4.846 ], [ 6.811, 4.66 ], [ 7.353, 4.412 ], [ 7.847, 4.11 ], [ 8.288, 3.767 ], [ 8.672, 3.393 ], [ 9, 3 ], [ 9.273, 2.596 ], [ 9.494, 2.191 ], [ 9.668, 1.79 ], [ 9.8, 1.4 ], [ 9.894, 1.024 ], [ 9.956, 0.664 ], [ 9.99, 0.322 ], [ 10, 0 ] ], 3)
  );
  test.deepEqual(
    round(swoopy.arc([0, 0], [10, 0], 1, 1), 3),
    round([ [ 0, 0 ], [ 1, 3 ], [ 5, 5 ], [ 9, 3 ], [ 10, 0 ] ], 3)
  );
  test.end();
});
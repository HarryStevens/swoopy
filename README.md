# swoopy
Draw swoopy lines from one point to another. See it in action [here](https://observablehq.com/@harrystevens/hello-swoopy).

## Installation

### Web browser
In vanilla, a `swoopy` global is exported. You can use the latest version from unpkg.
```html
<script src="https://unpkg.com/swoopy@0.0.17/build/swoopy.js"></script>
<script src="https://unpkg.com/swoopy@0.0.17/build/swoopy.min.js"></script>
```
If you'd rather host it yourself, download the latest release from the [`build` directory](https://github.com/HarryStevens/swoopy/tree/master/build).

### npm

```bash
npm i swoopy -S
```
```js
const swoopy = require("swoopy");
```

## API

<a name="arc" href="#arc">#</a> swoopy.<b>arc</b>(<i>a</i>, <i>b</i>[, <i>offset</i>[, <i>precision</i>]]) · [Source](https://github.com/HarryStevens/swoopy/blob/master/src/arc.js "Source")

Returns an array of points representing a circular arc running between point <i>a</i> and point <i>b</i>, both of which must be passed as an array of two numbers representing the x- and y-coordinates of the points. You may pass an optional <i>offset</i> representing how round you want your arc to be. If an offset is not specified, it defaults to 1, which will return the points of a semicircle. An offset of 0 returns the points of a straight line segment. You may pass an optional <i>precision</i> representing how precisely to interpolate between the two points. A lower precision corresponds to more points interpolated along the curve. If a precision is not specified, it defaults to 0.1.

```js
const arc = swoopy.arc([0, 0], [10, 0]); // Returns the points of a semicircle between <0, 0> and <10, 0>.
```

<a name="cat" href="#cat">#</a> swoopy.<b>cat</b>(<i>a</i>, <i>b</i>[, <i>offset</i>[, <i>precision</i>]]) · [Source](https://github.com/HarryStevens/swoopy/blob/master/src/cat.js "Source")

Returns an array of points representing the [catenary curve](https://en.wikipedia.org/wiki/Catenary) running between point <i>a</i> and point <i>b</i>, both of which must be passed as an array of two numbers representing the x- and y-coordinates of the points. You may pass an optional <i>offset</i> representing how far perpendicularly from the midpoint of a and b to translate the control point of the Bézier curve. If an offset is not specified, it defaults to 0.5, or one-quarter the distance between a and b. You may pass an optional <i>precision</i> representing how precisely to interpolate between the two points. A lower precision corresponds to more points interpolated along the curve. If a precision is not specified, it defaults to 0.1. 

```js
const cat = swoopy.cat([0, 0], [10, 0]); // Returns the points of a catenary curve between <0, 0> and <10, 0>, with an offset that is one-quarter the distance between <0, 0> and <10, 0>.
```

<a name="cubic" href="#cubic">#</a> swoopy.<b>cubic</b>(<i>a</i>, <i>b</i>[, <i>offset</i>[, <i>precision</i>]]) · [Source](https://github.com/HarryStevens/swoopy/blob/master/src/cubic.js "Source")

Returns an array of points representing the cubic Bézier curve running between point <i>a</i> and point <i>b</i>, both of which must be passed as an array of two numbers representing the x- and y-coordinates of the points. You may pass an optional <i>offset</i> representing how far perpendicularly from the midpoint of a and b to translate the control points of the Bézier curve. If an offset is not specified, it defaults to 0.5, or one-quarter the distance between a and b. You may pass an optional <i>precision</i> representing how precisely to interpolate between the two points. A lower precision corresponds to more points interpolated along the curve. If a precision is not specified, it defaults to 0.1.  

```js
const cubic = swoopy.cubic([0, 0], [10, 0]); // Returns the points of a cubic Bézier curve between <0, 0> and <10, 0>, with offsets that are one-quarter the distance between <0, 0> and <10, 0>.
```

<a name="quad" href="#quad">#</a> swoopy.<b>quad</b>(<i>a</i>, <i>b</i>[, <i>offset</i>[, <i>precision</i>]]) · [Source](https://github.com/HarryStevens/swoopy/blob/master/src/quad.js "Source")

Returns an array of points representing the quadratic Bézier curve running between point <i>a</i> and point <i>b</i>, both of which must be passed as an array of two numbers representing the x- and y-coordinates of the points. You may pass an optional <i>offset</i> representing how far perpendicularly from the midpoint of a and b to translate the control point of the Bézier curve. If an offset is not specified, it defaults to 0.5, or one-quarter the distance between a and b. You may pass an optional <i>precision</i> representing how precisely to interpolate between the two points. A lower precision corresponds to more points interpolated along the curve. If a precision is not specified, it defaults to 0.1. 

```js
const quad = swoopy.quad([0, 0], [10, 0]); // Returns the points of a quadratic Bézier curve between <0, 0> and <10, 0>, with an offset that is one-quarter the distance between <0, 0> and <10, 0>.
```
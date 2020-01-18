# swoopy
Draw swoopy lines from one point to another. [![Build Status](https://travis-ci.org/HarryStevens/swoopy.svg?branch=master)](https://travis-ci.org/HarryStevens/swoopy)

## Installation

### Web browser
In vanilla, a `swoopy` global is exported. You can use the latest version from unpkg.
```html
<script src="https://unpkg.com/swoopy@0.0.1/build/swoopy.js"></script>
<script src="https://unpkg.com/swoopy@0.0.1/build/swoopy.min.js"></script>
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

<a name="quad" href="#quad">#</a> swoopy.<b>quad</b>(<i>a</i>, <i>b</i>[, <i>offset</i>]) · [Source](https://github.com/HarryStevens/swoopy/blob/master/src/quad.js "Source")

Returns an array of points representing the quadratic Bézier curve running between point <i>a</i> and point <i>b</i>, each of which must be passed as an array of two numbers representing the x- and y-coordinates of the points. You may pass an optional <i>offset</i> representing how far perpendicularly from the midpoint of a and b to translate the control point of the Bézier curve. If an offset is not specified, it defaults to .5, or half the distance between a and b.

```js
const mySwoop = swoopy.quad([0, 0], [10, 0], -.5); // Returns the points of a quadratic Bézier curve between <0, 0> and <10, 0>, which an offset that is negative half the distance between <0, 0> and <10, 0>.
```
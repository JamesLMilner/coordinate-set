# CoordinateSet

A specialist Set for handling longitude and latitude coordinate arrays. The easiest way to understand the use case for this library is the following code snippet:

```javascript
const set = new Set();
set.add([32.95, 83.31]);
set.add([32.95, 83.31]);
expect(set.size).toBe(2);
```

This behaves as we would expect for a JavaScript `Set` - it creates two entries for each `Array` reference. However, this library, in simple terms, allows coordinate Arrays (of type `[number, number]`, where [0] is a valid longitude and [1] is valid latitude) to be treated as values rather than references, like so:

```javascript
const set = new CoordinateSet();
set.add([32.95, 83.31]);
set.add([32.95, 83.31]);
expect(set.size).toBe(1);
```

The API matches the original `Set` API as closely as possible.

## Install

```shell
npm install coordinate-set
```

## Usage

```javascript
import { CoordinateSet } from "./src/coordinate-set";

const coordinateSet = new CoordinateSet();

coordinateSet.add([51.509865, -0.118092]); // undefined
coordinateSet.add([51.509865, -0.118092]); // undefined
coordinateSet.has([42.509865, -0.231312]); // false
coordinateSet.add([42.509865, -0.231312]); // undefined
coordinateSet.size; // 2
coordinateSet.delete([51.509865, -0.118092]); // true
coordinateSet.size; // 1
coordinate.clear(); // undefined
coordinateSet.size; // 0

coordinateSet.forEach((value, index, set) => {
  // value: [51.509865, -0.118092]
  // index: 0
  // set: coordinateMap
});

// Spread syntax
const spread = [...coordinateSet];

// for...of
const values = [];
for (let entry of coordinateSet) {
  values.push(entry);
}
```

## License

MIT

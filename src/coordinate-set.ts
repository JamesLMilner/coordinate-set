export class CoordinateSet {
  constructor(arrOrCoordSet?: [number, number][] | CoordinateSet) {
    this._map = new Map();

    if (Array.isArray(arrOrCoordSet)) {
      arrOrCoordSet.forEach((c) => {
        this._validateCoordinate(c);
        this._map.set(this._getKey(c), c);
      });
      this._size = arrOrCoordSet.length;
    } else if (arrOrCoordSet instanceof CoordinateSet) {
      arrOrCoordSet.forEach((c) => {
        this._map.set(this._getKey(c), c);
      });
      this._size = arrOrCoordSet.size;
    } else {
      this._size = 0;
    }
  }

  private _size: number;
  private _map: Map<string, [number, number]>;

  private _getKey(coordinates: [number, number]) {
    return `${coordinates[0]},${coordinates[1]}`;
  }

  private _validateCoordinate([lng, lat]: [number, number]) {
    if (
      !(typeof lng === "number" && !isNaN(lng) && lng >= -180 && lng <= 180)
    ) {
      throw new Error("Longitude must be valid");
    } else if (
      !(typeof lat === "number" && !isNaN(lat) && lat >= -90 && lat <= 90)
    ) {
      throw new Error("Latitude must be valid");
    }
  }

  *[Symbol.iterator]() {
    for (let entry of this._map.entries()) {
      yield [entry[1], entry[1]];
    }
  }

  entries() {
    return this[Symbol.iterator]();
  }

  forEach(
    callback: (
      value: [number, number],
      index: number,
      set: CoordinateSet
    ) => void
  ): void {
    [...this.entries()].forEach((entryValue, entryIndex) => {
      callback(entryValue[0], entryIndex, this);
    });
  }

  // O(1)
  get size(): number {
    return this._size;
  }

  // Ignore setting the size property publically
  set size(value: number) {}

  has(coordinate: [number, number]) {
    this._validateCoordinate(coordinate);
    return Boolean(this._map.get(this._getKey(coordinate)));
  }

  add(coordinate: [number, number]) {
    this._validateCoordinate(coordinate);
    const key = this._getKey(coordinate);
    if (this._map.get(key)) {
      return;
    }
    this._size++;
    this._map.set(key, coordinate);
    return this;
  }

  delete(coordinate: [number, number]): boolean {
    this._validateCoordinate(coordinate);
    const key = this._getKey(coordinate);
    if (!this._map.get(key)) {
      return false;
    }
    this._size--;
    return this._map.delete(key);
  }

  clear() {
    this._map = new Map();
    this._size = 0;
  }
}

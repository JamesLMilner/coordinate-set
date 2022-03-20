export declare class CoordinateSet {
    constructor(arrOrCoordSet?: [number, number][] | CoordinateSet);
    private _size;
    private _map;
    private _getKey;
    private _validateCoordinate;
    [Symbol.iterator](): Generator<[number, number][], void, unknown>;
    entries(): Generator<[number, number][], void, unknown>;
    forEach(callback: (value: [number, number], index: number, set: CoordinateSet) => void): void;
    get size(): number;
    set size(value: number);
    has(coordinate: [number, number]): boolean;
    add(coordinate: [number, number]): this;
    delete(coordinate: [number, number]): boolean;
    clear(): void;
}

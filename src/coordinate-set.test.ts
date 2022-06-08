import { CoordinateSet } from "./coordinate-set";

describe("CoordinateSet", () => {
  describe("constuctor does not throw", () => {
    it("no argument doesn't throw", () => {
      expect(() => {
        new CoordinateSet();
      }).not.toThrowError();
    });

    it("array argument doesn't throw", () => {
      expect(() => {
        new CoordinateSet([[0.1, 0.2]]);
      }).not.toThrowError();
    });

    it("non array argument", () => {
      expect(() => {
        new CoordinateSet(1 as any);
      }).not.toThrowError();
    });

    it("CoordinateSet is passed", () => {
      expect(() => {
        new CoordinateSet(new CoordinateSet());
      }).not.toThrowError();
    });
  });

  describe("iterator", () => {
    const input = [
      [0, 0],
      [1, 1],
      [2, 2],
    ] as [number, number][];

    const output = [...input];

    it("for...of", () => {
      const set = new CoordinateSet(input);

      const values = [];
      for (let entry of set) {
        values.push(entry);
      }

      expect(values).toStrictEqual(output);
    });

    it("spread", () => {
      const set = new CoordinateSet(input);

      expect([...set]).toStrictEqual(output);
    });

    it("forEach", () => {
      const set = new CoordinateSet(input);

      let values = [];
      set.forEach((value, index, set) => {
        values.push([value, index, set]);
      });

      expect(values).toStrictEqual([
        [[0, 0], 0, set],
        [[1, 1], 1, set],
        [[2, 2], 2, set],
      ]);
    });

    it("entries", () => {
      const set = new CoordinateSet(input);
      const iterator1 = set.entries();

      let values = [];
      for (const entry of iterator1) {
        values.push(entry);
      }

      expect(values).toStrictEqual([
        [
          [0, 0],
          [0, 0],
        ],
        [
          [1, 1],
          [1, 1],
        ],
        [
          [2, 2],
          [2, 2],
        ],
      ]);
    });
  });

  describe("has/add", () => {
    it("has method returns false when it does not have coordinate", () => {
      const set = new CoordinateSet();
      expect(set.has([0.1, 0.2])).toBe(false);
    });

    it("has method returns true when that coordinate has been added", () => {
      const set = new CoordinateSet();
      set.add([0.1, 0.2]);
      expect(set.has([0.1, 0.2])).toBe(true);
    });

    it("has method throws for invalid longitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.has([181, 0.2]);
      }).toThrow();
    });

    it("has method throws for invalid latitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.has([0, 91]);
      }).toThrow();
    });

    it("add method throws for invalid longitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.add([181, 0.2]);
      }).toThrow();
    });

    it("add method throws for invalid latitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.add([0, 91]);
      }).toThrow();
    });

    it("has method can check that CoordinateSet works as an argument", () => {
      expect(() => {
        const set = new CoordinateSet(new CoordinateSet([[0.1, 0.2]]));
        set.has([0.1, 0.2]);
      }).not.toThrowError();
    });
  });

  describe("delete", () => {
    it("deletes coordinate, returns true because coordinate is present", () => {
      const set = new CoordinateSet();
      set.add([0.1, 0.2]);
      expect(set.has([0.1, 0.2])).toBe(true);
      expect(set.delete([0.1, 0.2])).toBe(true);
    });

    it("deletes coordinate, returns false because coordinate is not present", () => {
      const set = new CoordinateSet();

      expect(set.has([0.1, 0.2])).toBe(false);
      expect(set.delete([0.1, 0.2])).toBe(false);
    });

    it("throws for invalid coordinate", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.delete([181, 0.2]);
      }).toThrow();
    });
  });

  describe("size", () => {
    it("size starts at 0", () => {
      const set = new CoordinateSet();
      expect(set.size).toBe(0);
    });

    it("size is incremented on addition", () => {
      const set = new CoordinateSet();

      set.add([0.1, 0.2]);
      expect(set.size).toBe(1);
      set.add([180, -90]);
      expect(set.size).toBe(2);
      set.add([180, -90]);
    });

    it("size is decremented on deletion", () => {
      const set = new CoordinateSet();

      set.add([180, -90]);
      set.add([0.1, 0.2]);
      set.delete([180, -90]);
      expect(set.size).toBe(1);
      set.delete([0.1, 0.2]);
      expect(set.size).toBe(0);
    });

    it("setting the size has no effect", () => {
      const set = new CoordinateSet();

      set.size = 100;
      expect(set.size).toBe(0);
      (set.size as any) = "nonsense";
      expect(set.size).toBe(0);
    });
  });

  describe("clear", () => {
    it("clears the set, setting size to 0 and returning undefined", () => {
      const set = new CoordinateSet();
      expect(set.size).toBe(0);

      set.add([0.1, 0.2]);
      set.add([180, -90]);
      expect(set.size).toBe(2);

      expect(set.clear()).toBe(undefined);
      expect(set.size).toBe(0);
    });
  });

  describe("constuctor updates correct values", () => {
    it("no argument doesn't throw", () => {
      const set = new CoordinateSet();
      expect(set.size).toBe(0);
    });

    it("array argument doesn't throw", () => {
      const set = new CoordinateSet([[0.1, 0.2]]);
      expect(set.size).toBe(1);
      expect(set.has([0.1, 0.2])).toBe(true);
    });

    it("CoordinateSet argument sets values correctly", () => {
      const set = new CoordinateSet([[0.1, 0.2]]);
      const anotherSet = new CoordinateSet(set);
      expect(anotherSet.size).toBe(1);
      expect(anotherSet.has([0.1, 0.2])).toBe(true);
    });

    it("non array argument", () => {
      const set = new CoordinateSet(1 as any);
      expect(set.size).toBe(0);
    });
  });

  describe("isSuperset", () => {
    function isSuperset(set: CoordinateSet, subset: CoordinateSet) {
      for (let elem of subset) {
        if (!set.has(elem)) {
          return false;
        }
      }
      return true;
    }

    it("determines correct supersets", () => {
      expect(
        isSuperset(
          new CoordinateSet([
            [1, 1],
            [2, 2],
          ]),
          new CoordinateSet([[1, 1]])
        )
      ).toBe(true);
    });

    it("determines correct non supersets", () => {
      expect(
        isSuperset(new CoordinateSet([[2, 2]]), new CoordinateSet([[1, 1]]))
      ).toBe(false);
    });
  });

  describe("union", () => {
    function union(setA: CoordinateSet, setB: CoordinateSet) {
      let _union = new CoordinateSet(setA);
      for (let elem of setB) {
        _union.add(elem);
      }
      return _union;
    }

    it("performs union correctly", () => {
      const unioned = union(
        new CoordinateSet([
          [1, 1],
          [2, 2],
        ]),
        new CoordinateSet([[1, 1]])
      );

      expect(unioned.size).toBe(2);
      expect(unioned.has([1, 1])).toBe(true);
      expect(unioned.has([2, 2])).toBe(true);
    });
  });

  describe("intersection", () => {
    function intersection(setA: CoordinateSet, setB: CoordinateSet) {
      let _intersection = new CoordinateSet();
      for (let elem of setB) {
        if (setA.has(elem)) {
          _intersection.add(elem);
        }
      }
      return _intersection;
    }

    it("performs intersection correctly", () => {
      const intersectioned = intersection(
        new CoordinateSet([
          [1, 1],
          [2, 2],
        ]),
        new CoordinateSet([
          [1, 1],
          [3, 3],
        ])
      );

      expect(intersectioned.size).toBe(1);
      expect(intersectioned.has([1, 1])).toBe(true);
    });
  });

  describe("intersection", () => {
    function symmetricDifference(setA, setB) {
      let _difference = new CoordinateSet(setA);
      for (let elem of setB) {
        if (_difference.has(elem)) {
          _difference.delete(elem);
        } else {
          _difference.add(elem);
        }
      }
      return _difference;
    }

    it("performs symmetric difference correctly", () => {
      const symmetricDiff = symmetricDifference(
        new CoordinateSet([
          [1, 1],
          [2, 2],
        ]),
        new CoordinateSet([
          [1, 1],
          [3, 3],
        ])
      );

      expect(symmetricDiff.size).toBe(2);
      expect(symmetricDiff.has([2, 2])).toBe(true);
      expect(symmetricDiff.has([3, 3])).toBe(true);
    });
  });

  describe("difference", () => {
    function difference(setA: CoordinateSet, setB: CoordinateSet) {
      let _difference = new CoordinateSet(setA);
      for (let elem of setB) {
        _difference.delete(elem);
      }
      return _difference;
    }

    it("performs symmetric difference correctly", () => {
      const diff = difference(
        new CoordinateSet([
          [1, 1],
          [2, 2],
        ]),
        new CoordinateSet([
          [1, 1],
          [3, 3],
        ])
      );
      expect(diff.size).toBe(1);
      expect(diff.has([2, 2])).toBe(true);
    });
  });
});

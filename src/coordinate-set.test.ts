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
  });

  describe("iterator", () => {
    const input = [
      [0, 0],
      [1, 1],
      [2, 2],
    ] as [number, number][];

    const output = [
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
    ];

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

      expect(values).toStrictEqual(output);
    });
  });

  describe("has/add", () => {
    it("does not have coordinate", () => {
      const set = new CoordinateSet();
      expect(set.has([0.1, 0.2])).toBe(false);
    });

    it("does have coordinate", () => {
      const set = new CoordinateSet();
      set.add([0.1, 0.2]);
      expect(set.has([0.1, 0.2])).toBe(true);
    });

    it("has throws for bad longitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.has([181, 0.2]);
      }).toThrow();
    });

    it("has throws for bad latitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.has([0, 91]);
      }).toThrow();
    });

    it("add throws for bad longitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.add([181, 0.2]);
      }).toThrow();
    });

    it("add throws for bad latitude", () => {
      const set = new CoordinateSet();
      expect(() => {
        set.add([0, 91]);
      }).toThrow();
    });

    it("CoordinateSet works as an argument", () => {
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

    it("throws for bad coordinate", () => {
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

    it("non array argument", () => {
      const set = new CoordinateSet(1 as any);
      expect(set.size).toBe(0);
    });
  });
});

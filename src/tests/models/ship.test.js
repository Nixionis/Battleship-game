import newShip from "../../models/ship";

describe("Ship behaviour", () => {
  const largeShip = newShip(4, 0, 0);

  test("Ship position", () => {
    expect(largeShip.getPosition()).toEqual([0, 0]);
  });

  test("Hit once", () => {
    expect(largeShip.hit()).toBe(3);
  });

  test("Is sunk before and after 3 hits", () => {
    expect(largeShip.isSunk()).toBe(false);
    largeShip.hit();
    largeShip.hit();
    largeShip.hit();
    expect(largeShip.isSunk()).toBe(true);
  });
});

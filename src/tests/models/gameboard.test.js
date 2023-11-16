import newGameboard from "../../models/gameboard";

describe("Gameboard creation and test", () => {
  const myGameboard = newGameboard(10);

  test("Try to place large ship in valid place", () => {
    expect(myGameboard.tryPlaceShip(4, 0, 0, true)).toBe(true);
  });

  test("Try to place big ship in invalid place (occupied)", () => {
    expect(myGameboard.tryPlaceShip(3, 0, 0, false)).toBe(false);
  });

  test("Check to place big ship in invalid place (adjacent to antoher ship)", () => {
    const placeX = 1;
    const placeY = 1;
    let result = false;

    for (let i = 0; i < 3; i += 1) {
      result = myGameboard.checkAdjacentCells(placeX + i, placeY);
      if (result === false) break;
    }
    expect(result).toBe(false);
  });

  test("Get ship from cell", () => {
    expect(myGameboard.getCellDataAt(0, 0)[0]).toEqual(false);
    expect(typeof myGameboard.getCellDataAt(0, 0)[1]).toEqual("object");
  });

  test("Get empty cell", () => {
    expect(myGameboard.getCellDataAt(1, 1)[0]).toEqual(false);
    expect(myGameboard.getCellDataAt(1, 1)[1]).toEqual(null);
  });

  test("Shot at empty cell and get it data", () => {
    myGameboard.receiveAttack(1, 1);
    expect(myGameboard.getCellDataAt(1, 1)[0]).toEqual(true);
    expect(myGameboard.getCellDataAt(1, 1)[1]).toEqual(null);
  });

  test("Shot at small ship and get ship left amount", () => {
    expect(myGameboard.tryPlaceShip(1, 2, 2, true)).toBe(true);
    expect(myGameboard.getShipAliveAmount()).toBe(2);

    const armor = myGameboard.receiveAttack(2, 2);
    expect(armor).toBe(0);
    expect(myGameboard.getShipAliveAmount()).toBe(1);
  });
});

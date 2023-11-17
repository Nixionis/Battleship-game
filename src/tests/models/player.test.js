import createPlayer, { createAIPlayer } from "../../models/player";

describe("Player creation and test", () => {
  const myPlayer = createPlayer();

  test("Try to get empty ship data", () => {
    expect(myPlayer.getAliveShips()).toEqual({
      Large: 0,
      Big: 0,
      Medium: 0,
      Small: 0,
    });
  });

  test("Try to add huge ship", () => {
    expect(myPlayer.addShip("Huge")).toEqual("Unknown ship size");
  });

  test("Add medium and big ships", () => {
    myPlayer.addShip("Medium");
    myPlayer.addShip("Big");

    expect(myPlayer.getAliveShips()).toEqual({
      Large: 0,
      Big: 1,
      Medium: 1,
      Small: 0,
    });
  });

  test("Remove medium ship", () => {
    myPlayer.removeShip("Medium");

    expect(myPlayer.getAliveShips()).toEqual({
      Large: 0,
      Big: 1,
      Medium: 0,
      Small: 0,
    });
  });
});

describe("AI Player creation and test", () => {
  const myPlayer = createAIPlayer();

  test("Try to get empty ship data", () => {
    expect(myPlayer.getAliveShips()).toEqual({
      Large: 0,
      Big: 0,
      Medium: 0,
      Small: 0,
    });
  });

  test("Try to add huge ship", () => {
    expect(myPlayer.addShip("Huge")).toEqual("Unknown ship size");
  });

  test("Add medium and big ships", () => {
    myPlayer.addShip("Medium");
    myPlayer.addShip("Big");

    expect(myPlayer.getAliveShips()).toEqual({
      Large: 0,
      Big: 1,
      Medium: 1,
      Small: 0,
    });
  });

  test("Remove medium ship", () => {
    myPlayer.removeShip("Medium");

    expect(myPlayer.getAliveShips()).toEqual({
      Large: 0,
      Big: 1,
      Medium: 0,
      Small: 0,
    });
  });

  test("Attack all cells on 10x10 board", () => {
    myPlayer.populateAttackCells(10);
    const attackObject = {};

    for (let i = 0; i < 100; i += 1) {
      const attack = myPlayer.attackRandomCell();
      attackObject[`${attack[0]}-${attack[1]}`] = true;
    }

    const uniqueAttacks = Object.keys(attackObject).length;

    expect(uniqueAttacks).toBe(100);
  });
});

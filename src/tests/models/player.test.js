import createPlayer from "../../models/player";

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

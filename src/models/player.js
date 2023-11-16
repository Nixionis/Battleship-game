function createPlayer() {
  const aliveShipsObject = {
    Large: 0,
    Big: 0,
    Medium: 0,
    Small: 0,
  };

  const availableShipsSizes = ["Large", "Big", "Medium", "Small"];

  function addShip(shipType) {
    if (!availableShipsSizes.includes(shipType)) return "Unknown ship size";
    aliveShipsObject[shipType] += 1;
    return null;
  }

  function removeShip(shipType) {
    aliveShipsObject[shipType] -= 1;
  }

  function getAliveShips() {
    return { ...aliveShipsObject };
  }

  return { addShip, removeShip, getAliveShips };
}

export default createPlayer;

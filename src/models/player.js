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

function createAIPlayer() {
  const availableCells = [];
  const playerObject = createPlayer();

  function populateAttackCells(boardSize) {
    for (let i = 0; i < boardSize; i += 1) {
      for (let j = 0; j < boardSize; j += 1) {
        availableCells.push([i, j]);
      }
    }
  }

  function attackRandomCell() {
    const attackIndex = Math.floor(Math.random() * availableCells.length);
    const attackResult = availableCells[attackIndex];
    availableCells.splice(attackIndex, 1);
    return attackResult;
  }

  return { populateAttackCells, attackRandomCell, ...playerObject };
}

export default createPlayer;
export { createAIPlayer };

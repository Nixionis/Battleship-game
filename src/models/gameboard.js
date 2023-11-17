import newShip from "./ship";

function newGameboard(boardSize) {
  const BOARD_SIZE = boardSize;
  const BOARD_CELLS = [];
  const boardShips = [];

  for (let i = 0; i < BOARD_SIZE; i += 1) {
    BOARD_CELLS[i] = [];
    for (let j = 0; j < BOARD_SIZE; j += 1) {
      // First element if cell is shot, second element is ship object if placed
      BOARD_CELLS[i][j] = [false, null];
    }
  }

  function checkIfInBoard(positionX, positionY) {
    return !(
      positionX >= BOARD_SIZE ||
      positionX < 0 ||
      positionY >= BOARD_SIZE ||
      positionY < 0
    );
  }

  function tryPlaceShip(shipLength, positionX, positionY, horizontal = false) {
    if (!checkIfInBoard(positionX, positionY)) return false;

    for (let i = 0; i < shipLength; i += 1) {
      if (horizontal) {
        if (!checkIfInBoard(positionX, positionY + i)) return false;

        if (BOARD_CELLS[positionX][positionY + i][1] !== null) return false;
      } else {
        if (!checkIfInBoard(positionX + i, positionY)) return false;
        if (BOARD_CELLS[positionX + i][positionY][1] !== null) return false;
      }
    }

    const placedShip = newShip(shipLength, positionX, positionY);
    boardShips.push(placedShip);

    for (let i = 0; i < shipLength; i += 1) {
      if (horizontal) {
        BOARD_CELLS[positionX][positionY + i][1] =
          boardShips[boardShips.length - 1];
      } else {
        BOARD_CELLS[positionX + i][positionY][1] =
          boardShips[boardShips.length - 1];
      }
    }

    return true;
  }

  function getCellDataAt(positionX, positionY) {
    if (!checkIfInBoard(positionX, positionY)) return null;

    return BOARD_CELLS[positionX][positionY];
  }

  function receiveAttack(positionX, positionY) {
    if (!checkIfInBoard(positionX, positionY)) return null;

    BOARD_CELLS[positionX][positionY][0] = true;
    const cellShip = BOARD_CELLS[positionX][positionY][1];

    if (cellShip !== null) {
      return cellShip.hit();
    }

    return null;
  }

  function getShipAliveAmount() {
    if (boardShips.length === 0) {
      return 0;
    }
    const resultShips = [0, 0, 0, 0];

    for (let i = 0; i < boardShips.length; i += 1) {
      if (!boardShips[i].isSunk())
        resultShips[boardShips[i].getLength() - 1] += 1;
    }

    return {
      Large: resultShips[3],
      Big: resultShips[2],
      Medium: resultShips[1],
      Small: resultShips[0],
    };
  }

  function checkAdjacentCells(cellPositionX, cellPositionY) {
    if (!checkIfInBoard(cellPositionX, cellPositionY)) return false;

    for (let i = -1; i < 2; i += 1) {
      for (let j = -1; j < 2; j += 1) {
        const checkX = cellPositionX + i;
        const checkY = cellPositionY + j;
        if (
          !(
            checkX < 0 ||
            checkX >= BOARD_SIZE ||
            checkY < 0 ||
            checkY >= BOARD_SIZE
          )
        )
          if (BOARD_CELLS[checkX][checkY][1] !== null) return false;
      }
    }

    return true;
  }

  function placeShipsRandomly(buildQueue) {
    while (buildQueue.length > 0) {
      const randomX = Math.floor(Math.random() * BOARD_SIZE);
      const randomY = Math.floor(Math.random() * BOARD_SIZE);
      const randomRotate =
        Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
      let success = false;

      for (let i = 0; i < buildQueue[buildQueue.length - 1]; i += 1) {
        const checkX = randomRotate ? randomX : randomX + i;
        const checkY = randomRotate ? randomY + i : randomY;
        success = checkAdjacentCells(checkX, checkY);

        if (!success) break;
      }

      if (success)
        tryPlaceShip(buildQueue.pop(), randomX, randomY, randomRotate);
    }
  }

  return {
    tryPlaceShip,
    getCellDataAt,
    receiveAttack,
    getShipAliveAmount,
    checkAdjacentCells,
    placeShipsRandomly,
  };
}

export default newGameboard;

import createDOMController from "./domController";
import newGameboard from "../models/gameboard";
import { default as createPlayer, createAIPlayer } from "../models/player";

function newGameController(doc) {
  let firstPlayerTurn = true;
  let gamePlaying = false;
  let buildPhase = true;
  let horizontalBuild = true;
  let hoverPosition = [];

  const buildQueue = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
  let canBuild = false;

  const BOARD_SIZE = 10;

  const firstPlayer = createPlayer();
  const secondPlayer = createAIPlayer();
  const playerGameboard = newGameboard(BOARD_SIZE);
  const enemyGameboard = newGameboard(BOARD_SIZE);

  const domController = createDOMController(doc);
  domController.generateGrid(BOARD_SIZE, true);
  domController.generateGrid(BOARD_SIZE, false);

  async function makeAITurn() {
    const attackCell = secondPlayer.attackRandomCell();

    await new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
    domController.setActionText("Enemy thinking!", 0);

    await new Promise((resolve) => {
      setTimeout(() => resolve(), Math.floor(Math.random() * 1000) + 250);
    });

    console.log("enemy click at", attackCell[0], attackCell[1]);
    cellClick(attackCell[0], attackCell[1], true);
  }

  function onGameStart() {
    gamePlaying = true;
  }

  function changeTurn() {
    firstPlayerTurn = !firstPlayerTurn;
    if (!firstPlayerTurn) {
      makeAITurn();
    }
  }

  function drawShipsAlive() {
    domController.updateShipScore(playerGameboard.getShipAliveAmount(), true);
    domController.updateShipScore(enemyGameboard.getShipAliveAmount(), false);
  }

  function startAIPlayer() {
    const computerBuildQueue = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    const shipTypes = {
      1: "Small",
      2: "Medium",
      3: "Big",
      4: "Large",
    };

    computerBuildQueue.forEach((shipSize) => {
      secondPlayer.addShip(shipTypes[shipSize]);
    });

    enemyGameboard.placeShipsRandomly(computerBuildQueue);
    secondPlayer.populateAttackCells(BOARD_SIZE);
  }

  function checkWin() {
    console.log("alive player", playerGameboard.getShipAliveAmount());
    console.log("alive enemy", enemyGameboard.getShipAliveAmount());
    const playerAlive = Object.values(playerGameboard.getShipAliveAmount());
    const enemyAlive = Object.values(enemyGameboard.getShipAliveAmount());

    if (playerAlive.reduce((sum, value) => sum + value, 0) === 0) {
      gamePlaying = false;
      domController.setActionText("Enemy wins!", 2);
      return true;
    } else if (enemyAlive.reduce((sum, value) => sum + value, 0) === 0) {
      gamePlaying = false;
      domController.setActionText("Player wins!", 1);
      return true;
    }

    return false;
  }

  function onPlayerGridHover(positionX, positionY) {
    hoverPosition = [positionX, positionY];
    if (buildPhase) {
      const currentShipSize = buildQueue[buildQueue.length - 1];
      canBuild = true;

      for (let i = 0; i < currentShipSize; i += 1) {
        const checkX = horizontalBuild ? positionX : positionX + i;
        const checkY = horizontalBuild ? positionY + i : positionY;
        canBuild = playerGameboard.checkAdjacentCells(checkX, checkY);

        if (!canBuild) break;
      }

      domController.showPlacement(
        positionX,
        positionY,
        currentShipSize,
        horizontalBuild,
        canBuild
      );
    }
  }

  function placeShip(positionX, positionY, forPlayer) {
    let currentShipSize = null;
    if (forPlayer) {
      currentShipSize = buildQueue.pop();
      domController.placeShipForPlayer(
        positionX,
        positionY,
        currentShipSize,
        horizontalBuild
      );
    }

    const shipTypes = {
      1: "Small",
      2: "Medium",
      3: "Big",
      4: "Large",
    };

    if (forPlayer) {
      firstPlayer.addShip(shipTypes[currentShipSize]);
      playerGameboard.tryPlaceShip(
        currentShipSize,
        positionX,
        positionY,
        horizontalBuild
      );

      domController.updateShipScore(firstPlayer.getAliveShips(), true);

      if (buildQueue.length === 0) {
        buildPhase = false;
        startAIPlayer();
        domController.setActionText(`Your turn`, 1);
        onGameStart();
      } else {
        domController.setActionText(
          `Place your ${
            shipTypes[buildQueue[buildQueue.length - 1]]
          } ship (Press R to rotate)`,
          0
        );
      }
    }
  }

  function cellClick(positionX, positionY, forPlayer) {
    console.log("Cell click!");

    if (forPlayer && canBuild && buildPhase) {
      placeShip(positionX, positionY, forPlayer);
      return;
    }

    if (gamePlaying && firstPlayerTurn && !forPlayer) {
      // Fire at enemy
      const fireCell = enemyGameboard.getCellDataAt(positionX, positionY);

      if (fireCell[0] === true) return;

      if (enemyGameboard.receiveAttack(positionX, positionY) !== null) {
        domController.markCell(positionX, positionY, 1, false);
        domController.setActionText("Hit! Your turn!", 1);
        drawShipsAlive();
        checkWin();
      } else {
        domController.markCell(positionX, positionY, 0, false);
        domController.setActionText("Miss! Enemy turn!", 2);
        changeTurn();
      }
    } else if (gamePlaying && !firstPlayerTurn && forPlayer) {
      // Fire at player
      const fireCell = playerGameboard.getCellDataAt(positionX, positionY);

      if (fireCell[0] === true) {
        makeAITurn();
        return;
      }

      if (playerGameboard.receiveAttack(positionX, positionY) !== null) {
        domController.markCell(positionX, positionY, 1, true);
        domController.setActionText("Hit! Enemy turn!", 2);
        drawShipsAlive();
        if (!checkWin()) makeAITurn();
      } else {
        domController.markCell(positionX, positionY, 0, true);
        domController.setActionText("Miss! Your turn!", 1);
        changeTurn();
      }
    }

    //TODO: detect sunk ships and check for win condition
  }

  domController.subscribeToCellHover(onPlayerGridHover);
  domController.subscribeToCellClick(cellClick);

  window.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
      horizontalBuild = !horizontalBuild;
      onPlayerGridHover(hoverPosition[0], hoverPosition[1]);
    }
  });

  return {};
}

export default newGameController;

function newGameController(
  newDomControl,
  newShip,
  newGameboard,
  newPlayer,
  doc
) {
  let firstPlayerTurn = true;
  let gamePlaying = false;
  let buildPhase = true;
  let horizontalBuild = true;
  let hoverPosition = [];

  const buildQueue = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
  let canBuild = false;

  const BOARD_SIZE = 10;

  const firstPlayer = newPlayer();
  const secondPlayer = newPlayer();
  const playerGameboard = newGameboard(BOARD_SIZE);
  const enemyGameboard = newGameboard(BOARD_SIZE);

  const domController = newDomControl(doc);
  domController.generateGrid(BOARD_SIZE, true);
  domController.generateGrid(BOARD_SIZE, false);

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
    console.log("Ready for battle");
    //TODO: Start game loop
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
      }
    }
  }

  function cellClick(positionX, positionY, forPlayer) {
    if (forPlayer && (!canBuild || !buildPhase)) return;

    if (forPlayer && canBuild && buildPhase) {
      placeShip(positionX, positionY, forPlayer);
    }
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

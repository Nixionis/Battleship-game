function createDOMController(doc) {
  const playerGrid = doc.querySelector("#player-grid");
  const enemyGrid = doc.querySelector("#enemy-grid");
  let gridSize = null;

  const actionText = doc.querySelector(".player-action");

  const playerLargeShips = doc.querySelector("#player-large");
  const playerBigShips = doc.querySelector("#player-big");
  const playerMediumShips = doc.querySelector("#player-medium");
  const playerSmallShips = doc.querySelector("#player-small");

  const enemyLargeShips = doc.querySelector("#enemy-large");
  const enemyBigShips = doc.querySelector("#enemy-big");
  const enemyMediumShips = doc.querySelector("#enemy-medium");
  const enemySmallShips = doc.querySelector("#enemy-small");

  const cellClickSubscribers = [];
  const cellHoverSubscribers = [];

  const buildCells = [];

  function callSubscribeCellClick(positionX, positionY, isPlayerGrid) {
    cellClickSubscribers.forEach((sub) =>
      sub(positionX, positionY, isPlayerGrid)
    );
  }

  function subscribeToCellClick(subscribeCb) {
    cellClickSubscribers.push(subscribeCb);
  }

  function callSubscribeCellHover(positionX, positionY) {
    cellHoverSubscribers.forEach((sub) => sub(positionX, positionY));
  }

  function subscribeToCellHover(subscribeCb) {
    cellHoverSubscribers.push(subscribeCb);
  }

  /*
    <div class="grid__cell my-ship">
      <span class="material-icons-round"> circle </span>
    </div>
    <div class="grid__cell"></div>
    <div class="grid__cell empty">
      <span class="material-icons-round"> close </span>
    </div>
    <div class="grid__cell"></div>
    <div class="grid__cell enemy-ship"></div>
    <div class="grid__cell active"></div>
    <div class="grid__cell"></div>
  */
  function clearBuildCells() {
    while (buildCells.length > 0) {
      const currentCell = buildCells.pop();
      currentCell.classList.remove("valid");
      currentCell.classList.remove("invalid");
    }
  }

  function generateGrid(newGridSize, forPlayer) {
    gridSize = newGridSize;
    for (let i = 0; i < gridSize; i += 1) {
      for (let j = 0; j < gridSize; j += 1) {
        const cellDiv = doc.createElement("div");
        cellDiv.classList.add("grid__cell");
        cellDiv.dataset.positionX = i;
        cellDiv.dataset.positionY = j;

        cellDiv.addEventListener("click", () => {
          callSubscribeCellClick(i, j, forPlayer);
        });

        cellDiv.addEventListener("mouseover", () => {
          if (forPlayer) callSubscribeCellHover(i, j);
        });

        if (forPlayer) {
          playerGrid.appendChild(cellDiv);

          playerGrid.addEventListener("mouseleave", () => clearBuildCells());
        } else {
          enemyGrid.appendChild(cellDiv);
        }
      }
    }
  }

  function showPlacement(
    positionX,
    positionY,
    shipLength,
    horizontal,
    canPlace
  ) {
    clearBuildCells();
    for (let i = 0; i < shipLength; i += 1) {
      const checkX = horizontal ? positionX : positionX + i;
      const checkY = horizontal ? positionY + i : positionY;

      if (checkX < 0 || checkX >= gridSize || checkY < 0 || checkY >= gridSize)
        continue;

      const selectedCell = playerGrid.querySelector(
        `.grid__cell[data-position-x="${checkX}"][data-position-y="${checkY}"]`
      );
      selectedCell.classList.add(canPlace ? "valid" : "invalid");
      buildCells.push(selectedCell);
    }
  }

  function placeShipForPlayer(positionX, positionY, shipLength, horizontal) {
    for (let i = 0; i < shipLength; i += 1) {
      const placeX = horizontal ? positionX : positionX + i;
      const placeY = horizontal ? positionY + i : positionY;

      const selectedCell = playerGrid.querySelector(
        `.grid__cell[data-position-x="${placeX}"][data-position-y="${placeY}"]`
      );
      selectedCell.classList.add("my-ship");
    }
  }

  function updateShipScore(shipsObject, forPlayer) {
    if (forPlayer) {
      playerLargeShips.textContent = `Large: ${shipsObject.Large}`;
      playerBigShips.textContent = `Big: ${shipsObject.Big}`;
      playerMediumShips.textContent = `Medium: ${shipsObject.Medium}`;
      playerSmallShips.textContent = `Small: ${shipsObject.Small}`;
    } else {
      enemyLargeShips.textContent = `Large: ${shipsObject.Large}`;
      enemyBigShips.textContent = `Big: ${shipsObject.Big}`;
      enemyMediumShips.textContent = `Medium: ${shipsObject.Medium}`;
      enemySmallShips.textContent = `Small: ${shipsObject.Small}`;
    }
  }

  return {
    subscribeToCellClick,
    subscribeToCellHover,
    generateGrid,
    showPlacement,
    placeShipForPlayer,
    updateShipScore,
  };
}

export default createDOMController;

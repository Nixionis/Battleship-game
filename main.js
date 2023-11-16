/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/domController.js":
/*!******************************************!*\
  !*** ./src/controllers/domController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createDOMController(doc) {
  var playerGrid = doc.querySelector("#player-grid");
  var enemyGrid = doc.querySelector("#enemy-grid");
  var gridSize = null;
  var actionText = doc.querySelector(".player-action");
  var playerLargeShips = doc.querySelector("#player-large");
  var playerBigShips = doc.querySelector("#player-big");
  var playerMediumShips = doc.querySelector("#player-medium");
  var playerSmallShips = doc.querySelector("#player-small");
  var enemyLargeShips = doc.querySelector("#enemy-large");
  var enemyBigShips = doc.querySelector("#enemy-big");
  var enemyMediumShips = doc.querySelector("#enemy-medium");
  var enemySmallShips = doc.querySelector("#enemy-small");
  var cellClickSubscribers = [];
  var cellHoverSubscribers = [];
  var buildCells = [];
  function callSubscribeCellClick(positionX, positionY, isPlayerGrid) {
    cellClickSubscribers.forEach(function (sub) {
      return sub(positionX, positionY, isPlayerGrid);
    });
  }
  function subscribeToCellClick(subscribeCb) {
    cellClickSubscribers.push(subscribeCb);
  }
  function callSubscribeCellHover(positionX, positionY) {
    cellHoverSubscribers.forEach(function (sub) {
      return sub(positionX, positionY);
    });
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
      var currentCell = buildCells.pop();
      currentCell.classList.remove("valid");
      currentCell.classList.remove("invalid");
    }
  }
  function generateGrid(newGridSize, forPlayer) {
    gridSize = newGridSize;
    var _loop = function _loop(i) {
      var _loop2 = function _loop2(j) {
        var cellDiv = doc.createElement("div");
        cellDiv.classList.add("grid__cell");
        cellDiv.dataset.positionX = i;
        cellDiv.dataset.positionY = j;
        cellDiv.addEventListener("click", function () {
          callSubscribeCellClick(i, j, forPlayer);
        });
        cellDiv.addEventListener("mouseover", function () {
          if (forPlayer) callSubscribeCellHover(i, j);
        });
        if (forPlayer) {
          playerGrid.appendChild(cellDiv);
          playerGrid.addEventListener("mouseleave", function () {
            return clearBuildCells();
          });
        } else {
          enemyGrid.appendChild(cellDiv);
        }
      };
      for (var j = 0; j < gridSize; j += 1) {
        _loop2(j);
      }
    };
    for (var i = 0; i < gridSize; i += 1) {
      _loop(i);
    }
  }
  function showPlacement(positionX, positionY, shipLength, horizontal, canPlace) {
    clearBuildCells();
    for (var i = 0; i < shipLength; i += 1) {
      var checkX = horizontal ? positionX : positionX + i;
      var checkY = horizontal ? positionY + i : positionY;
      if (checkX < 0 || checkX >= gridSize || checkY < 0 || checkY >= gridSize) continue;
      var selectedCell = playerGrid.querySelector(".grid__cell[data-position-x=\"".concat(checkX, "\"][data-position-y=\"").concat(checkY, "\"]"));
      selectedCell.classList.add(canPlace ? "valid" : "invalid");
      buildCells.push(selectedCell);
    }
  }
  function placeShipForPlayer(positionX, positionY, shipLength, horizontal) {
    for (var i = 0; i < shipLength; i += 1) {
      var placeX = horizontal ? positionX : positionX + i;
      var placeY = horizontal ? positionY + i : positionY;
      var selectedCell = playerGrid.querySelector(".grid__cell[data-position-x=\"".concat(placeX, "\"][data-position-y=\"").concat(placeY, "\"]"));
      selectedCell.classList.add("my-ship");
    }
  }
  function updateShipScore(shipsObject, forPlayer) {
    if (forPlayer) {
      playerLargeShips.textContent = "Large: ".concat(shipsObject.Large);
      playerBigShips.textContent = "Big: ".concat(shipsObject.Big);
      playerMediumShips.textContent = "Medium: ".concat(shipsObject.Medium);
      playerSmallShips.textContent = "Small: ".concat(shipsObject.Small);
    } else {
      enemyLargeShips.textContent = "Large: ".concat(shipsObject.Large);
      enemyBigShips.textContent = "Big: ".concat(shipsObject.Big);
      enemyMediumShips.textContent = "Medium: ".concat(shipsObject.Medium);
      enemySmallShips.textContent = "Small: ".concat(shipsObject.Small);
    }
  }
  return {
    subscribeToCellClick: subscribeToCellClick,
    subscribeToCellHover: subscribeToCellHover,
    generateGrid: generateGrid,
    showPlacement: showPlacement,
    placeShipForPlayer: placeShipForPlayer,
    updateShipScore: updateShipScore
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDOMController);

/***/ }),

/***/ "./src/controllers/gameController.js":
/*!*******************************************!*\
  !*** ./src/controllers/gameController.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function newGameController(newDomControl, newShip, newGameboard, newPlayer, doc) {
  var firstPlayerTurn = true;
  var gamePlaying = false;
  var buildPhase = true;
  var horizontalBuild = true;
  var hoverPosition = [];
  var buildQueue = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
  var canBuild = false;
  var BOARD_SIZE = 10;
  var firstPlayer = newPlayer();
  var secondPlayer = newPlayer();
  var playerGameboard = newGameboard(BOARD_SIZE);
  var enemyGameboard = newGameboard(BOARD_SIZE);
  var domController = newDomControl(doc);
  domController.generateGrid(BOARD_SIZE, true);
  domController.generateGrid(BOARD_SIZE, false);
  function startAIPlayer() {
    var computerBuildQueue = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    var shipTypes = {
      1: "Small",
      2: "Medium",
      3: "Big",
      4: "Large"
    };
    computerBuildQueue.forEach(function (shipSize) {
      secondPlayer.addShip(shipTypes[shipSize]);
    });
    enemyGameboard.placeShipsRandomly(computerBuildQueue);
    console.log("Ready for battle");
    //TODO: Start game loop
  }

  function onPlayerGridHover(positionX, positionY) {
    hoverPosition = [positionX, positionY];
    if (buildPhase) {
      var currentShipSize = buildQueue[buildQueue.length - 1];
      canBuild = true;
      for (var i = 0; i < currentShipSize; i += 1) {
        var checkX = horizontalBuild ? positionX : positionX + i;
        var checkY = horizontalBuild ? positionY + i : positionY;
        canBuild = playerGameboard.checkAdjacentCells(checkX, checkY);
        if (!canBuild) break;
      }
      domController.showPlacement(positionX, positionY, currentShipSize, horizontalBuild, canBuild);
    }
  }
  function placeShip(positionX, positionY, forPlayer) {
    var currentShipSize = null;
    if (forPlayer) {
      currentShipSize = buildQueue.pop();
      domController.placeShipForPlayer(positionX, positionY, currentShipSize, horizontalBuild);
    }
    var shipTypes = {
      1: "Small",
      2: "Medium",
      3: "Big",
      4: "Large"
    };
    if (forPlayer) {
      firstPlayer.addShip(shipTypes[currentShipSize]);
      playerGameboard.tryPlaceShip(currentShipSize, positionX, positionY, horizontalBuild);
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
  window.addEventListener("keydown", function (e) {
    if (e.key === "r" || e.key === "R") {
      horizontalBuild = !horizontalBuild;
      onPlayerGridHover(hoverPosition[0], hoverPosition[1]);
    }
  });
  return {};
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newGameController);

/***/ }),

/***/ "./src/models/gameboard.js":
/*!*********************************!*\
  !*** ./src/models/gameboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/models/ship.js");

function newGameboard(boardSize) {
  var BOARD_SIZE = boardSize;
  var BOARD_CELLS = [];
  var boardShips = [];
  for (var i = 0; i < BOARD_SIZE; i += 1) {
    BOARD_CELLS[i] = [];
    for (var j = 0; j < BOARD_SIZE; j += 1) {
      // First element if cell is shot, second element is ship object if placed
      BOARD_CELLS[i][j] = [false, null];
    }
  }
  function checkIfInBoard(positionX, positionY) {
    return !(positionX >= BOARD_SIZE || positionX < 0 || positionY >= BOARD_SIZE || positionY < 0);
  }
  function tryPlaceShip(shipLength, positionX, positionY) {
    var horizontal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (!checkIfInBoard(positionX, positionY)) return false;
    for (var _i = 0; _i < shipLength; _i += 1) {
      if (horizontal) {
        if (!checkIfInBoard(positionX, positionY + _i)) return false;
        if (BOARD_CELLS[positionX][positionY + _i][1] !== null) return false;
      } else {
        if (!checkIfInBoard(positionX + _i, positionY)) return false;
        if (BOARD_CELLS[positionX + _i][positionY][1] !== null) return false;
      }
    }
    var placedShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(shipLength, positionX, positionY);
    boardShips.push(placedShip);
    for (var _i2 = 0; _i2 < shipLength; _i2 += 1) {
      if (horizontal) {
        BOARD_CELLS[positionX][positionY + _i2][1] = boardShips[boardShips.length - 1];
      } else {
        BOARD_CELLS[positionX + _i2][positionY][1] = boardShips[boardShips.length - 1];
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
    var cellShip = BOARD_CELLS[positionX][positionY][1];
    if (cellShip !== null) {
      return cellShip.hit();
    }
    return null;
  }
  function getShipAliveAmount() {
    if (boardShips.length === 0) {
      return 0;
    }
    var aliveCount = 0;
    for (var _i3 = 0; _i3 < boardShips.length; _i3 += 1) {
      if (!boardShips[_i3].isSunk()) aliveCount += 1;
    }
    return aliveCount;
  }
  function checkAdjacentCells(cellPositionX, cellPositionY) {
    if (!checkIfInBoard(cellPositionX, cellPositionY)) return false;
    for (var _i4 = -1; _i4 < 2; _i4 += 1) {
      for (var _j = -1; _j < 2; _j += 1) {
        var checkX = cellPositionX + _i4;
        var checkY = cellPositionY + _j;
        if (!(checkX < 0 || checkX >= BOARD_SIZE || checkY < 0 || checkY >= BOARD_SIZE)) if (BOARD_CELLS[checkX][checkY][1] !== null) return false;
      }
    }
    return true;
  }
  function placeShipsRandomly(buildQueue) {
    while (buildQueue.length > 0) {
      var randomX = Math.floor(Math.random() * BOARD_SIZE);
      var randomY = Math.floor(Math.random() * BOARD_SIZE);
      var randomRotate = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
      var success = tryPlaceShip(buildQueue[buildQueue.length - 1], randomX, randomY, randomRotate);
      if (success) buildQueue.pop();
    }
  }
  return {
    tryPlaceShip: tryPlaceShip,
    getCellDataAt: getCellDataAt,
    receiveAttack: receiveAttack,
    getShipAliveAmount: getShipAliveAmount,
    checkAdjacentCells: checkAdjacentCells,
    placeShipsRandomly: placeShipsRandomly
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newGameboard);

/***/ }),

/***/ "./src/models/player.js":
/*!******************************!*\
  !*** ./src/models/player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function createPlayer() {
  var aliveShipsObject = {
    Large: 0,
    Big: 0,
    Medium: 0,
    Small: 0
  };
  var availableShipsSizes = ["Large", "Big", "Medium", "Small"];
  function addShip(shipType) {
    if (!availableShipsSizes.includes(shipType)) return "Unknown ship size";
    aliveShipsObject[shipType] += 1;
    return null;
  }
  function removeShip(shipType) {
    aliveShipsObject[shipType] -= 1;
  }
  function getAliveShips() {
    return _objectSpread({}, aliveShipsObject);
  }
  return {
    addShip: addShip,
    removeShip: removeShip,
    getAliveShips: getAliveShips
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPlayer);

/***/ }),

/***/ "./src/models/ship.js":
/*!****************************!*\
  !*** ./src/models/ship.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function newShip(_length, positionX, positionY) {
  var length = _length;
  var hitAmount = 0;
  var position = [positionX, positionY];
  var sunk = false;
  function getPosition() {
    return [].concat(position);
  }
  function getLength() {
    return length;
  }
  function hit() {
    hitAmount += 1;
    if (length - hitAmount === 0) sunk = true;
    return length - hitAmount;
  }
  function isSunk() {
    return sunk;
  }
  return {
    getPosition: getPosition,
    getLength: getLength,
    hit: hit,
    isSunk: isSunk
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newShip);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controllers_gameController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/gameController */ "./src/controllers/gameController.js");
/* harmony import */ var _controllers_domController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/domController */ "./src/controllers/domController.js");
/* harmony import */ var _models_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/ship */ "./src/models/ship.js");
/* harmony import */ var _models_gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/gameboard */ "./src/models/gameboard.js");
/* harmony import */ var _models_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/player */ "./src/models/player.js");





var gameController = (0,_controllers_gameController__WEBPACK_IMPORTED_MODULE_0__["default"])(_controllers_domController__WEBPACK_IMPORTED_MODULE_1__["default"], _models_ship__WEBPACK_IMPORTED_MODULE_2__["default"], _models_gameboard__WEBPACK_IMPORTED_MODULE_3__["default"], _models_player__WEBPACK_IMPORTED_MODULE_4__["default"], document);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0lBQ2QsSUFBSXZHLE1BQU0sR0FBR3VHLFNBQVMsS0FBSyxDQUFDLEVBQUVFLElBQUksR0FBRyxJQUFJO0lBQ3pDLE9BQU96RyxNQUFNLEdBQUd1RyxTQUFTO0VBQzNCO0VBRUEsU0FBU2xCLE1BQU1BLENBQUEsRUFBRztJQUNoQixPQUFPb0IsSUFBSTtFQUNiO0VBRUEsT0FBTztJQUFFQyxXQUFXLEVBQVhBLFdBQVc7SUFBRUMsU0FBUyxFQUFUQSxTQUFTO0lBQUV6QixHQUFHLEVBQUhBLEdBQUc7SUFBRUcsTUFBTSxFQUFOQTtFQUFPLENBQUM7QUFDaEQ7QUFFQSxpRUFBZS9DLE9BQU87Ozs7OztVQzVCdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkQ7QUFDQztBQUMxQjtBQUNVO0FBQ0g7QUFFM0MsSUFBTXNFLGNBQWMsR0FBR3hFLHVFQUFpQixDQUN0Q2xFLGtFQUFtQixFQUNuQm9FLG9EQUFPLEVBQ1BDLHlEQUFZLEVBQ1p3RCxzREFBWSxFQUNaYyxRQUNGLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29udHJvbGxlcnMvZG9tQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbnRyb2xsZXJzL2dhbWVDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kZWxzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZGVscy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2RlbHMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVET01Db250cm9sbGVyKGRvYykge1xuICBjb25zdCBwbGF5ZXJHcmlkID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWVyLWdyaWRcIik7XG4gIGNvbnN0IGVuZW15R3JpZCA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiI2VuZW15LWdyaWRcIik7XG4gIGxldCBncmlkU2l6ZSA9IG51bGw7XG5cbiAgY29uc3QgYWN0aW9uVGV4dCA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1hY3Rpb25cIik7XG5cbiAgY29uc3QgcGxheWVyTGFyZ2VTaGlwcyA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1sYXJnZVwiKTtcbiAgY29uc3QgcGxheWVyQmlnU2hpcHMgPSBkb2MucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXItYmlnXCIpO1xuICBjb25zdCBwbGF5ZXJNZWRpdW1TaGlwcyA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiI3BsYXllci1tZWRpdW1cIik7XG4gIGNvbnN0IHBsYXllclNtYWxsU2hpcHMgPSBkb2MucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXItc21hbGxcIik7XG5cbiAgY29uc3QgZW5lbXlMYXJnZVNoaXBzID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCIjZW5lbXktbGFyZ2VcIik7XG4gIGNvbnN0IGVuZW15QmlnU2hpcHMgPSBkb2MucXVlcnlTZWxlY3RvcihcIiNlbmVteS1iaWdcIik7XG4gIGNvbnN0IGVuZW15TWVkaXVtU2hpcHMgPSBkb2MucXVlcnlTZWxlY3RvcihcIiNlbmVteS1tZWRpdW1cIik7XG4gIGNvbnN0IGVuZW15U21hbGxTaGlwcyA9IGRvYy5xdWVyeVNlbGVjdG9yKFwiI2VuZW15LXNtYWxsXCIpO1xuXG4gIGNvbnN0IGNlbGxDbGlja1N1YnNjcmliZXJzID0gW107XG4gIGNvbnN0IGNlbGxIb3ZlclN1YnNjcmliZXJzID0gW107XG5cbiAgY29uc3QgYnVpbGRDZWxscyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGNhbGxTdWJzY3JpYmVDZWxsQ2xpY2socG9zaXRpb25YLCBwb3NpdGlvblksIGlzUGxheWVyR3JpZCkge1xuICAgIGNlbGxDbGlja1N1YnNjcmliZXJzLmZvckVhY2goKHN1YikgPT5cbiAgICAgIHN1Yihwb3NpdGlvblgsIHBvc2l0aW9uWSwgaXNQbGF5ZXJHcmlkKVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJzY3JpYmVUb0NlbGxDbGljayhzdWJzY3JpYmVDYikge1xuICAgIGNlbGxDbGlja1N1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlQ2IpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsbFN1YnNjcmliZUNlbGxIb3Zlcihwb3NpdGlvblgsIHBvc2l0aW9uWSkge1xuICAgIGNlbGxIb3ZlclN1YnNjcmliZXJzLmZvckVhY2goKHN1YikgPT4gc3ViKHBvc2l0aW9uWCwgcG9zaXRpb25ZKSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdWJzY3JpYmVUb0NlbGxIb3ZlcihzdWJzY3JpYmVDYikge1xuICAgIGNlbGxIb3ZlclN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlQ2IpO1xuICB9XG5cbiAgLypcbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZF9fY2VsbCBteS1zaGlwXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLXJvdW5kXCI+IGNpcmNsZSA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdyaWRfX2NlbGxcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZF9fY2VsbCBlbXB0eVwiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZFwiPiBjbG9zZSA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdyaWRfX2NlbGxcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZ3JpZF9fY2VsbCBlbmVteS1zaGlwXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdyaWRfX2NlbGwgYWN0aXZlXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImdyaWRfX2NlbGxcIj48L2Rpdj5cbiAgKi9cbiAgZnVuY3Rpb24gY2xlYXJCdWlsZENlbGxzKCkge1xuICAgIHdoaWxlIChidWlsZENlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gYnVpbGRDZWxscy5wb3AoKTtcbiAgICAgIGN1cnJlbnRDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2YWxpZFwiKTtcbiAgICAgIGN1cnJlbnRDZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlR3JpZChuZXdHcmlkU2l6ZSwgZm9yUGxheWVyKSB7XG4gICAgZ3JpZFNpemUgPSBuZXdHcmlkU2l6ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRTaXplOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JpZFNpemU7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBjZWxsRGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNlbGxEaXYuY2xhc3NMaXN0LmFkZChcImdyaWRfX2NlbGxcIik7XG4gICAgICAgIGNlbGxEaXYuZGF0YXNldC5wb3NpdGlvblggPSBpO1xuICAgICAgICBjZWxsRGl2LmRhdGFzZXQucG9zaXRpb25ZID0gajtcblxuICAgICAgICBjZWxsRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgY2FsbFN1YnNjcmliZUNlbGxDbGljayhpLCBqLCBmb3JQbGF5ZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsRGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmIChmb3JQbGF5ZXIpIGNhbGxTdWJzY3JpYmVDZWxsSG92ZXIoaSwgaik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChmb3JQbGF5ZXIpIHtcbiAgICAgICAgICBwbGF5ZXJHcmlkLmFwcGVuZENoaWxkKGNlbGxEaXYpO1xuXG4gICAgICAgICAgcGxheWVyR3JpZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiBjbGVhckJ1aWxkQ2VsbHMoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5lbXlHcmlkLmFwcGVuZENoaWxkKGNlbGxEaXYpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1BsYWNlbWVudChcbiAgICBwb3NpdGlvblgsXG4gICAgcG9zaXRpb25ZLFxuICAgIHNoaXBMZW5ndGgsXG4gICAgaG9yaXpvbnRhbCxcbiAgICBjYW5QbGFjZVxuICApIHtcbiAgICBjbGVhckJ1aWxkQ2VsbHMoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2hlY2tYID0gaG9yaXpvbnRhbCA/IHBvc2l0aW9uWCA6IHBvc2l0aW9uWCArIGk7XG4gICAgICBjb25zdCBjaGVja1kgPSBob3Jpem9udGFsID8gcG9zaXRpb25ZICsgaSA6IHBvc2l0aW9uWTtcblxuICAgICAgaWYgKGNoZWNrWCA8IDAgfHwgY2hlY2tYID49IGdyaWRTaXplIHx8IGNoZWNrWSA8IDAgfHwgY2hlY2tZID49IGdyaWRTaXplKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgY29uc3Qgc2VsZWN0ZWRDZWxsID0gcGxheWVyR3JpZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgLmdyaWRfX2NlbGxbZGF0YS1wb3NpdGlvbi14PVwiJHtjaGVja1h9XCJdW2RhdGEtcG9zaXRpb24teT1cIiR7Y2hlY2tZfVwiXWBcbiAgICAgICk7XG4gICAgICBzZWxlY3RlZENlbGwuY2xhc3NMaXN0LmFkZChjYW5QbGFjZSA/IFwidmFsaWRcIiA6IFwiaW52YWxpZFwiKTtcbiAgICAgIGJ1aWxkQ2VsbHMucHVzaChzZWxlY3RlZENlbGwpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcEZvclBsYXllcihwb3NpdGlvblgsIHBvc2l0aW9uWSwgc2hpcExlbmd0aCwgaG9yaXpvbnRhbCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBwbGFjZVggPSBob3Jpem9udGFsID8gcG9zaXRpb25YIDogcG9zaXRpb25YICsgaTtcbiAgICAgIGNvbnN0IHBsYWNlWSA9IGhvcml6b250YWwgPyBwb3NpdGlvblkgKyBpIDogcG9zaXRpb25ZO1xuXG4gICAgICBjb25zdCBzZWxlY3RlZENlbGwgPSBwbGF5ZXJHcmlkLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAuZ3JpZF9fY2VsbFtkYXRhLXBvc2l0aW9uLXg9XCIke3BsYWNlWH1cIl1bZGF0YS1wb3NpdGlvbi15PVwiJHtwbGFjZVl9XCJdYFxuICAgICAgKTtcbiAgICAgIHNlbGVjdGVkQ2VsbC5jbGFzc0xpc3QuYWRkKFwibXktc2hpcFwiKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTaGlwU2NvcmUoc2hpcHNPYmplY3QsIGZvclBsYXllcikge1xuICAgIGlmIChmb3JQbGF5ZXIpIHtcbiAgICAgIHBsYXllckxhcmdlU2hpcHMudGV4dENvbnRlbnQgPSBgTGFyZ2U6ICR7c2hpcHNPYmplY3QuTGFyZ2V9YDtcbiAgICAgIHBsYXllckJpZ1NoaXBzLnRleHRDb250ZW50ID0gYEJpZzogJHtzaGlwc09iamVjdC5CaWd9YDtcbiAgICAgIHBsYXllck1lZGl1bVNoaXBzLnRleHRDb250ZW50ID0gYE1lZGl1bTogJHtzaGlwc09iamVjdC5NZWRpdW19YDtcbiAgICAgIHBsYXllclNtYWxsU2hpcHMudGV4dENvbnRlbnQgPSBgU21hbGw6ICR7c2hpcHNPYmplY3QuU21hbGx9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5lbXlMYXJnZVNoaXBzLnRleHRDb250ZW50ID0gYExhcmdlOiAke3NoaXBzT2JqZWN0LkxhcmdlfWA7XG4gICAgICBlbmVteUJpZ1NoaXBzLnRleHRDb250ZW50ID0gYEJpZzogJHtzaGlwc09iamVjdC5CaWd9YDtcbiAgICAgIGVuZW15TWVkaXVtU2hpcHMudGV4dENvbnRlbnQgPSBgTWVkaXVtOiAke3NoaXBzT2JqZWN0Lk1lZGl1bX1gO1xuICAgICAgZW5lbXlTbWFsbFNoaXBzLnRleHRDb250ZW50ID0gYFNtYWxsOiAke3NoaXBzT2JqZWN0LlNtYWxsfWA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdWJzY3JpYmVUb0NlbGxDbGljayxcbiAgICBzdWJzY3JpYmVUb0NlbGxIb3ZlcixcbiAgICBnZW5lcmF0ZUdyaWQsXG4gICAgc2hvd1BsYWNlbWVudCxcbiAgICBwbGFjZVNoaXBGb3JQbGF5ZXIsXG4gICAgdXBkYXRlU2hpcFNjb3JlLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVET01Db250cm9sbGVyO1xuIiwiZnVuY3Rpb24gbmV3R2FtZUNvbnRyb2xsZXIoXG4gIG5ld0RvbUNvbnRyb2wsXG4gIG5ld1NoaXAsXG4gIG5ld0dhbWVib2FyZCxcbiAgbmV3UGxheWVyLFxuICBkb2Ncbikge1xuICBsZXQgZmlyc3RQbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgbGV0IGdhbWVQbGF5aW5nID0gZmFsc2U7XG4gIGxldCBidWlsZFBoYXNlID0gdHJ1ZTtcbiAgbGV0IGhvcml6b250YWxCdWlsZCA9IHRydWU7XG4gIGxldCBob3ZlclBvc2l0aW9uID0gW107XG5cbiAgY29uc3QgYnVpbGRRdWV1ZSA9IFsxLCAxLCAxLCAxLCAyLCAyLCAyLCAzLCAzLCA0XTtcbiAgbGV0IGNhbkJ1aWxkID0gZmFsc2U7XG5cbiAgY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG4gIGNvbnN0IGZpcnN0UGxheWVyID0gbmV3UGxheWVyKCk7XG4gIGNvbnN0IHNlY29uZFBsYXllciA9IG5ld1BsYXllcigpO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBuZXdHYW1lYm9hcmQoQk9BUkRfU0laRSk7XG4gIGNvbnN0IGVuZW15R2FtZWJvYXJkID0gbmV3R2FtZWJvYXJkKEJPQVJEX1NJWkUpO1xuXG4gIGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXdEb21Db250cm9sKGRvYyk7XG4gIGRvbUNvbnRyb2xsZXIuZ2VuZXJhdGVHcmlkKEJPQVJEX1NJWkUsIHRydWUpO1xuICBkb21Db250cm9sbGVyLmdlbmVyYXRlR3JpZChCT0FSRF9TSVpFLCBmYWxzZSk7XG5cbiAgZnVuY3Rpb24gc3RhcnRBSVBsYXllcigpIHtcbiAgICBjb25zdCBjb21wdXRlckJ1aWxkUXVldWUgPSBbMSwgMSwgMSwgMSwgMiwgMiwgMiwgMywgMywgNF07XG4gICAgY29uc3Qgc2hpcFR5cGVzID0ge1xuICAgICAgMTogXCJTbWFsbFwiLFxuICAgICAgMjogXCJNZWRpdW1cIixcbiAgICAgIDM6IFwiQmlnXCIsXG4gICAgICA0OiBcIkxhcmdlXCIsXG4gICAgfTtcblxuICAgIGNvbXB1dGVyQnVpbGRRdWV1ZS5mb3JFYWNoKChzaGlwU2l6ZSkgPT4ge1xuICAgICAgc2Vjb25kUGxheWVyLmFkZFNoaXAoc2hpcFR5cGVzW3NoaXBTaXplXSk7XG4gICAgfSk7XG5cbiAgICBlbmVteUdhbWVib2FyZC5wbGFjZVNoaXBzUmFuZG9tbHkoY29tcHV0ZXJCdWlsZFF1ZXVlKTtcbiAgICBjb25zb2xlLmxvZyhcIlJlYWR5IGZvciBiYXR0bGVcIik7XG4gICAgLy9UT0RPOiBTdGFydCBnYW1lIGxvb3BcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUGxheWVyR3JpZEhvdmVyKHBvc2l0aW9uWCwgcG9zaXRpb25ZKSB7XG4gICAgaG92ZXJQb3NpdGlvbiA9IFtwb3NpdGlvblgsIHBvc2l0aW9uWV07XG4gICAgaWYgKGJ1aWxkUGhhc2UpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGlwU2l6ZSA9IGJ1aWxkUXVldWVbYnVpbGRRdWV1ZS5sZW5ndGggLSAxXTtcbiAgICAgIGNhbkJ1aWxkID0gdHJ1ZTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U2hpcFNpemU7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBjaGVja1ggPSBob3Jpem9udGFsQnVpbGQgPyBwb3NpdGlvblggOiBwb3NpdGlvblggKyBpO1xuICAgICAgICBjb25zdCBjaGVja1kgPSBob3Jpem9udGFsQnVpbGQgPyBwb3NpdGlvblkgKyBpIDogcG9zaXRpb25ZO1xuICAgICAgICBjYW5CdWlsZCA9IHBsYXllckdhbWVib2FyZC5jaGVja0FkamFjZW50Q2VsbHMoY2hlY2tYLCBjaGVja1kpO1xuXG4gICAgICAgIGlmICghY2FuQnVpbGQpIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBkb21Db250cm9sbGVyLnNob3dQbGFjZW1lbnQoXG4gICAgICAgIHBvc2l0aW9uWCxcbiAgICAgICAgcG9zaXRpb25ZLFxuICAgICAgICBjdXJyZW50U2hpcFNpemUsXG4gICAgICAgIGhvcml6b250YWxCdWlsZCxcbiAgICAgICAgY2FuQnVpbGRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBmb3JQbGF5ZXIpIHtcbiAgICBsZXQgY3VycmVudFNoaXBTaXplID0gbnVsbDtcbiAgICBpZiAoZm9yUGxheWVyKSB7XG4gICAgICBjdXJyZW50U2hpcFNpemUgPSBidWlsZFF1ZXVlLnBvcCgpO1xuICAgICAgZG9tQ29udHJvbGxlci5wbGFjZVNoaXBGb3JQbGF5ZXIoXG4gICAgICAgIHBvc2l0aW9uWCxcbiAgICAgICAgcG9zaXRpb25ZLFxuICAgICAgICBjdXJyZW50U2hpcFNpemUsXG4gICAgICAgIGhvcml6b250YWxCdWlsZFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwVHlwZXMgPSB7XG4gICAgICAxOiBcIlNtYWxsXCIsXG4gICAgICAyOiBcIk1lZGl1bVwiLFxuICAgICAgMzogXCJCaWdcIixcbiAgICAgIDQ6IFwiTGFyZ2VcIixcbiAgICB9O1xuXG4gICAgaWYgKGZvclBsYXllcikge1xuICAgICAgZmlyc3RQbGF5ZXIuYWRkU2hpcChzaGlwVHlwZXNbY3VycmVudFNoaXBTaXplXSk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQudHJ5UGxhY2VTaGlwKFxuICAgICAgICBjdXJyZW50U2hpcFNpemUsXG4gICAgICAgIHBvc2l0aW9uWCxcbiAgICAgICAgcG9zaXRpb25ZLFxuICAgICAgICBob3Jpem9udGFsQnVpbGRcbiAgICAgICk7XG5cbiAgICAgIGRvbUNvbnRyb2xsZXIudXBkYXRlU2hpcFNjb3JlKGZpcnN0UGxheWVyLmdldEFsaXZlU2hpcHMoKSwgdHJ1ZSk7XG5cbiAgICAgIGlmIChidWlsZFF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBidWlsZFBoYXNlID0gZmFsc2U7XG4gICAgICAgIHN0YXJ0QUlQbGF5ZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjZWxsQ2xpY2socG9zaXRpb25YLCBwb3NpdGlvblksIGZvclBsYXllcikge1xuICAgIGlmIChmb3JQbGF5ZXIgJiYgKCFjYW5CdWlsZCB8fCAhYnVpbGRQaGFzZSkpIHJldHVybjtcblxuICAgIGlmIChmb3JQbGF5ZXIgJiYgY2FuQnVpbGQgJiYgYnVpbGRQaGFzZSkge1xuICAgICAgcGxhY2VTaGlwKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBmb3JQbGF5ZXIpO1xuICAgIH1cbiAgfVxuXG4gIGRvbUNvbnRyb2xsZXIuc3Vic2NyaWJlVG9DZWxsSG92ZXIob25QbGF5ZXJHcmlkSG92ZXIpO1xuICBkb21Db250cm9sbGVyLnN1YnNjcmliZVRvQ2VsbENsaWNrKGNlbGxDbGljayk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5ID09PSBcInJcIiB8fCBlLmtleSA9PT0gXCJSXCIpIHtcbiAgICAgIGhvcml6b250YWxCdWlsZCA9ICFob3Jpem9udGFsQnVpbGQ7XG4gICAgICBvblBsYXllckdyaWRIb3Zlcihob3ZlclBvc2l0aW9uWzBdLCBob3ZlclBvc2l0aW9uWzFdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3R2FtZUNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbmV3U2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5cbmZ1bmN0aW9uIG5ld0dhbWVib2FyZChib2FyZFNpemUpIHtcbiAgY29uc3QgQk9BUkRfU0laRSA9IGJvYXJkU2l6ZTtcbiAgY29uc3QgQk9BUkRfQ0VMTFMgPSBbXTtcbiAgY29uc3QgYm9hcmRTaGlwcyA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfU0laRTsgaSArPSAxKSB7XG4gICAgQk9BUkRfQ0VMTFNbaV0gPSBbXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IEJPQVJEX1NJWkU7IGogKz0gMSkge1xuICAgICAgLy8gRmlyc3QgZWxlbWVudCBpZiBjZWxsIGlzIHNob3QsIHNlY29uZCBlbGVtZW50IGlzIHNoaXAgb2JqZWN0IGlmIHBsYWNlZFxuICAgICAgQk9BUkRfQ0VMTFNbaV1bal0gPSBbZmFsc2UsIG51bGxdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrSWZJbkJvYXJkKHBvc2l0aW9uWCwgcG9zaXRpb25ZKSB7XG4gICAgcmV0dXJuICEoXG4gICAgICBwb3NpdGlvblggPj0gQk9BUkRfU0laRSB8fFxuICAgICAgcG9zaXRpb25YIDwgMCB8fFxuICAgICAgcG9zaXRpb25ZID49IEJPQVJEX1NJWkUgfHxcbiAgICAgIHBvc2l0aW9uWSA8IDBcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJ5UGxhY2VTaGlwKHNoaXBMZW5ndGgsIHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBob3Jpem9udGFsID0gZmFsc2UpIHtcbiAgICBpZiAoIWNoZWNrSWZJbkJvYXJkKHBvc2l0aW9uWCwgcG9zaXRpb25ZKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgIGlmICghY2hlY2tJZkluQm9hcmQocG9zaXRpb25YLCBwb3NpdGlvblkgKyBpKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmIChCT0FSRF9DRUxMU1twb3NpdGlvblhdW3Bvc2l0aW9uWSArIGldWzFdICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWNoZWNrSWZJbkJvYXJkKHBvc2l0aW9uWCArIGksIHBvc2l0aW9uWSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKEJPQVJEX0NFTExTW3Bvc2l0aW9uWCArIGldW3Bvc2l0aW9uWV1bMV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwbGFjZWRTaGlwID0gbmV3U2hpcChzaGlwTGVuZ3RoLCBwb3NpdGlvblgsIHBvc2l0aW9uWSk7XG4gICAgYm9hcmRTaGlwcy5wdXNoKHBsYWNlZFNoaXApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChob3Jpem9udGFsKSB7XG4gICAgICAgIEJPQVJEX0NFTExTW3Bvc2l0aW9uWF1bcG9zaXRpb25ZICsgaV1bMV0gPVxuICAgICAgICAgIGJvYXJkU2hpcHNbYm9hcmRTaGlwcy5sZW5ndGggLSAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEJPQVJEX0NFTExTW3Bvc2l0aW9uWCArIGldW3Bvc2l0aW9uWV1bMV0gPVxuICAgICAgICAgIGJvYXJkU2hpcHNbYm9hcmRTaGlwcy5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENlbGxEYXRhQXQocG9zaXRpb25YLCBwb3NpdGlvblkpIHtcbiAgICBpZiAoIWNoZWNrSWZJbkJvYXJkKHBvc2l0aW9uWCwgcG9zaXRpb25ZKSkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gQk9BUkRfQ0VMTFNbcG9zaXRpb25YXVtwb3NpdGlvblldO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhwb3NpdGlvblgsIHBvc2l0aW9uWSkge1xuICAgIGlmICghY2hlY2tJZkluQm9hcmQocG9zaXRpb25YLCBwb3NpdGlvblkpKSByZXR1cm4gbnVsbDtcblxuICAgIEJPQVJEX0NFTExTW3Bvc2l0aW9uWF1bcG9zaXRpb25ZXVswXSA9IHRydWU7XG4gICAgY29uc3QgY2VsbFNoaXAgPSBCT0FSRF9DRUxMU1twb3NpdGlvblhdW3Bvc2l0aW9uWV1bMV07XG5cbiAgICBpZiAoY2VsbFNoaXAgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjZWxsU2hpcC5oaXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNoaXBBbGl2ZUFtb3VudCgpIHtcbiAgICBpZiAoYm9hcmRTaGlwcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGxldCBhbGl2ZUNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkU2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICghYm9hcmRTaGlwc1tpXS5pc1N1bmsoKSkgYWxpdmVDb3VudCArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBhbGl2ZUNvdW50O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tBZGphY2VudENlbGxzKGNlbGxQb3NpdGlvblgsIGNlbGxQb3NpdGlvblkpIHtcbiAgICBpZiAoIWNoZWNrSWZJbkJvYXJkKGNlbGxQb3NpdGlvblgsIGNlbGxQb3NpdGlvblkpKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGxldCBpID0gLTE7IGkgPCAyOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAtMTsgaiA8IDI7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBjaGVja1ggPSBjZWxsUG9zaXRpb25YICsgaTtcbiAgICAgICAgY29uc3QgY2hlY2tZID0gY2VsbFBvc2l0aW9uWSArIGo7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKFxuICAgICAgICAgICAgY2hlY2tYIDwgMCB8fFxuICAgICAgICAgICAgY2hlY2tYID49IEJPQVJEX1NJWkUgfHxcbiAgICAgICAgICAgIGNoZWNrWSA8IDAgfHxcbiAgICAgICAgICAgIGNoZWNrWSA+PSBCT0FSRF9TSVpFXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgICAgaWYgKEJPQVJEX0NFTExTW2NoZWNrWF1bY2hlY2tZXVsxXSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwc1JhbmRvbWx5KGJ1aWxkUXVldWUpIHtcbiAgICB3aGlsZSAoYnVpbGRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfU0laRSk7XG4gICAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQk9BUkRfU0laRSk7XG4gICAgICBjb25zdCByYW5kb21Sb3RhdGUgPVxuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSArIDEgPT09IDEgPyB0cnVlIDogZmFsc2U7XG4gICAgICBjb25zdCBzdWNjZXNzID0gdHJ5UGxhY2VTaGlwKFxuICAgICAgICBidWlsZFF1ZXVlW2J1aWxkUXVldWUubGVuZ3RoIC0gMV0sXG4gICAgICAgIHJhbmRvbVgsXG4gICAgICAgIHJhbmRvbVksXG4gICAgICAgIHJhbmRvbVJvdGF0ZVxuICAgICAgKTtcblxuICAgICAgaWYgKHN1Y2Nlc3MpIGJ1aWxkUXVldWUucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0cnlQbGFjZVNoaXAsXG4gICAgZ2V0Q2VsbERhdGFBdCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBBbGl2ZUFtb3VudCxcbiAgICBjaGVja0FkamFjZW50Q2VsbHMsXG4gICAgcGxhY2VTaGlwc1JhbmRvbWx5LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBuZXdHYW1lYm9hcmQ7XG4iLCJmdW5jdGlvbiBjcmVhdGVQbGF5ZXIoKSB7XG4gIGNvbnN0IGFsaXZlU2hpcHNPYmplY3QgPSB7XG4gICAgTGFyZ2U6IDAsXG4gICAgQmlnOiAwLFxuICAgIE1lZGl1bTogMCxcbiAgICBTbWFsbDogMCxcbiAgfTtcblxuICBjb25zdCBhdmFpbGFibGVTaGlwc1NpemVzID0gW1wiTGFyZ2VcIiwgXCJCaWdcIiwgXCJNZWRpdW1cIiwgXCJTbWFsbFwiXTtcblxuICBmdW5jdGlvbiBhZGRTaGlwKHNoaXBUeXBlKSB7XG4gICAgaWYgKCFhdmFpbGFibGVTaGlwc1NpemVzLmluY2x1ZGVzKHNoaXBUeXBlKSkgcmV0dXJuIFwiVW5rbm93biBzaGlwIHNpemVcIjtcbiAgICBhbGl2ZVNoaXBzT2JqZWN0W3NoaXBUeXBlXSArPSAxO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlU2hpcChzaGlwVHlwZSkge1xuICAgIGFsaXZlU2hpcHNPYmplY3Rbc2hpcFR5cGVdIC09IDE7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbGl2ZVNoaXBzKCkge1xuICAgIHJldHVybiB7IC4uLmFsaXZlU2hpcHNPYmplY3QgfTtcbiAgfVxuXG4gIHJldHVybiB7IGFkZFNoaXAsIHJlbW92ZVNoaXAsIGdldEFsaXZlU2hpcHMgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGxheWVyO1xuIiwiZnVuY3Rpb24gbmV3U2hpcChfbGVuZ3RoLCBwb3NpdGlvblgsIHBvc2l0aW9uWSkge1xuICBjb25zdCBsZW5ndGggPSBfbGVuZ3RoO1xuICBsZXQgaGl0QW1vdW50ID0gMDtcblxuICBjb25zdCBwb3NpdGlvbiA9IFtwb3NpdGlvblgsIHBvc2l0aW9uWV07XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIFsuLi5wb3NpdGlvbl07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMZW5ndGgoKSB7XG4gICAgcmV0dXJuIGxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICBoaXRBbW91bnQgKz0gMTtcbiAgICBpZiAobGVuZ3RoIC0gaGl0QW1vdW50ID09PSAwKSBzdW5rID0gdHJ1ZTtcbiAgICByZXR1cm4gbGVuZ3RoIC0gaGl0QW1vdW50O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiBzdW5rO1xuICB9XG5cbiAgcmV0dXJuIHsgZ2V0UG9zaXRpb24sIGdldExlbmd0aCwgaGl0LCBpc1N1bmsgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3U2hpcDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IG5ld0dhbWVDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJzL2dhbWVDb250cm9sbGVyXCI7XG5pbXBvcnQgY3JlYXRlRE9NQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVycy9kb21Db250cm9sbGVyXCI7XG5pbXBvcnQgbmV3U2hpcCBmcm9tIFwiLi9tb2RlbHMvc2hpcFwiO1xuaW1wb3J0IG5ld0dhbWVib2FyZCBmcm9tIFwiLi9tb2RlbHMvZ2FtZWJvYXJkXCI7XG5pbXBvcnQgY3JlYXRlUGxheWVyIGZyb20gXCIuL21vZGVscy9wbGF5ZXJcIjtcblxuY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSBuZXdHYW1lQ29udHJvbGxlcihcbiAgY3JlYXRlRE9NQ29udHJvbGxlcixcbiAgbmV3U2hpcCxcbiAgbmV3R2FtZWJvYXJkLFxuICBjcmVhdGVQbGF5ZXIsXG4gIGRvY3VtZW50XG4pO1xuIl0sIm5hbWVzIjpbImNyZWF0ZURPTUNvbnRyb2xsZXIiLCJkb2MiLCJwbGF5ZXJHcmlkIiwicXVlcnlTZWxlY3RvciIsImVuZW15R3JpZCIsImdyaWRTaXplIiwiYWN0aW9uVGV4dCIsInBsYXllckxhcmdlU2hpcHMiLCJwbGF5ZXJCaWdTaGlwcyIsInBsYXllck1lZGl1bVNoaXBzIiwicGxheWVyU21hbGxTaGlwcyIsImVuZW15TGFyZ2VTaGlwcyIsImVuZW15QmlnU2hpcHMiLCJlbmVteU1lZGl1bVNoaXBzIiwiZW5lbXlTbWFsbFNoaXBzIiwiY2VsbENsaWNrU3Vic2NyaWJlcnMiLCJjZWxsSG92ZXJTdWJzY3JpYmVycyIsImJ1aWxkQ2VsbHMiLCJjYWxsU3Vic2NyaWJlQ2VsbENsaWNrIiwicG9zaXRpb25YIiwicG9zaXRpb25ZIiwiaXNQbGF5ZXJHcmlkIiwiZm9yRWFjaCIsInN1YiIsInN1YnNjcmliZVRvQ2VsbENsaWNrIiwic3Vic2NyaWJlQ2IiLCJwdXNoIiwiY2FsbFN1YnNjcmliZUNlbGxIb3ZlciIsInN1YnNjcmliZVRvQ2VsbEhvdmVyIiwiY2xlYXJCdWlsZENlbGxzIiwibGVuZ3RoIiwiY3VycmVudENlbGwiLCJwb3AiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZW5lcmF0ZUdyaWQiLCJuZXdHcmlkU2l6ZSIsImZvclBsYXllciIsIl9sb29wIiwiaSIsIl9sb29wMiIsImoiLCJjZWxsRGl2IiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImRhdGFzZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiYXBwZW5kQ2hpbGQiLCJzaG93UGxhY2VtZW50Iiwic2hpcExlbmd0aCIsImhvcml6b250YWwiLCJjYW5QbGFjZSIsImNoZWNrWCIsImNoZWNrWSIsInNlbGVjdGVkQ2VsbCIsImNvbmNhdCIsInBsYWNlU2hpcEZvclBsYXllciIsInBsYWNlWCIsInBsYWNlWSIsInVwZGF0ZVNoaXBTY29yZSIsInNoaXBzT2JqZWN0IiwidGV4dENvbnRlbnQiLCJMYXJnZSIsIkJpZyIsIk1lZGl1bSIsIlNtYWxsIiwibmV3R2FtZUNvbnRyb2xsZXIiLCJuZXdEb21Db250cm9sIiwibmV3U2hpcCIsIm5ld0dhbWVib2FyZCIsIm5ld1BsYXllciIsImZpcnN0UGxheWVyVHVybiIsImdhbWVQbGF5aW5nIiwiYnVpbGRQaGFzZSIsImhvcml6b250YWxCdWlsZCIsImhvdmVyUG9zaXRpb24iLCJidWlsZFF1ZXVlIiwiY2FuQnVpbGQiLCJCT0FSRF9TSVpFIiwiZmlyc3RQbGF5ZXIiLCJzZWNvbmRQbGF5ZXIiLCJwbGF5ZXJHYW1lYm9hcmQiLCJlbmVteUdhbWVib2FyZCIsImRvbUNvbnRyb2xsZXIiLCJzdGFydEFJUGxheWVyIiwiY29tcHV0ZXJCdWlsZFF1ZXVlIiwic2hpcFR5cGVzIiwic2hpcFNpemUiLCJhZGRTaGlwIiwicGxhY2VTaGlwc1JhbmRvbWx5IiwiY29uc29sZSIsImxvZyIsIm9uUGxheWVyR3JpZEhvdmVyIiwiY3VycmVudFNoaXBTaXplIiwiY2hlY2tBZGphY2VudENlbGxzIiwicGxhY2VTaGlwIiwidHJ5UGxhY2VTaGlwIiwiZ2V0QWxpdmVTaGlwcyIsImNlbGxDbGljayIsIndpbmRvdyIsImUiLCJrZXkiLCJib2FyZFNpemUiLCJCT0FSRF9DRUxMUyIsImJvYXJkU2hpcHMiLCJjaGVja0lmSW5Cb2FyZCIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInBsYWNlZFNoaXAiLCJnZXRDZWxsRGF0YUF0IiwicmVjZWl2ZUF0dGFjayIsImNlbGxTaGlwIiwiaGl0IiwiZ2V0U2hpcEFsaXZlQW1vdW50IiwiYWxpdmVDb3VudCIsImlzU3VuayIsImNlbGxQb3NpdGlvblgiLCJjZWxsUG9zaXRpb25ZIiwicmFuZG9tWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRvbVkiLCJyYW5kb21Sb3RhdGUiLCJzdWNjZXNzIiwiY3JlYXRlUGxheWVyIiwiYWxpdmVTaGlwc09iamVjdCIsImF2YWlsYWJsZVNoaXBzU2l6ZXMiLCJzaGlwVHlwZSIsImluY2x1ZGVzIiwicmVtb3ZlU2hpcCIsIl9vYmplY3RTcHJlYWQiLCJfbGVuZ3RoIiwiaGl0QW1vdW50IiwicG9zaXRpb24iLCJzdW5rIiwiZ2V0UG9zaXRpb24iLCJnZXRMZW5ndGgiLCJnYW1lQ29udHJvbGxlciIsImRvY3VtZW50Il0sInNvdXJjZVJvb3QiOiIifQ==
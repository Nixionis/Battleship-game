import newGameController from "./controllers/gameController";
import createDOMController from "./controllers/domController";
import newShip from "./models/ship";
import newGameboard from "./models/gameboard";
import createPlayer from "./models/player";

const gameController = newGameController(
  createDOMController,
  newShip,
  newGameboard,
  createPlayer,
  document
);

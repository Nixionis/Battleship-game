function newShip(_length, positionX, positionY) {
  const length = _length;
  let hitAmount = 0;

  const position = [positionX, positionY];
  let sunk = false;

  function getPosition() {
    return [...position];
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

  return { getPosition, getLength, hit, isSunk };
}

export default newShip;

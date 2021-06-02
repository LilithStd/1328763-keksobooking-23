const getRandomNumber = function(minNumber,maxNumber) {
  if (minNumber < 0 || maxNumber < 0 || maxNumber <= minNumber) {
    return;
  }

  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}
const getRandomCoordinates  = function  (minCoordinate, maxCoordinate, numberAfterDots)  {
  if (minCoordinate < 0 || maxCoordinate < 0 || maxCoordinate <= minCoordinate) {
    return;
  }
  const originalNumber = (Math.random() * (maxCoordinate - minCoordinate + 1)) + minCoordinate;
  return originalNumber.toFixed(numberAfterDots);
}
getRandomNumber();
getRandomCoordinates();


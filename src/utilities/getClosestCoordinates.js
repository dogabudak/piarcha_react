export default (originCoordinate, availableCoordinates) => {
  return availableCoordinates.reduce((a, b) =>
    Math.sqrt(
      Math.pow(originCoordinate.x - a.x, 2) +
        Math.pow(originCoordinate.y - a.y, 2),
    ) <
    Math.sqrt(
      Math.pow(originCoordinate.x - b.x, 2) +
        Math.pow(originCoordinate.y - b.y, 2),
    )
      ? a
      : b,
  );
};

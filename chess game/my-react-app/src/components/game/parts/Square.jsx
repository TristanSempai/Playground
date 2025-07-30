import React from "react";

const Square = ({
  idx,
  isWhite,
  isSelected,
  isPossible,
  isSameColor,
  isOppositeColor,
  style,
  onClick,
  getSquareClass,
}) => (
  <div
    key={idx}
    className={getSquareClass(
      isWhite,
      isSelected,
      isPossible,
      isSameColor,
      isOppositeColor
    )}
    style={style}
    onClick={onClick}
  />
);

export default Square;

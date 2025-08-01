// Chess initial piece setup as an exported array
const initialSetup = [
  // Black
  ["rook", "black", 0, 0],
  ["knight", "black", 0, 1],
  ["bishop", "black", 0, 2],
  ["queen", "black", 0, 3],
  ["king", "black", 0, 4],
  ["bishop", "black", 0, 5],
  ["knight", "black", 0, 6],
  ["rook", "black", 0, 7],
  ...Array(8)
    .fill()
    .map((_, i) => ["pawn", "black", 1, i]),
  // White
  ["rook", "white", 7, 0],
  ["knight", "white", 7, 1],
  ["bishop", "white", 7, 2],
  ["queen", "white", 7, 3],
  ["king", "white", 7, 4],
  ["bishop", "white", 7, 5],
  ["knight", "white", 7, 6],
  ["rook", "white", 7, 7],
  ...Array(8)
    .fill()
    .map((_, i) => ["pawn", "white", 6, i]),
];

export default initialSetup;

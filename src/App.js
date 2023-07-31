import { useState } from "react";

function Square({ value, handleClick }) {
  return (
    <div>
      <button className="square" onClick={handleClick}>
        {value}
      </button>
    </div>
  );
}

export default function Board() {
  const [placeHolder, setPlaceHolder] = useState(true);
  const [square, setSquare] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(square) || square[i]) {
      return;
    }

    let value1 = placeHolder ? "X" : "O";
    const newSquare = square.slice();
    newSquare[i] = value1;
    setSquare(newSquare);
    setPlaceHolder(!placeHolder);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (placeHolder ? "X" : "O");
  }

  return (
    <>
      <div className="board-row">
        <Square value={square[0]} handleClick={() => handleClick(0)} />
        <Square value={square[1]} handleClick={() => handleClick(1)} />
        <Square value={square[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={square[3]} handleClick={() => handleClick(3)} />
        <Square value={square[4]} handleClick={() => handleClick(4)} />
        <Square value={square[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={square[6]} handleClick={() => handleClick(6)} />
        <Square value={square[7]} handleClick={() => handleClick(7)} />
        <Square value={square[8]} handleClick={() => handleClick(8)} />
      </div>
      <div>{status}</div>
    </>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

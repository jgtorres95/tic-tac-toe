import React, { useState } from "react";

import Square from "../square/square";

// Create method to determine winner (if any)
function calculateWinner(squares) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];

    // Check that squares[a] is not null (user cannot win without an "a" square), and then check that squares[a] === squares[b] and [c] (e.g. if squares[a] is "X" then both squares[b] and [c] need to be "X" for them to win)
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Winner ("X" or "O") is used to set "status" variable
      return squares[a];
    }
  }
  // return null if there is no winner
  return null;
}

function Board() {
  // Array(9).fill(null) creates an array with 9 elements that are all "null"
  const [squares, setSquares] = useState(Array(9).fill(null));
  // intializing state with "true" means that X goes first.
  const [isX, setIsX] = useState(true);

  const handleClick = (i) => {
    // If there is a winner, OR the selected square has already been taken, then return undefined (end function execution).
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isX ? "X" : "O";
    // update state
    setSquares(squares);
    setIsX(!isX);
  };

  const winner = calculateWinner(squares);
  let status;

  // If there is a winner, then declare the winner. Else, declare the next player.
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ` + (isX ? "X" : "O");
  }

  // To restart game we just reset both state variables
  const handleRestart = () => {
    setIsX(true);
    setSquares(Array(9).fill(null));
  };

  // render Square components with a value ("X", "O", or null) and an onClick method.
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="status">{status}</div>
      <button className="restart" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

export default Board;

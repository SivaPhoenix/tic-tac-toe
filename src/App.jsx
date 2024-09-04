import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (turn === 'O') {
      makeAIMove();
    }
  }, [turn]);

  const handleMove = (index) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
    checkWinner(newBoard);
  };

  const makeAIMove = async () => {
    const response = await axios.post('https://tic-tac-toe-backend-i1bg.onrender.com/make-move', {
      board,
      turn,
    });
    const aiMove = response.data.move;
    const newBoard = [...board];
    newBoard[aiMove] = turn;
    setBoard(newBoard);
    setTurn(turn === 'X' ? 'O' : 'X');
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleMove(index)}>
            {cell}
          </div>
        ))}
      </div>
      <h2>Turn: {turn}</h2>
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
}

export default App;

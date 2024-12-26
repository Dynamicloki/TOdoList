import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(winningCombinations[i]);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setGameStarted(false);
  };

  const isDraw = !winner && board.every(cell => cell !== null);

  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index);
    
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-24 h-24 border-2 border-gray-200 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-50 
          ${isWinningSquare ? 'bg-green-100 border-green-400' : 'bg-white'}
          ${!board[index] && !winner ? 'hover:border-blue-400' : ''}
        `}
        disabled={winner || board[index]}
      >
        {board[index] === 'X' && (
          <X 
            className={`w-12 h-12 text-blue-500 ${isWinningSquare ? 'text-green-600' : ''}`}
            strokeWidth={2.5}
          />
        )}
        {board[index] === 'O' && (
          <Circle 
            className={`w-12 h-12 text-red-500 ${isWinningSquare ? 'text-green-600' : ''}`}
            strokeWidth={2.5}
          />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Tic Tac Toe</h1>
          {!gameStarted && (
            <p className="text-gray-600">Click any square to start the game</p>
          )}
          {gameStarted && !winner && !isDraw && (
            <p className="text-lg text-gray-700">
              Next player: {isXNext ? (
                <X className="inline w-6 h-6 text-blue-500" />
              ) : (
                <Circle className="inline w-6 h-6 text-red-500" />
              )}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-lg">
          {Array(9).fill(null).map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
          ))}
        </div>

        {(winner || isDraw) && (
          <Alert className="bg-white border-green-200">
            <AlertTitle className="text-xl font-semibold">
              {winner ? 'Game Over!' : 'Draw!'}
            </AlertTitle>
            <AlertDescription className="text-lg">
              {winner ? `Player ${winner} wins!` : "It's a draw!"}
            </AlertDescription>
          </Alert>
        )}

        <button
          onClick={resetGame}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;

import type React from "react"
import type { GameState } from "../types"

interface GameBoardProps {
  gameState: GameState
  boardSize: number
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, boardSize }) => {
  const { snake, food } = gameState

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some((segment) => segment.x === x && segment.y === y)
    const isFood = food.x === x && food.y === y

    let cellClass = "w-5 h-5 border border-green-200"
    if (isSnake) {
      cellClass += " bg-green-500"
    } else if (isFood) {
      cellClass += " bg-red-500 rounded-full"
    } else {
      cellClass += " bg-green-100"
    }

    return <div key={`${x}-${y}`} className={cellClass}></div>
  }

  const renderBoard = () => {
    const board = []
    for (let y = 0; y < boardSize; y++) {
      const row = []
      for (let x = 0; x < boardSize; x++) {
        row.push(renderCell(x, y))
      }
      board.push(
        <div key={y} className="flex">
          {row}
        </div>,
      )
    }
    return board
  }

  return <div className="border-4 border-green-800 rounded-lg overflow-hidden">{renderBoard()}</div>
}

export default GameBoard


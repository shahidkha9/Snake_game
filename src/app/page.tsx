"use client"

import { useState, useEffect, useCallback } from "react"
import GameBoard from "./components/GameBoard"
import ScoreBoard from "./components/ScoreBoard"
import { Direction, type GameState } from "./types"

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = Direction.Right
const GAME_SPEED = 150 // milliseconds

export default function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: INITIAL_DIRECTION,
    gameOver: false,
  })
  const [score, setScore] = useState(0)

  const moveSnake = useCallback(() => {
    if (gameState.gameOver) return

    const newSnake = [...gameState.snake]
    const head = { ...newSnake[0] }

    switch (gameState.direction) {
      case Direction.Up:
        head.y = (head.y - 1 + BOARD_SIZE) % BOARD_SIZE
        break
      case Direction.Down:
        head.y = (head.y + 1) % BOARD_SIZE
        break
      case Direction.Left:
        head.x = (head.x - 1 + BOARD_SIZE) % BOARD_SIZE
        break
      case Direction.Right:
        head.x = (head.x + 1) % BOARD_SIZE
        break
    }

    newSnake.unshift(head)

    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      setScore((prevScore) => prevScore + 1)
      const newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      }
      setGameState((prevState) => ({ ...prevState, food: newFood, snake: newSnake }))
    } else {
      newSnake.pop()
      setGameState((prevState) => ({ ...prevState, snake: newSnake }))
    }

    // Check for collision
    if (newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameState((prevState) => ({ ...prevState, gameOver: true }))
    }
  }, [gameState])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setGameState((prevState) =>
            prevState.direction !== Direction.Down ? { ...prevState, direction: Direction.Up } : prevState,
          )
          break
        case "ArrowDown":
          setGameState((prevState) =>
            prevState.direction !== Direction.Up ? { ...prevState, direction: Direction.Down } : prevState,
          )
          break
        case "ArrowLeft":
          setGameState((prevState) =>
            prevState.direction !== Direction.Right ? { ...prevState, direction: Direction.Left } : prevState,
          )
          break
        case "ArrowRight":
          setGameState((prevState) =>
            prevState.direction !== Direction.Left ? { ...prevState, direction: Direction.Right } : prevState,
          )
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    const gameLoop = setInterval(moveSnake, GAME_SPEED)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      clearInterval(gameLoop)
    }
  }, [moveSnake])

  const resetGame = () => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: INITIAL_FOOD,
      direction: INITIAL_DIRECTION,
      gameOver: false,
    })
    setScore(0)
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/public/a_beautiful_forest_background.jpeg')" }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-green-800">Snake Game</h1>
        <ScoreBoard score={score} />
        <GameBoard gameState={gameState} boardSize={BOARD_SIZE} />
        {gameState.gameOver && (
          <div className="mt-4">
            <p className="text-xl font-semibold mb-2 text-red-600">Game Over!</p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


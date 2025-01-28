"use client"

import { useState, useEffect, useCallback } from "react"
import GameBoard from "./components/GameBoard"
import ScoreBoard from "./components/ScoreBoard"
import TouchControls from "./components/TouchControls"
import { Direction, type GameState } from "./types"

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = Direction.Right
const GAME_SPEED = 150

export default function SnakeGame() {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: INITIAL_DIRECTION,
    gameOver: false,
  })
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const moveSnake = useCallback(() => {
    if (gameState.gameOver) return

    setGameState((prevState) => {
      const newSnake = [...prevState.snake]
      const head = { ...newSnake[0] }

      switch (prevState.direction) {
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

      let newFood = prevState.food
      let newScore = score

      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        newScore += 1
        setScore(newScore)
        newFood = {
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE),
        }
      } else {
        newSnake.pop()
      }

      // Check for collision
      const collision = newSnake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)

      if (collision) {
        setHighScore((prev) => Math.max(prev, newScore))
        return { ...prevState, gameOver: true }
      }

      return { ...prevState, snake: newSnake, food: newFood }
    })
  }, [gameState.gameOver, score])

  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prevState) => {
      const oppositeDirections = {
        [Direction.Up]: Direction.Down,
        [Direction.Down]: Direction.Up,
        [Direction.Left]: Direction.Right,
        [Direction.Right]: Direction.Left,
      }

      if (newDirection === oppositeDirections[prevState.direction]) {
        return prevState
      }

      return { ...prevState, direction: newDirection }
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          changeDirection(Direction.Up)
          break
        case "ArrowDown":
          changeDirection(Direction.Down)
          break
        case "ArrowLeft":
          changeDirection(Direction.Left)
          break
        case "ArrowRight":
          changeDirection(Direction.Right)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)

    const gameLoop = setInterval(moveSnake, GAME_SPEED)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      clearInterval(gameLoop)
    }
  }, [moveSnake, changeDirection])

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4">
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-800 animate-pulse">Snake Game</h1>
        <ScoreBoard score={score} highScore={highScore} />
        <GameBoard gameState={gameState} boardSize={BOARD_SIZE} />
        <TouchControls onDirectionChange={changeDirection} />
        {gameState.gameOver && (
          <div className="mt-6 text-center">
            <p className="text-2xl font-semibold mb-4 text-red-600">Game Over!</p>
            <button
              className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition-colors transform hover:scale-105"
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


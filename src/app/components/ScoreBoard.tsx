import type React from "react"

interface ScoreBoardProps {
  score: number
  highScore: number
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-green-800">Score: {score}</h2>
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-800">High Score: {highScore}</h2>
    </div>
  )
}

export default ScoreBoard





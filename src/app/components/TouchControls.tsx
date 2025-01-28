import type React from "react"
import { Direction } from "../types"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void
}

const TouchControls: React.FC<TouchControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div></div>
      <button
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => onDirectionChange(Direction.Up)}
      >
        <ArrowUp className="w-8 h-8 text-white" />
      </button>
      <div></div>
      <button
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => onDirectionChange(Direction.Left)}
      >
        <ArrowLeft className="w-8 h-8 text-white" />
      </button>
      <div></div>
      <button
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => onDirectionChange(Direction.Right)}
      >
        <ArrowRight className="w-8 h-8 text-white" />
      </button>
      <div></div>
      <button
        className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => onDirectionChange(Direction.Down)}
      >
        <ArrowDown className="w-8 h-8 text-white" />
      </button>
      <div></div>
    </div>
  )
}

export default TouchControls


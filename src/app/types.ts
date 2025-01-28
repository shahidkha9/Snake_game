export enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
  }
  
  export interface Position {
    x: number
    y: number
  }
  
  export interface GameState {
    snake: Position[]
    food: Position
    direction: Direction
    gameOver: boolean
  }
  
  
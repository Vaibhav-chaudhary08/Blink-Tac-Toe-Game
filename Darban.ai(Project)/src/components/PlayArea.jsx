"use client"

import { useState, useEffect } from "react"
import GameGrid from "./GameGrid.jsx"
import { CATEGORIES } from "./GameSetup.jsx"
import "./PlayArea.css"

function PlayArea({ players, onGameComplete, onReset }) {
  const [grid, setGrid] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState("p1")
  const [nextEmoji, setNextEmoji] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [winningSpots, setWinningSpots] = useState([])
  const [moveCount, setMoveCount] = useState(0)

  const getRandomEmoji = (playerKey) => {
    const category = players[playerKey].category
    const emojis = CATEGORIES[category]
    return emojis[Math.floor(Math.random() * emojis.length)]
  }

  useEffect(() => {
    setNextEmoji(getRandomEmoji("p1"))
  }, [])

  const checkForWin = (gridState) => {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const line of winLines) {
      const [a, b, c] = line
      if (gridState[a] && gridState[b] && gridState[c]) {
        // Check if all three cells have emojis from the same player
        const p1Category = CATEGORIES[players.p1.category]
        const p2Category = CATEGORIES[players.p2.category]

        const p1Match =
          p1Category.includes(gridState[a]) && p1Category.includes(gridState[b]) && p1Category.includes(gridState[c])
        const p2Match =
          p2Category.includes(gridState[a]) && p2Category.includes(gridState[b]) && p2Category.includes(gridState[c])

        if (p1Match) return { winner: "p1", line }
        if (p2Match) return { winner: "p2", line }
      }
    }
    return null
  }

  const handleCellClick = (index) => {
    if (grid[index] || gameOver) return

    const newGrid = [...grid]
    newGrid[index] = nextEmoji
    setGrid(newGrid)
    setMoveCount(moveCount + 1)

    // Check for win
    const result = checkForWin(newGrid)
    if (result) {
      setWinningSpots(result.line)
      setGameOver(true)
      setTimeout(() => onGameComplete(result.winner), 1500)
    } else if (moveCount + 1 === 9) {
      // Check for draw
      setGameOver(true)
      setTimeout(() => onGameComplete("draw"), 1500)
    } else {
      // Switch turns
      const nextTurn = turn === "p1" ? "p2" : "p1"
      setTurn(nextTurn)
      setNextEmoji(getRandomEmoji(nextTurn))
    }
  }

  return (
    <div className="play-container">
      <div className="game-status">
        <div className="turn-display">
          <span className="current-player">{players[turn].name}'s Turn</span>
          <div className="next-emoji">{nextEmoji}</div>
        </div>
      </div>

      <GameGrid grid={grid} onCellClick={handleCellClick} winningSpots={winningSpots} />

      <div className="game-controls">
        <button className="reset-btn" onClick={onReset}>
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default PlayArea

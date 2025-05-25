"use client"

import "./GameGrid.css"

function GameGrid({ grid, onCellClick, winningSpots }) {
  return (
    <div className="grid-container">
      {grid.map((cell, index) => (
        <div
          key={index}
          className={`grid-cell ${winningSpots.includes(index) ? "winning" : ""} ${cell ? "filled" : "empty"}`}
          onClick={() => onCellClick(index)}
        >
          {cell && <span className="cell-emoji">{cell}</span>}
        </div>
      ))}
    </div>
  )
}

export default GameGrid

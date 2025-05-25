"use client"

import { useState } from "react"
import "./GameSetup.css"

const CATEGORIES = {
  faces: ["😀", "😎", "🤔", "😴", "🥳", "😇", "🤓", "😋"],
  hearts: ["❤️", "💙", "💚", "💛", "🧡", "💜", "🖤", "🤍"],
  hands: ["👍", "👎", "✌️", "🤞", "🤟", "🤘", "👌", "✊"],
  weather: ["☀️", "🌙", "⭐", "🌈", "⚡", "❄️", "🔥", "💧"],
  shapes: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪"],
  symbols: ["✨", "💫", "⭐", "🌟", "💥", "💢", "💯", "🎯"],
}

function GameSetup({ onComplete }) {
  const [selections, setSelections] = useState({ p1: null, p2: null })
  const [activePlayer, setActivePlayer] = useState("p1")

  const selectCategory = (categoryName) => {
    const otherPlayer = activePlayer === "p1" ? "p2" : "p1"

    if (selections[otherPlayer] === categoryName) {
      alert("Category already taken!")
      return
    }

    setSelections((prev) => ({ ...prev, [activePlayer]: categoryName }))

    if (activePlayer === "p1" && !selections.p2) {
      setActivePlayer("p2")
    }
  }

  const canStart = selections.p1 && selections.p2

  return (
    <div className="setup-container">
      <div className="setup-header">
        <h2>Choose Your Emoji Sets</h2>
        <div className="player-tabs">
          <button className={`tab ${activePlayer === "p1" ? "active" : ""}`} onClick={() => setActivePlayer("p1")}>
            Player 1 {selections.p1 && `(${selections.p1})`}
          </button>
          <button className={`tab ${activePlayer === "p2" ? "active" : ""}`} onClick={() => setActivePlayer("p2")}>
            Player 2 {selections.p2 && `(${selections.p2})`}
          </button>
        </div>
      </div>

      <div className="categories-container">
        {Object.entries(CATEGORIES).map(([name, emojis]) => (
          <div
            key={name}
            className={`category-option ${
              selections.p1 === name || selections.p2 === name ? "taken" : ""
            } ${selections[activePlayer] === name ? "selected" : ""}`}
            onClick={() => selectCategory(name)}
          >
            <h3 className="category-title">{name}</h3>
            <div className="emoji-row">
              {emojis.slice(0, 4).map((emoji, i) => (
                <span key={i} className="emoji-preview">
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {canStart && (
        <button className="start-btn" onClick={() => onComplete(selections.p1, selections.p2)}>
          Start Playing
        </button>
      )}
    </div>
  )
}

export default GameSetup
export { CATEGORIES }

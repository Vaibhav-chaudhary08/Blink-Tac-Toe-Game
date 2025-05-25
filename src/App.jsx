"use client"

import { useState } from "react"
import GameSetup from "./components/GameSetup.jsx"
import PlayArea from "./components/PlayArea.jsx"
import "./App.css"

function App() {
  const [gamePhase, setGamePhase] = useState("setup") // setup, active, complete
  const [players, setPlayers] = useState({
    p1: { name: "Player 1", category: null, score: 0 },
    p2: { name: "Player 2", category: null, score: 0 },
  })
  const [winner, setWinner] = useState(null)

  const handleSetupComplete = (p1Category, p2Category) => {
    setPlayers((prev) => ({
      p1: { ...prev.p1, category: p1Category },
      p2: { ...prev.p2, category: p2Category },
    }))
    setGamePhase("active")
  }

  const handleGameComplete = (winnerKey) => {
    if (winnerKey === "draw") {
      setWinner("draw")
    } else {
      setPlayers((prev) => ({
        ...prev,
        [winnerKey]: { ...prev[winnerKey], score: prev[winnerKey].score + 1 },
      }))
      setWinner(winnerKey)
    }
    setGamePhase("complete")
  }

  const startNewRound = () => {
    setWinner(null)
    setGamePhase("active")
  }

  const resetEverything = () => {
    setPlayers({
      p1: { name: "Player 1", category: null, score: 0 },
      p2: { name: "Player 2", category: null, score: 0 },
    })
    setWinner(null)
    setGamePhase("setup")
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="game-title">Emoji Tic Tac Toe</h1>
        <div className="score-tracker">
          <span className="score-item">
            {players.p1.name}: {players.p1.score}
          </span>
          <span className="score-divider">|</span>
          <span className="score-item">
            {players.p2.name}: {players.p2.score}
          </span>
        </div>
      </header>

      <main className="main-area">
        {gamePhase === "setup" && <GameSetup onComplete={handleSetupComplete} />}

        {gamePhase === "active" && (
          <PlayArea players={players} onGameComplete={handleGameComplete} onReset={resetEverything} />
        )}

        {gamePhase === "complete" && (
          <div className="completion-screen">
            <h2 className="winner-text">
              {winner === "draw" ? "It's a Draw!" : `${players[winner].name} Wins This Round!`}
            </h2>
            <div className="completion-actions">
              <button className="action-btn primary" onClick={startNewRound}>
                Next Round
              </button>
              <button className="action-btn secondary" onClick={resetEverything}>
                New Game
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

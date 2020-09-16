import React from "react"

import { Reviews } from "./components/Reviews"

import "./App.css"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Ratings</h1>
        <div className="reviews">
          <Reviews />
        </div>
      </header>
    </div>
  )
}

export default App

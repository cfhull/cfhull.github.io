import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './home/Home'
import Exoplanets from './exoplanets/Exoplanets'
import './App.css'

const App = () => (
  <div className="app">
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/exoplanets" component={Exoplanets} />
    </Router>
  </div>
)

export default App

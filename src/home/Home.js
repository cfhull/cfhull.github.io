import React from 'react'
import './home.css'
import Jumbotron from './Jumbotron'
import Resume from './resume/Resume'

const Home = () => (
  <div className="home">
    <Jumbotron />
    <Resume />
  </div>
)

export default Home;

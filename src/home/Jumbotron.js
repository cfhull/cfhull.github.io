import React from 'react'
import { Link } from "react-router-dom"
import './Jumbotron.css'
import logo from './profilepic.jpg'


const Jumbotron = () => (
  <div className="jumbotron">
	  <img className="logo" src={logo} />
	  <div className="content">
	    <h1>Christopher Hull</h1>
	    <h3>Software Developer</h3>
	    <p>Current working on an exoplanet data visualization using D3.js, Check it out <Link to="/exoplanets">HERE</Link></p>
    </div>
  </div>
)

export default Jumbotron

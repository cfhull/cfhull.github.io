import React from 'react'
import * as d3 from 'd3'
import { legendColor } from 'd3-svg-legend'
import d3Tip from 'd3-tip'
import './exoplanets.css' 
import bg from './images/starryBG.jpg'
import mercury from './images/mercury.png'
import venus from './images/venus.png'
import earth from './images/earth.png'
import mars from './images/mars.png'
import jupiter from './images/jupiter.png'
import saturn from './images/saturn.png'
import uranus from './images/uranus.png'
import neptune from './images/neptune.png'
import pluto from './images/pluto.png'
import data from './exoplanetData.csv'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowsAlt,
  faCompressArrowsAlt,
} from '@fortawesome/free-solid-svg-icons'

const planetImages = [earth, jupiter, mars, mercury, neptune, pluto, saturn, uranus, venus]

export default class Exoplanets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullscreen: false,
    }

    this.draw = this.draw.bind(this)
  }

  draw() {
	  // set up svg margins and dimensions
	  const margin = {top: 0, right: 0, bottom: 0, left: 0}

    let width   = d3.select('#exoplanets-viz').node().parentElement.clientWidth
	  let height  = 870 - margin.top - margin.bottom

	  if (this.state.fullscreen) {
      width  = document.documentElement.clientWidth
      height = document.documentElement.clientHeight
	  }

	  const axisPadding = 50

	  // import csv data
	  d3.csv(data, type,).then(data => {

		  // set scales
		  const xScale = d3.scaleLinear()
			  .domain([0, d3.max(data, d => d.pl_orbsmax)])
			  .range([0, width])

		  const exoplanetRadiusScale = d3.scaleLinear()
			  .domain([0, d3.max(data, d => d.pl_radj)])
			  .range([0, 200])

		  const stellerTempScale = d3.scaleLinear()
			  .domain([d3.min(data, d => d.st_teff), 5000, 6000, 7500, 10000, 30000, 60000])
			  .range(["#FF0000", "#FFA500", "#FFFF00", "#FFFFFF", "#CCCCFF", "#6666FF", "#0000FF"]) // red, orange, yellow-white, white, blue-white, blue, blue

		  const planetTempScale = d3.scaleLinear()
			  .domain([d3.min(data, d => d.pl_eqt), 184,294, 330, 400, d3.max(data, d => d.pl_eqt)])
			  .range(["#78D5E3","#00FFAA","#00CC00", "#CCF000", "#CC6900", "#800000"]) // super-blue, blue with very little green, green, brown with very little green, brown, red

		  // create tooltips
		  const tip = d3Tip()
        .attr('class', 'd3-tip')
        .offset(() => [-10, 0])
        .html(d => {
					if (+d.solarsystemflag === 1) {
						return "<h1>" + d.pl_hostname.concat(d.pl_letter) + "</h1>"
							+ "<dl>"
							+ "<dt>Orbit Distance</dt><dd>" + d.pl_orbsmax + "</dd>"
							+ "<dt>Orbital Period</dt><dd>" + d.pl_orbper + "</dd>"
							+ "<dt>Radius</dt><dd>" + d.pl_radj + "</dd>"
							+ "<dt>Planet Surface Temp</dt><dd>" + d.pl_eqt + "</dd>"                    
							+ "<dt>Star Temp</dt><dd>" + d.st_teff + "</dd>"
							+ "<dt>Year Discovered</dt><dd>" + d.pl_disc + "</dd>"
							+ "</dl>"
					} else {
						return "<h1>" + d.pl_hostname.concat(d.pl_letter) + "</h1>"
							+ "<dl>"
							+ "<dt>Orbit Distance</dt><dd>" + d.pl_orbsmax + "</dd>"
							+ "<dt>Orbital Period</dt><dd>" + d.pl_orbper + "</dd>"
							+ "<dt>Radius</dt><dd>" + d.pl_radj + "</dd>"
							+ "<dt>Planet Equilibrium Temp</dt><dd>" + d.pl_eqt + "</dd>"                    
							+ "<dt>Stellar Distance</dt><dd>" + d.st_dist + "</dd>"
							+ "<dt>Star Temp</dt><dd>" + d.st_teff + "</dd>"
							+ "<dt>Year Discovered</dt><dd>" + d.pl_disc + "</dd>"
							+ "</dl>"
					}
        })

		  // set axes
		  const xAxis = d3.axisBottom()
			  .scale(xScale)
			  .tickFormat(d => {
				  const formatter = d3.format("")
         	if (d < 0) {
         		return ''
         	}
         	return formatter(d)
    		})

		  // set zoom behavior	
		  const zoom = d3.zoom()

		  // create and get svg element
      d3.select('#exoplanets-viz svg').remove()
		  const svg = d3.select("#exoplanets-viz").append("svg")
			  .attr("width", '100%')
			  .attr("height", height + margin.top + margin.bottom)
			  .append("g")
				.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
     		.call(zoom.on("zoom", zoomed))

		  svg.call(tip)

		  // invisible rect that handles mouse events
		  svg.append("rect")
			  .attr("width", width)
			  .attr("height", height)
			  .style("fill", "none")
			  .style("pointer-events", "all")

		  // create defs
		  const gradient = svg.append("defs")
			  .append("linearGradient")
		    .attr("id", "gradient")
				.attr("x1", "50%")
				.attr("y1", "100%")
				.attr("x2", "50%")
				.attr("y2", "0%")
				.attr("spreadMethod", "pad")

		  gradient.append("stop")
		    .attr("offset", "0%")
		    .attr("stop-color", "#FF0000")
		    .attr("stop-opacity", 1)

		  gradient.append("stop")
		    .attr("offset", "20%")
		    .attr("stop-color", "#FFA500")
		    .attr("stop-opacity", 1)

      gradient.append("stop")
        .attr("offset", "40%")
        .attr("stop-color", "#FFFF00")
        .attr("stop-opacity", 1)

      gradient.append("stop")
        .attr("offset", "60%")
        .attr("stop-color", "#FFFFFF")
        .attr("stop-opacity", 1)

      gradient.append("stop")
        .attr("offset", "80%")
        .attr("stop-color", "#CCCCFF")
        .attr("stop-opacity", 1)

      gradient.append("stop")
        .attr("offset", "90%")
        .attr("stop-color", "#6666FF")
        .attr("stop-opacity", 1)

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#0000FF")
        .attr("stop-opacity", 1)

	 	  // holds all svg elements
		  const container = svg.append("g")
			  .attr("id", "container")
			  .attr("transform", "translate(" + 0 + ", " + 0 + ")")

		  // Create starry background image
		  container.append("image")
			  .attr("id", "background")
			  .attr("xlink:href", bg)
			  .attr('height', height)
			  .attr('width', width)
			  .attr('preserveAspectRatio', 'none')

		  // create axes
		  container.append("g")
			  .attr("class", "x axis")
    		.attr("transform", "translate(" + 0 + ", " + (height - axisPadding) + ")")
			  .call(xAxis)

		  container.select(".x.axis").append("text")
			  .attr("id", "xAxisTitle")
			  .style("text-anchor", "middle")
			  .attr("x", (width / 2))
			  .attr("y", 40)
			  .text("Orbit Semi-Major Axis (AU)")

		  // create points
		  const dataPoints = container.append("g")
			  .attr("transform", "translate(" + 0 + ", " + height / 2 + ")")

		  const nodes = dataPoints.selectAll("g")
			  .data(data)
			  .enter().append("g")
			  .attr("transform", (d, i) => "translate(" + xScale(d.pl_orbsmax) + "," + 0 + ")")

      nodes.filter(d => +d.solarsystemflag === 1)
        .sort((a, b) => a.pl_hostname.localeCompare(b.pl_hostname))
        .append("image")
        .attr("xlink:href", (d, i) => planetImages[i])
        .attr("height", d => {
					// Cheat the size if Saturn, because of the rings. Don't tell anyone.
					if (d.pl_hostname === "Saturn"){
						return exoplanetRadiusScale(d.pl_radj)*3.5
					}else{
			      return exoplanetRadiusScale(d.pl_radj)*2
					}
        })
        .attr("width", d => {
					// Cheat the size if Saturn, because of the rings. Don't tell anyone.
					if (d.pl_hostname === "Saturn"){
            return exoplanetRadiusScale(d.pl_radj)*3.5
          }else{
            return exoplanetRadiusScale(d.pl_radj)*2
					}
        })
        .attr("x", function() {
          return -(d3.select(this).attr("width") / 2)
        })
        .attr("y", function(d) {
					// Cheat the size if Saturn, because of the rings. Don't tell anyone.
				  return d.pl_hostname === "Saturn"
				    ? -(d3.select(this).attr("height") / 2) - 4
            : -(d3.select(this).attr("height") / 2)
				})

		  const planets = nodes.append("circle")
			  .style("pointer-events", "all")
			  .style("fill", (d, i) => {
				  if (+d.solarsystemflag === 0 && d.pl_eqt){
					  return planetTempScale(d.pl_eqt)
				  }else if (+d.solarsystemflag === 1){
					  return "none"
				  }else{
					  return "black"
				  }
			  })
			  .style("stroke-width", 5)
			  .style("stroke", (d, i) => +d.solarsystemflag === 0 ? stellerTempScale(d.st_teff) : "none")
			  .attr("r", (d, i) => 0)

		  planets.transition() 
			  .duration(2000)
			  .attr("r", d => exoplanetRadiusScale(d.pl_radj))

		  planets.on("mouseenter", function(d) {
			  d3.select(this).style("stroke", "blue")
				  .style("stroke-width", 2)

			  tip.show(d, this)
		  })

		  planets.on("mouseleave", function(d) {
        d3.select(this).style("stroke", (d, i) => +d.solarsystemflag === 0 ? stellerTempScale(d.st_teff) :"none")
					.style("stroke-width", 5)

			  tip.hide(d, this)
      })

      // create planet temp legend		
		  const legendHeight = height / 4
		  const legendIconRadius = legendHeight / 9

		  const legendContainer = container.append("g")
			  .attr("id", "planetTempLegend")
			  .attr("transform", "translate(0, " + (legendIconRadius+32) + ")")

		  legendContainer.append("rect")
			  .style("fill", "black")
			  .style("stroke", "white")
			  .attr("width", 230)
			  .attr("height", legendHeight)
			  .attr("transform", "translate(0, " + (-legendIconRadius-32) + ")")
		  console.log(legendColor)
		  const planetTempLegend = legendColor()
			  .labels(["0 Kelvin (K)", "294 K (Earth Temperature)", "2550 K"])
			  .shape('circle')
			  .shapeRadius(legendIconRadius)
	      .shapePadding(5)
			  .cells([0, 294, 2550])
			  .orient('vertical')
			  .scale(planetTempScale)

		  container.select("#planetTempLegend")
			  .append("text")
				.attr("class", "legendTitle")
				.attr("transform", "translate(" + 5 + ", " + ((-legendIconRadius)-16) + ")")
				.text("Exoplanet Temperature")

		  container.select("#planetTempLegend")
			  .call(planetTempLegend)

      // create steller temp legend
		  container.append("g")
			  .attr("id", "stellerTempLegend")
			  .attr("transform", "translate(0, " + (height - 100) + ")")

		  const stellerTempLegend = legendColor()
			  .labels(["M < 3,500K", "K 3,500 - 5,000K", "G 5,000 - 6,000K", "F 6,000 - 7,500K", "A 7,500 - 10,000K", "B 10,000 - 30,000K", "O 30,000 - 60,000K"])
			  .shapeWidth(width / 7)
	      .shapePadding(0)
			  .cells([3000, 5000, 6000, 7500, 10000, 30000, 60000])
			  .orient('horizontal')
			  .scale(stellerTempScale)

		  container.select("#stellerTempLegend")
			  .append("text")
				.attr("class", "legendTitle")
				.attr("transform", "translate(" + 5 + "" + -5 + ")")
				.text("Host Star Spectral Classification and Temperature")

		  container.select("#stellerTempLegend")
			  .call(stellerTempLegend)

      function zoomed() {
	      const t = d3.event.transform
	      const xt = t.rescaleX(xScale)
	      svg.select(".x.axis").call(xAxis.scale(xt))
	      nodes.attr("transform", (d, i) => "translate(" + xt(d.pl_orbsmax) + "," + 0 + ")")
      }

    })

    // sets the value field of the csv data to be an integer instead of a string
    function type(d){
	    d.pl_orbsmax = +d.pl_orbsmax
	    d.pl_orbsper = +d.pl_orbsper
	    d.pl_radj    = +d.pl_radj
	    d.pl_eqt	 = +d.pl_eqt
	    d.st_dist	 = +d.st_dist
	    d.st_teff	 = +d.st_teff
	    return d
    }
  }

  componentDidMount() {
    // Naive implementation that simply redraws on resize
    // Flickers when resizing but makes it responsive
    this.draw()
    window.addEventListener("resize", this.draw)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.draw)
  }

  onFullScreen() {
    this.setState(prevState => ({ fullscreen: !prevState.fullscreen }),
      this.draw
    )
  }

  render() {
    return (
      <div className="exoplanets">
        <div id="exoplanets-viz" className={this.state.fullscreen ? ' fullscreen' : ''}></div>
        <button
          className="btn-fullscreen"
          onClick={() => this.onFullScreen()}
        >
          <FontAwesomeIcon icon={this.state.fullscreen ? faCompressArrowsAlt : faArrowsAlt} size="2x" />
        </button>
        <div className="exoplanet-description">
			    <p>The above visualization depicts exoplanets discovered through the Kepler and K2 missions, along with solar system planets for reference. Feel free to zoom in, zoom out, drag, and hover to look at the planets in greater detail.</p>
			    <p>How to read this:</p>
			    <ul>
				    <li>The horizontal axis represents the planet’s orbit semi-major axis, which is the maximum distance between the planet and its host star. The units are in AU (astronomical units), which is defined as the average distance between the Earth and the Sun. The size of the planet is with respect to the planet’s radius.</li>
				    <li>The border of the planet shows the stellar class (and therefore, temperature), of the planet’s host star, with the color scale roughly corresponding to the color of the star.</li>
				    <li>The fill of the planet shows the planet’s effective temperature when available. Planets with green fills are those with effective temperature values between the coldest and hottest recorded temperatures on Earth. While planet temperature data is mostly unavailable (hence all the black fills), I hope to eventually use a rough estimation scheme for the remaining planets.</li>
			    </ul>
			    <p>This visualization has made use of the NASA Exoplanet Archive, which is operated by the California Institute of Technology, under contract with the National Aeronautics and Space Administration under the Exoplanet Exploration Program.</p>
		    </div>
      </div>
    )
  }
}

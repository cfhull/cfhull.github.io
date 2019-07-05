import React from 'react'
import * as d3 from 'd3'
import data from './data.csv'

export default class Skills extends React.Component {

  constructor(props) {
    super(props)

    this.draw = this.draw.bind(this)
  }

  draw() {
    // set up svg margins and dimensions
    const margin = {top: 20, right: 0, bottom: 0, left: 0}
    const svgWidth   = d3.select('#skillChart').node().parentElement.clientWidth
    const svgHeight  = 300 - margin.top - margin.bottom

    const barPadding = 5

    // create and get svg element
    d3.select('#skillChart svg').remove()
    const svg = d3.select('div#skillChart').append('svg')
    svg
	    .attr('width', '100%')
	    .attr('height', svgHeight + margin.top + margin.bottom)
	    .append('g')
		  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // set up svg defs for gradients
    svg.append('svg:defs')

    // set gradients colors [startColor, endColor]
    const gradientColors = [
      ['#6F0F0A', '#C45953'], //red
			['#0F204D', '#405385'], //blue
			['#085612', '#40984B'], //green
			['#5B0834', '#A04474'], //magenta
			['#073E44', '#337177'], //indigo
			['#6F4E0A', '#C49F52'], //gold
		]

    // for each gradient color, create a gradient svg element. 
    gradientColors.forEach((gradientColor, i) => {
	    const gradient = svg.select('defs').append('svg:linearGradient')
		    .attr('id', 'gradient' + i)
		    .attr('x1', '0%')
		    .attr('y1', '50%')
		    .attr('x2', '100%')
		    .attr('y2', '50%')
		    .attr('spreadMethod', 'pad')

	    gradient.append('svg:stop')
		    .attr('offset', '0%')
		    .attr('stop-color', gradientColor[0])
		    .attr('stop-opacity', 1)

	    gradient.append('svg:stop')
		    .attr('offset', '100%')
		    .attr('stop-color', gradientColor[1])
		    .attr('stop-opacity', 1)
    })

    d3.csv(data, type).then(data =>  {
      data = data.sort((a, b) => b.value - a.value)

	    // set scales
	    const xScale = d3.scaleLinear()
		    .domain([0, 5])
		    .range([0, svgWidth - 20])		

	    const yScale = d3.scaleBand()
		    .domain(data.map(d => d.name))
		    .range([0, svgHeight])		

	    // create bar elements
	    svg.selectAll('rect')
		    .data(data).enter()
		    .append('rect')
			  .style('fill', (d, i) => 'url(#gradient' + (i % gradientColors.length) + ')')
			  .attr('class', 'bar')
			  .attr('height', svgHeight / data.length - barPadding)
			  .attr('width', d => xScale(d.value))
			  .attr('y', d => yScale(d.name))

	    // set labels	
	    const xLabels = svg.append('g').attr('class', 'xLabel')

	    xLabels.selectAll('text')
		    .data(data).enter()
		    .append('text')
			  .text(d => d.value)
			  .attr('x', d => xScale(d.value) + 5)	
			  .attr('y', (d, i) => i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2 )
			  .attr('alignment-baseline', 'central')

	    const yLabels = svg.append('g')
		    .attr('class', 'yLabel')

	    yLabels.selectAll('text')
		    .data(data).enter()
		    .append('text')
			  .text(d => d.name)
			  .attr('x', 5)	
			  .attr('y', (d, i) => i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2)
			  .attr('fill', 'white')
			  .attr('alignment-baseline', 'central')

	    // create bar elements that hold mousevents
	    const barEvents = svg.append('g').selectAll('rect')
		    .data(data).enter()
		    .append('rect')
			  .style('fill', 'white')
			  .style('fill-opacity', '0.0')
			  .attr('class', 'barEvent')
			  .attr('height', svgHeight / data.length - barPadding)
			  .attr('width', d => 0)
			  .attr('y', d => yScale(d.name))

	    // onclick event for bars
	    barEvents.on('click', function() {

		    // sets bar to selected state
		    selectBar(d3.select(this), barEvents)

		    // sets description p element to relevent Color text
		    document.getElementById('descriptionParagraph').innerText = d3.select(this).datum().description
	    })

	    barEvents.on('mouseover', function() {
		    d3.select(this).style('stroke', 'black')
	    })

	    barEvents.on('mouseout', function() {
		    d3.select(this).style('stroke', 'none')
	    })

	    barEvents.transition()
		    .delay((d, i) => i * 100)
		    .duration(1000)
		    .attr('width', d => xScale(d.value))

    })

    // highlights selection
    function selectBar(selectedBar, barEvents){

	    // set all bars back to default styling
	    barEvents.style('stroke', 'none')
		    .style('fill-opacity', '0.0')

	    // set selected bar to 'highlighted' styling
	    selectedBar.style('stroke', 'black')
		    .style('fill-opacity', '0.5')	
    }

    // sets the value field of the csv data to be an integer instead of a string
    function type(d){
	    d.value = +d.value
	    return d
    }
  }

  componentDidMount() {
    // Naive implementation that simply redraws on resize
    // Flickers when resizing but makes it responsive
    // Also break width transitions so they had to be removed
    this.draw()
    window.addEventListener("resize", this.draw);

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.draw)
  }

  render() {
    return (
      <div className='skills'>
    	  <div id='skillChart'></div>
			  <div id='skillDescription'>
				  <p id='descriptionParagraph'>Click any bar for more information.</p>
			  </div>		
		  </div>
    )
  }
}

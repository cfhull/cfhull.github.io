import * as d3 from 'd3'

export const skillsChart = () => {
  // set up svg margins and dimensions
  const margin = {top: 20, right: 0, bottom: 0, left: 0},
  svgWidth   = 500 - margin.left - margin.right,
  svgHeight  = 300 - margin.top - margin.bottom

  const barPadding = 5

  // create and get svg element
  const svg = d3.select('div#skillChart').append('svg')
    .attr('width', svgWidth + margin.left + margin.right)
    .attr('height', svgHeight + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // set up svg defs for gradients
  svg.append('svg:defs')

  // set gradients colors [startColor, endColor]
  const gradientColors = [['#6F0F0A', '#C45953'],  //red
            ['#0F204D', '#405385'],  //blue
            ['#085612', '#40984B'],  //green
            ['#5B0834', '#A04474'],  //magenta
            ['#073E44', '#337177'],  //indigo
            ['#6F4E0A', '#C49F52']] //gold							  						  

  // for each gradient color, create a gradient svg element. 
  gradientColors.forEach(function(gradientColor, i) {
    
    const gradient = svg.select('defs').append('svg:linearGradient')
      .attr('id', 'gradient' + i)
      .attr('x1', '0%')
      .attr('y1', '50%')
      .attr('x2', '100%')
      .attr('y2', '50%')
      .attr('spreadMethod', 'pad')

    gradient.append('svg:stop')
      .attr('offset', '0%')
      .attr('stop-color', gradientColors[i][0])
      .attr('stop-opacity', 1)
    
    gradient.append('svg:stop')
      .attr('offset', '100%')
      .attr('stop-color', gradientColors[i][1])
      .attr('stop-opacity', 1)
  })


  // import csv data
  d3.csv('public/data.csv', type, (data) => {
    
    // set scales
    const xScale = d3.scaleLinear()
      .domain([0, 5])
      .range([0, svgWidth])		
    
    const yScale = d3.scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([0, svgHeight])		
    
    // create bar elements
    const bars = svg.selectAll('rect')
      .data(data).enter()
      .append('rect')
        .style('fill', (d, i) => 'url(#gradient' + (i % gradientColors.length) + ')')
        .attr('class', 'bar')
        .attr('height', svgHeight / data.length - barPadding)
        .attr('width', (d) => 0)
        .attr('y', (d) => yScale(d.name))
    
    bars.transition()
      .delay((d, i) =>  i * 100)
      .duration(1000)
      .attr('width', (d) => xScale(d.value))
      

    
    // set labels	
    const xLabels = svg.append('g').attr('class', 'xLabel')
    
    xLabels.selectAll('text')
      .data(data).enter()
      .append('text')
        .text((d) => d.value)
        .attr('x', (d) => xScale(d.value) + 5)	
        .attr('y', (d, i) => i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2)
    
    const yLabels = svg.append('g')
      .attr('class', 'yLabel')
    
    yLabels.selectAll('text')
      .data(data).enter()
      .append('text')
        .text((d) =>  d.name)
        .attr('x', 5)	
        .attr('y', (d, i) => i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2)
    
    // create bar elements that hold mousevents
    const barEvents = svg.append('g').selectAll('rect')
      .data(data).enter()
      .append('rect')
        .style('fill', 'white')
        .style('fill-opacity', '0.0')
        .attr('class', 'barEvent')
        .attr('height', svgHeight / data.length - barPadding)
        .attr('width', 0)
        .attr('y', (d) => yScale(d.name))
    
    // onclick event for bars
    barEvents.on('click', function() {
      
      // sets bar to selected state
      selectBar(d3.select(this), barEvents)
      
      // sets description p element to relevent paragraph text
      document.getElementById('descriptionParagraph').innerHTML = d3.select(this).datum().description
    }).on('mouseover', function() {
      d3.select(this).style('stroke', 'black')
    }).on('mouseout', function() {
      d3.select(this).style('stroke', 'none')
    }).transition()
      .delay((d, i) =>  i * 100)
      .duration(1000)
      .attr('width', (d) => xScale(d.value))

  });

  // highlights selection
  function selectBar(selectedBar, barEvents) {
    
    // set all bars back to default styling
    barEvents.style('stroke', 'none')
      .style('fill-opacity', '0.0')
    
    // set selected bar to 'highlighted' styling
    selectedBar.style('stroke', 'black')
      .style('fill-opacity', '0.5')	
  }

  // sets the value field of the csv data to be an integer instead of a string
  function type(d) {
    d.value = +d.value
    return d
  }
}

import * as d3 from 'd3'
import data from './data.csv'

const createSkillsChart = () => {
  const margin = {top: 20, right: 0, bottom: 0, left: 0}
  const svgHeight  = 300 - margin.top - margin.bottom

  const barPadding = 5

  const svg = d3.select('#skillChart').append('svg')
    .attr('width', '100%')
    .attr('height', svgHeight + margin.top + margin.bottom)

  const bars = svg.append('g')

  const xLabels = svg.append('g')
    .attr('class', 'xLabel')

  const yLabels = svg.append('g')
    .attr('class', 'yLabel')

  const barEvents = svg.append('g')

  svg.append('svg:defs')

  const gradientColors = [
    ['#6F0F0A', '#C45953'], //red
    ['#0F204D', '#405385'], //blue
    ['#085612', '#40984B'], //green
    ['#5B0834', '#A04474'], //magenta
    ['#073E44', '#337177'], //indigo
    ['#6F4E0A', '#C49F52'], //gold
  ]

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

    window.addEventListener('resize', () => render(data))

    render(data)

  })

  function render(data) {
    const svgWidth = d3.select('#skillChart').node().parentElement.clientWidth

    const xScale = d3.scaleLinear()
      .domain([0, 5])
      .range([0, svgWidth - 20])		

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, svgHeight])		

    bars.selectAll('rect')
      .data(data)
      .join(
        enter => enter.append('rect')
        .style('fill', (d, i) => 'url(#gradient' + (i % gradientColors.length) + ')')
        .attr('class', 'bar')
        .attr('width', d => xScale(d.value))
        .attr('height', svgHeight / data.length - barPadding)
        .attr('y', d => yScale(d.name)),
        update => update.attr('width', d => xScale(d.value))
      )

    xLabels.selectAll('text')
      .data(data)
      .join(
        enter => enter.append('text')
        .text(d => d.value)
        .attr('x', d => xScale(d.value) + 5)	
        .attr('y', (d, i) => i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2 )
        .attr('alignment-baseline', 'central'),
        update => update.attr('x', d => xScale(d.value) + 5)	
      )

    yLabels.selectAll('text')
      .data(data)
      .join(
        enter => enter.append('text')
        .text(d => d.name)
        .attr('x', 5)	
        .attr('y', (d, i) => i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2)
        .attr('fill', 'white')
        .attr('alignment-baseline', 'central')
      )

    barEvents.selectAll('rect')
      .data(data)
      .join(
        enter => enter.append('rect')
        .style('fill', 'white')
        .style('fill-opacity', '0.0')
        .attr('class', 'barEvent')
        .attr('height', svgHeight / data.length - barPadding)
        .attr('width', d => xScale(d.value))
        .attr('y', d => yScale(d.name))
        .on('click', (d) => {
          selectBar(d3.select(d3.event.currentTarget))
          document.getElementById('descriptionParagraph').innerText = d.description
        })
        .on('mouseover', () => d3.select(d3.event.currentTarget).style('stroke', 'black'))
        .on('mouseout', () => d3.select(d3.event.currentTarget).style('stroke', 'none')),
        update => update.attr('width', d => xScale(d.value))
      )
  }

  function selectBar(selectedBar){
    barEvents.selectAll('rect')
      .style('stroke', 'none')
      .style('fill-opacity', '0.0')

    selectedBar.style('stroke', 'black')
      .style('fill-opacity', '0.5')	
  }

  // sets the value field of the csv data to be an integer instead of a string
  function type(d){
    d.value = +d.value
    return d
  }
}

export default createSkillsChart

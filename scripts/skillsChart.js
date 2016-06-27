$(document).ready(function(){
	
	// set up svg margins and dimensions
	var margin = {top: 20, right: 0, bottom: 0, left: 0},
	svgWidth   = 400 - margin.left - margin.right,
	svgHeight  = 300 - margin.top - margin.bottom;
	
	var barPadding = 5;
	
	// create and get svg element
	var svg = d3.select("div#skillChart").append("svg")
		.attr("width", svgWidth + margin.left + margin.right)
		.attr("height", svgHeight + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// set up svg defs for gradients
	svg.append("svg:defs");
	
	// set gradients colors [startColor, endColor]
	var gradientColors = [["#6F0F0A", "#C45953"],  //red
						["#0F204D", "#405385"],  //blue
						["#085612", "#40984B"],  //green
						["#5B0834", "#A04474"],  //magenta
						["#073E44", "#337177"],  //indigo
						["#6F4E0A", "#C49F52"]]; //gold							  						  
	
	// for each gradient color, create a gradient svg element. 
	$.each(gradientColors, function(i, gradientColor){
		
		var gradient = svg.select("defs").append("svg:linearGradient")
			.attr("id", "gradient" + i)
			.attr("x1", "0%")
			.attr("y1", "50%")
			.attr("x2", "100%")
			.attr("y2", "50%")
			.attr("spreadMethod", "pad");

		gradient.append("svg:stop")
			.attr("offset", "0%")
			.attr("stop-color", gradientColors[i][0])
			.attr("stop-opacity", 1);
		
		gradient.append("svg:stop")
			.attr("offset", "100%")
			.attr("stop-color", gradientColors[i][1])
			.attr("stop-opacity", 1);
	});

	
	// import csv data
	d3.csv("data/data.csv", type, function(data) {
		
		// set scales
		var xScale = d3.scale.linear()
			.domain([0, 3.75])
			.range([0, svgWidth]);		
		
		var yScale = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.name; }))
			.rangeBands([0, svgHeight]);		
		
		// create bar elements
		var bars = svg.selectAll("rect")
			.data(data).enter()
			.append("rect")
				.style("fill", function(d, i){ return "url(#gradient" + (i % gradientColors.length) + ")"; })
				.attr("class", "bar")
				.attr("height", svgHeight / data.length - barPadding)
				.attr("width", function(d){ return 0; })
				.attr("y", function(d){ return yScale(d.name); });
		
		bars.transition()
			.delay(function(d, i) { return i * 100; })
			.duration(1000)
			.attr("width", function(d){ return xScale(d.value); });
			

		
		// set labels	
		var xLabels = svg.append("g").attr("class", "xLabel");
		
		xLabels.selectAll("text")
			.data(data).enter()
			.append("text")
				.text(function(d) { return d.value; })
				.attr("x", function(d){ return xScale(d.value) + 5; })	
				.attr("y", function(d, i){ return i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2; });
		
		var yLabels = svg.append("g")
			.attr("class", "yLabel");
		
		yLabels.selectAll("text")
			.data(data).enter()
			.append("text")
				.text(function(d) { return d.name; })
				.attr("x", 5)	
				.attr("y", function(d, i){ return i * (svgHeight / data.length) + (svgHeight / data.length - barPadding) / 2; });
		
		// create bar elements that hold mousevents
		var barEvents = svg.append("g").selectAll("rect")
			.data(data).enter()
			.append("rect")
				.style("fill", "white")
				.style("fill-opacity", "0.0")
				.attr("class", "barEvent")
				.attr("height", svgHeight / data.length - barPadding)
				.attr("width", function(d){ return 0; })
				.attr("y", function(d){ return yScale(d.name); });
		
		// onclick event for bars
		barEvents.on("click", function(){
			
			// sets bar to selected state
			selectBar(d3.select(this), barEvents);
			
			// sets description p element to relevent paragraph text
			$("#descriptionParagraph").text(selectedBar.datum().description);
		});
		
		barEvents.on("mouseover", function() {
			d3.select(this).style("stroke", "black")
		});
		
		barEvents.on("mouseout", function() {
			d3.select(this).style("stroke", "none");
		});
		
		barEvents.transition()
			.delay(function(d, i) { return i * 100; })
			.duration(1000)
			.attr("width", function(d){ return xScale(d.value); });
		
	});
	
	// highlights selection
	function selectBar(selectedBar, barEvents){
		
		// set all bars back to default styling
		barEvents.style("stroke", "none")
			.style("fill-opacity", "0.0");
		
		// set selected bar to "highlighted" styling
		selectedBar.style("stroke", "black")
			.style("fill-opacity", "0.5")	
	}
	
	// sets the value field of the csv data to be an integer instead of a string
	function type(d){
		d.value = +d.value;
		return d;
	}
});
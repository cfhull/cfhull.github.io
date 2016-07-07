$(document).ready(function(){
	
	// set up svg margins and dimensions
	var margin = {top: 0, right: 0, bottom: 0, left: 0},
	width   = 1600 - margin.left - margin.right,
	height  = 675 - margin.top - margin.bottom;

	var axisPadding = 50;

	// spectral class data
	var spectralClassData = [{spectralClass: "O", temperature: "30,000 - 60,000"},
				{spectralClass: "B", temperature: "10,000 - 30,000"},
				{spectralClass: "A", temperature: "7,500 - 10,000"},
				{spectralClass: "F", temperature: "6,000 - 7,500"},
				{spectralClass: "G", temperature: "5,000 - 6,000"},
				{spectralClass: "K", temperature: "3,500 - 5,000"},
				{spectralClass: "M", temperature: "< 3500"}
				];

	// import csv data
	d3.csv("data/exoplanetData.csv", type, function(data) {

		// set scales
		var xScale = d3.scale.linear()
			.domain([0, d3.max(data, function(d){ return d.pl_orbsmax })])
			.range([0, width]);
		
		var exoplanetRadiusScale = d3.scale.linear()
			.domain([0, d3.max(data, function(d){ return d.pl_radj; })])
			.range([0, 200])
		
		var stellerTempScale = d3.scale.linear()
			.domain([d3.min(data, function(d){ return d.st_teff; }), 5000, 6000, 7500, 10000, 30000, 60000])
			.range(["#FF0000", "#FFA500", "#FFFF00", "#FFFFFF", "#CCCCFF", "#6666FF", "#0000FF"]); // red, orange, yellow-white, white, blue-white, blue, blue
		
		var planetTempScale = d3.scale.linear()
			.domain([d3.min(data, function(d){ return d.pl_eqt; }), 270, 314, 500, 1500, d3.max(data, function(d){ 
				return d.pl_eqt; })])
			.range(["#0000FF","#00FF00", "#FFFF00","#FF8000", "#FF0000", "#330000"]); // blue, green, yellow, orange, red, dark red

		// create tooltips
		var tip = d3.tip()
          		.attr('class', 'd3-tip')
          		.offset([-10, 0]) 
         	 	.html(function(d) {
            			return "<h1>" + d.pl_hostname.concat(d.pl_letter) + "</h1>"
						+ "<dl>"
							+ "<dt>Orbit Distance</dt><dd>" + d.pl_orbsmax + "</dd>"
              + "<dt>Orbital Period</dt><dd>" + d.pl_orbper + "</dd>"
							+ "<dt>Radius</dt><dd>" + d.pl_radj + "</dd>"
              + "<dt>Planet Equilibrium Temp</dt><dd>" + d.pl_eqt + "</dd>"                    
              + "<dt>Stellar Distance</dt><dd>" + d.st_dist + "</dd>"
							+ "<dt>Star Temp</dt><dd>" + d.st_teff + "</dd>"
              + "<dt>Year Discovered</dt><dd>" + d.pl_disc + "</dd>"
						+ "</dl>";
          		})

		// set axes
		var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.tickFormat(function (d) { 
				var formatter = d3.format("0");
         		if (d < 0){
         			return '';
         		}
         		return formatter(d);
    		});
		
		var scale = (.5);	
		var zoomWidth = (width-scale*width)/2;
		var zoomHeight = (height-scale*height)/2;
	
		// set zoom behavior	
		var zoom = d3.behavior.zoom()
			.x(xScale)
			.translate([400, 0]).scale(25);

		 // create and get svg element
		var svg = d3.select("div#exoplanetViz").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
     			.call(zoom.on("zoom",zoomed))

		svg.call(tip);

		// invisible rect that handles mouse events
		var rect = svg.append("rect")
			.attr("width", width)
			.attr("height", height)
			.style("fill", "none")
			.style("pointer-events", "all");

		// create defs
		var gradient = svg.append("defs")
			.append("linearGradient")
		    		.attr("id", "gradient")
				.attr("x1", "50%")
				.attr("y1", "100%")
				.attr("x2", "50%")
				.attr("y2", "0%")
				.attr("spreadMethod", "pad");

		gradient.append("stop")
		    .attr("offset", "0%")
		    .attr("stop-color", "#FF0000")
		    .attr("stop-opacity", 1);

		gradient.append("stop")
		    .attr("offset", "20%")
		    .attr("stop-color", "#FFA500")
		    .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "40%")
            .attr("stop-color", "#FFFF00")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "60%")
            .attr("stop-color", "#FFFFFF")
            .attr("stop-opacity", 1)

        gradient.append("stop")
            .attr("offset", "80%")
            .attr("stop-color", "#CCCCFF")
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr("offset", "90%")
            .attr("stop-color", "#6666FF")
            .attr("stop-opacity", 1)

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#0000FF")
            .attr("stop-opacity", 1);
	 
	 	// holds all svg elements
		var container = svg.append("g")
			.attr("id", "container")
			.attr("transform", "translate(" + 0 + ", " + 0 + ")")
		
		// Create starry background image
		var background = container.append("image")
			.attr("id", "background")
			.attr("width", width)
			.attr("height", height)
			.attr("xlink:href", "images/starryBG.jpg");
		
		// create axes
		container.append("g")
			.attr("class", "x axis")
    			.attr("transform", "translate(" + 0 + ", " + (height - axisPadding) + ")")
			.call(xAxis)

		var xAxisTitle = container.select(".x.axis").append("text")
			.attr("id", "xAxisTitle")
			.style("text-anchor", "middle")
			.attr("x", (width / 2))
			.attr("y", 40)
			.text("Orbit Semi-Major Axis (AU)");
		
		// create points
		var dataPoints = container.append("g")
			.attr("transform", "translate(" + 0 + ", " + height / 2 + ")");

		var nodes = dataPoints.selectAll("g")
			.data(data)
			.enter().append("g")
			.attr("transform", transform);

        var solarSystemImages = nodes.filter(function(d){ return d.solarsystemflag == 1 }).append("image")
                .attr("xlink:href", function(d){ 
                        return "images/" + d.pl_hostname.toLowerCase() + ".png";        
                })
                .attr("height", function(d){
					// Cheat the size if Saturn, because of the rings. Don't tell anyone.
					if (d.pl_hostname == "Saturn"){
						return exoplanetRadiusScale(d.pl_radj)*3.5;
					}else{
			            return exoplanetRadiusScale(d.pl_radj)*2;
					}
        		})
                .attr("width", function(d){
					// Cheat the size if Saturn, because of the rings. Don't tell anyone.
					if (d.pl_hostname == "Saturn"){
                    	return exoplanetRadiusScale(d.pl_radj)*3.5;
                    }else{
                    	return exoplanetRadiusScale(d.pl_radj)*2;
					}
                })
                .attr("x", function(){
                        return -(d3.select(this).attr("width") / 2)
                })
                .attr("y", function(d){
					// Cheat the size if Saturn, because of the rings. Don't tell anyone.
					if (d.pl_hostname == "Saturn"){
                        return -(d3.select(this).attr("height") / 2) - 4;
                    }else{
                    	return -(d3.select(this).attr("height") / 2)
            		}
				});

		var planets = nodes.append("circle")
			.style("pointer-events", "all")
			.style("fill", function(d, i){
				if (d.solarsystemflag == 0 && d.pl_eqt != ""){
					return planetTempScale(d.pl_eqt);
				}else if (d.solarsystemflag == 1){
					return "none";
				}else{
					return "black";
				}
			})
			.style("stroke-width", 5)
			.style("stroke", function(d, i){
				if (d.solarsystemflag == 0){
					return stellerTempScale(d.st_teff);
				}else{
					return "none";
				}
			})
			.attr("r", function (d, i) { 
				return exoplanetRadiusScale(d.pl_radj);
			})
			.attr("visibility", "hidden");

		planets.transition().delay(function(d, i) { //!!! change transition to come from back (radius starts at zero and ends at true value)
				return i * 5; 
			})
			.attr("visibility", "visible");
	
		planets.on("mouseenter", function(d) {
			d3.select(this).style("stroke", "blue")
				.style("stroke-width", 2);

			tip.show(d);
		});
		
		planets.on("mouseleave", function(d) {
                        d3.select(this).style("stroke", function(d, i){
							if (d.solarsystemflag == 0){
								return stellerTempScale(d.st_teff);
							}else{
								return "none";
							}
						})
						.style("stroke-width", 5);
			
			tip.hide(d);
        });

        // create planet temp legend
		var legendContainer = container.append("g")
			.attr("id", "planetTempLegend")
			.attr("transform", "translate(0, " + 50 + ")");

		legendContainer.append("rect")
			.style("fill", "black")
			.style("stroke", "white")
			.attr("width", 250)
			.attr("height", height/3 + 5)
			.attr("transform", "translate(0, " + -20 + ")");

		var planetTempLegend = d3.legend.color()
			.labels(["BRRRRR IT'S COLD", "Ahh that's nice... ", "Is it hot in here or is that just me", "Someone turn on the A/C", "Water...need...water", "OMG IT BURNS HELP!!!!!"])
			.shape('circle')
			.shapeRadius(height/36)
	      	.shapePadding(0)
			.cells([0, 184, 330, 500, 1500, 2500])
			.orient('vertical')
			.scale(planetTempScale);

		container.select("#planetTempLegend")
			.append("text")
				.attr("class", "legendTitle")
				.attr("transform", "translate(" + 5 + ", " + -30 + ")")
				.text("Exoplanet Effective Temperature Color Scale");

		container.select("#planetTempLegend")
			.call(planetTempLegend);

		// create steller temp legend
		container.append("g")
			.attr("id", "stellerTempLegend")
			.attr("transform", "translate(0, " + (height - 100) + ")");

		var stellerTempLegend = d3.legend.color()
			.labels(["M < 3,500K", "K 3,500 - 5,000K", "G 5,000 - 6,000K", "F 6,000 - 7,500K", "A 7,500 - 10,000K", "B 10,000 - 30,000K", "O 30,000 - 60,000K"])
			.shapeWidth(width / 7)
	      	.shapePadding(0)
			.cells([3000, 5000, 6000, 7500, 10000, 30000, 60000])
			.orient('horizontal')
			.scale(stellerTempScale);

		container.select("#stellerTempLegend")
			.append("text")
				.attr("class", "legendTitle")
				.attr("transform", "translate(" + 5 + "" + -5 + ")")
				.text("Host Star Spectral Classification and Temperature Color Scale");

		container.select("#stellerTempLegend")
			.call(stellerTempLegend);

		function zoomed() {
			nodes.attr("transform", transform);
			svg.select(".x.axis").call(xAxis);
		}
		
		function transform(d, i){
			return "translate(" + xScale(d.pl_orbsmax) + "," + 0 + ")";
		}
	});
		
	// sets the value field of the csv data to be an integer instead of a string
	function type(d){
		d.pl_orbsmax = +d.pl_orbsmax;
		d.pl_radj    = +d.pl_radj;
		d.pl_eqt	 = +d.pl_eqt;
		return d;
	}
});

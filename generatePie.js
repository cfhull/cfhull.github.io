$( document ).ready(function() {

		// Generate initial pie charts
		generatePieCharts();

		// Adjust pie chart size after resize
		$(window).resize(_.debounce(function() {

				// If pie charts exist then destroy them and recreate the empty container
				if ($(".pieCharts")[0]) {
						$(".pieCharts").remove();
						$("#pieChartsContainer").append('<div id="pieLanguages" class="pieCharts"></div><div id="pieTools" class ="pieCharts"></div>');
				};
				
				generatePieCharts();

		}, 500));
});

// Generates pieLanguages and pieTools
function generatePieCharts() {
		// Generate pieLanguages pie chart
		var pieLanguages = new d3pie("pieLanguages", {
				"header": {
						"title": {
								"text": "Languages",
								"fontSize": 22,
								"font": "verdana"
						},
						"subtitle": {
								"text": "From 2.5 years of experience",
								"color": "#999999",
								"fontSize": 10,
								"font": "verdana"
						},
						"titleSubtitlePadding": 12
				},
				"footer": {
						"color": "#999999",
						"fontSize": 11,
						"font": "open sans",
						"location": "bottom-center"
				},
				"size": {
						"canvasHeight": $(window).height() / 2,
						"canvasWidth": $(window).width() / 2,
						"pieInnerRadius": "50%",
						"pieOuterRadius": "75%"
				},
				"data": {
						"sortOrder": "value-desc",
						"content": [
						{
								"label": "C#",
								"value": 7,
								"color": "#7e3838"
						},
						{
								"label": "Bash",
								"value": 6,
								"color": "#7e6538"
						},
						{
								"label": "VBA",
								"value": 5.5,
								"color": "#7c7e38"
						},
						{
								"label": "C++",
								"value": 5,
								"color": "#587e38"
						},
						{
								"label": "HTML/CSS",
								"value": 3.5,
								"color": "#387e45"
						},
						{
								"label": "JavaScript",
								"value": 3,
								"color": "#387e6a"
						},
						{
								"label": "Java",
								"value": 2.5,
								"color": "#386a7e"
						}
						]
				},
				"labels": {
						"outer": {
								"pieDistance": 16
						},
						"mainLabel": {
								"color": "#4e4e56",
								"font": "verdana"
						},
						"percentage": {
								"color": "#f2f2f2",
								"font": "verdana",
								"decimalPlaces": 0
						},
						"value": {
								"color": "#e1e1e1",
								"font": "verdana"
						},
						"lines": {
								"enabled": true,
								"style": "straight"
						}
				},
				"effects": {
						"load": {
								"effect": "none"
						},
						"pullOutSegmentOnClick": {
								"effect": "linear",
								"speed": 400,
								"size": 8
						}
				},
				"callbacks": {}
		});

		// Generate pieTools pie chart
		var pieTools = new d3pie("pieTools", {
				"header": {
						"title": {
								"text": "Tools",
								"fontSize": 22,
								"font": "verdana"
						},
						"subtitle": {
								"text": "From 2.5 years of experience",
								"color": "#999999",
								"fontSize": 10,
								"font": "verdana"
						},
						"titleSubtitlePadding": 12
				},
				"footer": {
						"color": "#999999",
						"fontSize": 11,
						"font": "open sans",
						"location": "bottom-center"
				},
				"size": {
						"canvasHeight": $(window).height() / 2,
						"canvasWidth": $(window).width() / 2,
						"pieInnerRadius": "50%",
						"pieOuterRadius": "75%"
				},
				"data": {
						"sortOrder": "value-desc",
						"content": [
						{
								"label": "Linux",
								"value": 1,
								"color": "#7e3838"
						},
						{
								"label": "Unity Game Engine",
								"value": 1,
								"color": "#7e6538"
						},
						{
								"label": "Visual Studio",
								"value": 1,
								"color": "#7c7e38"
						},
						{
								"label": "Github/Sourcetree",
								"value": 1,
								"color": "#587e38"
						},
						{
								"label": "Pivotal Tracker",
								"value": 0.25,
								"color": "#387e45"
						},
						{
								"label": "AccessData Forensic Tookit (FTK)",
								"value": 0.25,
								"color": "#387e6a"
						}
						]
				},
				"labels": {
						"outer": {
								"pieDistance": 16
						},
						"mainLabel": {
								"color": "#4e4e56",
								"font": "verdana"
						},
						"percentage": {
								"color": "#f2f2f2",
								"font": "verdana",
								"decimalPlaces": 0
						},
						"value": {
								"color": "#e1e1e1",
								"font": "verdana"
						},
						"lines": {
								"enabled": true,
								"style": "straight"
						}
				},
				"effects": {
						"load": {
								"effect": "none"
						},
						"pullOutSegmentOnClick": {
								"effect": "linear",
								"speed": 400,
								"size": 8
						}
				},
				"callbacks": {}
		});

}

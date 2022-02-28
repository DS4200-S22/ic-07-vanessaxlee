/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

// Select the first div tag with the id, "hard-coded-bar", in the DOM
// Add a svg to build within the div tag and set width, geight, and view box
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Find max y
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Define a linear scale function for y and set inputs and outputs for the function
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Define a linear scale fucntion for x and set inputs and outputs for the function
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Add a placeholder svg for the y-axis
// Move y-axis to the left of the svg and set font size
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// Add a placeholder svg for the x-axis
// Move x-axis to the bottom of the svg and set tick format and font size
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// Add a div tag with id "tooltup1" and class "tooltip" to the first div tag with id "hard-coded-bar"
// Set the opacity to 0
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Add a div tag with id "tooltup2" and class "tooltip" to the first div tag with id "csv-bar"
// Set the opacity to 0
const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Display name and score in the tooltip when the mouse hovers over the bar
// Set the opacity of the html text to 1
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Display tooltip at the top left of the mouse cursor
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX) + "px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// Set the tooltip opacity to 0
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// Add event listeners to each bar
// Call event handlers when the mouse hovers, moves, and leaves the bar
svg1.selectAll(".bar") 
    .data(data1) 
    .enter()  
    .append("rect") 
    .attr("class", "bar") 
    .attr("x", (d,i) => xScale1(i)) 
    .attr("y", (d) => yScale1(d.score)) 
    .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
    .attr("width", xScale1.bandwidth()) 
    .on("mouseover", mouseover1) 
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1);

/*

  csv-bar

*/

// Select the first div tag with the id, "csv-bar", in the DOM
// Add a svg to build within the div tag and set width, geight, and view box
const svg2 = d3.select("#csv-bar")
                .append("svg")
                .attr("width", width-margin.left-margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);
     
// Parse the csv file and pass data to anonymous function
d3.csv("data/barchart.csv").then((data) => { 
  console.log(data);  
  
  // Find max y
  let maxY2 = d3.max(data, function(d) { return d.score; });

  // Define a linear scale function for y and set inputs and outputs for the function
  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]); 

  // Define a linear scale fucntion for x and set inputs and outputs for the function
  let xScale2 = d3.scaleBand()
              .domain(d3.range(data.length))
              .range([margin.left, width - margin.right])
              .padding(0.1); 

  svg2.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

  // Add a placeholder svg for the x-axis
  // Move x-axis to the bottom of the svg and set tick format and font size
  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data[i].name))  
      .attr("font-size", '20px'); 
       
  // Display name and score in the tooltip when the mouse hovers over the bar
  // Set the opacity of the html text to 1
  const mouseover2 = function(event, d) {
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  // Display tooltip at the top left of the mouse cursor
  const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.pageX)+"px") 
            .style("top", (event.pageY + yTooltipOffset) +"px"); 
  }

  // Set the tooltip opacity to 0
  const mouseleave2 = function(event, d) { 
    tooltip2.style("opacity", 0); 
  }
  
  // Add event listeners to each bar
  // Call event handlers when the mouse hovers, moves, and leaves the bar
  svg2.selectAll(".bar") 
  .data(data) 
  .enter()  
  .append("rect") 
    .attr("class", "bar") 
    .attr("x", (d,i) => xScale2(i)) 
    .attr("y", (d) => yScale2(d.score)) 
    .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
    .attr("width", xScale1.bandwidth()) 
    .on("mouseover", mouseover2) 
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2);
});








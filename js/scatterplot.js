/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const svg = d3.select("#csv-scatter")
                .append("svg")
                .attr("width", width-margin.left-margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);

const tooltip3 = d3.select("#csv-scatter") 
                    .append("div") 
                    .attr('id', "tooltip3") 
                    .style("opacity", 0) 
                    .attr("class", "tooltip"); 

d3.csv("data/scatter.csv").then((data) => { 
    console.log(data);  

    // Find max x
    let maxX3 = d3.max(data, function(d) { return d.day; });

    // Find max y
    let maxY3 = d3.max(data, function(d) { return d.score; });

    // Define a linear scale function for y and set inputs and outputs for the function
    let yScale3 = d3.scaleLinear()
                    .domain([0, maxY3])
                    .range([height-margin.bottom,margin.top]); 

    // Define a linear scale fucntion for x and set inputs and outputs for the function
    let xScale3 = d3.scaleLinear()
                    .domain([0, maxX3])
                    .range([margin.left, width - margin.right]); 

    svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(yScale3)) 
        .attr("font-size", '20px'); 

    // Add a placeholder svg for the x-axis
    // Move x-axis to the bottom of the svg and set tick format and font size
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(xScale3))    
        .attr("font-size", '20px'); 
            
    // Display name and score in the tooltip when the mouse hovers over the bar
    // Set the opacity of the html text to 1
    const mouseover3 = function(event, d) {
        tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
                .style("opacity", 1);  
    }

    // Display tooltip at the top left of the mouse cursor
    const mousemove3 = function(event, d) {
        tooltip3.style("left", (event.pageX) + "px") 
                .style("top", (event.pageY + yTooltipOffset) +"px"); 
    }

    // Set the tooltip opacity to 0
    const mouseleave3 = function(event, d) { 
        tooltip3.style("opacity", 0); 
    }

    // Add event listeners to each bar
    // Call event handlers when the mouse hovers, moves, and leaves the bar
    svg.selectAll("circle") 
        .data(data) 
        .enter()  
        .append("circle") 
        .attr("cx", (d) => xScale3(d.day)) 
        .attr("cy", (d) => yScale3(d.score)) 
        .attr("r", 10)
        .on("mouseover", mouseover3) 
        .on("mousemove", mousemove3)
        .on("mouseleave", mouseleave3);
});





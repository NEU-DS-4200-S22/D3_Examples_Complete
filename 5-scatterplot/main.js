//Define data
let data = [
  { name: 'John'    , rating: 5 },
  { name: 'Arya'    , rating: 6 },
  { name: 'Jamie'   , rating: 7 },
  { name: 'Daenerys', rating: 9 },
  { name: 'Cersei'  , rating: 2 },
  { name: 'Ramsay'  , rating: 4 }
];

// Create SVG
let 
  width = 600,
  height = 400;
  
let margin = {
  top: 40,
  bottom: 30,
  left: 30,
  right: 30
};

let svg = d3
  .select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#e9f7f2');

// Define Scales
let yScale = d3.scaleLinear()
  .domain([0, 10])
  .range([height - margin.bottom, margin.top]);

let xScale = d3.scaleBand()
  .domain(
    data.map(function(d) {
      return d.name;
    })
  )
  .range([margin.left, width - margin.right])
  .padding(0.5);

//Draw Axes
let yAxis = svg
  .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

//Add label
yAxis
  .append('text')
    .attr('y', 30)
    .attr('x', 20)
    .style('stroke', 'black')
    .text('Rating');

let xAxis = svg
  .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));
  
//Add label
xAxis
  .append('text')
    .attr('x', width - margin.left)
    .attr('y', -10)
    .style('stroke', 'black')
    .text('Names');

//Draw circles
let circle = svg
  .selectAll('circle')
    .data(data)
  .enter()
  .append('circle')
    .attr('cx', function(d) {
      return xScale(d.name) + .5 * xScale.bandwidth();
    })
    .attr('cy', function(d) {
      return yScale(d.rating);
    })
    .attr('r', 3);
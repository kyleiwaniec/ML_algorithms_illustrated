var d3 = require('d3');

var Axies = {
  xAxis: null,
  yAxis: null,

  xScale: null,
  yScale: null,

  width: null,
  height: null,
  margin: null,

  init: function(width, height, margin) {
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.initScales();
    this.initAxis();
  },

  initScales: function() {
    this.xScale = d3.scale.linear()
    .domain([0, this.width])
    .range([this.margin, this.width - this.margin]);

    this.yScale = d3.scale.linear()
    .domain([this.height, 0])
    .range([this.margin, this.height - this.margin]);
  },

  initAxis: function() {
    this.xAxis = d3.svg.axis()
    .scale(this.xScale)
    .orient("bottom")
    .tickSize(-this.width+this.margin*2);

    this.yAxis = d3.svg.axis()
    .scale(this.yScale)
    .orient("left")
    .tickSize(-this.width+this.margin*2);
  },

  draw: function(svg) {
    svg.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0," + (this.height - this.margin) + ")")
    .call(this.xAxis);

    svg.append("g")
    .attr("class", "axis y")
    .attr("transform", "translate(" + this.margin + ",0)")
    .call(this.yAxis);
  }
};

module.exports = Axies;

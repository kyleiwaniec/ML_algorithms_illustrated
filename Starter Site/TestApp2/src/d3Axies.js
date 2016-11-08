var d3 = require('d3');

var Settings = require('./Settings.js');

var Axies = {
  xAxis: null,
  yAxis: null,

  xScale: null,
  yScale: null,

  init: function() {
    this.initScales();
    this.initAxis();
  },

  initScales: function() {
    this.xScale = d3.scale.linear()
    .domain([0, Settings.width])
    .range([Settings.margin, Settings.width - Settings.margin]);

    this.yScale = d3.scale.linear()
    .domain([Settings.height, 0])
    .range([Settings.margin, Settings.height - Settings.margin]);
  },

  initAxis: function() {
    this.xAxis = d3.svg.axis()
    .scale(this.xScale)
    .orient("bottom")
    .tickSize(-Settings.width+Settings.margin*2);

    this.yAxis = d3.svg.axis()
    .scale(this.yScale)
    .orient("left")
    .tickSize(-Settings.width+Settings.margin*2);
  },

  draw: function(svg) {
    svg.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0," + (Settings.height - Settings.margin) + ")")
    .call(this.xAxis);

    svg.append("g")
    .attr("class", "axis y")
    .attr("transform", "translate(" + Settings.margin + ",0)")
    .call(this.yAxis);
  }
};

module.exports = Axies;

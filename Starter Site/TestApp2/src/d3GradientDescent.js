var d3 = require('d3');

var GradientDescent = {
  revXScale: null,
	revYScale: null,
	normX: null,
	normY: null,
	svg: null,
  animationSpeed: 1,
  Axies: null,
  CostFunction: null,
  AnimatedFunction: null,
  Dataset: null,
  Points: null,
  interval: null,
  appendPointCB: null,
  CostCalculator: null,
  width: null,
  height: null,
  margin: null,

  init: function(el, Dataset, Points, appendPointCB, CostCalculator, width, height, margin) {
    this.Axies = require('./d3Axies.js');
    this.CostFunction = require('./d3CostFunction.js');
    this.AnimatedFunction = require('./d3AnimatedFunction.js');
    this.Dataset = Dataset;
    this.Points = Points;
    this.appendPointCB = appendPointCB;
    this.CostCalculator = CostCalculator;
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.initScales();
    this.Axies.init(width, height, margin);
    this.initSvg(el);
    this.AnimatedFunction.init(width, height, margin);
    this.CostFunction.init(el, this.AnimatedFunction, CostCalculator, width, height, margin);
    this.drawAll();
  },

  initScales: function() {
    this.revXScale = d3.scale.linear()
      .domain([this.margin, this.width - this.margin])
      .range([0, this.width]);

    this.revYScale = d3.scale.linear()
      .domain([this.margin, this.height - this.margin])
      .range([this.height, 0]);

    this.normX = d3.scale.linear()
      .domain([this.margin, this.width - this.margin])
      .range([0, 1]);

    this.normY = d3.scale.linear()
      .domain([this.margin, this.height - this.margin])
      .range([1, 0]);
  },

  initSvg: function(el) {
    var self = this;
    this.svg = d3.select(el).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.svg.on("click", function(d){
      var coord = d3.mouse(this);
      var pointElem = {
        x: self.revXScale(coord[0]),
        y: self.revYScale(coord[1])
      };
      var datasetElem = {
        x: self.normX(coord[0]),
        y: self.normY(coord[1])
      };
      self.appendPointCB(pointElem, datasetElem);
    });
  },

  draw: function(svg) {
    var points = svg.selectAll("g.point")
      .data(this.Points);

    var g = points.enter()
      .append("g")
      .attr("class", "point");

    g.append("circle")
      .attr("cx", (d) => { return this.Axies.xScale(d.x); })
      .attr("cy", (d) => { return this.Axies.yScale(d.y); })
      .attr("r", 6);

    g.append("circle")
      .attr("class", "c")
      .attr("cx", (d) => { return this.Axies.xScale(d.x); })
      .attr("cy", (d) => { return this.Axies.yScale(d.y); })
      .attr("r", 1);

    points.exit().remove();
  },

  drawAll: function() {
    this.draw(this.svg);

    this.svg.append("text")
      .attr("y", this.margin - 10)
      .attr("x", this.margin)
      .text(this.CostCalculator.hypothesisFunctionLabel);

    this.AnimatedFunction.draw(this.svg);
    this.Axies.draw(this.svg);
    this.CostFunction.draw(this.svg, this.Dataset);
	},

  run: function() {
    var go = true;
  	this.interval = setInterval(() => {
  		if(go && this.Dataset.length > 1) {
  			for(i = 0 ; i < 100 + (200 * this.animationSpeed) ; i++) {
  				this.AnimatedFunction.iterateTheta(this.Dataset);
  			}

  			this.AnimatedFunction.draw(this.svg);
  			this.CostFunction.animatePointer(this.Dataset, this.AnimatedFunction);
  		}
  	}, 500);
  },

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.CostFunction.destroy();
    this.svg.remove();
  }
};

module.exports = GradientDescent;

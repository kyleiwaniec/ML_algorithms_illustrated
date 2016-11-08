var d3 = require('d3');

var Settings = require('./Settings.js');
var _Axies = require('./d3Axies.js');
var _CostFunction = require('./d3CostFunction.js');
var _AnimatedFunction = require('./d3AnimatedFunction.js');


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
  Dataset: [],
  Points: [],

  init: function(el) {
    this.Axies = _Axies;
    this.CostFunction = _CostFunction;
    this.AnimatedFunction = _AnimatedFunction;

    this.initScales();
    this.Axies.init();
    this.initSvg(el);
    this.AnimatedFunction.init();
    this.CostFunction.init(el, this.AnimatedFunction);
    this.drawAll();
  },

  initScales: function() {
    this.revXScale = d3.scale.linear()
      .domain([Settings.margin, Settings.width - Settings.margin])
      .range([0, Settings.width]);

    this.revYScale = d3.scale.linear()
      .domain([Settings.margin, Settings.height - Settings.margin])
      .range([Settings.height, 0]);

    this.normX = d3.scale.linear()
      .domain([Settings.margin, Settings.width - Settings.margin])
      .range([0, 1]);

    this.normY = d3.scale.linear()
      .domain([Settings.margin, Settings.height - Settings.margin])
      .range([1, 0]);
  },

  initSvg: function(el) {
    var self = this;
    this.svg = d3.select(el).append("svg")
      .attr("width", Settings.width)
      .attr("height", Settings.height);

    this.svg.on("click", function(d){
      var coord = d3.mouse(this);
      self.Points.push({
        x: self.revXScale(coord[0]),
        y: self.revYScale(coord[1])
      });

      self.Dataset.push({
        x: self.normX(coord[0]),
        y: self.normY(coord[1])
      });

      self.draw(self.svg);
      self.CostFunction.draw(self.svg, self.Dataset);
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
      .attr("y", Settings.margin - 10)
      .attr("x", Settings.margin)
      .text("Hypothesis Function: Ho(x)=theta0 + theta1 * x");

    this.AnimatedFunction.draw(this.svg);
    this.Axies.draw(this.svg);
    this.CostFunction.draw(this.svg, this.Dataset);
	},

  run: function() {
    var go = true;
  	setInterval(() => {
  		if(go && this.Dataset.length > 1) {
  			for(i = 0 ; i < 100 + (200 * this.animationSpeed) ; i++) {
  				this.AnimatedFunction.iterateTheta(this.Dataset);
  			}

  			this.AnimatedFunction.draw(this.svg);
  			this.CostFunction.animatePointer(this.Dataset, this.AnimatedFunction);
  		}
  	}, 500);
  }
};

module.exports = GradientDescent;

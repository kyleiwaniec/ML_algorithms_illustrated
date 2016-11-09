var d3 = require('d3');

var AnimatedFunction = {
  theta0: 0,
  theta1: 0,
  learnRate: 0.07,
  xDenorm: null,
  yDenorm: null,
  width: null,
  height: null,
  margin: null,

  init: function(width, height, margin) {
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.initScales();
  },

  iterateTheta: function(Dataset) {
    var vt = this.getGradDescVector(Dataset);
    this.theta0 -= vt.v0;
    this.theta1 -= vt.v1;
  },

  initScales: function() {
    this.xDenorm = d3.scale.linear()
    .domain([0, 1])
    .range([this.margin, this.width - this.margin]);

    this.yDenorm = d3.scale.linear()
    .domain([0, 1])
    .range([this.height - this.margin, this.margin]);
  },

  getGradDescVector: function(Dataset) {
    var sum0 = 0, sum1 = 0;
    var m = Dataset.length;
    var a = this.learnRate;

    for(var i = 0 ; i < m ;i++) {
      var diff = Dataset[i].x * this.theta1 + this.theta0 - Dataset[i].y;

      sum0 += diff;
      sum1 += diff * Dataset[i].x;
    }

    return {
      v0: a * sum0 / m / 2,
      v1: a * sum1 / m / 2,
    };
  },

  draw: function(svg) {
    var func = svg.selectAll("line.func")
      .data([{theta0: this.theta0, theta1: this.theta1}]);

    var self = this;
    var xLeft = -1;
    var xRight = 2;

    var f = [func.transition(), func.enter().append("line")];

    for(const i in f) {
      f[i].attr("class", "func")
        .attr("x1", function(d) { return self.xDenorm(xLeft); } )
        .attr("y1", function(d) { return self.yDenorm(d.theta1 * xLeft + d.theta0); } )
        .attr("x2", function(d) { return self.xDenorm(xRight); } )
        .attr("y2", function(d) { return self.yDenorm(d.theta0+ d.theta1 * xRight); } );
    }

    var caption = svg.selectAll("text.theta")
      .data([
        {v: this.theta0, i:0},
        {v: this.theta1, i:1}
      ]);

    var c = [caption, caption.enter().append("text").attr("class","theta")];
    for(const i in c) {
      c[i]
        .attr("x", 50)
        .attr("y", d =>{ return this.height - 20 + 16 * d.i})
        .text(d => { return "Theta" + d.i + ": " + Math.round(d.v * 100000) / 100000});
    }

    var learnRate = svg.selectAll("text.learnRate")
      .data([this.learnRate]);

  }
};

module.exports = AnimatedFunction;

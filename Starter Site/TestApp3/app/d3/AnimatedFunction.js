import d3 from 'd3';

export class AnimatedFunction {
  constructor() {
    this.theta0 = 0;
    this.theta1 = 0;
    this.learnRate = 0.07;
    this.xDenorm = null;
    this.yDenorm = null;
    this.width = null;
    this.height = null;
    this.margin = null;
  }

  init(width, height, margin) {
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.initScales();
  }

  iterateTheta(Dataset) {
    const vt = this.getGradDescVector(Dataset);
    this.theta0 -= vt.v0;
    this.theta1 -= vt.v1;
  }

  initScales() {
    this.xDenorm = d3.scale.linear()
    .domain([0, 1])
    .range([this.margin, this.width - this.margin]);

    this.yDenorm = d3.scale.linear()
    .domain([0, 1])
    .range([this.height - this.margin, this.margin]);
  }

  getGradDescVector(Dataset) {
    let sum0 = 0, sum1 = 0;
    const m = Dataset.length;
    const a = this.learnRate;

    for(let i = 0 ; i < m ;i++) {
      const diff = Dataset[i].x * this.theta1 + this.theta0 - Dataset[i].y;

      sum0 += diff;
      sum1 += diff * Dataset[i].x;
    }

    return {
      v0: a * sum0 / m / 2,
      v1: a * sum1 / m / 2,
    };
  }

  draw(svg) {
    const func = svg.selectAll("line.func")
      .data([{theta0: this.theta0, theta1: this.theta1}]);

    const self = this;
    const xLeft = -1;
    const xRight = 2;

    const f = [func.transition(), func.enter().append("line")];

    for(const i in f) {
      f[i].attr("class", "func")
        .attr("x1", function(d) { return self.xDenorm(xLeft); } )
        .attr("y1", function(d) { return self.yDenorm(d.theta1 * xLeft + d.theta0); } )
        .attr("x2", function(d) { return self.xDenorm(xRight); } )
        .attr("y2", function(d) { return self.yDenorm(d.theta0+ d.theta1 * xRight); } );
    }

    const caption = svg.selectAll("text.theta")
      .data([
        {v: this.theta0, i:0},
        {v: this.theta1, i:1}
      ]);

    const c = [caption, caption.enter().append("text").attr("class","theta")];
    for(const i in c) {
      c[i]
        .attr("x", 50)
        .attr("y", d =>{ return this.height - 20 + 16 * d.i})
        .text(d => { return "Theta" + d.i + ": " + Math.round(d.v * 100000) / 100000});
    }

    const learnRate = svg.selectAll("text.learnRate")
      .data([this.learnRate]);

  }
}
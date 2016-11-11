/* @flow */

import d3 from 'd3';

export class Axies {
  xAxis: any;
  yAxis: any;
  xScale: any;
  yScale: any;
  width: number;
  height: number;
  margin: number;

  constructor() {
    this.xAxis = null;
    this.yAxis = null;

    this.xScale = null;
    this.yScale = null;

    this.width = 0;
    this.height = 0;
    this.margin = 0;
  }

  init(width: number, height: number, margin: number): void {
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.initScales();
    this.initAxis();
  }

  initScales(): void {
    this.xScale = d3.scale.linear()
    .domain([0, this.width])
    .range([this.margin, this.width - this.margin]);

    this.yScale = d3.scale.linear()
    .domain([this.height, 0])
    .range([this.margin, this.height - this.margin]);
  }

  initAxis(): void {
    this.xAxis = d3.svg.axis()
    .scale(this.xScale)
    .orient("bottom")
    .tickSize(-this.width+this.margin*2);

    this.yAxis = d3.svg.axis()
    .scale(this.yScale)
    .orient("left")
    .tickSize(-this.width+this.margin*2);
  }

  draw(svg: any): void {
    svg.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(0," + (this.height - this.margin) + ")")
    .call(this.xAxis);

    svg.append("g")
    .attr("class", "axis y")
    .attr("transform", "translate(" + this.margin + ",0)")
    .call(this.yAxis);
  }
}

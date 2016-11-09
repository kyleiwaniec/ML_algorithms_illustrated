/* @flow */

import d3 from 'd3';
import {AnimatedFunction} from './AnimatedFunction.js';
import {Axies} from './Axies.js'
import {CostFunction} from './CostFunction';

export class GradientDescent {
    revXScale: any;
  	revYScale: any;
  	normX: any;
  	normY: any;
  	svg: any;
    animationSpeed: number;
    Axies: Axies;
    CostFunction: CostFunction;
    AnimatedFunction: AnimatedFunction;
    Dataset: Array<any>;
    Points: Array<any>;
    interval: any;
    appendPointCB: any;
    CostCalculator: any;
    width: number;
    height: number;
    margin: number;

  constructor() {
    this.revXScale = null;
  	this.revYScale = null;
  	this.normX = null;
  	this.normY = null;
  	this.svg = null;
    this.animationSpeed = 1;
    this.Dataset = [];
    this.Points = [];
    this.interval = null;
    this.appendPointCB = null;
    this.CostCalculator = null;
    this.width = 0;
    this.height = 0;
    this.margin = 0;

    this.Axies = new Axies();
    this.CostFunction = new CostFunction();
    this.AnimatedFunction = new AnimatedFunction();
  }

  init(
    el: any,
    Dataset: Array<any>,
    Points: Array<any>,
    appendPointCB: any,
    CostCalculator: any,
    width: number,
    height: number,
    margin: number) {
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
  }

  initScales() {
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
  }

  initSvg(el: any) {
    const self = this;
    this.svg = d3.select(el).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.svg.on("click", function(d){
      const coord = d3.mouse(this);
      const pointElem = {
        x: self.revXScale(coord[0]),
        y: self.revYScale(coord[1])
      };
      const datasetElem = {
        x: self.normX(coord[0]),
        y: self.normY(coord[1])
      };
      self.appendPointCB(pointElem, datasetElem);
    });
  }

  draw(svg: any) {
    const points = svg.selectAll("g.point")
      .data(this.Points);

    const g = points.enter()
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
  }

  drawAll() {
    this.draw(this.svg);

    this.svg.append("text")
      .attr("y", this.margin - 10)
      .attr("x", this.margin)
      .text(this.CostCalculator.hypothesisFunctionLabel);

    this.AnimatedFunction.draw(this.svg);
    this.Axies.draw(this.svg);
    this.CostFunction.draw(this.svg, this.Dataset);
	}

  run() {
    let go = true;
  	this.interval = setInterval(() => {
  		if(go && this.Dataset.length > 1) {
  			for(let i = 0 ; i < 100 + (200 * this.animationSpeed) ; i++) {
  				this.AnimatedFunction.iterateTheta(this.Dataset);
  			}

  			this.AnimatedFunction.draw(this.svg);
  			this.CostFunction.animatePointer(this.Dataset, this.AnimatedFunction);
  		}
  	}, 500);
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.CostFunction.destroy();
    this.svg.remove();
  }
}

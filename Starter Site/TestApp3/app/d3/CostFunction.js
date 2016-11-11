/* @flow */

import type {Point, LinRegPoint} from '../../shared/types';

import d3 from 'd3';
import {AnimatedFunction} from './AnimatedFunction';
import {LinRegClient} from '../LinRegClient';

export class CostFunction {
  width: number;
  height: number;
  margin: number;
  size: number;
  xNorm: any;
  yNorm: any;
  xDeNorm: any;
  yDeNorm: any;
  xi: number;
  yi: number;
  minCost: number;
  maxCost: number;
  svg: any;
  prevPoint: LinRegPoint;
  xAxis: any;
  yAxis: any;
  costClient: LinRegClient;

  constructor(costClient: LinRegClient) {
    this.size = 10;
    this.xNorm = null;
    this.yNorm = null;
    this.xDeNorm = null;
    this.yDeNorm = null;
    this.xi = 0;
    this.yi = 0;
    this.minCost = 0;
    this.maxCost = 0;
    this.svg = null;
    this.prevPoint = {
      theta0: 0,
      theta1: 0,
    };
    this.xAxis = null;
    this.yAxis = null;

    this.width = 0;
    this.height = 0;
    this.margin = 0;
    this.costClient = costClient;
  }

  init(
    el: HTMLElement,
    animatedFunction: AnimatedFunction,
    width: number,
    height: number,
    margin: number,
  ): void {
    this.width = width;
    this.height = height;
    this.margin = margin;

    this.initScales();
    this.initAxis();

    this.svg = d3.select(el).append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.xi = (this.width-2*this.margin) / this.size;
    this.yi = (this.height-2*this.margin) / this.size;

    this.prevPoint = {
      theta0: animatedFunction.theta0,
      theta1: animatedFunction.theta1
    };

    this.svg.append("text")
      .attr("y", this.margin - 10)
      .attr("x", this.margin)
      .text("Cost Function: J(theta0, theta1)");

    this.svg.append("g")
      .attr("class", "axis x")
      .attr("transform", "translate(0," + (this.height - this.margin) + ")")
      .call(this.xAxis);


    this.svg.append("g")
      .attr("class", "axis y")
      .attr("transform", "translate(" + this.margin + ",0)")
      .call(this.yAxis);
  }

  initScales() {
    this.xNorm = d3.scale.linear()
    .domain([this.margin , this.width - this.margin ])
    .range([-3, 3]);

    this.yNorm = d3.scale.linear()
    .domain([this.margin , this.height - this.margin ])
    .range([-3, 3]);

    this.xDeNorm = d3.scale.linear()
    .domain([-3, 3])
    .range([this.margin , this.width - this.margin ]);

    this.yDeNorm = d3.scale.linear()
    .domain([-3, 3])
    .range([this.margin , this.height - this.margin]);
  }

  initAxis() {
    this.xAxis = d3.svg.axis()
    .scale(this.xDeNorm)
    .orient("bottom");

    this.yAxis = d3.svg.axis()
    .scale(this.yDeNorm)
    .orient("left");
  }

  async getMesh(dataset: Array<Point>): Promise<Array<Array<number>>> {
    const requestpoints = [];
    let xx = 0;
    for(let x = this.margin ; x < this.width - this.margin; x += this.size) {
      let yy = 0;
      for(let y = this.margin; y < this.height - this.margin ; y += this.size) {
        const theta0: number = this.xNorm(x);
        const theta1: number = this.yNorm(y);
        requestpoints.push({theta0, theta1});
      }
    }
    const costs = await this.costClient.getBatchCost(
      requestpoints,
      dataset,
    );

    const matrix: Array<Array<number>> = [];
    xx = 0;
    let it = 0;
    this.minCost = 999;
    this.maxCost = -999;
    for(let x = this.margin ; x < this.width - this.margin; x += this.size) {
      matrix[xx] = [];
      let yy = 0;
      for(let y = this.margin; y < this.height - this.margin ; y += this.size) {
        matrix[xx][yy] = costs[it];
        it++;
        this.minCost = Math.min(this.minCost, matrix[xx][yy]);
        this.maxCost = Math.max(this.maxCost, matrix[xx][yy]);
        yy++;
      }
      xx++;
    }

    return matrix;
  }

  animatePointer(dataset: Array<Point>, animatedFunction: AnimatedFunction) {
    if(dataset.length == 0) {
      return;
    }

    const x1: number = (this.xDeNorm(this.prevPoint.theta0));
    const y1: number = (this.yDeNorm(this.prevPoint.theta1));
    const x2: number = (this.xDeNorm(animatedFunction.theta0));
    const y2: number = (this.yDeNorm(animatedFunction.theta1));

    const dist = Math.pow(x1-x2,2) + Math.pow(y1-y2,2);

    if(dist < 1) {
      return;
    }

    const point = this.svg.selectAll("point").data([{
      theta0: animatedFunction.theta0,
      theta1: animatedFunction.theta1
    }]);

    const g = point.enter().append("g");
    g.append("circle")
      .attr("cx", Math.round(x2))
      .attr("cy", Math.round(y2))
      .attr("r", "1.4")
      .attr("fill", "blue");

    g.append("line")
      .attr("stroke", "red")
      .attr("x1", Math.round(x1))
      .attr("y1", Math.round(y1))
      .attr("x2", function(d){return Math.round(x2);})
      .attr("y2", function(d){return Math.round(y2);});

    this.prevPoint = {
      theta0: animatedFunction.theta0,
      theta1: animatedFunction.theta1
    };
  }

  async draw(svg2: any, dataset: Array<Point>): Promise<void> {
    if(dataset.length == 0) {
      return;
    }

    const svg = this.svg;

    let costFunc = this.svg.selectAll("g.costfunction");
    if(costFunc.size() == 0) {
      costFunc = svg.append("g").attr("class","costfunction");
    }

    costFunc.selectAll("rect").remove();

    const colScale = d3.scale.linear()
    .domain([this.minCost, this.maxCost])
    .range([255, 0]);

    const mesh = await this.getMesh(dataset);
    for(let x = 0  ; x < mesh.length ; x++) {
      for(let y = 0 ; y < mesh[x].length ; y++) {
        let val = Math.round(colScale(mesh[x][y]));
        const col = val % 60;
        let rgb = null;
        if(val == 255) {
          rgb = "rgb(255,255,255)";
        }
        else if(col < 20 ) {
          val -= 20;

          rgb = "rgb("+val+","+val+","+val+")";
        }
        else if(col < 40) {
          val -= 50;

          rgb = "rgb("+val+","+val+","+val+")";
        }
        else {
          val -= 100;

          rgb = "rgb("+val+","+val+","+val+")";
        }

        costFunc.append("rect")
        .attr("x", this.margin + x * this.size)
        .attr("y", this.margin + y * this.size)
        .attr("width", this.size)
        .attr("height", this.size)
        .attr("fill", rgb);
      }
    }
  }

  destroy(): void {
    this.svg.remove();
  }
}

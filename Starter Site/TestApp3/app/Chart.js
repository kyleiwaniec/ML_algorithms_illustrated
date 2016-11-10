/* @flow */

import type {Point} from '../shared/types.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {GradientDescent} from './d3/GradientDescent.js';


type State = {
  Dataset: Array<Point>,
  Points: Array<Point>,
  gradientDescent: GradientDescent,
};

export default class Chart extends React.Component {
  state: State;

  constructor(props: mixed) {
    super(props);

    (this: any).appendPoint = this.appendPoint.bind(this);

    this.state = {
      Dataset: [],
      Points: [],
      gradientDescent: new GradientDescent(this.appendPoint),
    };
  }

  componentDidMount() {
    this._initGradient();
  }

  componentDidUpdate() {
    this.state.gradientDescent.destroy();
    this._initGradient();
  }

  componentWillUnmount() {
    this.state.gradientDescent.destroy();
  }

  _initGradient() {
    const el = ReactDOM.findDOMNode(this);
    this.state.gradientDescent.init(
      el,
      this.state.Dataset,
      this.state.Points,
      this.props.costCalculator,
      this.props.width,
      this.props.height,
      this.props.margin
    );
    this.state.gradientDescent.run();
  }

  render() {
    return (
      <div className="svg" />
    );
  }

  appendPoint(pointElem: Point, datasetElem: Point): void {
    const Dataset = this.state.Dataset;
    const Points = this.state.Points;
    Dataset.push(datasetElem);
    Points.push(pointElem);
    this.setState({Dataset: Dataset, Points: Points});
  }
}

export type AppendPointCB = (pointElem: Point, datasetElem: Point) => void;

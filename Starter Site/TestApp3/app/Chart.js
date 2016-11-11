/* @flow */

import type {Point} from '../shared/types.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {GradientDescent} from './d3/GradientDescent';
import {LinRegClient} from './LinRegClient';

type Props = {
  costClient: LinRegClient,
  width: number,
  height: number,
  margin: number,
};

type State = {
  dataset: Array<Point>,
  points: Array<Point>,
  gradientDescent: GradientDescent,
};

export default class Chart extends React.Component {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);

    (this: any).appendPoint = this.appendPoint.bind(this);

    this.state = {
      dataset: [],
      points: [],
      gradientDescent: new GradientDescent(
        this.props.width,
        this.props.height,
        this.props.margin,
        this.appendPoint,
        this.props.costClient,
      ),
    };
  }

  componentDidMount(): void {
    this._initGradient();
  }

  componentDidUpdate(): void {
    this.state.gradientDescent.destroy();
    this._initGradient();
  }

  componentWillUnmount(): void {
    this.state.gradientDescent.destroy();
  }

  _initGradient(): void {
    const el: HTMLElement = ReactDOM.findDOMNode(this);
    this.state.gradientDescent.init(
      el,
      this.state.dataset,
      this.state.points,
    );
    this.state.gradientDescent.run();
  }

  render(): React.Element<any> {
    return (
      <div className="svg" />
    );
  }

  appendPoint(pointElem: Point, datasetElem: Point): void {
    const dataset = this.state.dataset;
    const points = this.state.points;
    dataset.push(datasetElem);
    points.push(pointElem);
    this.setState({dataset, points});
  }
}

export type AppendPointCB = (pointElem: Point, datasetElem: Point) => void;

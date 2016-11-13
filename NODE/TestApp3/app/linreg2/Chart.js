/* @flow */

import type {Point} from '../../shared/types.js';

import React from 'react';
import ReactDOM from 'react-dom';
import {GradientDescent} from './d3/GradientDescent';
import {LinRegClient} from '../linreg/LinRegClient';

type Props = {
  costClient: LinRegClient,
  width: number,
  height: number,
};

type State = {
  dataset: Array<Point>,
};

export default class Chart extends React.Component {
  state: State;
  props: Props;
  gradientDescent: GradientDescent;

  constructor(props: Props) {
    super(props);

    (this: any).handleChangeX = this.handleChangeX.bind(this);
    (this: any).handleChangeY = this.handleChangeY.bind(this);
    (this: any)._rerenderGradient = this._rerenderGradient.bind(this);
    (this: any).handleRemove = this.handleRemove.bind(this);
    (this: any).handleNewPoint = this.handleNewPoint.bind(this);

    const dataset = [
      {x: 0.5, y: 0.5},
      {x: 0.4, y: 0.2},
      {x: 0.6, y: 0.9},
    ];
    this.state = {
      dataset,
    };
    this.gradientDescent = new GradientDescent(
      this.props.width,
      this.props.height,
      this.props.costClient,
    );
  }

  componentDidMount(): void {
    this._initGradient();
  }

  componentWillUnmount(): void {
    this.gradientDescent.destroy();
  }

  _initGradient(): void {
    this.gradientDescent.render(
      ReactDOM.findDOMNode(this),
      this.state.dataset,
    );
  }

  _rerenderGradient(): void {
    this.gradientDescent.destroy();
    this.gradientDescent.render(
      ReactDOM.findDOMNode(this),
      this.state.dataset,
    );
  }

  render(): React.Element<any> {
    return (
      <div style={{overflow: 'hidden', position: 'relative'}}>
        <div style={{float: 'left', marginRight: 50, marginLeft: 10}}>
          <table className="table">
            <tbody>
              {this.renderPoints()}
            </tbody>
          </table>
          <button
            type="button"
            className="btn but-default"
            onClick={this.handleNewPoint}>Add point</button>
        </div>
        <div className="svg" style={{float: 'left'}}/>
      </div>
    );
  }

  renderPointForIndex(point: Point, idx: number): React.Element<any> {
    return (
      <tr key={idx.toString()}>
        <td>
          <input
            type="text"
            value={point.x}
            className="form-control"
            onChange={(event) => this.handleChangeX(event.target.value, idx)}
            onBlur={this._rerenderGradient}
          />
        </td>
        <td>
          <input
            type="text"
            value={point.y}
            className="form-control"
            onChange={(event) => this.handleChangeY(event.target.value, idx)}
            onBlur={this._rerenderGradient}
          />
        </td>
        <td>
          <button
            className="btn btn-default"
            type="button"
            onClick={(event) => this.handleRemove(idx)}
          >
            X
          </button>
        </td>
      </tr>
    );
  }

  renderPoints(): Array<React.Element<any>> {
    return this.state.dataset.map((pt, idx) => this.renderPointForIndex(pt, idx));
  }

  handleChangeX(x: number, idx: number): void {
    const dataset = this.state.dataset;
    dataset[idx].x = x;
    this.setState({dataset});
  }

  handleChangeY(y: number, idx: number): void {
    const dataset = this.state.dataset;
    dataset[idx].y = y;
    this.setState({dataset});
  }

  handleRemove(idx: number): void {
    const dataset = this.state.dataset;
    dataset.splice(idx, 1);
    this.setState({dataset}, () => this._rerenderGradient());
  }

  handleNewPoint(): void {
    const dataset = this.state.dataset;
    dataset.push({x: 0, y: 0});
    this.setState({dataset}, () => this._rerenderGradient());
  }
}

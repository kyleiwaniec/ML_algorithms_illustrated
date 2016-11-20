/* @flow */

import type {Iteration} from './MnistStream';

import React from 'react';
import ReactDOM from 'react-dom';
import {Matrix} from './Matrix';
import {MnistStream} from './MnistStream';

type Props = {
  stream: ?MnistStream,
};

type State = {
  iterations: Array<Iteration>,
  finished: boolean,
  stream: ?MnistStream,
  currentIteration: ?number,
};

export class Matrices extends React.Component {
  props: Props;
  state: State;

  constructor(props: any) {
    super(props)
    this.props = props;
    this.state = {
      iterations: [],
      finished: false,
      stream: this.props.stream,
      currentIteration: null,
    };
    this.setUpStream(this.state.stream);
  }

  setUpStream(stream: ?MnistStream): void {
    if (stream) {
      stream.onFinished(() => this.setState({finished: true}));
      stream.onIteration(iteration => this.addIteration(iteration));
    }
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.stream != this.state.stream) {
      this.setUpStream(nextProps.stream);
      this.setState({
        stream: nextProps.stream,
        iterations: [],
        finished: false,
        currentIteration: null,
      });
    }
  }

  addIteration(iteration: Iteration): void {
    const iterations = this.state.iterations.slice();
    iterations.push(iteration);
    this.setState({iterations});
  }

  render(): React.Element<any> {
    if (this.state.iterations.length === 0) {
      return (<div />);
    } else {
      return (
        <div>
          <div style={{marginTop: '10px'}}>
            {this.renderIterationSelector()}
          </div>
          <div style={{display: 'flex', marginTop: '10px'}}>
            {
              this.state.iterations[this.getSelectedIteration()].nn.weights.map((weightMatrix, i) => (
                <div style={{marginRight: '20px'}} key={i}>
                  <Matrix weightMatrix={weightMatrix} />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }

  renderIterationSelector(): React.Element<any> {
    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="btn-group btn-group-sm">
            <button
              className="btn btn-secondary" type="button"
              onClick={() => this.onChangeIteration(-1)}
              >
              ◀
            </button>
            <span type="text" className="btn btn-secondary">
              Iteration {this.getSelectedIteration() + 1}
            </span>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => this.onChangeIteration(1)}
              >
              ▶
              </button>
          </div>
        </div>
      </div>
    );
  }

  getSelectedIteration(): number {
    if (this.state.currentIteration == null) {
      return this.state.iterations.length - 1;
    }
    return this.state.currentIteration;
  }

  onChangeIteration(delta: number): void {
    let newIteration = this.getSelectedIteration() + delta;
    if (newIteration < 0) {
      newIteration = 0;
    }
    if (newIteration >= this.state.iterations.length) {
      newIteration = this.state.iterations.length - 1;
    }
    this.setState({currentIteration: newIteration});
  }
}

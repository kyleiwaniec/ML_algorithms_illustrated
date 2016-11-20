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
  currentIteration: number,
  paused: boolean,
};

export class Matrices extends React.Component {
  props: Props;
  state: State;
  isRendering: boolean;

  constructor(props: any) {
    super(props)
    this.props = props;
    this.state = {
      iterations: [],
      finished: false,
      stream: this.props.stream,
      currentIteration: -1,
      paused: false,
    };
    this.setUpStream(this.state.stream);
    this.isRendering = false;
  }

  componentDidMount(): void {
    setInterval(() => {
      if (!this.isRendering && !this.state.paused) {
        const nextIteration = this.state.currentIteration + 1;
        if (nextIteration < this.state.iterations.length) {
          this.setState({currentIteration: nextIteration});
        }
      }
    }, 100);
  }

  setUpStream(stream: ?MnistStream): void {
    if (stream) {
      stream.onFinished(() => this.setState({finished: true}));
      stream.onIteration(iteration => this.addIteration(iteration));
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    if (this.isRendering && nextState.paused == this.state.paused) {
      return false;
    }
    this.isRendering = true;
    return true;
  }

  componentDidUpdate(): void {
    this.isRendering = false;
  }

  componentWillReceiveProps(nextProps: Props): void {
    if (nextProps.stream != this.state.stream) {
      this.setUpStream(nextProps.stream);
      this.setState({
        stream: nextProps.stream,
        iterations: [],
        finished: false,
        currentIteration: -1,
        paused: false,
      });
    }
  }

  addIteration(iteration: Iteration): void {
    const iterations = this.state.iterations.slice();
    iterations.push(iteration);
    let currentIteration = this.state.currentIteration;
    if (currentIteration === -1) {
      currentIteration = 0;
    }
    this.setState({iterations, currentIteration});
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
              this.state.iterations[this.state.currentIteration].nn.weights.map((weightMatrix, i) => (
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
            <span type="text" className="btn btn-secondary">
              Iteration {this.state.currentIteration + 1}
            </span>
            <button
              className="btn btn-secondary" type="button"
              onClick={() => this.onChangeIteration(-1)}
              >
              ⏪
            </button>
            <button
              className="btn btn-secondary" type="button"
              onClick={() => this.setState({paused: !this.state.paused})}
              >
              {!this.state.paused? '⏸' : '▶️'}
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => this.onChangeIteration(1)}
              >
              ⏩
              </button>
          </div>
        </div>
      </div>
    );
  }

  onChangeIteration(delta: number): void {
    let newIteration = this.state.currentIteration + delta;
    if (newIteration < 0) {
      newIteration = 0;
    }
    if (newIteration >= this.state.iterations.length) {
      newIteration = this.state.iterations.length - 1;
    }
    this.setState({currentIteration: newIteration});
  }
}

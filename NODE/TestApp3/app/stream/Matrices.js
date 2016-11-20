/* @flow */

import type {Iteration} from './MnistStream';

import React from 'react';
import ReactDOM from 'react-dom';
import {Matrix} from './Matrix';
import {MnistStream} from './MnistStream';

type Props = {
  stream: ?MnistStream,
};

type PlayStatus = 'completed' | 'running' | 'paused' | 'none';

type State = {
  iterations: Array<Iteration>,
  finished: boolean,
  stream: ?MnistStream,
  currentIteration: number,
  playStatus: PlayStatus,
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
      playStatus: 'none',
    };
    this.setUpStream(this.state.stream);
    this.isRendering = false;
  }

  componentDidMount(): void {
    setInterval(() => {
      if (!this.isRendering && this.state.playStatus === 'running') {
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
      this.setState({playStatus: 'running'})
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    if (this.isRendering && nextState.playStatus !== 'running') {
      return false;
    }
    this.isRendering = true;
    if (this.didComplete(nextState)) {
      nextState.playStatus = 'completed';
    }
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
      const weights = this.state.iterations[this.state.currentIteration].nn.weights;
      return (
        <div>
          <div style={{marginTop: '10px'}}>
            {this.renderIterationSelector()}
          </div>
          <div style={{display: 'flex', marginTop: '10px'}}>
            {
              weights.map((weightMatrix, i) => (
                <div style={{marginRight: '20px'}} key={i}>
                  <Matrix
                    weightMatrix={weightMatrix}
                    layerIndex={i}
                    totalMatrices={weights.length}
                  />
                </div>
              ))
            }
          </div>
        </div>
      );
    }
  }

  didComplete(state: State): boolean {
    if (state.finished && state.currentIteration + 1 == state.iterations.length) {
      return true;
    }
    return false;
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
              className="btn btn-secondary"
              type="button"
              onClick={() => this.onChangeIteration(1)}
              >
              ⏩
              </button>
            {this.renderPlayStatusButton()}
          </div>
        </div>
      </div>
    );
  }

  renderPlayStatusButton(): React.Element<any> {
    if (this.state.playStatus === 'completed') {
      return (
        <button className="btn btn-secondary" type="button">
          Finished
        </button>
      );
    } else if (this.state.playStatus === 'none') {
      return (
        <button className="btn btn-secondary" type="button">
          Not running
        </button>
      );
    } else if (this.state.playStatus === 'paused') {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => this.setState({playStatus: 'running'})}>
          ▶️
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => this.setState({playStatus: 'paused'})}>
          ⏸
        </button>
      );
    }
  }

  onChangeIteration(delta: number): void {
    let newIteration = this.state.currentIteration + delta;
    if (newIteration < 0) {
      newIteration = 0;
    }
    if (newIteration >= this.state.iterations.length) {
      newIteration = this.state.iterations.length - 1;
    }
    let playStatus = this.state.playStatus;
    if (playStatus === 'running' && newIteration + 1 < this.state.iterations.length) {
      playStatus = 'paused';
    } else if (playStatus === 'paused' && newIteration + 1 === this.state.iterations.length) {
      playStatus = 'running';
    }
    this.setState({
      currentIteration: newIteration,
      playStatus,
    });
  }
}

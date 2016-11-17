/* @flow */

import type {Point} from '../../shared/types.js';

import {NeuralNetwork} from './NeuralNetwork';
import {Matrix} from './Matrix';
import React from 'react';
import ReactDOM from 'react-dom';

const STATUS = {
  running: 1,
  finished: 2,
  none: 3,
}

type Iteration = {
  error: number,
  index:  number,
  nn: NeuralNetwork,
};

type State = {
  nodes: string,
  iterations: Array<Iteration>,
  status: number,
};

export class Mnist extends React.Component {
  state: State;
  es: any;

  constructor(props: any) {
    super(props);
    this.state = {
      nodes: '5',
      iterations: [],
      status: STATUS.none,
    };
    (this: any).handleNodesChange = this.handleNodesChange.bind(this);
    (this: any).handleRun = this.handleRun.bind(this);
    (this: any).handleStop = this.handleStop.bind(this);
  }

  closeStream(): void {
    if (this.es) {
      console.log('CLOSE stream');
      this.es.close();
    }
  }

  componentWillUnmount(): void {
    this.closeStream();
  }

  handleNodesChange(event: any): void {
    this.setState({nodes: event.target.value});
  }

  handleStop(): void {
    this.closeStream();
  }

  parseIteration(streamData: string): Iteration {
    const iteration = JSON.parse(streamData);
    return {
      error: iteration.error,
      index: iteration.iterations + 1,
      nn: new NeuralNetwork((iteration.json: Object)),
    };
  }

  handleRun(): void {
    this.closeStream();
    console.log('CREATE stream');
    this.setState({iterations: [], status: STATUS.running});
    // $FlowFixMe
    this.es = new EventSource('/mnist/stream?nodes=' + this.state.nodes);
    this.es.onmessage = (event) => {
      if (event.data == '"done"') {
        this.setState({status: STATUS.finished});
      } else {
        const iterations = this.state.iterations;
        iterations.push(this.parseIteration(event.data));
        this.setState({iterations});
      }
    };
    this.es.onopen = (event) => {
      console.log(event);
    };
    this.es.onerror = (event) => {
      console.log(event);
    }
  }

  render(): React.Element<any> {
    return (
      <div style={{marginLeft: 10}}>
        <div className="row">
          <div className="col-lg-2">
            <input
              type="text"
              className="form-control"
              value={this.state.nodes}
              onChange={this.handleNodesChange}
            />
          </div>
          <div className="col-lg-2">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleRun}>
                Run
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleStop}>
                Stop
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <ul>
              {this.state.status === STATUS.finished ? <div>Finished</div> : null}
              {this.renderIterations()}
            </ul>
          </div>
          <div className="col-lg-8">
            {this.renderMatrices()}
          </div>
        </div>
      </div>
    );
  }

  renderMatrices(): React.Element<any> {
    if (this.state.iterations.length === 0) {
      return (<div />);
    } else {
      return (
        <div style={{display: 'flex', marginTop: '10px'}}>
          {
            this.state.iterations.slice(-1)[0].nn.weights.map((weightMatrix, i) => (
              <div style={{marginRight: '20px'}}>
                <Matrix weightMatrix={weightMatrix} key={i} />
              </div>
            ))
          }
        </div>
      );
    }
  }

  renderIterations(): Array<React.Element<any>> {
    return this.state.iterations.map(iteration => (
      <li key={iteration.index}>
        <div>
          Error: {iteration.error}
        </div>
      </li>
    ));
  }
}

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

import {MnistStream} from './MnistStream';
import type {Iteration} from './MnistStream';

type Props = {
  stream: ?MnistStream,
};

type State = {
  iterations: Array<Iteration>,
  finished: boolean,
  stream: ?MnistStream,
};

export class Graphs extends React.Component {
  props: Props;
  state: State;

  constructor(props: any) {
    super(props)
    this.props = props;
    this.state = {
      iterations: [],
      finished: false,
      stream: this.props.stream,
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
      this.setState({stream: nextProps.stream, iterations: [], finished: false});
    }
  }

  addIteration(iteration: Iteration): void {
    const iterations = this.state.iterations.slice();
    iterations.push(iteration);
    this.setState({iterations});
  }

  render(): React.Element<any> {
    return (
      <div>
        {this.state.finished ? <div>Finished</div> : null}
        <div>{this.state.iterations.length} Iterations</div>
        <ul>
          {this.state.iterations.map(iteration => (
            <li key={iteration.index}>
              <div>
                Error: {iteration.error}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

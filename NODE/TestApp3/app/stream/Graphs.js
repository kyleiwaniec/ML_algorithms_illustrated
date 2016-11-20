/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

import {MnistStream} from './MnistStream';
import type {Iteration} from './MnistStream';
import {Line} from 'react-chartjs-2';

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
    if (this.state.iterations.length === 0) {
      return (<div />);
    }
    return (
      <div>
        <div>{this.state.finished ? 'Finished' : null}</div>
        <Line
          options={{scales: {xAxes: [{display: false}]}}}
          data={{
            labels: new Array(this.state.iterations.length).fill().map((x, i) => 'It. ' + i),
            datasets: [
              {
                label: 'Error',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.iterations.map(it => it.error),
              },
            ]
          }}
        />
      </div>
    );
  }
}

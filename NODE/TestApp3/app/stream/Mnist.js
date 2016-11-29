/* @flow */

import type {Point} from '../../shared/types';
import type {Iteration} from './MnistStream';

import {MnistStream} from './MnistStream';
import {NeuralNetwork} from './NeuralNetwork';
import {Matrix} from './Matrix';
import React from 'react';
import ReactDOM from 'react-dom';
import {Graphs} from './Graphs';
import {Matrices} from './Matrices';
import {NodesPicker} from './NodesPicker';

type Status = 'running' | 'finished' | 'none';

type State = {
  iterations: Array<Iteration>,
  status: Status,
  stream: ?MnistStream,
};

export class Mnist extends React.Component {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = {
      nodes: '',
      iterations: [],
      status: 'none',
      stream: null,
    };
    (this: any).handleRun = this.handleRun.bind(this);
  }

  closeStream(): void {
    if (this.state.stream != null) {
      this.state.stream.close();
      this.setState({status: 'finished'});
    }
  }

  componentWillUnmount(): void {
    this.closeStream();
  }

  handleRun(): void {
    const nodes = this.refs.picker.getNodes();
    if (nodes.length === 0) {
      return;
    }
    this.closeStream();
    const stream = new MnistStream(nodes.join(' '));
    stream.onFinished(() => this.closeStream());
    this.setState(
      {
        iterations: [],
        status: 'running',
        stream,
       },
      () => stream.run(),
    );
  }

  render(): React.Element<any> {
    return (
      <div style={{marginLeft: 10}}>
        <div className="row">
          <div className="col-lg-4">
            <div className="row">
              <div className="col-sm-12">
                <strong>Enter the number of nodes per hidden layer</strong>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="input-group">
                  <NodesPicker ref="picker" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div  style={{marginTop: "20px"}}>
                  <Graphs stream={this.state.stream} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <Matrices
              stream={this.state.stream}
              handleRun={() => this.handleRun()}
              handleCancel={() => this.closeStream()}
            />
          </div>
        </div>
      </div>
    );
  }
}

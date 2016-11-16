/* @flow */

import type {Point} from '../../shared/types.js';

import React from 'react';
import ReactDOM from 'react-dom';

type State = {
  nodes: number,
  messages: Array<string>,
};

export class Mnist extends React.Component {
  state: State;
  es: any;

  constructor(props: any) {
    super(props);
    this.state = {
      nodes: 5,
      messages: [],
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
    this.setState({nodes: Number(event.target.value)});
  }

  handleStop(): void {
    this.closeStream();
  }

  handleRun(): void {
    console.log('CREATE stream');
    this.setState({messages: []});
    this.closeStream();
    // $FlowFixMe
    this.es = new EventSource('/mnist/stream?nodes=' + this.state.nodes);
    this.es.onmessage = (event) => {
      const messages = this.state.messages;
      messages.push(event.data);
      this.setState({messages});
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
          <div className="col-lg-4">
            <ul>
              {this.renderMessages()}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderMessages(): Array<React.Element<any>> {
    return this.state.messages.map((message, idx) => (
      <li key={idx}>
        <span>{message}</span>
      </li>
    ));
  }
}

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';

type State = {
  nodes: Array<number>,
};

const btnStyle = {margin: '2px 2px 2px 2px'};
const btnType = 'default';
const defaultNodes = 5;

export class NodesPicker extends React.Component {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = {
      nodes: [defaultNodes],
    };
  }

  render(): React.Element<any> {
    return (
      <div>
        {this.state.nodes.map((node, idx) => this.renderNode(node, idx))}
        <Button
          bsSize="small"
          bsStyle={btnType}
          style={btnStyle}
          onClick={() => this.addOne()}>
          +
        </Button>
        <Button
          bsSize="small"
          bsStyle={btnType}
          style={btnStyle}
          onClick={() => this.removeOne()}>
          -
        </Button>
      </div>
    );
  }

  getNodes(): Array<number> {
    return this.state.nodes;
  }

  addOne(): void {
    const nodes = this.state.nodes.slice();
    nodes.push(defaultNodes);
    this.setState({nodes});
  }

  removeOne(): void {
    if (this.state.nodes.length === 1) {
      return;
    }
    const nodes = this.state.nodes.slice();
    nodes.pop();
    this.setState({nodes});

  }

  onChange(idx: number, value: number): void {
    const nodes = this.state.nodes.slice();
    nodes[idx] = value;
    this.setState({nodes});
  }

  renderNode(node: number, idx: number): React.Element<any> {
    return (
      <DropdownButton
        key={`selector-${idx}`}
        title={node}
        id={`selector-${idx}`}
        bsStyle={btnType}
        bsSize="small"
        style={btnStyle}
        >
        {new Array(10).fill().map((_, i_) => {
          const i = i_ + 1;
          return (
            <MenuItem
              eventKey={i}
              key={i}
              onClick={() => this.onChange(idx, i)}
              active={i === node}>
              {i}
            </MenuItem>
          );
        })}
      </DropdownButton>
    )
  }
}

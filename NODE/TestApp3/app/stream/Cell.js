import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  color: string,
  value: number,
  fromNode: string,
  toNode: string,
};

type State = {
  hover: boolean,
};

const hiddenStyle = {
  visibility: 'hidden',
  backgroundColor: 'black',
  color: '#fff',
  textAlign: 'center',
  padding: '5px 5px 5px 5px',
  borderRadius: '6px',
  position: 'absolute',
  margin: '15px 15px 15px 15px',
  zIndex: '1',
};

const visibleStyle = {
  visibility: 'visible',
  backgroundColor: 'black',
  color: '#fff',
  textAlign: 'center',
  padding: '5px 5px 5px 5px',
  borderRadius: '6px',
  position: 'absolute',
  margin: '15px 15px 15px 15px',
  zIndex: '1',
};

export class Cell extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      hover: false,
    };
    (this: any).onMouseEnter = this.onMouseEnter.bind(this);
    (this: any).onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  render(): React.Element<any> {
    return (
      <div
        style={{
          backgroundColor: this.props.color,
          width: 10,
          height: 10,
          boxSizing: 'border-box',
          margin: 1,
          position: 'relative',
        }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
      {this.state.hover ?
        <span style={this.state.hover ? visibleStyle : hiddenStyle}>
          From {this.props.fromNode}
          <br />
          To {this.props.toNode}
          <br />
          {this.props.value}
        </span>
        : null}
      </div>
    );
  }
}

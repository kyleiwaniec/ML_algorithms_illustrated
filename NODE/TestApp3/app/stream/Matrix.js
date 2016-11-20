/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import {Cell} from './Cell';
import d3 from 'd3';

type Props = {
  weightMatrix: Array<Array<number>>,
  layerIndex: number,
};

export class Matrix extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  render(): React.Element<any> {
    const cells = this.generateCells();
    return (
      <div>
        <div>Layer {this.props.layerIndex}</div>
        <div style={{display: 'flex'}}>
          {cells.map((col, i) => this.renderColumn(col, i))}
        </div>
      </div>
    );
  }

  renderColumn(cells: Array<React.Element<any>>, i: number): React.Element<any> {
    const borders = ['1'];
    borders.push(i + 1 == this.props.weightMatrix.length ? '1' : '0');
    borders.push('1');
    borders.push(i == 0 ? '1' : '0');

    return (
      <div
        key={`col${i}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderColor: '#207ce5',
          borderWidth: borders.map(s => s + 'px').join(' '),
          borderStyle: 'solid',
        }}>
        {cells}
      </div>
    )
  }

  generateCells(): Array<Array<React.Element<any>>> {
    const weightMatrix = this.props.weightMatrix;
    const maxVal =  Math.max(...weightMatrix.map(row => Math.max(...row.map(x => Math.abs(x)))));
    const minVal =  Math.min(...weightMatrix.map(row => Math.min(...row.map(x => Math.abs(x)))));
    var colorScale = d3.scale.linear()
      .domain([minVal, maxVal])
      .range(['white', 'blue']);

    return weightMatrix.map((row, i) => row.map((val, j) => {
      return (
        <Cell
          fromNode={j}
          toNode={i}
          key={`col${i}row${j}`}
          color={colorScale(Math.abs(val))}
          value={val}
        />
      );
    }));
  }
}

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import {Cell} from './Cell';

type Props = {
  weightMatrix: Array<Array<number>>,
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
      <div style={{display: 'flex'}}>
        {cells.map((col, i) => this.renderColumn(col, i))}
      </div>
    );
  }

  renderColumn(cells: Array<React.Element<any>>, i: number): React.Element<any> {
    return (
      <div key={`col${i}`} style={{display: 'flex', flexDirection: 'column'}}>
        {cells}
      </div>
    )
  }

  generateCells(): Array<Array<React.Element<any>>> {
    const weightMatrix = this.props.weightMatrix;
    const maxVal =  Math.max(...weightMatrix.map(row => Math.max(...row.map(x => Math.abs(x)))));
    const minVal =  Math.min(...weightMatrix.map(row => Math.min(...row.map(x => Math.abs(x)))));
    const span = maxVal - minVal;
    return weightMatrix.map((row, i) => row.map((val, j) => {
      const w = span === 0 ? 0 : (maxVal - Math.abs(val)) / span;
      const grayColor = Math.round(w * 255);
      const colorHex = Number(parseInt(grayColor, 10)).toString(16);
      const color = "#" + colorHex + colorHex + colorHex;
      return (
        <Cell
          key={`col${i}row${j}`}
          color={color}
          value={val}
        />
      );
    }));
  }
}

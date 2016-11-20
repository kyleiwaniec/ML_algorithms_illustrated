/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import {Cell} from './Cell';
import d3 from 'd3';

type Props = {
  weightMatrix: Array<Array<number>>,
  layerIndex: number,
};

type Stats = {
  max: number,
  min: number,
  maxAbs: number,
  minAbs: number,
};

export class Matrix extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  render(): React.Element<any> {
    const stats = this.calculateStats();
    return (
      <div>
        {this.renderStats(stats)}
        <div style={{display: 'flex'}}>
          {this.generateCells(stats).map((col, i) => this.renderColumn(col, i))}
        </div>
      </div>
    );
  }

  calculateStats(): Stats {
    let maxAbs = -Infinity;
    let max = -Infinity;
    let minAbs = Infinity;
    let min = Infinity;

    const mat = this.props.weightMatrix;
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[i].length; j++) {
        const x = mat[i][j];
        const ax = Math.abs(x);

        maxAbs = Math.max(maxAbs, ax);
        minAbs = Math.min(minAbs, ax);

        max = Math.max(max, x);
        min = Math.min(min, x);
      }
    }
    return {min, max, maxAbs, minAbs};
  }

  renderStats(stats: Stats): React.Element<any> {
    return (
      <div>
        <div>
          <small><b>Layer {this.props.layerIndex}</b></small>
        </div>
        <div>
          <ul className="list-unstyled">
            <li>
              <small>Min: {stats.min.toFixed(4)}</small>
            </li>
            <li>
          <small>Max: {stats.max.toFixed(4)}</small>
            </li>
          </ul>
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

  generateCells(stats: Stats): Array<Array<React.Element<any>>> {
    var colorScale = d3.scale.linear()
      .domain([stats.minAbs, stats.maxAbs])
      .range(['white', 'blue']);

    return this.props.weightMatrix.map((row, i) => row.map((val, j) => {
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

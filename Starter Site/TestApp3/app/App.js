import React from 'react';
import Chart from './Chart.js';
import {GradientDescent} from './d3GradientDescent.js';
import {SimpleCostCalculator} from './SimpleCostCalculator.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Chart
          costCalculator={new SimpleCostCalculator()}
          gradientDescent={new GradientDescent()}
          width={600}
          height={600}
          margin={50}
        />
      </div>
    );
  }
}

import React from 'react';
import Chart from './Chart.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Chart
          costCalculator={require('./SimpleCostCalculator.js')}
          width={600}
          height={600}
          margin={50}
        />
      </div>
    );
  }
}

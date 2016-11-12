/* @flow */

import React from 'react';
import Chart from './Chart';
import {LinRegClient} from './LinRegClient';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Chart
          costClient={new LinRegClient()}
          width={600}
          height={600}
          margin={50}
        />
      </div>
    );
  }
}

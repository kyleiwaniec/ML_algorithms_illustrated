/* @flow */

import React from 'react';
import Chart from './Chart';
import {LinRegClient} from './LinRegClient';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class App extends React.Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>
            Linear regression
          </Tab>
          <Tab>
            Single Layer NN
          </Tab>
        </TabList>
        <TabPanel>
          <div>
            <Chart
              costClient={new LinRegClient()}
              width={600}
              height={600}
              margin={50}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <Chart
              costClient={new LinRegClient()}
              width={600}
              height={600}
              margin={50}
            />
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}

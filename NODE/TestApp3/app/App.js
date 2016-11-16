/* @flow */

import React from 'react';
import Chart from './linreg/Chart';
import Chart2 from './linreg2/Chart';
import {LinRegClient} from './linreg/LinRegClient';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {LinRegStore} from './linreg/LinRegStore';
import {TestStream} from './stream/TestStream';
import {Mnist} from './stream/Mnist';

const linregStore = new LinRegStore();

export default class App extends React.Component {
  render() {
    return (
      <Tabs selectedIndex={0}>
        <TabList>
          <Tab>
            Linear regression
          </Tab>
          <Tab>
            Simple linear regression
          </Tab>
          <Tab>
            Stream test
          </Tab>
          <Tab>
            Mnist stream
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
            <Chart2
              store={linregStore}
              costClient={new LinRegClient()}
              width={600}
              height={600}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <TestStream />
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <Mnist />
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}

/* @flow */

import type {Point, LinRegPoint} from '../shared/types';

import axios from 'axios';

export class LinRegClient {
  hypothesisFunctionLabel: string = 'Hypothesis Function: Ho(x)=theta0 + theta1 * x';

  costFunctionLabel: string = 'Cost Function: J(theta0, theta1)';

  getCost(theta0: number, theta1: number, Dataset: Array<Point>): number {
    let cost = 0;
    for(let i = 0 ; i < Dataset.length ;i++) {
      cost += Math.pow((Dataset[i].x * theta1 + theta0 - Dataset[i].y), 2);
    }
    this.getCostFromRemote(theta0, theta1, Dataset);

    return cost / 2 / Dataset.length;
  }

  getCostFromRemote(theta0: number, theta1: number, Dataset: Array<Point>): Promise<number> {
    return new Promise((resolve, reject) => {
      axios.get('/linreg/cost', {
        params: {params: JSON.stringify({theta0, theta1, Dataset})},
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getBatchCostFromRemote(
    points: Array<LinRegPoint>,
    Dataset: Array<Point>): Promise<Array<number>> {
    return new Promise((resolve, reject) => {
      axios.post('/linreg/batchcost', {
        params: JSON.stringify({points, Dataset}),
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  }
}

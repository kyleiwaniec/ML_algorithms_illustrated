/* @flow */

import type {Point, LinRegPoint} from '../shared/types';

import axios from 'axios';

export class LinRegClient {
  hypothesisFunctionLabel: string = 'Hypothesis Function: Ho(x)=theta0 + theta1 * x';

  costFunctionLabel: string = 'Cost Function: J(theta0, theta1)';

  getGradDescVector(
    theta0: number,
    theta1: number,
    learnRate: number,
    animationSpeed: number,
    dataset: Array<Point>,
  ): Promise<{
    theta0: number,
    theta1: number,
  }> {
    return new Promise((resolve, reject) => {
      axios.get('/linreg/graddescentvector', {
        params: {params: JSON.stringify({
          theta0,
          theta1,
          learnRate,
          animationSpeed,
          dataset,
        })},
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
    /*
    let theta0 = _theta0;
    let theta1 = _theta1;

		for(let i = 0 ; i < 100 + (200 * animationSpeed) ; i++) {
      let sum0 = 0, sum1 = 0;
      const m = dataset.length;
      const a = learnRate;

      for(let i = 0 ; i < m ;i++) {
        const diff = dataset[i].x * theta1 + theta0 - dataset[i].y;

        sum0 += diff;
        sum1 += diff * dataset[i].x;
      }

      const v0 = a * sum0 / m / 2;
      const v1 = a * sum1 / m / 2;
      theta0 -= v0;
      theta1 -= v1;
    }

    return {theta0, theta1};*/
  }

  getCost(theta0: number, theta1: number, dataset: Array<Point>): Promise<number> {
    return new Promise((resolve, reject) => {
      axios.get('/linreg/cost', {
        params: {params: JSON.stringify({theta0, theta1, dataset})},
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getBatchCost(
    points: Array<LinRegPoint>,
    dataset: Array<Point>,
  ): Promise<Array<number>> {
    return new Promise((resolve, reject) => {
      axios.post('/linreg/batchcost', {
        params: JSON.stringify({points, dataset}),
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  }
}

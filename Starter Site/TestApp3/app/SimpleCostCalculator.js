/* @flow */

import type {Point} from '../shared/types';

export class SimpleCostCalculator {
  hypothesisFunctionLabel: string = 'Hypothesis Function: Ho(x)=theta0 + theta1 * x';

  costFunctionLabel: string = 'Cost Function: J(theta0, theta1)';

  getCost(theta0: number, theta1: number, Dataset: Array<Point>): number {
    let cost = 0;
    for(let i = 0 ; i < Dataset.length ;i++) {
      cost += Math.pow((Dataset[i].x * theta1 + theta0 - Dataset[i].y), 2);
    }

    return cost / 2 / Dataset.length;
  }

  getCostFromRemote(theta0: number, theta1: number, Dataset: Array<Point>): void {
  }
};

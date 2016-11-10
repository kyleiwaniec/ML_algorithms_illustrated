/* @flow  */

import type {Request} from './lib/Controller.js'

import {get} from './lib/routesInternal.js';
import {SecondsController} from './utils/SecondsController';
import {LinRegController} from './linreg/LinRegController';

export function registerRoutes(): void {
  get(
    '/seconds',
    (req: Request) => new SecondsController(req).getCurrentSecondsAsString(),
  );

  get(
    '/linreg/cost',
    (req: Request) => new LinRegController(req).getCost(),
  );
}

/* @flow  */

import type {Request} from './lib/Controller.js'

import {get} from './lib/routesInternal.js';
import {SecondsController} from './utils/SecondsController.js';

export function registerRoutes() {
  get(
    '/seconds',
    (req: Request) => new SecondsController(req).getCurrentSecondsAsString(),
  );
}

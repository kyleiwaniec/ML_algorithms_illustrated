import {get} from './routesInternal';

import {SecondsController} from './utils/SecondsController.js';

export function registerRoutes() {
  get('/seconds', (req, res) => new SecondsController().getCurrentSecondsAsString());
}

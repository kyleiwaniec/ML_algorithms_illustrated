import {SecondsController} from './utils/SecondsController.js';

let app = null;

export function initRoutes(_app) {
  app = _app;
}

function get(path, cb) {
  app.get(path, (req, res) => {
    res.send(cb(req, res));
  });
}

export function registerRoutes() {
  get('/seconds', (req, res) => new SecondsController().getCurrentSecondsAsString());
}

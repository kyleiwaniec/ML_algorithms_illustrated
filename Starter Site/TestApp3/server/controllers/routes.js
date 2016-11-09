import {SecondsController} from './utils/SecondsController.js';

let _app = null;

function init(app) {
  _app = app;
}

function get(path, cb) {
  _app.get(path, (req, res) => {
    res.send(cb(req, res));
  });
}

export function registerRoutes(app) {
  init(app);
  _app = app;

  get('/seconds', (req, res) => new SecondsController().getCurrentSecondsAsString());
}

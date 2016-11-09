/* @flow */

let app = null;

export function initRoutes(_app): void {
  app = _app;
}

export function get(path, cb) {
  app.get(path, (req, res) => {
    res.send(cb(req, res));
  });
}
